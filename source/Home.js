enyo.kind({
    name: "Remote.Home",
    kind: enyo.VFlexBox,
    components: [
        {kind: enyo.SlidingPane, flex: 1, components: [
            
            {name: "menu", kind: enyo.SlidingView, width: "280px", components: [
                {kind: enyo.Header, components: [
                    {content: "Menu"},
                ]},
                {kind: enyo.Item, _view: "movies", layoutKind: enyo.HFlexLayout, align: "middle", onclick: "changeView", components: [
                    {kind: enyo.Image, src: "images/movies.png"},
                    {width: "20px"},
                    {content: "Movies"},
                ]},
                {kind: enyo.Item, _view: "tvShows", layoutKind: enyo.HFlexLayout, onclick: "changeView", components: [
                    {kind: enyo.Image, src: "images/tvshows.png"},
                    {width: "20px"},
                    {content: "TV Shows"},
                ]},
                {kind: enyo.Item, _view: "musicVideos", layoutKind: enyo.HFlexLayout, onclick: "changeView", components: [
                    {kind: enyo.Image, src: "images/music_videos.png"},
                    {width: "20px"},
                    {content: "Music Videos"},
                ]},
                {kind: enyo.Item, _view: "music", layoutKind: enyo.HFlexLayout, onclick: "changeView", components: [
                    {kind: enyo.Image, src: "images/music.png"},
                    {width: "20px"},
                    {content: "Music"},
                ]},
                {kind: enyo.Item, _view: "files", layoutKind: enyo.HFlexLayout, onclick: "changeView", components: [
                    {kind: enyo.Image, src: "images/files.png"},
                    {width: "20px"},
                    {content: "Files"},
                ]},
                {kind:enyo.VFlexBox, flex: 1},
                {kind: enyo.Item, _view: "remote", layoutKind: enyo.HFlexLayout, onclick: "changeView", components: [
                    {kind: enyo.Image, src: "images/remote.png"},
                    {width: "20px"},
                    {content: "Remote"},
                ]},
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
        {kind: "Remote.Preferences", name: "preferences"},
        
        // XBMC Service
        {name: "xbmcService", kind: "Remote.XbmcJsonService",
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
    
    xbmcEventHandler: function(inSender, inEvent) {
        data = inEvent.data;
        
        this.$.xbmcService.call({
            method: data.method,
            params: data.params
        }, {
            onSuccess: data.onSuccess || this.$.xbmcService.onSuccess,
            onFailure: data.onFailure || this.$.xbmcService.onFailure,
        });
        
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
