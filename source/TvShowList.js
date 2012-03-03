enyo.kind({
    name: "Remote.TvShowList",
    kind: "Remote.ListView",
    // Use the default updateItems()
    xbmcMethod: "getTvShows",
    
    components: [
        {name: "items", kind: enyo.VirtualList, flex: 1, onSetupRow: "setupRow", components: [
            // Row contents
            {kind: "Item", layoutKind: enyo.HFlexLayout, height: "93px", pack: "center",
             align: "center", style: "padding: 0;", onclick: "selectItem", components: [
                // Container for the title, banner, and tick
                {width: "484px", height: "89px", style: "position: relative;", components: [
                    // Title - hidden behind the banner image
                    {name: "title", width: "100%",
                     style: "position: absolute; font-size: 21px; top: 34px; text-align: center; z-index: -1;"
                    },
                    // Banner Image
                    {name: "banner", kind: enyo.Image, width: "100%", height: "100%",
                     onerror: "errorImage"
                    },
                    // Watched Tick
                    {name: "watched", kind: enyo.Image, src: "images/check.png", width: "40px",
                     height: "40px", style: "position: absolute; bottom: 0; right: 0; z-index: 99"
                    }
                ]}
            ]}
        ]}
    ],
    
    create: function() {
        this.inherited(arguments);
    },
    setupRowItem: function(inIndex) {
        this.$.title.setContent(this.items[inIndex].title);
        this.$.watched.setShowing(this.items[inIndex].played > 0);
        
        // Hide the banner if there is no image URL to use (the "hidden" title
        // text will show through instead)
        if (this.items[inIndex].banner !== "") {
            this.$.banner.setSrc(this.items[inIndex].banner);
        } else {
            this.$.banner.hide();
        }
        
        return true;
    }
});
