enyo.kind({
    name: "Remote.Music",
    kind: "VFlexBox",
    events: {
        onPlay: "",
    },
    components: [
        {name: "pane", kind: "Pane", flex: 1, components: [
            {name: "music", content: "Music"},
            /*
            {name: "music", className: "enyo-bg", kind: "Remote.MusicList",
                onSelect: "select??"
            },
            */
        ]},
    ],

    /*
    select???: function(inSender, inTvShowId) {
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
