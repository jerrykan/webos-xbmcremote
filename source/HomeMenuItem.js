enyo.kind({
    name: "Remote.HomeMenuItem",
    kind: enyo.Item,
    layoutKind: enyo.HFlexLayout,
    align: "middle",
    height: "70px",
    style: "padding: 0; position: relative;",
    
    published: {
        title: "",
        iconSrc: "",
    },
    
    components: [
        {name: "icon", kind: enyo.Image},
        {name: "title",
         style: "position: absolute; font-size: 26px; font-weight: bold; left: 74px; top: 22px;"
        }
    ],
    
    create: function() {
        this.inherited(arguments);
        this.titleChanged();
        this.iconSrcChanged();
    },
    titleChanged: function() {
        this.$.title.setContent(this.title);
    },
    iconSrcChanged: function() {
        this.$.icon.setSrc(this.iconSrc);
    }
});

