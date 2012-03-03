enyo.kind({
    name: "Remote.TvShows",
    kind: "VFlexBox",
    events: {
        onPlay: "",
    },
    components: [
        {kind: "PageHeader", components: [
            {name: "headerText", kind: enyo.VFlexBox,
                content: "", flex: 1
            },
            {name: "backButton", kind: "Button", content: "Back",
                onclick: "goBack"
            }
        ]},
        {name: "pane", kind: "Pane", flex: 1, components: [
            {name: "shows", className: "enyo-bg", kind: "Remote.TvShowList",
                onSelect: "selectTvShow"
            },
            {name: "seasons", className: "enyo-bg", kind: "Remote.TvShowSeasons",
                onSelect: "selectSeason"
            },
            {name: "episodes", className: "enyo-bg", kind: "Remote.TvShowEpisodes",
                onSelect: "selectEpisode"
            },
        ]},
    ],
    
    update: function() {
        this.$.pane.view.update();
    },
    
    selectTvShow: function(inSender, inShow) {
        this.$.seasons.setTvShowId(inShow.id);
        this.$.episodes.setTvShowId(inShow.id);
        this.$.pane.selectViewByName("seasons").update();
    },
    selectSeason: function(inSender, inSeason) {
        this.$.episodes.setSeason(inSeason.id);
        this.$.pane.selectViewByName("episodes").update();
    },
    selectEpisode: function(inSender, inEpisode) {
        this.doPlay(inEpisode.id);
    },
    
    goBack: function(inSender, inEvent) {
        this.$.pane.back(inEvent);
    },
});
