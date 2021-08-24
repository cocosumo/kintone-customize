const actionTypeData = () => [
  {
    type: '接客',
    bgColor: '#ea9eb6', // pink
    color: 'white',
  },
  {
    type: 'デスクワーク',
    bgColor: '#039be5', // blue
    color: 'white',
  },
  {
    type: '反響の時間',
    bgColor: '#ffff8d',
    color: '#333',
  },
  {
    type: '自分の時間',
    bgColor: '#8e24aa', // purple
    color: 'white',
  },
  {
    type: 'その他',
    bgColor: '#4ca456', // green
    color: 'white',
  },
];

export const getOptionData = (actionType) => actionTypeData()
  .find(({ type }) => type === actionType);

export default actionTypeData;
