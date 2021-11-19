import PropTypes from 'prop-types';
import {Button} from '@mui/material';

const ShowButton = ({onClick}) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
    >
      [導入他社数一覧]を表示する
    </Button>
  );
};

ShowButton.propTypes = {
  onClick: PropTypes.func
};
export default ShowButton;
