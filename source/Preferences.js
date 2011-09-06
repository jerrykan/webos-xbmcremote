enyo.kind({
    name: "Remote.Preferences",
    kind: "ModalDialog",
    caption: "Preferences",
    events: {
        onSave: "",
        onCancel: "",
    },
    components: [
        // UI Elements
        {kind: "RowGroup", caption: "Host",components: [
            {name: "host", kind: "Input", hint: "Hostname or IP of XBMC device", value: ""}
        ]},
        {kind: "RowGroup", caption: "Port", components: [
            {name: "port", kind: "Input", hint: "Port", value: "8080"}
        ]},
        {layoutKind: "HFlexLayout", components: [
            {kind: "Button", caption: "Cancel", flex: 1,
                onclick: "cancelClick"
            },
            {kind: "Button", caption: "Save", flex: 1, className: "enyo-button-dark",
                onclick: "saveClick"
            }
        ]},
        
        {kind: "Popup", name: "failurePopup", components: [
            {style: "font-size: 1.1em; text-align: center; ", content: "Trouble Getting Feed"},
            {style: "font-size: 0.8em; text-align: justify", width: "320px", components: [
                {name: "failureText"}
            ]},
            {kind: enyo.Button, caption: "OK", onclick: "closeFailurePopup"}
        ]},
        
        // Services
        {name: "testService", kind: "Remote.XbmcJsonService",
            onSuccess: "testServiceSuccess",
            onFailure: "testServiceFailure"
        },
    ],
    
    showingChanged: function() {
        if (this.showing) {
            var settings = localStorage.getItem("XbmcHost");
            
            if (settings !== null) {
                var values = JSON.parse(settings);
                this.$.host.setValue(values.host);
                this.$.port.setValue(values.port);
            }
        }
    },
    
    testServiceSuccess: function(inSender, inResponse, inRequest) {
        localStorage.setItem("XbmcHost", JSON.stringify({
            host: this.$.host.value,
            port: this.$.port.value
        }));
        this.doSave()
        this.close();
    },
    testServiceFailure: function(inSender, inResponse, inRequest) {
        this.$.failurePopup.openAtCenter();
        this.$.failureText.setContent(
            "Either the host and/or port you entered is incorrect, or the XBMC"
            + " server is not on. Please check the host and port and try again."
        );
    },
    
    // Button handlers
    saveClick: function(inSender, inEvent) {
        var host = this.$.host.value;
        var port = this.$.port.value;
        
        this.$.testService.setConnection(host, port);
        
//        enyo.log("saveClick", host, port);
//        this.$.testService.setHost(host);
        this.$.testService.call({
            method: "JSONRPC.Ping"
        });
    },
    cancelClick: function(inSender, inEvent) {
        this.doCancel()
        this.close();
    },
    
    closeFailurePopup: function(inSender, inEvent) {
        this.$.failurePopup.close();
    }
})