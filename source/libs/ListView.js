enyo.kind({
    name: "Remote.ListView",
    kind: "VFlexBox",
    events: {
        onSelect: ""
    },
    components: [
        {name: "items", kind: "VirtualList", flex: 1, onSetupRow: "setupRow", components: [
            {kind: "Item", layoutKind: "HFlexLayout", pack: "center",
                onclick: "selectItem", components: [
                {name: "title"},
            ]},
        ]},
    ],

    create: function() {
        this.inherited(arguments);
        this.items = []
    },
    
    setupRow: function(inSender, inIndex) {
        if ( inIndex >= 0 && this.items.length > 0 && inIndex < this.items.length ) {
            return this.setupRowItem(inIndex);
        }
    },
    
    setupRowItem: function(inIndex) {
        this.$.title.setContent(this.items[inIndex].label);
        return true
    },
    
    requestItems: function(method, params) {
        window.enyo.dispatch({
            type: "xbmcRequestEvent",
            data: {
                method: method,
                params: params,
                onSuccess: enyo.bind(this, "gotItemsSuccess"),
            }
        });
    },
    
    updateItems: function() {
        if (typeof this.xbmcMethod === "string") {
            this.requestItems(this.xbmcMethod);
        }
    },
    
    gotItemsSuccess: function(inSender, inResponse, inRequest) {
        this.items = inResponse.items;
        this.$.items.refresh();
    },
    gotItemsFailure: function(inSender, inResponse, inRequest) {
        enyo.log("Failed:", this.kind);
        enyo.log("inResponse:", inResponse);
        enyo.log("inRequest:", inRequest);
    },
    
    selectItem: function(inSender, inEvent) {
        var itemId = this.items[inEvent.rowIndex].id
        this.doSelect(itemId);
    },
});
