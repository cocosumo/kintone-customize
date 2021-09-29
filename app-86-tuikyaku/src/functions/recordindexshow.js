import getRecords from '../handlers/getrecords'; // 注)kintone apiを使用しているため、promise
import { getHeaderMenuSpaceElement, getHeaderSpaceElement } from '../../../kintone-api/api';
// import getEmployees from '../Backend/getEmployees';
import setInitSelect from '../Backend/setSelectInit';

// [レコード一覧画面]プルダウンによる絞り込みを行う
const recordindexshow = (event) => {
  const view = 5522965; // メインの一覧ID:[本番用= 5522965 ][テスト用= 5522965 ] =共通
  const viewall = 20; // (すべて)の一覧ID：本番用・テスト用共通 = 20
  const EmpIDname = 'my_select_buttonEmp';
  const ShopIDname = 'my_select_buttonShop';

  // ブランチのテスト

  // 指定の一覧以外このJSを実行しない
  if (event.viewId === view) {
    getHeaderSpaceElement().innerText = '[担当名]のプルダウンには、役職が「店長」「主任」「営業」の方を表示しています。\n'
                                      + 'この条件以外で絞り込みたい場合は、上の"メイン"をクリックし、"(すべて)"を選択してください。';
  } else {
    if (event.viewId === viewall) {
      const infomation = ' 上の"(すべて)"をクリックすると、一覧の表示方法が変更されます。\n'
                       + ' 絞り込み表示をしたい場合には、漏斗(ろうと)のアイコンをクリックし、条件を設定してください。\n'
                       + ' 詳細は、QA「絞り込み表示、ソートの仕方」を参照してください。\n';
      // const linkstring = 'QAのリンクはこちら';
      // getHeaderSpaceElement().innerText = infomation + linkstring.link('https://rdmuhwtt6gx7.cybozu.com/k/104/show#record=8&l.view=5523657&l.q&l.sort_0=f5523588&l.order_0=ASC&l.next=9&l.prev=7');
      getHeaderSpaceElement().innerText = infomation;
    }
    return;
  }

  // ボタンの増殖防止
  if (document.getElementById(EmpIDname) !== null) {
    return;
  }

  // プルダウンメニューの要素を設定する
  // [一覧表示画面]プルダウン(店舗名)の設置
  let myselectShop = document.createElement('text');
  myselectShop.id = 'my_textShop';
  myselectShop.innerText = '店舗名: ';
  getHeaderMenuSpaceElement().appendChild(myselectShop);

  myselectShop = document.createElement('select');
  myselectShop.id = ShopIDname;
  myselectShop.innerText = '店舗名セレクト';
  getHeaderMenuSpaceElement().appendChild(myselectShop);

  // [一覧表示画面]プルダウン(担当者名)の設置
  let myselectEmp = document.createElement('text');
  myselectEmp.id = 'my_textEmp';
  myselectEmp.innerText = '　担当名: ';
  getHeaderMenuSpaceElement().appendChild(myselectEmp);

  myselectEmp = document.createElement('select');
  myselectEmp.id = EmpIDname;
  myselectEmp.innerText = 'セレクトボタン';
  getHeaderMenuSpaceElement().appendChild(myselectEmp);

  console.log('一覧:ヘッダにボタン設置');

  // 担当者のプルダウンに初期値を追加
  const ini = document.createElement('option');
  // const userID = kintone.getLoginUser().employeeNumber;
  let affShop = ''; // 店舗名の初期値を格納する変数
  let selectName; // 選択されている社員名(初期値はログインユーザー名)
  let Shoplists; // 店舗リスト
  let Employees; // 社員リスト
  let flg1st = 'false'; // 初回判定用フラグ true=初回, false=初回ではない
  let url = window.location.search;
  url = decodeURI(url); // urlをデコーディングする

  // ローカルストレージの活用をする
  const app86DateTimeKey = 'app86日時'; // ローカルストレージの日時の保存名(キー)
  let app86DateTimeD; // ローカルストレージの日時の保存データ
  const app86EmployeesKey = 'app86社員リスト'; // ローカルストレージの社員リストの保存名(キー)
  let app86EmployeesD; // ローカルストレージの社員リストの保存データ
  const app86ShopListKey = 'app86店舗リスト'; // ローカルストレージの店舗リストの保存名(キー)
  let app86ShopListD; // ローカルストレージの店舗リストの保存データ
  const divTime = 10; // 経過時間の判定に使用する閾値(初期=10800秒=3時間で設定)

  // 担当名に表示する氏名の取り出しをする
  if ((url.indexOf('query=') === -1) && (url.indexOf('q=') === -1)) { // URLにqueryが含まれないとき(初回)
    flg1st = 'true';
    selectName = kintone.getLoginUser().name;
    const selectNameL = selectName.substring(0, selectName.indexOf(' '));
    const selectNameF = selectName.slice(selectName.indexOf(' ') + 1);
    selectName = selectNameL.concat(' ', selectNameF);
    ini.value = selectName;
    ini.innerText = selectName;
    console.log('ユーザ名の取得 :', selectName);

    // 役職が営業/主任/店長でない場合は、初期値で絞り込まない
    /*
    let userpost; // ログインユーザーの役職を格納する
    const params = {
      app: APPEMP_ID,
      id: userID,
    };
    kintone.api(kintone.api.url('/k/v1/record.json', true), 'GET', params).then((resp) => {
      console.log('役職を表示したい ', resp);
      console.log('役職を表示 ', resp.record.役職.value);
      userpost = resp.record.役職.value;
    });
    if (userpost === '営業'
      || userpost === '主任'
      || userpost === '店長') { */
    /* const selectField = '担当名'; // フィルタリング対象のフィールド名
    const query = `${selectField} like "${selectNameL}" and ${selectField} like "${selectNameF}"`;
    console.log('query = ', query);
    window.location.href =
    `${window.location.origin + window.location.pathname}?view=${view}&query=${encodeURI(query)}`;
    // } */
  } else {
    // function setEmployeename() {
    flg1st = 'false';
    let resultPos = url.indexOf('担当名');
    if (resultPos !== -1) { // URLに'担当名'が含まれるとき(プルダウンでの絞り込み表示時)
      // ここから：絞り込み条件の氏名を取り出し 「query=担当名 like "苗字" and 担当名 like "名前"」
      selectName = url.slice(resultPos + 10); // 10=読み飛ばす文字数/slice=urlから指定箇所以降を取り出し
      resultPos = selectName.indexOf('担当名');
      const selectNameL = selectName.substring(0, resultPos - 6); // 1文字目から"resultPos - 2"文字目までを取り出し
      selectName = selectName.slice(resultPos + 10);
      const selectNameF = selectName.substring(0, selectName.indexOf('"'));
      selectName = selectNameL.concat(' ', selectNameF);
      console.log('所属店舗=', affShop);
      // 店舗名の初期値を設定
      document.getElementById(EmpIDname).value = selectName;
      // ログインユーザーがリスト化対象外職種の場合は、「---」を選択
      if (selectName !== document.getElementById(EmpIDname).value) {
        document.getElementById(EmpIDname).value = '---';
        selectName = '---';
      }
      console.log('[担当名]ユーザ名の取得 :', selectName);
      // ここまで：絞り込み条件の氏名を取り出し
      document.getElementById(EmpIDname).value = selectName;
    } else if (url.indexOf('店舗名') !== -1) {
      resultPos = url.indexOf('店舗名');
      affShop = url.slice(resultPos + 10); // 10=読み飛ばす文字数/slice=urlから指定箇所以降を取り出し
      affShop = affShop.substring(0, affShop.indexOf('"'));
      // 店舗名の初期値を設定
      document.getElementById(ShopIDname).value = affShop;
      // ログインユーザーがリスト化対象外店舗所属の場合は、「---」を選択
      if (affShop !== document.getElementById(ShopIDname).value) {
        document.getElementById(ShopIDname).value = '---';
        affShop = '---';
      }
      console.log('[店舗名]ユーザ名の取得 :', affShop);
    } else {
      // ユーザがプルダウン以外で絞り込み表示している場合
      // 処理は実行しない
    }
  }

  /**
   * 社員リストから、対象の役職のみを取り出す処理
   * @param {Array} lists : 社員リスト
   */
  function AddEmplist(lists) {
    lists.forEach((item) => {
      // 対象の役職のメンバのみをプルダウンに追加
      if (item.ルックアップ＿店舗名.value === myselectShop.value) {
        if (['店長', '主任', '営業'].includes(item.役職.value)) {
          const listitems = document.createElement('option');
          if ((myselectShop.value === 'listall'
          || myselectShop.value === 'init')
          || (item.ルックアップ＿店舗名.value === myselectShop.value)) {
            listitems.value = item.文字列＿氏名.value;
            listitems.innerText = item.文字列＿氏名.value;
            document.getElementById(EmpIDname).appendChild(listitems);
          }
        }
      }
    });
  }

  // LocalStrageに日時が保存されているか確認する - (1)
  app86DateTimeD = JSON.parse(localStorage.getItem(app86DateTimeKey));
  app86EmployeesD = localStorage.getItem(app86EmployeesKey);
  app86ShopListD = localStorage.getItem(app86ShopListKey);
  console.log('レコード一覧の取得時間(Date.now(秒))：', app86DateTimeD);
  const now = (Date.now()) / 1000;
  console.log('1-1 現在の時間(Date.now(秒))：', now);
  console.log('1-1 経過時間(秒)：', (now - app86DateTimeD));

  // (1-2)データが保存されていない場合 or 前回のデータの取得から3時間経過している場合
  if ((app86DateTimeD === null) || (app86EmployeesD === null)
   || (app86ShopListD === null) || ((now - app86DateTimeD) >= divTime)) {
    app86DateTimeD = JSON.stringify(now);
    localStorage.setItem(app86DateTimeKey, app86DateTimeD);
    console.log('1-2 現在の時間(Date.now(秒))：', app86DateTimeD);
    // - getrecordsを使用して、社員名簿から社員の一覧の配列(以降、社員リスト)を取得する
    // プルダウンメニューの要素を設定する- ID:34 = 社員名簿 -> 社員名簿のレコードを取得する
    const APPEMP_ID = 34; // ID:34 = 社員名簿
    const APPSHOP_ID = 19; // ID:19 = 店舗リスト
    const FieldEmp = '文字列＿氏名';
    const FieldEmp2 = '役職';
    const FieldEmp3 = 'ルックアップ＿店舗名';
    const FieldEmp4 = '状態';
    const FieldShop = '店舗名';
    const ExItems1 = ['なし', '本部', 'システム管理部', '本社', '買取店', 'すてくら'];
    const ExItem2 = 'すてくら';
    const ExItemsEmp = ['営業', '主任', '店長'];

    const paramsEmp = {
      app: APPEMP_ID,
      fields: [FieldEmp, FieldEmp2, FieldEmp3, FieldEmp4],
    };

    // - getrecordsを使用して、店舗リストから店舗一覧の配列(以降、店舗リスト)を取得する
    // 店舗名のプルダウンに、店舗名のリストを追加する
    const paramsShop = {
      app: APPSHOP_ID,
      fields: [FieldShop],
    };

    // 店舗名のリストを作成する
    getRecords(paramsShop).then((respShop) => { // 100件以上のレコード読み込み(上限1万件)
      setInitSelect(ShopIDname); // [店舗名]のプルダウンに、「---」と「すべてのレコードを表示」を追加
      console.log('店舗リストのレコード取得に成功しました！', respShop);
      Shoplists = respShop.records;

      // 店舗リストの配列を再編成する
      // const newShopList = Shoplists.map((item) => item.店舗名.value);
      let newShopList = Shoplists.map((item) => {
        // console.log('item.店舗名.value：', item.店舗名.value);
        let returnValue;
        if (ExItems1.includes(item.店舗名.value) || item.店舗名.value.includes(ExItem2)) {
          returnValue = undefined; // リスト化対象外店舗は、undefinedとする
        } else {
          // 戻り値に店舗名を設定する
          returnValue = item.店舗名.value;
          // 対象の店舗名のみ、店舗リストに登録する
          const listitems = document.createElement('option');
          listitems.value = item.店舗名.value;
          listitems.innerText = item.店舗名.value;
          document.getElementById(ShopIDname).appendChild(listitems);
        }
        return returnValue;
      });

      // 配列から、undefinedを除外して、newShopListを再編する
      newShopList = newShopList.filter((value) => value !== undefined);
      console.log('newShopList：', newShopList);

      // 社員名のリストを作成する
      getRecords(paramsEmp).then((respEmp) => { // 100件以上のレコード読み込み(上限1万件)
        console.log('社員名簿のレコード取得に成功しました！', respEmp);
        Employees = respEmp.records; // 社員

        let chkFlg = false;
        let newEmpList = Employees.map((item) => {
          // 社員名簿をリスト化する
          let returnValue;
          if (ExItemsEmp.includes(item.役職.value) && item.状態.value !== '無効') {
            // console.log('文字列＿氏名.value :', item.文字列＿氏名.value);
            const member = { name: item.文字列＿氏名.value, shop: item.ルックアップ＿店舗名.value };
            returnValue = member;

            // 絞り込み表示対象者の所属店舗を設定する
            if (item.文字列＿氏名.value === selectName) {
              affShop = item.ルックアップ＿店舗名.value;
              console.log('店舗名の初期値 =', affShop);
              // 店舗名の初期値を設定
              document.getElementById(ShopIDname).value = affShop;
              chkFlg = true;
            }
          } else {
            const member = { name: undefined, shop: undefined };
            returnValue = member; // リスト化対象外社員は、undefinedとする
          }
          return returnValue;
        });

        // 配列から、undefinedを除外して、newEmpListを再編する
        newEmpList = newEmpList.filter((value) => value.name !== undefined);
        console.log('newEmpList', newEmpList);

        // - 取得した社員リストを、LocalStorageに格納する
        app86EmployeesD = JSON.stringify(newEmpList);
        localStorage.setItem(app86EmployeesKey, app86EmployeesD);
        // - 取得した店舗リストを、LocalStorageに格納する
        app86ShopListD = JSON.stringify(newShopList);
        localStorage.setItem(app86ShopListKey, app86ShopListD);

        // - 現在の日時を、LocalStrageに格納する
        app86DateTimeD = JSON.stringify(Date.now() / 1000);
        localStorage.setItem(app86DateTimeKey, app86DateTimeD);

        // 店舗名プルダウンの値を設定する
        if (chkFlg === false) {
          document.getElementById(ShopIDname).value = '---';
        }

        // 社員リストのプルダウンの値を設定する
        AddEmplist(Employees);
        // setEmployeename();
      }, (er) => {
        // error
        console.log('社員名簿のレコード取得に失敗しました。', er);
      });
    }, (er) => {
      // error
      console.log('店舗リストのレコード取得に失敗しました。', er);
    });
  } else {
    // (1-1)(3-2)LocalStorageにデータが保存されている場合 かつ、(2-2)3時間経過していない場合
    // - - - LocalStrageに保存されている店舗リスト・社員リストを取得する
    // 条件判定時にデータは取得済みのため、処理は省略する
    console.log('店舗リスト ', app86ShopListD);
    console.log('社員リスト', app86EmployeesD);
  }

  if (flg1st === 'true') {
    // 初回にログインユーザー名でフィルタリングする
    // 処理検討中
  }

  // 店舗名のプルダウン変更時の処理
  myselectShop.onchange = () => {
    affShop = document.getElementById(ShopIDname).value;
    // プルダウン子要素の初期化
    if (document.getElementById(ShopIDname).value === 'listall') {
      // 全てのレコードを表示
      window.location.href = `${window.location.origin + window.location.pathname}?view=${viewall}`;
    } else if (myselectEmp.hasChildNodes()) {
      while (myselectEmp.childNodes.length > 0) {
        myselectEmp.removeChild(myselectEmp.firstChild);
      }
    }

    setInitSelect(EmpIDname); // 「---」と「すべてを表示する」を追加
    AddEmplist(Employees); // 社員名のリスト(プルダウン)の更新
  };

  // 担当者のプルダウン変更時の処理
  myselectEmp.onchange = () => {
    if (document.getElementById(EmpIDname).value === 'listall') {
      // 全てのレコードを表示
      const selectField = '店舗名'; // フィルタリング対象のフィールド名
      const shop = document.getElementById(ShopIDname).value;
      const query = `${selectField} like "${shop}"`;
      window.location.href = `${window.location.origin + window.location.pathname}?view=${view}&query=${encodeURI(query)}`;
    } else if (document.getElementById(EmpIDname).value === 'init') {
      // デフォルト値・何もしない
    } else {
      const selectField = '担当名'; // フィルタリング対象のフィールド名
      const member = document.getElementById(EmpIDname).value;
      // console.log('selectName ', selectName); // ->undefined
      // console.log('member ', member);
      // if (selectName === member) {
      const Firstname = member.slice(member.indexOf(' ') + 1);
      const Lastname = member.substring(0, member.indexOf(' '));
      const query = `${selectField} like "${Lastname}" and ${selectField} like "${Firstname}"`;
      window.location.href = `${window.location.origin + window.location.pathname}?view=${view}&query=${encodeURI(query)}`;
      // }
    }
  };
};

export default recordindexshow;
