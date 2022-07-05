import gettingUrl from '../gettingUrl';

const onEditHandler = (event : IEvent) => {
  console.log('onEdit Test');
  gettingUrl(event);

  return event;
};

export default onEditHandler;