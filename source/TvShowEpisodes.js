enyo.kind({
    name: "Remote.TvShowEpisodes",
    kind: "Remote.ListView",
    published: {
        tvShowId: null,
        season: null,
    },
    
    updateItems: function() {
        this.requestItems("getTvShowEpisodes", {
            tvShowId: this.tvShowId,
            season: this.season,
        });
    },
});
