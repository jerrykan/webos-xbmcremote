enyo.kind({
    name: "Remote.Files",
    kind: "VFlexBox",
    events: {
        onPlay: "",
    },
    components: [
        {name: "pane", kind: "Pane", flex: 1, components: [
            {name: "files", content: "Files"},
            /*
            {name: "files", className: "enyo-bg", kind: "Remote.FileList",
                onSelect: "select??"
            },
            */
        ]},
    ],

    /*
    selectFile: function(inSender, inFileId) {
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
