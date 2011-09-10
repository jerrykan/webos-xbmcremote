enyo.kind({
    name: "Remote.MusicAlbums",
    kind: "Remote.ListView",
    
    published: {
        artistId: null,
    },
    
    create: function() {
        this.inherited(arguments);
        
        this.itemsField = "albums";
        this.itemId = "albumid";
    },
    
    updateItems: function() {
        this.requestItems("AudioLibrary.GetAlbums", {
            artistid: this.artistId,
            fields: ['title', 'artist', 'genre'],
        });
    },
});