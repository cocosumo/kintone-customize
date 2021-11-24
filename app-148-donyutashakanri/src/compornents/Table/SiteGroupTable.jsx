import PropTypes from 'prop-types';
import makeBillingList from '../../helpers/makeBillingList';

const SiteGroupTable = ({groupBySite, sites, componentRef}) => {

  // groupBySiteを、sites毎にテーブルを分けて表示する
  const newBillingList = makeBillingList(sites, groupBySite);
  console.log('newBillingList', newBillingList);

  return (
    <div ref={componentRef}>
      <table className="kakin_list">
        <thead>
          <tr>
            <th> 媒体サイト名 </th>
            <th> 店舗名 </th>
            <th> 導入他社数 </th>
            <th> 課金額 </th>
          </tr>
        </thead>
        <tbody>
          {sites.map(sitename => {
            const [value] = Object.entries(sitename)[0];

            return (
              <tr key={sitename}>

                <th>{sitename}</th>

                {sites.map((site)=>{
                  return <td key={site}>{value[site]}</td>;
                })}

              </tr>);
          })}
        </tbody>
      </table>
    </div>
  );
};

SiteGroupTable.propTypes = {
  groupBySite: PropTypes.object,
  sites: PropTypes.array,
  componentRef: PropTypes.object
};

export default SiteGroupTable;