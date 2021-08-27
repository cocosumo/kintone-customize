(function () {
  const EID_FIELD = '社員番号';
  const DATE_SUBMITTED_FIELD = '提出日';
  const APP_ID = 48;
  const PRE_CUM = 'cum';

  const events = [
    'app.record.edit.show',
    'app.record.detail.show',
    'app.record.create.show',
    'mobile.app.record.edit.show',
    'mobile.app.record.detail.show',
    'mobile.app.record.create.show',
  ];

  /*  Objective: Get the monthly cummulative total of each fields.
        Input Data:
            1. EID, found at the visible record
            2. The month when the record was made.

        Output:
            Cummulative Monthly Total next to each field.
        Shorthands:
            cum => cummulative.
            vals => values
            EID => Employee ID
        */

  kintone.events.on(events, async (event) => {
    const { record } = event;
    const EVENT_TYPE = event.type;
    const EID = record[EID_FIELD].value;
    const DATE_SUBMITTED = record[DATE_SUBMITTED_FIELD].value;
    const MONTH_RECORDS = (await getMonthRecords(EID, DATE_SUBMITTED)).records;
    const CUM_VALS = getTotalValues(MONTH_RECORDS);

    setSpaces(CUM_VALS, EVENT_TYPE.includes('mobile'));

    // console.log(kintone);
    return event;
  });

  function setSpaces(CUM_VALS, isMobile) {
    for (const [key, value] of Object.entries(CUM_VALS)) {
      let space;
      if (isMobile) {
        space = $(kintone.mobile.app.record.getSpaceElement(key));
      } else {
        space = $(kintone.app.record.getSpaceElement(key));
      }
      space.append(`<div class=container><div class='cummulative-number'>${value}</div></div>`);
      // console.log(`${key}: ${value}`);
    }
  }

  function getTotalValues(monthRecords) {
    const cumVals = {};
    for (const rec in monthRecords) {
      const record = monthRecords[rec];
      for (const field in record) {
        /* Extract fields with cum */
        if (field.includes(PRE_CUM)) {
          // console.log(field);
          cumVals[field] = cumVals[field] || 0; // if Nan set to 0
          cumVals[field] += +record[field].value;
        }
      }
    }
    return cumVals;
  }

  function getMonthRecords(id, dateSumitted) {
    const endOfMonth = moment(dateSumitted).clone().endOf('month').format('YYYY-MM-DD');
    const startOfMonth = moment(dateSumitted).clone().startOf('month').format('YYYY-MM-DD');

    const query = `${EID_FIELD} = ${id}
                        and ${DATE_SUBMITTED_FIELD} >= "${startOfMonth}"
                        and ${DATE_SUBMITTED_FIELD} <= "${endOfMonth}" `;
    // console.log(query);

    const paramGET = {
      app: APP_ID,
      query,
      // 'totalCount' : true
    };

    return kintone.api(kintone.api.url('/k/v1/records', true), 'GET', paramGET);
  }
}());
