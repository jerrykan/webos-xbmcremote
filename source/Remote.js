enyo.kind({
    name: "Remote.Remote",
    kind: enyo.VFlexBox,
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
        /*
            {name: "info", kind: "Remote.RemoteInfo"},
            {name: "playlist", kind: "Remote.RemotePlaylist"},
            {name: "controls", kind: "Remote.RemoteControls"},
         */
        ]},
        {layoutKind: enyo.HFlexLayout, components: [
            {kind: enyo.Button, flex:1, caption: "SkipPrevious", onclick: "actionSkipPrevious"},
            {kind: enyo.Button, flex:1, caption: "Rewind", onclick: "actionRewind"},
            {kind: enyo.Button, flex:1, caption: "PlayPause", onclick: "actionPlayPause"},
            {kind: enyo.Button, flex:1, caption: "Stop", onclick: "actionStop"},
            {kind: enyo.Button, flex:1, caption: "Forward", onclick: "actionForward"},
            {kind: enyo.Button, flex:1, caption: "SkipNext", onclick: "actionSkipNext"},
        ]},
    ],
    
    update: function() {
        //this.actionRequest("Player.GetActivePlayers", "updateRemote")
        //this.$.pane.view.updateItems();
    },
    
    actionPerform: function(method) {
        window.enyo.dispatch({
            type: "xbmcRequestEvent",
            data: {
                method: method
            }
        });
    },
    actionSkipPrevious: function() {
        this.actionPerform('doSkipPrevious');
    },
    actionRewind: function() {
        this.actionPerform('doRewind');
    },
    actionPlayPause: function() {
        this.actionPerform('doPlayPause');
    },
    actionStop: function() {
        this.actionPerform('doStop');
    },
    actionForward: function() {
        this.actionPerform('doForward');
    },
    actionSkipNext: function() {
        this.actionPerform('doSkipNext');
    },
});
