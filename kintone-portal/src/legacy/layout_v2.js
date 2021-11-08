"use strict";
moment.locale("ja");

(() => {
  console.log("Portal Script loaded");
  $("head").append('<link rel="shortcut icon" href="#">');

  kintone.events.on(["portal.show", "mobile.portal.show"], async (event) => {
    const currentSite = window.location.href;
    console.log(window.location.href);
    const props = currentSite.includes("9kn7ykxqe9eb")
      ? {
        /* Staging */
        site: "https://9kn7ykxqe9eb.cybozu.com/k/",
        appID: 16,
      }
      : {
        /* Production */
        site: "https://rdmuhwtt6gx7.cybozu.com/k/",
        appID: 40,
        appSettingsID: 82,
        appSettingsRecordID: 2,
      };

    const cardClass = {
      全員: "all",
      ここすも: "cocosumo",
      ゆめてつ: "yumetetsu",
      すてくら: "sutekura",
      メイン: "main",
    };

    let portalSpace =
      kintone.portal.getContentSpaceElement() ||
      kintone.mobile.portal.getContentSpaceElement();

    let oshiraseRecords = getOshiraseRecords();
    let appSettings = readSettings();

    loadRootComponent(portalSpace);

    function loadRootComponent(portalSpace) {
      $(portalSpace).load(
        "https://dl.dropbox.com/s/kwfpqsf5iubpx0i/layout.html?dl=0",
        async (response) => {
          fillRootComponent(await oshiraseRecords);
          applyStyles(await appSettings);
          addAnimation();
        }
      );
    }

    function addAnimation() {
      $(".inner.card").css({ top: "10px", opacity: "0" });

      let delay = 0;
      /* Inner Cards */
      $(".inner.card").each(function () {
        //^^ do for every instance less than the 16th (starting at 0)
        $(this).delay(delay).animate(
          {
            top: 0,
            opacity: 1,
          },250,
          "linear"
        );
        delay += 250;
      });

      /* Main Cards */
      $(".card.main").animate({
        opacity: 1
      }, delay, "linear");
    }

    function applyStyles(appSettings) {
      let settings = appSettings["record"]["設定"]["value"];

      settings.forEach((item) => {
        let { 設定名, 設定値 } = JSON.parse(JSON.stringify(item.value));

        /* Resolve Class Name */
        let cardClassName = cardClass[設定名.value];

        if (cardClassName) {
          /* Make the object immutable */
          const styles = JSON.parse(
            JSON.stringify(
              Object.fromEntries(
                設定値.value.split(";").map((item) => {
                  return item.split(":").map((keyValue) => keyValue.trim());
                })
              )
            )
          );
          if (cardClassName === "main") {
            $(`.card.${cardClassName} .outer.custom-card-header`).css({
              "background-color": styles["background-color"],
              color: styles["color"],
            });
          } else {
            $(`.card.${cardClassName} .inner.custom-card-header`).css({
              "background-color": styles["background-color"],
              color: styles["color"],
            });
          }
        }
      });

      $('.card.main').css("opacity", 0.25);
    }

    function getOshiraseRecords() {
      let body = {
        app: props.appID,
        query:
          '(状態 in ("公開") ) and (ラジオ＿投稿期間 in ("いいえ") or (日時＿開始 <= NOW() and 日時＿終了 >= NOW()))  order by 日時＿開始',
      };
      let resp = kintone.api(
        kintone.api.url("/k/v1/records", true),
        "GET",
        body
      );
      return resp;
    }

    function readSettings() {
      let body = {
        app: props.appSettingsID,
        id: props.appSettingsRecordID,
      };

      let resp = kintone.api(
        kintone.api.url("/k/v1/record", true),
        "GET",
        body
      );
      return resp;
    }

    function fillRootComponent(oshiraseRecords) {
      console.log($("#accordionNews"));
      let recs = oshiraseRecords.records;
      recs.forEach((item, index) => {
        generateCard(item, index);
      });
    }

    function generateCard(item, index) {
      /* Record's Properties */
      const rec = {
        id: item.レコード番号.value,
        type: item.ドロップダウン＿種類.value,
        title: item.文字列＿タイトル.value,
        startTime: moment(item.日時＿開始.value).format("llll"),
        endTime: moment(item.日時＿終了.value).format("llll"),
        isEndTimeSet: item.ラジオ＿投稿期間.value === "はい",
        content: item.リッチ＿内容.value,
        attachments: item.添付ファイル.value,
        group: item.所属.value,
      };

      let DOMAttachments = "";
      if (rec.attachments.length > 0) {
        DOMAttachments +=
          '<span class="text-success text-center text-attachment"><i class="fas fa-lg fa-paperclip pr-2"></i>添付ファイルがあります（' +
          rec.attachments.length +
          "）</span>";
      }

      $(
        `<div class="inner card ${cardClass[rec.group]}">
                    <div class="inner custom-card-header" id="heading${index}">
                        <a class="btn-kintone w-100" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}" >
                            <div class="pl-4">
                                <div class="row">
                                    <div class="target-group">${rec.group
        }へ</div>
                                </div>
                                
                                <div class="row">
                                    <div class="title">${rec.title}</div>
                                </div>

                                <div class="row">
                                    <span class="title-date"> 
                                      ${rec.startTime}  ${rec.endTime == rec.startTime || rec.endTime.isEndTimeSet
          ? "～" + rec.endTime
          : ""
        } 
                                    </span>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="${rec.type == "お知らせ" ? "#accordionNews" : "#accordionEvents"
        }">
                        <a class="nounderline text-left" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}" >
                            <div class="card-body  pt-0">
                                <div class="row p-3 text-content">
                                    ${rec.content}
                                </div>
                                <div class="row">
                                    <div class="col-8">
                                        <a class="btn btn-outline-dark  text-content notification" href="${props.site
        }${props.appID}/show#record=${rec.id}">
                                            ${DOMAttachments} 
                                            <p class="m-0">本文を見る</p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                `
      ).appendTo(
        $(rec.type == "お知らせ" ? "#accordionNews" : "#accordionEvents")
      );
    } /* generate card */

    function invertColor(hex, bw) {
      if (hex.indexOf("#") === 0) {
        hex = hex.slice(1);
      }
      // convert 3-digit hex to 6-digits.
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      if (hex.length !== 6) {
        throw new Error("Invalid HEX color.");
      }
      var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
      if (bw) {
        // http://stackoverflow.com/a/3943023/112731
        return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
      }
      // invert color components
      r = (255 - r).toString(16);
      g = (255 - g).toString(16);
      b = (255 - b).toString(16);
      // pad each with zeros and return
      return "#" + padZero(r) + padZero(g) + padZero(b);
    } /* invertColor */
  }); /* event */
})();
