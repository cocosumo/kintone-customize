(function () {
  "use strict";
  // レコード詳細画面
  const fields = [
    "原価",
    "税率",
    "数量",
    "税率",
    "内訳税率",
    "内訳利益率",
    "数量",
    "税",
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

    _calculateAll(event);

    return event;
  });
})();

function _calculateAll(event) {
  let record = event.record;
  let table = record.内訳.value;
  let table_categories = record.大項目別.value;
  let taxRate = parseFloat(record.税率.value);

  let total_basePrice = table.reduce((acc, curr) => {
    let base = parseFloat(curr.value.原価.value) || 0;
    let amount = parseFloat(curr.value.数量.value) || 0;
    //console.log(base + ' hello ' + amount );
    return acc + (base <= 0 ? base : base * amount);
  }, 0);

  let total_noTax = table.reduce((acc, curr) => {
    let base = parseFloat(curr.value.原価.value) || 0;
    let profitRate = parseFloat(curr.value.内訳利益率.value) || 0;
    let amount = parseFloat(curr.value.数量.value) || 0;

    //console.log(perUnit + ' tanka ' + amount );
    return acc + (base <= 0 ? base : amount * base * (1 + profitRate / 100));
  }, 0);

  /* Calculate total_withTax and generate category table values */
  /* I could have done it on a separate loop for readability, but it's more efficient to just include it here */
  let categorySubTotal = {};
  let total_withTax = table.reduce((acc, curr) => {
    let tax = curr.value.税.value == "課税";
    let base = parseFloat(curr.value.原価.value) || 0;
    let isNegative = base < 0;
    let profitRate = parseFloat(curr.value.内訳利益率.value) || 0;
    let amount = parseFloat(curr.value.数量.value) || 0;
    let noTax = amount * base * (1 + profitRate / 100);
    let withTax = round(noTax * (1 + (tax ? taxRate / 100 : 0)));

    /* Group the categories */
    let category = curr.value.大項目.value;

    if (categorySubTotal[category]) {
      categorySubTotal[category] += isNegative ? base : withTax;
    } else {
      categorySubTotal[category] = isNegative ? base : withTax;
    }

    return acc + (isNegative ? base : withTax);
  }, 0);

  let gross_profit = total_noTax - total_basePrice;
  let gross_profit_rate = (gross_profit / total_noTax) * 100;
  let taxes = total_withTax - total_noTax;

  fillCategoryTable(table_categories, categorySubTotal);
  console.log(record);

  record.原価合計.value = round(total_basePrice);
  record.消費税.value = round(taxes);
  record.税抜金額.value = round(total_noTax);
  record.税込金額.value = round(total_withTax);
  record.粗利.value = round(gross_profit);
  record.粗利率.value = round(gross_profit_rate);
  //kintone.app.record.set(kintone_fields);
}

function round(num) {
  var m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
}

function fillCategoryTable(table, vals) {
  //console.log(table);

  let row_clone_main = JSON.parse(JSON.stringify(table[0]));

  table.splice(0);
  Object.entries(vals).forEach((entry) => {
    const [key, value] = entry;
    let row_clone = JSON.parse(JSON.stringify(row_clone_main));
    row_clone.value["大項目別名"].value = key;
    row_clone.value["大項目別小計"].value = value;
    table.push(row_clone);
    //console.log(key, value);
  });
}