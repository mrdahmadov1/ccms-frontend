import PropTypes from 'prop-types';

const MainLayout = ({ children }) => {
  return <>{children}</>;
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default MainLayout;
