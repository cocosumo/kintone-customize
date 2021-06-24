(function () {
    "use strict";
    const CUSTOM = true;
    const hide_fields = [
        "利益率",
        "内訳利益率",
        "原価",
        "原価合計",
        "粗利",
        "粗利率",
    ];

    kintone.events.on(['app.record.detail.show','mobile.app.record.detail.show'], function (event) {
        if (!CUSTOM) return true;
        console.log(event.type);

        let el = kintone.app.record.getSpaceElement('sama');
        $(el).append('<span class="sama">様</span>');

        
        return event;

    })

})();

