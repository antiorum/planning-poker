import React from 'react';
import { Button, Modal } from 'react-bootstrap';

//TODO : bind input with state
const ChangeTimer = ({ roomId, service }) => {
  const [ show, setShow ] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChange = async() => {
    const newTimer = document.querySelector('#new-timer-value').value;
    await service.changeRoomTimer(roomId, newTimer);
    setShow(false);
  };

  return (
    <React.Fragment>
      <Button variant="primary" onClick={handleShow} size={'sm'} id={'show-change-timer-window'}>
        Change
      </Button>
      <Modal show={show} onHide={handleClose} autoFocus={true}>
        <Modal.Header closeButton={true}>
          <Modal.Title>Change Timer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Input new timer duration for this room
          <br />
          <input type="time" id="new-timer-value" step={1} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onChange}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>);
};

export default ChangeTimer;
