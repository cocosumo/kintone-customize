import {createRoot} from 'react-dom/client';
import SpaceComponent from '../components/SpaceComponent';
import {previewSpaceID} from '../constantDefinition';

/**
 * preview用スペースフィールドにスペース用コンポーネントを設置する
 */
export const renderReactPreview = (event: IEvent) => {
  const container = kintone.app.record.getSpaceElement(previewSpaceID) as HTMLElement;
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(
    <SpaceComponent
      event={event}
    />
  );
};