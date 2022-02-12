define([
    "dojo/_base/declare",
    "esri/widgets/Search"
], function (
    declare,
    Search
) {
    return declare(null, {
        constructor: function (view) {
            var search = new Search({
                view: view
            });
            view.ui.add(search, "top-right");
        }
    });
});