import {connect} from 'react-redux';
import {Auth} from '@components/Auth';

const mapDispatchToProps = (dispatch) => {

  return {
    dispatch,
    // loginAction: (loginInfo) => dispatch(login(loginInfo)),
  };
};

const mapStateToProps = ({user}) => {
  return ({
    // anonymousId: user.anonymousId
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
