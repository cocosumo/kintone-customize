

import ReactDOM from 'react-dom';
import BaikyakuSaitoHankyoKanriHyou from '../components/BaikyakuSaitoHankyoKanriHyou';

const onIndexShowHandler = (event : IndexEvent) => {
  const {viewId} = event;

  console.log(viewId, event);
  ReactDOM.render(
    <BaikyakuSaitoHankyoKanriHyou />,
    document.getElementById('root')
  );
};

export default onIndexShowHandler;
