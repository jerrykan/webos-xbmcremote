enyo.kind({
    name: "Remote.Home",
    kind: enyo.VFlexBox,
    components: [
        {kind: enyo.SlidingPane, flex: 1, components: [
            
            {name: "menu", kind: enyo.SlidingView, width: "280px", components: [
                {kind: enyo.Header, components: [
                    {content: "Menu"},
                ]},
                {kind: "Remote.HomeMenuItem", title: "Movies", iconSrc: "images/movies.png",
                 _view: "movies", onclick: "changeView"
                },
                {kind: "Remote.HomeMenuItem", title: "TV Shows", iconSrc: "images/tv_shows.png",
                 _view: "tvShows", onclick: "changeView"
                },
                {kind: "Remote.HomeMenuItem", title: "Music Videos", iconSrc: "images/music_videos.png",
                 _view: "musicVideos", onclick: "changeView"
                },
                {kind: "Remote.HomeMenuItem", title: "Music", iconSrc: "images/music.png",
                 _view: "music", onclick: "changeView"
                },
                {kind: "Remote.HomeMenuItem", title: "Files", iconSrc: "images/files.png",
                 _view: "files", onclick: "changeView"
                },
                {kind:enyo.VFlexBox, flex: 1},
                {kind: "Remote.HomeMenuItem", title: "Remote", iconSrc: "images/remote.png",
                 _view: "remote", onclick: "changeView"
                },
                {kind: enyo.Toolbar, pack: "justify", components: [
                    {flex: 1},
                ]},
            ]},
          
            {name: "main", kind: enyo.SlidingView, peekWidth: 75, components: [
                {name: "pane", kind: enyo.Pane, flex: 1, components: [
                    {content: "SPLASH SCREEN"},
                    {name: "movies", kind: "Remote.Movies",
                        onPlay: "playMovie"
                    },
                    {name: "tvShows", kind: "Remote.TvShows",
                        onPlay: "playTvShowEpisode"
                    },
                    {name: "musicVideos", kind: "Remote.MusicVideos",
                        onPlay: "playTvShowEpisode"
                    },
                    {name: "music", kind: "Remote.Music",
                        onPlay: "playTvShowEpisode"
                    },
                    {name: "files", kind: "Remote.Files",
                        onPlay: "playTvShowEpisode"
                    },
                    {name: "remote", kind: "Remote.Remote"},
                ]},
          
                {kind: enyo.Toolbar, pack: "justify", components: [
                    {kind: enyo.GrabButton},
                    {flex: 1},
                ]},
            ]},
        ]},
        
        // Other stuff
        {kind: "AppMenu",
            components: [
                {caption: "Preferences", onclick: "showPreferences"},
            ]
        },
        {kind: "Remote.Preferences", name: "preferences",
            onSave: "reloadSettings"
        },
        
        // XBMC Service
        {name: "xbmcService", kind: "Remote.XbmcLibraryService",
            onSuccess: "xbmcServiceSuccess",
            onFailure: "xbmcServiceFailure",
        },

    ],

    create: function() {
        this.inherited(arguments);
        this.$.xbmcService.loadConnection();
        
        // Listen for global events (for the xbmcService)
        enyo.dispatcher.rootHandler.addListener(this)
    },
    
    xbmcRequestEventHandler: function(inSender, inEvent) {
        this.$.xbmcService.doRequest(inEvent.data);
    },
    
    xbmcServiceSuccess: function(inSender, inResponse, inRequest) {
        enyo.log("Hurrah!");
    },
    xbmcServiceFailure: function(inSender, inResponse, inRequest) {
        enyo.log("Oh Dear!");
    },
    
    showPreferences: function() {
        this.$.preferences.openAtCenter();
        console.log("showPreferences");
    },
    reloadSettings: function() {
        this.$.xbmcService.loadConnection();
        // reset the views
    },
    
    changeView: function(inSender, inEvent) {
        this.$.pane.selectViewByName(inSender._view).update();
    },
    
    playTvShowEpisode: function(inSender, inTvShowEpisodeId) {
        this.$.xbmcService.call({
            method: "XBMC.Play",
            params: {
                episodeid: inTvShowEpisodeId,
            },
        });
        enyo.log("playTvShowEpisode", arguments);
    },
    playMovie: function(inSender, inMovieId) {
        enyo.log("playMovie", arguments);
    },
});
