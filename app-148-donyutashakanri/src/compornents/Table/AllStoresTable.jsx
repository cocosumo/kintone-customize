import PropTypes from 'prop-types';
import {groupRecordsByField} from '../../../../app-147-baikyakukanrihyou/src/helpers/utils';
import {getMonth, getYear} from 'date-fns';
import SiteGroupTable from './SiteGroupTable';

const AllStoresTable = ({reportDate, data, componentRef}) => {
  // 媒体サイト毎に、データを再編する
  const groupBySite = groupRecordsByField(data, '媒体サイト名');
  // console.log('サイト毎のグループ配列の出力確認', groupBySite); // chk
  // const sites = Object.keys(groupBySite); // サイト名の配列を作成(sites)
  const newMonth = getMonth(reportDate) + 1;
  const newYear = getYear(reportDate);

  // console.log('groupBySite', groupBySite);

  return (
    <div ref={componentRef}>
      <article>
        <table className="print-area">
          <thead>
            <tr>
              <th>
                <span className="mainTitle"> {newYear}年{newMonth}月 全店舗 </span>
              </th>
            </tr>
            <tr>
              <th>
                <span className="subTitle"> 課金一覧 </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <div className="flex-view">
                {Object.entries(groupBySite).map(([key, value]) => {
                  return <SiteGroupTable key={key} site={key} records={value} />;
                })}
              </div>
            </tr>
          </tbody>
        </table>
      </article>
    </div>
  );
};


AllStoresTable.propTypes = {
  reportDate: PropTypes.object,
  data: PropTypes.array,
  componentRef: PropTypes.object
};

export default AllStoresTable;