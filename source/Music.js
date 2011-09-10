enyo.kind({
    name: "Remote.Music",
    kind: enyo.VFlexBox,
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
            // Static selection
            {kind: enyo.VFlexBox, components: [
                {kind: "Item", layoutKind: enyo.HFlexLayout, pack: "center",
                        onclick: "selectByAlbum", components: [
                    {content: "Albums"},
                ]},
                {kind: "Item", layoutKind: enyo.HFlexLayout, pack: "center",
                        onclick: "selectByArtist", components: [
                    {content: "Artists"},
                ]},
                {kind: "Item", layoutKind: enyo.HFlexLayout, pack: "center",
                        onclick: "selectBySong", components: [
                    {content: "Songs"},
                ]},
            ]},

            // List views
            {name: "albums", className: "enyo-bg", kind: "Remote.MusicAlbums",
                onSelect: "selectAlbum"
            },
            {name: "artists", className: "enyo-bg", kind: "Remote.MusicArtists",
                onSelect: "selectArtist"
            },
            {name: "songs", className: "enyo-bg", kind: "Remote.MusicSongs",
                onSelect: "selectSong"
            },
        ]},
    ],

    update: function() {
        if (this.$.pane.view.updateItems) {
            this.$.pane.view.updateItems();
        }
    },
    
    selectByAlbum: function() {
        this.$.albums.setArtistId(null);
        this.$.pane.selectViewByName("albums").updateItems();
    },
    
    selectByArtist: function() {
        this.$.pane.selectViewByName("artists").updateItems();
    },
    
    selectBySong: function() {
        this.$.songs.setAlbumId(null);
        this.$.songs.setArtistId(null);
        this.$.pane.selectViewByName("songs").updateItems();
    },
    
    selectArtist: function(inSender, inArtistId) {
        this.$.albums.setArtistId(inArtistId);
        this.$.pane.selectViewByName("albums").updateItems();
    },

    selectAlbum: function(inSender, inAlbumId) {
        this.$.songs.setAlbumId(inAlbumId);
        this.$.pane.selectViewByName("songs").updateItems();
    },

    goBack: function(inSender, inEvent) {
        this.$.pane.back(inEvent);
    },
});
