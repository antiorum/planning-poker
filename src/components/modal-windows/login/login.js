import './login.sass';
import { getFetchUserName, createConnectionAndDispatch } from '../../../actions';
import { compose } from '../../../util';
import withService from '../../hoc/with-service';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

//TODO : bind input with state
const Login = ({ service, fetchUserName, connectionUp }) => {
  const [ show, setShow ] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const login = async() => {
    const username = document.querySelector('#username-from-modal').value;
    await service.auth(username);
    await fetchUserName();
    await connectionUp();
    setShow(false);
  };

  return (
    <React.Fragment>
      <Button variant="primary" onClick={handleShow} size={'sm'} className={'launch-button'} id={'show-login-window'}>
        Login
      </Button>
      <Modal show={show} onHide={handleClose} autoFocus={true}>
        <Modal.Header closeButton={true}>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Input your name
          <br />
          <input type="text" id="username-from-modal" />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={login}>
            Login with this name
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProperties = ({ currentUserName }) => {
  return { currentUserName };
};

const mapDispatchToProperties = (dispatch, { service }) => {
  return {
    fetchUserName: getFetchUserName(service, dispatch),
    connectionUp: createConnectionAndDispatch(service, dispatch)
  };
};

export default compose(
  withService(),
  connect(mapStateToProperties, mapDispatchToProperties)
)(Login);
