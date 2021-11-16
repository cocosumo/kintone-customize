import PropTypes from 'prop-types';

const Header = ({area}) => {
  // const {children} = props;
  return <h1>{area}</h1>;
};

Header.propTypes = {
  area: PropTypes.string
};

export default Header;