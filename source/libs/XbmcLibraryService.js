enyo.kind({
    name: "Remote.XbmcLibraryService",
    kind: "Remote.XbmcJsonService",
    
    // xbmc/xbmc/lib/libjsonrpc/FileItemHandler.cpp
    videoFields: [
        "genre",
        "director",
        "trailer",
        "tagline",
        "plot",
        "plotoutline",
        "title",
        "originaltitle",
        "lastplayed",
        "showtitle",
        "firstaired",
        "duration",
        "season",
        "episode",
        "runtime",
        "year",
        "playcount",
        "rating",
        "writer",
        "studio",
        "mpaa",
        "premiered",
        "album",
        "artist"
    ],
    audioFields: [
        "title",
        "album", 
        "artist",
        "albumartist",
        "genre",
        "tracknumber",
        "discnumber",
        "trackanddiscnumber",
        "duration",
        "year",
        "musicbrainztrackid",
        "musicbrainzartistid",
        "musicbrainzalbumid",
        "musicbrainzalbumartistid",
        "musicbrainztrmidid",
        "comment",
        "lyrics",
        "rating"
    ],
    
    doRequest: function(inData) {
        if (inData.method && typeof this[inData.method] === "function") {
            params = this[inData.method](inData.params);
            filter = inData.method.replace(/^get/, 'filter');
            
            this.call(params, {
                onSuccess: inData.onSuccess || this.onSuccess,
                onFailure: inData.onFailure || this.onFailure,
                filterSuccess: typeof this[filter] === "function" && enyo.bind(this, filter),
            });
        } else {
            enyo.warn(this.name, "- missing function:", inData.method, inData);
        }
    },
    
    // Movies
    getMovies: function(inParams) {
        return {
            method: "VideoLibrary.GetMovies",
            params: {
                fields: ["playcount"]
            }
        };
    },
    filterMovies: function(inResponse) {
        var items = [];
        var item;
        
        for (var i = 0; i < inResponse.result.movies.length; i++) {
            item = inResponse.result.movies[i];
            item.id = item.moviesid
            items.push(item);
        }
        
        return {
            items: items
        }
    },
    
    // TV Shows
    getTvShows: function(inParams) {
        return {
            method: "VideoLibrary.GetTVShows",
            params: {
                fields: this.videoFields
            }
        };
    },
    filterTvShows: function(inResponse) {
        var items = [];
        var item;
        
        // returned but do not used:
        //  - duration
        //  - showtitle (same as title?)
        for (var i = 0, len = inResponse.result.tvshows.length; i < len; i++) {
            item = inResponse.result.tvshows[i];
            
            items.push({
                id:        item.tvshowid,
                title:     item.title,
                genre:     item.genre,
                plot:      item.plot,
                mpaa:      item.mpaa,
                premiered: item.premiered,
                year:      item.year,
                channel:   item.studio,
                
                episodes:  item.episode,
                played:    item.playcount,
                rating:    item.rating,
                banner:    this.url.replace('jsonrpc', 'vfs/' + item.thumbnail),
                fanart:    this.url.replace('jsonrpc', 'vfs/' + item.fanart),
                
                label: item.label
            });
        };
        
        return {
            items: items
        }
    },
    getTvShowSeasons: function(inParams) {
        return {
            method: "VideoLibrary.GetSeasons",
            params: {
                tvshowid: inParams.tvShowId,
                fields: this.videoFields
            }
        };
    },
    filterTvShowSeasons: function(inResponse) {
        var items = [];
        var item;
        
        // returned but do not used:
        //  - duration
        //  - rating
        for (var i = 0, len = inResponse.result.seasons.length; i < len; i++) {
            item = inResponse.result.seasons[i];
            
            items.push({
                id:        item.season || 0,
                title:     item.title,
                showtitle: item.showtitle,
                genre:     item.genre,
                mpaa:      item.mpaa,
                channel:   item.studio,
                
                episodes:  item.episode,
                played:    item.playcount,
                poster:    this.url.replace('jsonrpc', 'vfs/' + item.thumbnail),
                fanart:    this.url.replace('jsonrpc', 'vfs/' + item.fanart),
                
                label: item.label
            });
        };
        
        items.sort(function(a,b) {
            return a.id - b.id;
        });
        
        return {
            items: items
        }
    },
    getTvShowEpisodes: function(inParams) {
        return {
            method: "VideoLibrary.GetEpisodes",
            params: {
                tvshowid: inParams.tvShowId,
                season: inParams.season,
                fields: this.videoFields
            }
        };
    },
    filterTvShowEpisodes: function(inResponse) {
        var items = [];
        var item;
        
        // returned but do not used:
        //  - fanart (seems to be "File not found" for TV shows)
        for (var i = 0, len = inResponse.result.episodes.length; i < len; i++) {
            item = inResponse.result.episodes[i];
            
            items.push({
                id:         item.episodeid,
                title:      item.title,
                season:     item.season,
                episode:    item.episode,
                showtitle:  item.showtitle,
                plot:       item.plot,
                mpaa:       item.mpaa,
                firstaired: item.firstaired,
                premiered:  item.premiered,
                channel:    item.studio,
                year:       item.year,
                runtime:    item.runtime,
                duration:   item.duration,
                writer:     item.writer,
                director:   item.director,
                
                file:       item.file,
                played:     item.playcount,
                lastplayed: item.lastplayed,
                rating:     item.rating,
                screenshot: this.url.replace('jsonrpc', 'vfs/' + item.thumbnail),
                
                label: item.label
            });
        };
        
        items.sort(function(a,b) {
            return a.episode - b.episode;
        });
        
        return {
            items: items
        }
    },
    
    // Music Videos
    
    // Music
    
    // Files
    
    // Remote
});
