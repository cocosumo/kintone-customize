(() => {
  const CHOICE = '繝峨Ο繝��繝繧ｦ繝ｳ�ｿ雉��ｼ'; // field code of radio button
  const FIELD_A = '譁�ｭ怜��ｿ雉��ｼ蜷�'; // field code of the field to be restricted

  const events = ['app.record.create.show',
    'app.record.edit.show',
    `app.record.create.change.${CHOICE}`,
    `app.record.edit.change.${CHOICE}`,
    'mobile.app.record.create.show',
    'mobile.app.record.edit.show',
    `mobile.app.record.create.change.${CHOICE}`,
    `mobile.app.record.edit.change.${CHOICE}`,
  ];

  /*  var url = new URL(window.location);
  console.log(url.searchParams.get("comment")); */

  kintone.events.on(events, (event) => {
    console.log(event.record);
    const { record } = event;
    const toggleVal = record[CHOICE].value;

    record[FIELD_A].value = toggleVal;

    console.log(record[FIELD_A].value);
    if (toggleVal === '縺昴�莉�') {
      record[FIELD_A].value = '';
      record[FIELD_A].disabled = false;
    } else {
      record[FIELD_A].disabled = true;
    }

    return event;
  });
})();
