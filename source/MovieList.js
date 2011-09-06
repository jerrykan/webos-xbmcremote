enyo.kind({
    name: "Remote.MovieList",
    kind: "VFlexBox",
    events: {
        onSelect: ""
    },
    components: [
        {name: "movies", kind: "VirtualList", flex: 1, onSetupRow: "setupRow", components: [
            {kind: "Item", layoutKind: "HFlexLayout", pack: "center",
                onclick: "selectMovie", components: [
                {name: "title"},
                {kind: "Image", name: "banner"},
            ]},
        ]},
        
        // Services
        {name: "getMovies", kind: "Remote.XbmcJsonService",
            onSuccess: "gotMovies",
            onFailure: "gotMoviesFailure"
        },
    ],

    create: function() {
        this.movies = []
        this.inherited(arguments);
    },
    
    setupRow: function(inSender, inIndex) {
        if ( inIndex >= 0 && this.movies.length > 0 && inIndex < this.movies.length ) {
            this.$.title.setContent(this.movies[inIndex].label);
            return true
        }
    },
    
    updateData: function() {
        this.$.getMovies.loadConnection();
        
        this.$.getMovies.call({
            method: "VideoLibrary.GetMovies",
            params: {
                fields: ["playcount"],
            }
        });
    },
    
    gotMovies: function(inSender, inResponse, inRequest) {
        this.movies = inResponse.result.movies;
        this.$.movies.refresh();
    },
    gotMoviesFailure: function(inSender, inResponse, inRequest) {
        enyo.log("Failed:", this.kind);
        enyo.log("inResponse:", inResponse);
        enyo.log("inRequest:", inRequest);
    },
    
    selectMovie: function(inSender, inEvent) {
        var movieId = this.movies[inEvent.rowIndex].movieid
        this.doSelect(movieId);
    }
});
