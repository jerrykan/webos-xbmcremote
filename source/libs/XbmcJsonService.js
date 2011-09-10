enyo.kind({
    name: "Remote.XbmcJsonService",
    kind: "WebService",
    requestKind: "Remote.XbmcJsonService.Request",
    method: "POST",
    
    create: function() {
        this.inherited(arguments);
    },
    
    call: function() {
        // convert the body of the request to a string if an object has
        // been passed in
        if ( arguments.length > 0 && typeof(arguments[0]) === "object" ) {
            // Set the default values for the request
            var jsonrpc = {
                jsonrpc: "2.0",
                id: 1,
            }
            
            // Merge the values passed in the the defauls
            for ( var attr in arguments[0] ) {
                jsonrpc[attr] = arguments[0][attr];
            }
            
            // Convert the merged values to a string to do the actual call
            arguments[0] = enyo.json.stringify(jsonrpc);
        }
        
        this.inherited(arguments);
    },
    
    dispatchResponse: function(inDelegate, inRequest) {
        // Catch if a function has been passed instead of a string
        if (typeof inDelegate === "function") {
            inDelegate(this, inRequest.response, inRequest);
            return
        }
        
        // Can this be replace by calling the base class dispatchResponse()?
        this.dispatch(this.owner, inDelegate, [inRequest.response, inRequest]);
    },

    setConnection: function(host, port) {
        this.url = 'http://' + host + ':' + port + '/jsonrpc';
    },
    
    loadConnection: function() {
        var settings = localStorage.getItem("XbmcHost");
        
        if (settings !== null) {
            var values = JSON.parse(settings);
            this.setConnection(values.host, values.port);
        }
    }
});

enyo.kind({
    name: "Remote.XbmcJsonService.Request",
    kind: "WebService.Request",
    
    create: function() {
        this.inherited(arguments);
    },
    
    isSuccess: function(inStatus) {
        if ( !this.inherited(arguments) ) {
            return false;
        }
        
        if ( this.response === "" ) {
            return false;
        }
        
        if ( typeof(this.response.error) !== "undefined" ) {
            console.log(this.kind, this.response.error);
            return false;
        }
        
        return true;
    },
});