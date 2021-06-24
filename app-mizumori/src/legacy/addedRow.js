(function () {
    "use strict";
    // レコード詳細画面
    const fields = [
        '内訳'
    ];

    let events = [
        //"app.record.edit.show",
        //"app.record.create.show",
    ];

    fields.forEach((field) => {
        events.push("app.record.edit.change." + field);
        events.push("app.record.create.change." + field);
    });

    kintone.events.on(events, function (event) {
        const eventType = event.type;
        console.log(eventType);
        _calculateAll(event);
       
        return event;
    });
})();

