enyo.kind({
    name: "Remote.MovieList",
    kind: "Remote.ListView",
    
    // Use the default updateItems()
    xbmcMethod: "getMovies",
});
