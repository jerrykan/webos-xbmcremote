enyo.kind({
    name: "Remote.XbmcJsonService",
    kind: enyo.WebService,
    requestKind: "Remote.XbmcJsonService.Request",
    method: "POST",
    
    call: function(inParams, inProps) {
        // convert the body of the request to a string if an object has
        // been passed in
        if (typeof inParams === "object") {
            // Set the default values for the request
            var jsonrpc = {
                jsonrpc: "2.0",
                id: 1,
            }
            
            // Merge the values passed in the the defauls
            for (var attr in inParams) {
                jsonrpc[attr] = inParams[attr];
            }
            
            // Convert the merged values to a string to do the actual call
            //params = enyo.json.stringify(jsonrpc);
            arguments[0] = enyo.json.stringify(jsonrpc);
        }
        
        // FIX: might be a better way than overwritting arguments[0]
        this.inherited(arguments);
    },
    
    dispatchResponse: function(inDelegate, inRequest) {
        // Catch if a function has been passed instead of a string
        if (typeof inDelegate === "function") {
            inDelegate(this, inRequest.response, inRequest);
            return
        }
        
        this.inherited(arguments)
    },
    responseSuccess: function(inRequest) {
        // Check if a "filter" function has been provided to prep the response
        if (typeof inRequest.filterSuccess === "function") {
            inRequest.responseOriginal = inRequest.response;
            inRequest.response = inRequest.filterSuccess(inRequest.response);
        }
        
        this.inherited(arguments);
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
    kind: enyo.WebService.Request,
    
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