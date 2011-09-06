enyo.kind({
    name: "Remote.MusicVideos",
    kind: "VFlexBox",
    events: {
        onPlay: "",
    },
    components: [
        {name: "pane", kind: "Pane", flex: 1, components: [
            {name: "musicVideos", content: "MusicVideos"},
            /*
            {name: "musicVideos", className: "enyo-bg", kind: "Remote.MusicVideos",
                onSelect: "selectMusicVideo"
            },
            */
        ]},
    ],

    /*
    selectMusicVideo: function(inSender, inTvShowId) {
        // TODO
    },
    */
    
    updateData: function() {
        
    }
    
    /*
    goBack: function(inSender, inEvent) {
        this.$.pane.back(inEvent);
    },
    */

});
