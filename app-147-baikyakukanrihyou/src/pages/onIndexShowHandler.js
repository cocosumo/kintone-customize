

import ReactDOM from 'react-dom';
import BaikyakuSaitoHankyoKanriHyou from '../components/BaikyakuSaitoHankyoKanriHyou';

const onIndexShowHandler = (event) => {

  ReactDOM.render(
    <BaikyakuSaitoHankyoKanriHyou {...{event}} />,
    document.getElementById('root')
  );
};

export default onIndexShowHandler;
