const appId = 66;
const settingsAppId = 82;

let userId;
let userStore;
let userRole;
let menuSpace;
let headerSpace;
let cloneRecords;
let calendarMenu;
let thisMonth;
let settings;

let remainingYasumi;
let maxYasumi;
const yasumi_times = {
  oneday: '一日',
  'half-am': '午前休み',
  'half-pm': '午後休み',
};

const yasumi_classes = {
  一日: 'oneday',
  午前休み: 'half-am',
  午後休み: 'half-pm',
};

const yasumi_vals = {
  一日: 1,
  午前休み: 0.5,
  午後休み: 0.5,
};

const vals = {
  oneday: 1,
  'half-am': 0.5,
  'half-pm': 0.5,
};

// console.log('yasumi-kanri');

(function () {
  moment.locale('ja');

  const events = ['app.record.index.show', 'mobile.app.record.index.show'];

  /*  var url = new URL(window.location);
    console.log(url.searchParams.get("comment")); */

  kintone.events.on(events, async (event) => {
    const eventType = event.type;
    const { viewId } = event;
    const user = await kintone.getLoginUser();
    // console.log(event);
    const userInfo = await getUserInfo(user.name);

    /* If userInfo is empty, stop script */
    if (!userInfo.length) return;

    const { records } = event;
    userId = userInfo.records[0].$id.value;
    userStore = userInfo.records[0]['ルックアップ＿店舗名'].value;
    userRole = userInfo.records[0]['役職'].value;
    settings = settings || (await getSettings()).records['0']['設定'].value;

    if (viewId == '8970') {
      let originalCalendar = $('.calendar-table-gaia');
      if (eventType.includes('mobile')) {
        // console.log('mobile version.');
        originalCalendar = $('.gaia-mobile-v2-app-index-calendar-table');
      }

      initializeDOM(eventType);
      addCustomElements(eventType);
      hideOriginal(originalCalendar);
      generateCalendar(originalCalendar.get(0), eventType);
      processEachDate(records);
      // addEvents(originalCalendar);
    }

    return event;
  });
}());

function putById(id, record_time) {
  // console.log(record_time, 'put', id);
  // console.log(id, 'testing', cell_class);
  if (!id) return false; // if id was not set on cell, prevent update.
  // console.log(id, 'processing', cell_class);

  const time_val = record_time == 'remove' ? '一日' : record_time;
  const status = record_time == 'remove' ? '無効' : '有効';

  const body = {
    app: appId,
    id,
    record: {
      タイム: {
        value: time_val,
      },
      状態: {
        value: status,
      },
    },
  };

  console.log(body);

  kintone.api(kintone.api.url('/k/v1/record', true), 'PUT', body, (resp) => {
    // calcRemainingYasumi();
    // console.log(resp);
  }, (error) => {
    // error
    console.log(error);
  });
}

function showError() {
  const default_msg = '上限に達しました。これ以上追加出来ません。<br>'
    + '※変更したい場合は先に登録済の休暇を変更するか削除してください。';
  Swal.fire({
    title: "Can't add anymore.",
    // text: default_msg,
    html: default_msg,
    icon: 'error',
    confirmButtonText: 'はい',
  });
}

function getClass(cell) {
  let result = '';
  if (cell.hasClass('oneday')) {
    result = 'oneday';
  } else if (cell.hasClass('half-am')) {
    result = 'half-am';
  } else if (cell.hasClass('half-pm')) {
    result = 'half-pm';
  }

  // console.log('found class ', result);
  return result;
}

function initializeDOM(eventType) {
  // console.log(eventType);
  /* Get calendarMenu */
  if (eventType.includes('mobile')) {
    calendarMenu = $(kintone.mobile.app.getHeaderSpaceElement());
  } else {
    calendarMenu = $('.calendar-menu-gaia');
  }
}

function getMaxYasumi(days) {
  let result;

  switch (days) {
    case 28:
      result = 5;
      break;
    case 30:
      result = 7;
      break;
    case 31:
      result = 8;
      break;
    default:
  }

  return result;
}

function getYasumiDaysFromSettings(settings, initialDate) {
  console.log(settings);
  const lookUpSettingName = `休み数_${moment(initialDate).format('YYYY')}`;
  const month = moment(initialDate).format('M');
  /* get yasumi settings from the same year  */

  for (const setting of settings) {
    console.warn(setting);
    const settingName = setting.value['設定名'].value;
    if (settingName == lookUpSettingName) {
      const settingValue = setting.value['設定値'].value;
      const monthsSettings = settingValue.split(',')[month - 1];
      const yasumiDays = monthsSettings.substring(monthsSettings.indexOf(':') + 1);
      console.log('yasumiDays', yasumiDays);
      return yasumiDays;
    }
  }

  return 0;
}

async function addCustomElements(eventType) {
  menuSpace = $(kintone.app.getHeaderMenuSpaceElement());
  if (menuSpace.children().length == 0) {
    menuSpace.append('<div class="bootstrap" id="calendar-self"></div>');
    menuSpace.children('#calendar-self').load(`https://dl.dropbox.com/s/ul5wsw9vw9n6gwq/calendar-self-menuspace.html?dl=0&pid${new Date().getTime()}`);
  }

  if (calendarMenu.children().length === 0 || !eventType.includes('mobile')) {
    calendarMenu.append('<span class="calendar-menu-button-gaia " title="休み">残りの休み : </span>');
    calendarMenu.append('<span id="remaining-yasumi-val" class="calendar-menu-button-gaia remaining-yasumi" title="休み">0</span>');
  }

  // headerSpace.children('#calendar-self-header').load('https://dl.dropbox.com/s/bdptxdt4ckdbzrv/calendar-self-header.html?dl=0' + new Date().getTime());
}

function hideOriginal(originalCalendar) {
  console.log(originalCalendar);
  originalCalendar.empty();
  originalCalendar.append('<div id="calendar"></div>');
}

function generateCalendar(el, eventType) {
  // let calendarEl = document.getElementById("calendar");

  thisMonth = $('.calendar-menu-inputmonth-gaia').find('input').val();
  if (eventType.includes('mobile')) {
    const year = $('.gaia-mobile-v2-app-index-calendar-monthselector-year-select').val();
    const month = $('.gaia-mobile-v2-app-index-calendar-monthselector-month-select').val();
    thisMonth = `${year}-${month.padStart(2, '0')}`;
  }

  console.log(thisMonth);

  const initialDate = `${thisMonth}-01`;
  const daysInMonth = moment(initialDate).daysInMonth();
  const endDate = moment(`${thisMonth}-${daysInMonth}`).add(1, 'days').format('YYYY-MM-DD');

  // console.log(endDate.format('YYYY-MM-DD'));

  const calendar = new FullCalendar.Calendar(el, {
    validRange: {
      start: initialDate,
      end: endDate,
    },
    initialView: 'dayGridMonth',
    fixedWeekCount: false,
    locale: 'ja',
    dayMaxEventRows: true,
    height: 'auto',
    initialDate,
    dateClick: (info) => processClick(cloneRecords[info.dateStr], info.dayEl),
    // datesSet: (info) => processEachDate(info),
  });

  calendar.render();

  const settings_yasumiDays = getYasumiDaysFromSettings(settings, initialDate);
  console.log(settings_yasumiDays, getMaxYasumi(daysInMonth));
  maxYasumi = +(+settings_yasumiDays <= 0 ? getMaxYasumi(daysInMonth) : settings_yasumiDays) + +(userRole === 'サポート' ? 1 : 0); // autoCalculate

  remainingYasumi = maxYasumi;
}

function setRemainingYasumi(num) {
  /* Function to render remaining yasumi to screen */
  console.log(remainingYasumi, maxYasumi);
  $('#remaining-yasumi-val').text(num);
  $('#remaining-yasumi-val').animate({
    fontSize: '20px',
  }, 200);
  $('#remaining-yasumi-val').animate({
    fontSize: '16px',
  }, 200);
}

/* OH UTILITIES */

async function processEachDate(records) {
  cloneRecords = JSON.parse(JSON.stringify(records)); // clone orignal records to local obj

  $('.fc-daygrid-day').each(async (i, el) => {
    const cellDate = $(el).attr('data-date');
    if (cloneRecords[cellDate]) {
      // console.log(cellDate, $(el), false);
      // processDate(cloneRecords[cellDate], $(el), false)
      loadDateToCalendar(cloneRecords[cellDate], $(el));
    }
  });

  // calcRemainingYasumi();
  setRemainingYasumi(remainingYasumi);
}

async function loadDateToCalendar(unrendered_record, cell) {
  const record_id = unrendered_record[0].$id.value;
  $(cell).attr('record-id', record_id); // save to the cell for east reference

  let record_time;
  if (unrendered_record[0]['状態'].value == '有効') {
    record_time = unrendered_record[0]['タイム'].value;
    calcRemainingYasumi(cell);
  } else {
    record_time = 'remove';
  }

  setClass($(cell), record_time);
}

async function processClick(cloned_record, clicked_cell) {
  // processing click.
  // console.log('processing click');
  let initialVal = '一日';

  /* If record doesn't exist in records */
  /* Create a new record */
  if (!cloned_record) {
    // console.log('remaining', remainingYasumi);

    if (remainingYasumi >= 0.5) {
      if (remainingYasumi == 0.5) {
        initialVal = '午前休み';
      }

      setClass($(clicked_cell), initialVal); // render to calendar
      if ($(clicked_cell).attr('disabled') != 'disabled') { // Check if cell is disabled.
        $(clicked_cell).attr('disabled', true); // Prevent multiple inserts by disabling the cell
        const selectedDate = $(clicked_cell).attr('data-date'); // get date of the clicked cell
        const create_result = await addDate(selectedDate, initialVal); // insert selected date to DB. This doesn't return the record details.
        const { id } = create_result; // So get id of newly created record
        const new_record = await getRecordById(id, selectedDate); // then  get the details by ID
        cloneRecords[selectedDate] = [new_record.record]; // Insert new record to local object variable containing the records

        $(clicked_cell).attr('record-id', id);
        $(clicked_cell).removeAttr('disabled'); 'Remove disabled attribute';
      }
    } else {
      showError();
    }
  } else {
    /* if record already exist */
    /* processs the click to switch to another state */

    const record_id = $(clicked_cell).attr('record-id');
    const record_time = processClickedDate(cloned_record);
    setClass($(clicked_cell), record_time);
    putById(record_id, record_time);
  }

  calcRemainingYasumi(clicked_cell);
  setRemainingYasumi(remainingYasumi);
}

function calcRemainingYasumi(clicked_cell) {
  // console.log(cloneRecords);
  let total = 0;
  for (const [key, value] of Object.entries(cloneRecords)) {
    if (moment(key).format('YYYY-MM') == thisMonth) {
      if (value[0]['状態'].value == '有効') {
        total += yasumi_vals[value[0]['タイム'].value];
      }
    }
  }
  // console.log('total yasumi ', total);
  remainingYasumi = maxYasumi - total;

  if (remainingYasumi < 0) {
    // console.log('This is blasphemy! You clicked to fast.');
    // console.log(cloneRecords);
    // console.log($(clicked_cell).attr('data-date'));
    if (clicked_cell) {
      cloneRecords[$(clicked_cell).attr('data-date')][0]['状態'].value = '無効'; // update local copy

      setClass($(clicked_cell), 'remove'); // render cell
      putById($(clicked_cell).attr('record-id'), 'remove'); // update database

      remainingYasumi = calcRemainingYasumi(clicked_cell);/*  */
    }
  }

  return remainingYasumi;
}

/* Returns  time value of the cell (一日、午前休み、午後休み) */
function processClickedDate(clicked_record) {
  const yasumi_time = clicked_record[0];
  // console.log(yasumi_time);
  /* yasumi_time is an object */
  let result = 'remove';

  if (yasumi_time['状態'].value == '無効') {
    yasumi_time['状態'].value = '有効';
    let initial = '一日';
    if (remainingYasumi == 0.5) {
      initial = '午前休み';
    } else if (remainingYasumi == 0) {
      showError('もう休みがありません。');
      yasumi_time['状態'].value = '無効';
    }
    yasumi_time['タイム'].value = initial;
  } else {
    switch (yasumi_time['タイム'].value) {
      case '一日':
        yasumi_time['タイム'].value = '午前休み';
        break;
      case '午前休み':
        yasumi_time['タイム'].value = '午後休み';
        break;
      case '午後休み':

        // yasumi_time['タイム'].value = '一日';
        yasumi_time['状態'].value = '無効';
        break;
    }
  }
  result = yasumi_time['状態'].value == '有効' ? yasumi_time['タイム'].value : 'remove';
  return result;
}

function setClass(el, type) {
  // console.log(el);
  el.removeClass('cell-yasumi oneday half-am half-pm');

  /* Check remaining yasumi if enough for one day */
  /* If not, go directly to  */

  switch (type) {
    case '一日':
      // console.log(type);
      el.addClass('cell-yasumi oneday');
      break;
    case '午前休み':
      // console.log(type);
      el.addClass('cell-yasumi half-am');
      break;
    case '午後休み':
      // console.log(type);
      el.addClass('cell-yasumi half-pm');
      break;
    case 'remove':
      /* do nothing */
      el.attr('initial', '');
      break;
  }
}

async function addDate(selectedDate, yasumi_time) {
  console.log(`adding date : ${selectedDate} ${userId} ${userStore}`);

  const body = {
    app: appId,
    record: {
      休み日: {
        value: selectedDate,
      },
      店舗: {
        value: userStore,
      },
      社員番号: {
        value: userId,
      },
      状態: {
        value: '有効',
      },
      タイム: {
        value: yasumi_time,
      },
    },
  };
  return await kintone.api(
    kintone.api.url('/k/v1/record.json', true),
    'POST',
    body,
  );
}

function getUserInfo(userName) {
  const body = {
    app: 34,
    query: `文字列＿氏名 = "${userName}" limit 1`,
  };

  return kintone.api(
    kintone.api.url('/k/v1/records', true),
    'GET',
    body,
  );
}

async function getRecord(selectedDate) {
  const body = {
    app: appId,
    query: `休み日 = "${selectedDate}" limit 1`,
    fields: ['$id', 'ルックアップ＿店舗名'],
  };
  const resp = await kintone.api(
    kintone.api.url('/k/v1/records', true),
    'GET',
    body,
  );

  return resp;
}

async function getSettings() {
  const body = {
    app: settingsAppId,
    query: `コード = "${appId}" limit 1`,
  };
  const resp = await kintone.api(
    kintone.api.url('/k/v1/records', true),
    'GET',
    body,
  );

  return resp;
}

async function getRecordById(id, selectedDate) {
  const body = {
    app: appId,
    id,
  };

  // console.log(body);
  const resp = await kintone.api(
    kintone.api.url('/k/v1/record', true),
    'GET',
    body,
  );

  return resp;
}

async function deleteDate(id) {
  console.log('Deleting Date ');

  const body = {
    app: appId,
    ids: [id],
  };

  kintone.api(
    kintone.api.url('/k/v1/records', true),
    'DELETE',
    body,
    (resp) => {
      // success
      // console.log("deleted.." + id);
    },
    (error) => {
      // error
      console.log(error);
    },
  );
}
