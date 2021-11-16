import PropTypes from 'prop-types';

const Header = ({area}) => {
  // const {children} = props;
  let title = {area};
  title = title.area.substr(1, title.area.length - 1);

  return <h1>{title}</h1>;
};

Header.propTypes = {
  area: PropTypes.string
};

export default Header;