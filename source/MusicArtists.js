enyo.kind({
    name: "Remote.MusicArtists",
    kind: "Remote.ListView",
    
    create: function() {
        this.inherited(arguments);
        
        this.itemsField = "artists";
        this.itemId = "artistid";
    },
    
    updateItems: function() {
        this.requestItems("AudioLibrary.GetArtists", {
            fields: ['title', 'artist', 'genre'],
        });
    },
});