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
        "工事種別",
        "レコード番号"
    ];

    var fields = ['お客様名', '工事名称', '工事種別', '工事種別名', '利益率', '税率', '税込金額', '税抜金額',];

    kintone.events.on('app.record.print.show', function (event) {
        if (!CUSTOM) return true;

        let record = event.record;

        console.log(record);
        hide_fields.forEach(field => {
            kintone.app.record.setFieldShown(field, false);
        });

        let table = kintone.app.record.getFieldElement("内訳");

        //alert('kintone, give me the data. 笑');
        return event;

    })

    $(document).on('mouseover', '#print-button-gaia', (el) => {
        let el_table = kintone.app.record.getFieldElement("内訳");
        let el_customer = kintone.app.record.getFieldElement("お客様名");

        $('.el_customer').addClass('.el_customer-')
        console.log(el_customer);
        let rows = $(el_table).find('tbody tr');
        $.each(rows, (index, row) => {
            let col_amount = $(row).find('td:last');
            let raw_amount = col_amount.text();
            let amount = raw_amount.match(/-?\d+/g).join('');

            if (amount < 0) {
                let el = col_amount.find('span');
                el.css({ 'color': 'red' });
                console.log(el);
            }

            console.log(amount);
            console.log($(row));
        });

        /* Customer Field */
        let customer_name = $(el_customer).text();
        if (!customer_name.includes('様')) $(el_customer).find('span').text(customer_name + ' 様');
    });

})();

