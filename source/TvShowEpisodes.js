enyo.kind({
    name: "Remote.TvShowEpisodes",
    kind: "Remote.ListView",
    published: {
        tvShowId: null,
        season: null,
    },
    
    components: [
        {name: "items", kind: enyo.VirtualList, flex: 1, onSetupRow: "setupRow", components: [
            // Row Item
            {kind: "Item", layoutKind: enyo.HFlexLayout, height: "93px", pack: "center",
             style: "padding: 0", onclick: "selectItem", components: [
                // Screenshot, Ratings, Watched
                {layoutKind: enyo.VFlexLayout, width: "119px", height: "89px", pack: "center",
                 style: "margin-left: 5px; position: relative", components: [
                    {name: "screenshot", kind: enyo.Image, width: "auto", height: "auto",
                     style: "max-width: 100%; max-height: 100%;" 
                    },
                    {name: "watched", kind: enyo.Image, src: "images/check.png", width: "32px",
                     height: "32px", style: "position: absolute; bottom: 0; right: 0;"
                    },
                    {name: "rating", kind: enyo.Image, src: "images/5star.png", width: "62px",
                     height: "16px", style: "position: absolute; bottom: 0; left: 0;"
                    }
                ]},
                // Title, Plot
                {layoutKind: enyo.VFlexLayout, height: "100%", flex: 1, style: "padding: 5px;",
                 components: [
                    {layoutKind: enyo.HFlexLayout, style: "font-weight: bold", components: [
                        {name: "episode"},
                        {name: "title", style: "margin-left: 10px;"}
                    ]},
                    {name: "plot", height: "100%", style: "font-size: 12px; overflow: hidden;"}
                ]}
            ]}
        ]}
    ],
    
    setupRowItem: function(inIndex) {
        var rating = this.items[inIndex].rating / 10 * parseInt(this.$.rating.width);
        
        this.$.screenshot.setSrc(this.items[inIndex].screenshot);
        this.$.episode.setContent(this.items[inIndex].episode + ".");
        this.$.title.setContent(this.items[inIndex].title);
        this.$.plot.setContent(this.items[inIndex].plot);
        this.$.rating.applyStyle("clip", "rect(0, " + rating + "px, " + this.$.rating.height+ ", 0)");
        this.$.watched.setShowing(this.items[inIndex].played > 0);
        
        return true;
    },
    
    updateItems: function() {
        this.requestItems("getTvShowEpisodes", {
            tvShowId: this.tvShowId,
            season: this.season,
        });
    }
});
