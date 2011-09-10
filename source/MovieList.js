enyo.kind({
    name: "Remote.MovieList",
    kind: "Remote.ListView",
    
    create: function() {
        this.inherited(arguments);
        
        this.itemsField = "movies";
        this.itemId = "movieid";
    },
    
    updateItems: function() {
        this.requestItems("VideoLibrary.GetMovies", {
            fields: ["playcount"],
        });
    },
});
