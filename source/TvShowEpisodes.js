enyo.kind({
    name: "Remote.TvShowEpisodes",
    kind: "VFlexBox",
    events: {
        onSelect: "",
        onBack: "",
    },
    published: {
        tvShowId: "",
        season: "",
    },
    components: [
        /* TO FIX */
        {kind: "PageHeader", components: [
            {name: "headerText", kind: enyo.VFlexBox,
                content: "Episodes", flex: 1
            },
            {name: "backButton", kind: "Button", content: "Back",
                onclick: "doBack"
            }
        ]},
        /* END TO FIX */
        
        {name: "episodes", kind: "VirtualList", flex: 1, onSetupRow: "setupRow", components: [
            {kind: "Item", layoutKind: "HFlexLayout", pack: "center",
                onclick: "selectEpisode", components: [
                {name: "title"},
            ]},
        ]},
        
        // Services
        {name: "getEpisodes", kind: "Remote.XbmcJsonService",
            onSuccess: "gotEpisodes",
            onFailure: "gotEpisodesFailure",
        },
    ],

    create: function() {
        this.episodes = []
        this.inherited(arguments);
    },
    
    setupRow: function(inSender, inIndex) {
        if ( inIndex >= 0 && this.episodes.length > 0 && inIndex < this.episodes.length ) {
            this.$.title.setContent(this.episodes[inIndex].label);
            return true
        }
    },
    
    updateData: function() {
        this.$.getEpisodes.loadConnection();
        
        this.$.getEpisodes.call({
            method: "VideoLibrary.GetEpisodes",
            params: {
                tvshowid: this.tvShowId,
                season: this.season,
                fields: ["playcount"],
            }
        });
    },
    
    gotEpisodes: function(inSender, inResponse, inRequest) {
        this.episodes = inResponse.result.episodes;
        this.$.episodes.refresh();
    },
    gotEpisodesFailure: function(inSender, inResponse, inRequest) {
        enyo.log("Failed:", this.kind);
        enyo.log("inResponse:", inResponse);
        enyo.log("inRequest:", inRequest);
    },
    
    selectEpisode: function(inSender, inEvent) {
        var episodeId = this.episodes[inEvent.rowIndex].episodeid;
        this.doSelect(episodeId);
    }
});
