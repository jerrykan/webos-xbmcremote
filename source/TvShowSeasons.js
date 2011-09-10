enyo.kind({
    name: "Remote.TvShowSeasons",
    kind: "Remote.ListView",
    published: {
        tvShowId: null,
    },
    
    create: function() {
        this.inherited(arguments);
        
        this.itemsField = "seasons";
    },
    
    updateItems: function() {
        this.requestItems("VideoLibrary.GetSeasons", {
            tvshowid: this.tvShowId,
            fields: ["playcount"],
        });
    },
    
    selectItem: function(inSender, inEvent) {
        var itemId = parseInt(this.items[inEvent.rowIndex].label.split(' ')[1], 10);
        this.doSelect(itemId);
    },
});
