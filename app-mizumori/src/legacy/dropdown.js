let inputVal = '';

(async function() {
  'use strict';
  console.log('Initializing...');
  const AMOUNT_INDEX = 7;

  let mainCategory;
  let subCategory;
  let materials;
  let mainTable;

  const DISABLED = ['原価合計', '粗利', '粗利率', '税抜金額', '税込金額', '消費税'];
  const TEXT_INPUT = ['大項目', '中項目', '部材名'];
  const DEFAULTS = {
    中項目: '',
    単位: '式',
    原価: '',
    大項目: '',
    数量: 1,
    税: '課税',
    部材名: '',
    原価: 0,
    内訳利益率: 0,
  };

  const events = [
    'app.record.create.show',
    'app.record.edit.show',
    'mobile.app.record.create.show',
    'mobile.app.record.edit.show',
  ];

  /*  var url = new URL(window.location);
       console.log(url.searchParams.get("comment")); */

  kintone.events.on(events, async function(event) {
    const record = event.record;

    mainCategory = getMainCategory();
    subCategory = getSubCategory();
    materials = getMaterials();

    const eventType = event['type'];
    console.log(eventType);
    mainTable = $('.subtable-5522507');

    /* Disable fields */
    DISABLED.forEach((field) => (record[field]['disabled'] = true));

    /* Initialization */
    renderFormatedTable(mainTable);
    const el = kintone.app.record.getSpaceElement('sama');
    $(el).append('<span class="sama">様</span>');

    /* Add Guides */
    const el_info = kintone.app.record.getSpaceElement('Information');
    // $(el_info).load('https://dl.dropbox.com/s/xnnfsvg7rv8sihv/key_guides.html?dl=0');
    setToolTips();

    /* AddEvent */
    $(mainTable).on('focusin', 'input', (event) => {
      const el = $(event.target);
      const el_col_index = el.closest('td').index();
      el.select();
      inspectInput(el, el_col_index);
    });

    $(mainTable).on('change', 'input', async (event) => {
      const el = $(event.target);
      const el_col_index = el.closest('td').index();
      const el_row_index = el.closest('tr').index();
      const kintone_get = kintone.app.record.get();
      console.log('changed!');
      if (el_col_index <= 2) {
        const main_category = el
            .closest('tr')
            .children('td:first')
            .find('input');
        const sub_category = el
            .closest('tr')
            .children('td:nth-child(2)')
            .find('input');

        resetKintoneFields(kintone_get, el);
        _calculateAll(kintone_get);
        kintone.app.record.set(kintone_get);

        if (el_col_index == 1) {
          const main = await getMainBySub(el.val());
          console.log('changed 1', main);
          main_category.val(main);
        } /* else if (el_col_index == 2) {
                    let sub = await getSubByMat(el.val());
                    let main = await getMainBySub(sub);

                    console.log('changed 2', main, sub);
                    main_category.val(main);
                    sub_category.val(sub);
                } */
      } else if (el_col_index == 3) {
        console.log('原価changed!');
        setVisibilityBasedOnGenka(el.closest('tr'));
      }
    });

    $(mainTable).on('keydown', 'input, .gaia-argoui-select', (e) => {
      const el = $(e.target);
      const el_col_index = el.closest('td').index();
      console.log(e.which);


      if (e.ctrlKey && e.which == 40) {
        addRow(e.target, !e.shiftKey);
      } else if (e.shiftKey) {
        /* If shift key is pressed */
        const col_index = el.closest('td').index();
        // let row_index = el.closest('tr').index();
        if (e.which == 40) {
          console.log('Shift down');
          el.closest('tr')
              .next()
              .children()
              .eq(col_index)
              .find('input')
              .focus();
        } else if (e.which == 38) {
          console.log('Shift up');
          el.closest('tr')
              .prev()
              .children()
              .eq(col_index)
              .find('input')
              .focus();
        } else if (e.which == 39) {
          console.log('Shift right');
          el.closest('td')
              .next()
              .find('input, .gaia-argoui-select')
              .focus();
        } else if (e.which == 37) {
          console.log('Shift left');
          el.closest('td')
              .prev()
              .find('input, .gaia-argoui-select')
              .focus();
        } else if (e.which == 36) {
          console.log('Shift Home');
          el.closest('tr')
              .children()
              .eq(0)
              .find('input, .gaia-argoui-select')
              .focus();
        } else if (e.ctrlKey && e.which == 109) {
          /* Ctrl + Shift +  -*/
          console.log('delete row');
          deleteRow(el);
        }

        // $(e.target).scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
      }

      /* Let user input his own text */
      if (el_col_index <= 1) {
        inputVal = '';
        el.attr('placeholder', '');
      }
    });

    $(mainTable).on('mouseover', 'input', (event) => {
      const el = $(event.target);
      const el_col_index = el.closest('td').index();

      if (el_col_index <= 1) {
        inputVal = el.val();
        el.attr('placeholder', inputVal);
        el.val('');
      }
    });

    $(mainTable).on('mouseout', 'input', (event) => {
      const el = $(event.target);
      const el_col_index = el.closest('td').index();

      if (el_col_index <= 1) {
        if (inputVal) el.val(inputVal);
        inputVal = '';
        el.attr('placeholder', '');
      }
    });

    $(mainTable).on('dblclick', 'input', (event) => {
      const el = $(event.target);
      const el_col_index = el.closest('td').index();

      if (el_col_index <= 1) {
        if (inputVal) el.val(inputVal);
        inputVal = '';
        el.focus();
        el.attr('placeholder', '');
      }
    });

    return event;
  });

  /* Utility Function */
  function setToolTips() {
    const el = kintone.app.record.getSpaceElement('tableTooltip');
    $(el).append('<div class="tooltip" id="table-tooltip"><i class="fas fa-question-circle"></i></div>');

    console.log(el);
    tippy($('#table-tooltip').children('i:first').get(0), {
      maxWidth: 350,
      animation: 'scale',
      content: '<div class=\'tooltip-title\'>【ショートカットキー】</div>' +
                '<table class=\'tooltip-content\'><tbody>' +
                '<tr><td>行追加 </td><td>ctrl + ↓　</td></tr>' +
                '<tr><td>行コピー追加 </td><td>ctrl + shift + ↓　</td></tr>' +
                '<tr><td>セル移動 </td><td>shift + 方向キー</td></tr>' +
                '<tr><td>先頭セルへ移動 </td><td>shift + home　</td></tr>' +
                '</tbody></table>',
      allowHTML: true,
      followCursor: true,

    });
  }


  function renderFormatedTable(mainTable) {
    console.log(mainTable);
    mainTable.find('tbody tr').each((i, row) => {
      setVisibilityBasedOnGenka($(row));
    });
  }

  function addRow(el, isEmpty) {
    const row = $(el).closest('tr');
    const row_index = row.index();

    console.log(row_index);
    console.log('Pressed control key.');
    const kintone_get = kintone.app.record.get();
    const table = kintone_get.record.内訳.value;

    const row_clone = JSON.parse(JSON.stringify(table[row_index]));
    const row_copy = isEmpty ?
            setRowDefaults(kintone_get, row_clone) :
            table[row_index];

    table.splice(row_index + 1, 0, row_copy);
    // table.push(row_copy);
    if (!isEmpty) _calculateAll(kintone_get);
    kintone.app.record.set(kintone_get);
    renderFormatedTable($(el.closest('table')));

    // setVisibilityBasedOnGenka(row.next());
  }

  function deleteRow(el) {
    const row = $(el).closest('tr');
    const row_index = row.index();

    const kintone_get = kintone.app.record.get();
    const table = kintone_get.record.内訳.value;

    // let row_copy = table[row_index];

    table.splice(row_index, 1);

    _calculateAll(kintone_get);
    kintone.app.record.set(kintone_get);
    renderFormatedTable($(el.closest('table')));
  }

  function setRowDefaults(kintone_get, kintone_row) {
    console.log(kintone_get.record.利益率.value);
    const default_profit = kintone_get.record.利益率.value;
    console.log('profit! ' + DEFAULTS['利益率']);
    DEFAULTS['内訳利益率'] = default_profit;

    Object.entries(DEFAULTS).forEach((entry) => {
      const [key, value] = entry;
      kintone_row.value[key].value = value;
      console.log(key, value);
    });

    console.log(kintone_row);
    return kintone_row;
  }


  function setVisibilityBasedOnGenka(el) {
    const base_field = el.children('td:nth-child(4)').find('input');
    const base_price = base_field.val();
    const isNegative = base_price < 0;

    el.toggleClass('negative-row', isNegative);
    base_field.toggleClass('negative-input', isNegative);

    el.children('td')
        .slice(4, 9)
        .children('div')
        .css({'visibility': isNegative ? 'hidden' : 'visible'});
  }

  async function fillFields(event, el) {
    const material_text = el.val();
    const row_index = el.closest('tr').index();
    const details = await getMaterialDetails(material_text);

    const record = event.record;
    const table = record.内訳.value;
    const row = table[row_index].value;

    row.原価.value = details ? details[2] : '';
    row.単位.value = details ? details[3] : '式';
    row.内訳利益率.value = record.利益率.value;
    row.数量.value = 1;
    row.税.value = ['課税'];
    // let getMaterialDetails()
  }

  function resetKintoneFields(event, el) {
    const col = el.closest('td').index();
    const row = el.closest('tr').index();
    const record = event.record;
    const table = record.内訳.value;
    const table_row = table[row].value;

    console.log(table_row);
    Object.entries(table_row).forEach(([key, value], index) => {
      if (TEXT_INPUT.indexOf(key) > col) {
        table_row[key].value = '';
      } else {
        switch (
          key
        // todo
        ) {
        }
      }
      // console.log(`${key} ${value}`);
    });
  }

  /* JQuery Reset */
  function resetFields(el, col_index) {
    const all_cols = el.closest('tr').children('td');
    const cols = all_cols.slice(col_index + 1);
    console.log(cols);

    $.each(cols, function(i, item) {
      // console.log(item);
      const input = $(item).find('input');

      // console.log(input);
      if (!input.is(':disabled')) {
        if (input.length == 1) {
          input.val('');
        }
      } else {
        input.val(0);
      }

      if ($(item).index() == AMOUNT_INDEX) {
        input.val(1);
      }
    });
  }

  async function inspectInput(el, col_index) {
    const main_category = el
        .closest('tr')
        .children('td:first')
        .find('input');
    const sub_category = el
        .closest('tr')
        .children('td:nth-child(2)')
        .find('input');

    switch (col_index) {
      case 0:
        addDataList(el, await mainCategory);
        break;
      case 1:

        addDataList(el, await getSubCategoryByMain(main_category.val()));
        break;
      case 2:

        addDataList(el, await getMaterialBySub(sub_category.val()));
        // console.log(sub_category);
        break;
    }
  }

  function addDataList(el, list) {
    // console.log(list);
    const input_parent = el.parent();
    const el_datalist_id = el.attr('id') + '-data';
    let datalist = input_parent.children('datalist:first');

    if (!input_parent.children().find('datalist').length) {
      /* Add attr to input text */
      // el.attr('type','search');
      el.attr('list', el_datalist_id);
      // if (el.closest("td").index() <= 1) el.addClass("preventEdit");
      el.attr('autocomplete', 'off');
      input_parent.append('<datalist id="' + el_datalist_id + '"></datalist>');

      datalist = input_parent.children('datalist:first');
    } else {
      console.log('Already have datalist');
    }
    datalist.empty();
    $.each(list, function(i, item) {
      datalist.append($('<option>').attr('value', item).text(item));
    });
  }

  /* MODEL */
  async function getMainCategory() {
    const fieldName = '大項目名';
    const body = {
      app: 67,
      fields: fieldName,
    };
    const resp = await kintone.api(
        kintone.api.url('/k/v1/records', true),
        'GET',
        body,
    );

    const result = resp['records'].map((el) => el[fieldName]['value']);

    return result;
  }

  async function getSubCategory() {
    const field_main = '大項目名';
    const field_sub = '中項目名';
    const body = {
      app: 68,
      fields: [field_sub, field_main],
    };
    const resp = await kintone.api(
        kintone.api.url('/k/v1/records', true),
        'GET',
        body,
    );

    const result = resp['records'].map((el) => {
      return [el[field_main]['value'], el[field_sub]['value']];
    });

    return result;
  }

  async function getMaterials() {
    const field_main = '大項目名';
    const field_sub = '中項目名';
    const field_material = '部材名';
    const field_price = '原価';
    const field_unit = '単位';
    const body = {
      app: 69,
      fields: [field_sub, field_main, field_material, field_price, field_unit],
    };
    const resp = await kintone.api(
        kintone.api.url('/k/v1/records', true),
        'GET',
        body,
    );

    const result = resp['records'].map((el) => {
      return [
        el[field_sub]['value'],
        el[field_material]['value'],
        el[field_price]['value'],
        el[field_unit]['value'],
      ];
      // el[field_sub]['value'], el[field_main]['value']
    });
    console.log('Gettting Materials');
    return result;
  }

  /* Data Logic */

  async function getMaterialDetails(material_text) {
    const mats = await materials;
    const result = mats.find((item) => {
      return item[1] == material_text;
    });

    return result;
  }

  async function getMaterialBySub(sub) {
    const mats = await materials;
    let result = mats;
    console.log('gettings mats!' + sub);
    // console.log(mats);
    if (sub) {
      result = mats
          .filter((m) => {
            if (m[0] == sub) return m[1];
          });
    }

    result = result.map((mat) => mat[1]);
    // console.log(result);
    return result;
  }

  async function getSubCategoryByMain(main) {
    const sub = await subCategory;
    console.log('gettings subs!' + main);
    // console.log(sub);
    let result = sub;

    if (main) {
      result = sub
          .filter((m) => {
            if (m[0] == main) return m[1];
          });
    }

    result = result.map((sub) => sub[1]);

    return result;
  }

  async function getMainBySub(sub_text) {
    const sub = await subCategory;
    let result;
    // console.log(sub);
    for (let i = 0; i < sub.length; i++) {
      if (sub_text == sub[i][1]) {
        result = sub[i][0];
        console.log(sub_text, sub[i][0]);
        break;
      }
    }
    return result;
  }
})();
