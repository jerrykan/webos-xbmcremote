enyo.kind({
    name: "Remote.XbmcLibraryService",
    kind: "Remote.XbmcJsonService",
    
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
                fields: ["playcount"]
            }
        };
    },
    filterTvShows: function(inResponse) {
        var items = [];
        var item;
        
        for (var i = 0; i < inResponse.result.tvshows.length; i++) {
            item = inResponse.result.tvshows[i];
            item.id = item.tvshowid;
            items.push(item);
        }
        
        return {
            items: items
        }
    },
    getTvShowSeasons: function(inParams) {
        return {
            method: "VideoLibrary.GetSeasons",
            params: {
                tvshowid: inParams.tvShowId,
                fields: ["playcount"]
            }
        };
    },
    filterTvShowSeasons: function(inResponse) {
        var items = [];
        var item;
        
        for (var i = 0; i < inResponse.result.seasons.length; i++) {
            item = inResponse.result.seasons[i];
            item.id = parseInt(item.label.split(' ')[1], 10);
            
            if (!(item.id > 0)) {
                item.id = 0;
            }
            
            items.push(item);
        }
        
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
                fields: ["playcount"]
            }
        };
    },
    filterTvShowEpisodes: function(inResponse) {
        var items = [];
        var item;
        
        for (var i = 0; i < inResponse.result.episodes.length; i++) {
            item = inResponse.result.episodes[i];
            item.id = item.episodeid;
            items.push(item);
        }
        
        return {
            items: items
        }
    },
    
    // Music Videos
    
    // Music
    
    // Files
    
    // Remote
});
