import React from 'react';
import { Button, Modal } from 'react-bootstrap';

//TODO : bind input with state
const UniversalWindow = ({ title, buttonText, onSubmit, modalText }) => {
  const [ show, setShow ] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <React.Fragment>
      <Button variant="primary" onClick={handleShow} size={'sm'}>
        {buttonText}
      </Button>
      <Modal show={show} onHide={handleClose} autoFocus={true}>
        <Modal.Header closeButton={true}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalText}
          <br />
          <input type='text' id={title} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            const formValue = document.getElementById(title).value;
            onSubmit(formValue);
            handleClose();
          }
          }>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>);
};

export default UniversalWindow;
