enyo.kind({
    name: "Remote.MusicSongs",
    kind: "Remote.ListView",
    
    published: {
        albumId: null,
        artistId: null,
    },
    
    create: function() {
        this.inherited(arguments);
        
        this.itemsField = "songs";
        this.itemId = "songid";
    },
    
    updateItems: function() {
        this.requestItems("AudioLibrary.GetSongs", {
            albumid: this.albumId,
            artistid: this.artistId,
            fields: ['title', 'artist', 'genre'],
        });
    },
});