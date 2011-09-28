enyo.kind({
    name: "Remote.TvShowSeasons",
    kind: "Remote.ListView",
    published: {
        tvShowId: null,
    },
    
    updateItems: function() {
        this.requestItems("getTvShowSeasons", {
            tvShowId: this.tvShowId,
        });
    },
});
