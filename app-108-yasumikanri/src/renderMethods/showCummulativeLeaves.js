import { render } from 'react-dom';
import { getSpaceElement } from '../../../kintone-api/api';
import { fetchLeaveRecords } from '../backend/yasumiKanri';
import { ISOtoLux } from '../helpers/time';
import Leave from '../assets/day-leave.png';
import IconChip from '../components/containers/IconChip';
import { getKintoneYasumiWeight } from '../helpers/converters';

const showCummulativeLeaves = async ({ yasumiDate }) => {
  const leaveRecords = (await fetchLeaveRecords(ISOtoLux(yasumiDate.value))).records;
  const leavesCount = leaveRecords.reduce((accu, curr) => {
    const { duration } = curr;
    console.log(getKintoneYasumiWeight(duration.value));
    return accu + getKintoneYasumiWeight(duration.value);
  }, 0);
  render(
    <IconChip avatar={Leave} label={`今年、${leavesCount}有休が取れました。`} />,
    getSpaceElement('annualCumLeaves'),
  );
};

export default showCummulativeLeaves;
