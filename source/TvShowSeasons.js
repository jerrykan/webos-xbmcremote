enyo.kind({
    name: "Remote.TvShowSeasons",
    kind: "VFlexBox",
    events: {
        onSelect: "",
        onBack: "",
    },
    published: {
        tvShowId: "",
    },
    components: [
        /* TO FIX */
        {kind: "PageHeader", components: [
            {name: "headerText", kind: enyo.VFlexBox,
                content: "Seasons", flex: 1
            },
            {name: "backButton", kind: "Button", content: "Back",
                onclick: "doBack"
            }
        ]},
        /* END TO FIX */
        
        {name: "seasons", kind: "VirtualList", flex: 1, onSetupRow: "setupRow", components: [
            {kind: "Item", layoutKind: "HFlexLayout", pack: "center",
                onclick: "selectSeason", components: [
                {name: "title"},
            ]},
        ]},
        
        // Services
        {name: "getSeasons", kind: "Remote.XbmcJsonService",
            onSuccess: "gotSeasons",
            onFailure: "gotSeasonsFailure",
        },
    ],

    create: function() {
        this.seasons = []
        this.inherited(arguments);
    },
    
    setupRow: function(inSender, inIndex) {
        if ( inIndex >= 0 && this.seasons.length > 0 && inIndex < this.seasons.length ) {
            this.$.title.setContent(this.seasons[inIndex].label);
            return true
        }
    },
    
    updateData: function() {
        this.$.getSeasons.loadConnection();
        
        this.$.getSeasons.call({
            method: "VideoLibrary.GetSeasons",
            params: {
                tvshowid: this.tvShowId,
                fields: ["playcount"],
            }
        });
    },
    
    gotSeasons: function(inSender, inResponse, inRequest) {
        this.seasons = inResponse.result.seasons;
        this.$.seasons.refresh();
    },
    gotSeasonsFailure: function(inSender, inResponse, inRequest) {
        enyo.log("Failed:", this.kind);
        enyo.log("inResponse:", inResponse);
        enyo.log("inRequest:", inRequest);
    },
    
    selectSeason: function(inSender, inEvent) {
        var season = parseInt(this.seasons[inEvent.rowIndex].label.split(' ')[1], 10);
        this.doSelect(season);
    }
});
