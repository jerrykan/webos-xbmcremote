enyo.kind({
    name: "Remote.TvShows",
    kind: "VFlexBox",
    events: {
        onPlay: "",
    },
    components: [
        {name: "pane", kind: "Pane", flex: 1, components: [
            {name: "shows", className: "enyo-bg", kind: "Remote.TvShowList",
                onSelect: "selectTvShow"
            },
            {name: "seasons", className: "enyo-bg", kind: "Remote.TvShowSeasons",
                onSelect: "selectSeason", onBack: "goBack"
            },
            {name: "episodes", className: "enyo-bg", kind: "Remote.TvShowEpisodes",
                onSelect: "selectEpisode", onBack: "goBack"
            },
        ]},
    ],
    
    updateData: function() {
        this.$.pane.view.updateData();
    },
    
    selectTvShow: function(inSender, inTvShowId) {
        this.$.seasons.setTvShowId(inTvShowId);
        this.$.episodes.setTvShowId(inTvShowId);
        this.$.pane.selectViewByName("seasons").updateData();
    },
    selectSeason: function(inSender, inSeason) {
        this.$.episodes.setSeason(inSeason);
        this.$.pane.selectViewByName("episodes").updateData();
    },
    selectEpisode: function(inSender, inTvShowEpisodeId) {
        this.doPlay(inTvShowEpisodeId);
    },

    goBack: function(inSender, inEvent) {
        this.$.pane.back(inEvent);
    },

});
