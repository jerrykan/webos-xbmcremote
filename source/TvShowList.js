enyo.kind({
    name: "Remote.TvShowList",
    kind: "Remote.ListView",
    
    // Use the default updateItems()
    xbmcMethod: "getTvShows",
});
