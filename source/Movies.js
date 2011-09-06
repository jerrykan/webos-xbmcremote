enyo.kind({
    name: "Remote.Movies",
    kind: "VFlexBox",
    events: {
        onPlay: "",
    },
    components: [
        {name: "pane", kind: "Pane", flex: 1, components: [
            {name: "movies", className: "enyo-bg", kind: "Remote.MovieList",
                onSelect: "selectMovie"
            },
        ]},
    ],

    updateData: function() {
        this.$.pane.view.updateData();
    },
    
    selectMovie: function(inSender, inMovieId) {
        this.doPlay(inMovieId);
    },
    
    /*
    goBack: function(inSender, inEvent) {
        this.$.pane.back(inEvent);
    },
    */

});
