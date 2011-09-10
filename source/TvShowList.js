enyo.kind({
    name: "Remote.TvShowList",
    kind: "Remote.ListView",
    
    create: function() {
        this.inherited(arguments);
        
        this.itemsField = "tvshows";
        this.itemId = "tvshowid";
    },
    
    updateItems: function() {
        this.requestItems("VideoLibrary.GetTVShows", {
            fields: ["playcount"],
        });
    },
});
