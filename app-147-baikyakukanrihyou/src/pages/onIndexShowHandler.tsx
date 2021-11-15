

import ReactDOM from 'react-dom';
import BaikyakuSaitoHankyoKanriHyou from '../components/BaikyakuSaitoHankyoKanriHyou';

const onIndexShowHandler = (event : IndexEvent) => {

  ReactDOM.render(
    <BaikyakuSaitoHankyoKanriHyou event={event} />,
    document.getElementById('root')
  );
};

export default onIndexShowHandler;
