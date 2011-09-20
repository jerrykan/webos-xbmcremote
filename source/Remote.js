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
        this.actionRequest("Player.GetActivePlayers", "updateRemote")
        //this.$.pane.view.updateItems();
    },
    updateRemote: function(inSender, inReponse, inRequest) {
        if (inReponse.result.audio === true ) {
            this.activePlayer = 'Audio';
        } else if (inReponse.result.picture === true ) {
            this.activePlayer = 'Picture';
        } else if (inReponse.result.video === true ) {
            this.activePlayer = 'Video';
        } else {
            this.activePlayer = null;
        }
    },
    
    actionRequest: function(method, onSuccess) {
        window.enyo.dispatch({
            type: "xbmcEvent",
            data: {
                method: method,
                onSuccess: enyo.bind(this, onSuccess),
            }
        });
    },
    
    actionPerform: function(action) {
        if (this.activePlayer) {
            this.actionRequest(this.activePlayer + 'Player.' + action);
        }
    },
    actionSkipPrevious: function() {
        this.actionPerform('SkipPrevious');
    },
    actionRewind: function() {
        this.actionPerform('Rewind');
    },
    actionPlayPause: function() {
        this.actionPerform('PlayPause');
    },
    actionStop: function() {
        this.actionPerform('Stop');
    },
    actionForward: function() {
        this.actionPerform('Forward');
    },
    actionSkipNext: function() {
        this.actionPerform('SkipNext');
    },
});
