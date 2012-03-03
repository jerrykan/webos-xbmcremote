enyo.kind({
    name: "Remote.TvShows",
    kind: "VFlexBox",
    events: {
        onPlay: "",
    },
    components: [
        {kind: "PageHeader", height: "70px", components: [
            {kind: enyo.VFlexBox, flex: 1, components: [
                {name: "showText", content: "TV Shows"},
                {name: "seasonText", content: "", style: "font-size: 0.7em;"},
            ]},
            {name: "backButton", kind: "Button", content: "Back", onclick: "goBack"}
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
        this.$.backButton.setShowing(this.$.pane.getViewIndex() != 0);
        this.$.pane.view.update();
    },
    
    selectTvShow: function(inSender, inShow) {
        this.$.seasons.setTvShowId(inShow.id);
        this.$.episodes.setTvShowId(inShow.id);
        this.$.pane.selectViewByName("seasons").update();
        this.$.showText.setContent(inShow.label);
        this.$.backButton.setShowing(true);
    },
    selectSeason: function(inSender, inSeason) {
        this.$.episodes.setSeason(inSeason.id);
        this.$.pane.selectViewByName("episodes").update();
        this.$.seasonText.setContent(inSeason.label);
    },
    selectEpisode: function(inSender, inEpisode) {
        this.doPlay(inEpisode.id);
    },
    
    goBack: function(inSender, inEvent) {
        this.$.pane.back(inEvent);

        var view = this.$.pane.getViewName();
        if ( view == "seasons" ) {
            this.$.seasonText.setContent("");
        } else if ( view == "shows" ) {
            this.$.showText.setContent("TV Shows");
            this.$.backButton.setShowing(false);
        }
    }
});
