enyo.kind({
    name: "Remote.TvShowEpisodes",
    kind: "Remote.ListView",
    published: {
        tvShowId: null,
        season: null,
    },
    
    create: function() {
        this.inherited(arguments);
        
        this.itemsField = "episodes";
        this.itemId = "episodeid";
    },
    
    updateItems: function() {
        this.requestItems("VideoLibrary.GetEpisodes", {
            tvshowid: this.tvShowId,
            season: this.season,
            fields: ["playcount"],
        });
    },
});
