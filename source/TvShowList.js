enyo.kind({
    name: "Remote.TvShowList",
    kind: "VFlexBox",
    events: {
        onSelect: ""
    },
    components: [
        {name: "tvShows", kind: "VirtualList", flex: 1, onSetupRow: "setupRow", components: [
            {kind: "Item", layoutKind: "HFlexLayout", pack: "center",
                onclick: "selectTvShow", components: [
                {name: "title"},
                {kind: "Image", name: "banner"},
            ]},
        ]},
        
        // Services
        {name: "getTvShows", kind: "Remote.XbmcJsonService",
            onSuccess: "gotTvShows",
            onFailure: "gotTvShowsFailure"
        },
    ],

    create: function() {
        this.tvShows = []
        this.inherited(arguments);
    },
    
    setupRow: function(inSender, inIndex) {
        if ( inIndex >= 0 && this.tvShows.length > 0 && inIndex < this.tvShows.length ) {
            this.$.title.setContent(this.tvShows[inIndex].label);
            return true
        }
    },
    
    updateData: function() {
        this.$.getTvShows.loadConnection();
        
        this.$.getTvShows.call({
            method: "VideoLibrary.GetTVShows",
            params: {
                fields: ["playcount"],
            }
        });
    },
    
    gotTvShows: function(inSender, inResponse, inRequest) {
        this.tvShows = inResponse.result.tvshows;
        this.$.tvShows.refresh();
    },
    gotTvShowsFailure: function(inSender, inResponse, inRequest) {
        enyo.log("Failed:", this.kind);
        enyo.log("inResponse:", inResponse);
        enyo.log("inRequest:", inRequest);
    },
    
    selectTvShow: function(inSender, inEvent) {
        var tvShowId = this.tvShows[inEvent.rowIndex].tvshowid
        this.doSelect(tvShowId);
    }
});
