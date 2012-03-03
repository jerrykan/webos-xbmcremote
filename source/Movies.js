enyo.kind({
    name: "Remote.Movies",
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
            {name: "movies", className: "enyo-bg", kind: "Remote.MovieList",
                onSelect: "selectMovie"
            },
        ]},
    ],

    update: function() {
        this.$.pane.view.update();
    },
    
    selectMovie: function(inSender, inMovie) {
        this.doPlay(inMovie.id);
    },
});
