import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const DiscussionStartOrEnd = ({ title, buttonText, onSubmit, modalText }) => {
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
            const themeOrResume = document.getElementById(title).value;
            onSubmit(themeOrResume);
          }
          }>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>);
};

export default DiscussionStartOrEnd;
