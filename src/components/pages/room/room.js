import './room.sass';
import { compose } from '../../../util';
import withService from '../../hoc/with-service';
import { createConnectionAndDispatch, getFetchRoom } from '../../../actions';
import Stories from '../../stories';
import RoomSidebar from '../../room-sidebar';
import RoomTimer from '../../room-timer';
import { connect } from 'react-redux';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

class Room extends React.Component {
  async componentDidMount(): void {
    const { currentUserName, fetchRoom, signalRConnection, connectionUp } = this.props;
    if (currentUserName === '') {
      document.querySelector('#show-login-window').click();
    }
    else {
      if (!signalRConnection) {
        await connectionUp();
      }
      await fetchRoom();
    }
  }

  async componentDidUpdate(previousProperties: Readonly<P>, previousState: Readonly<S>, snapshot: SS): void {
    const { currentUserName, fetchRoom, signalRConnection, connectionUp } = this.props;
    if (previousProperties.currentUserName !== currentUserName) {
      await fetchRoom();
      if (!signalRConnection) {
        await connectionUp();
      }
    }
  }

  componentWillUnmount(): void {

  }

  render() {
    const { currentUserName, currentRoom, service } = this.props;

    if (currentUserName === '') {
      return null;
    }

    return (
      <Container>
        <Row>
          <Col sm={12}>
            <RoomTimer room={currentRoom} currentUserName={currentUserName} service={service} />
          </Col>
        </Row>
        <Row>
          <Col sm={8}><Stories service={service} room={currentRoom} currentUserName={currentUserName} /></Col>
          <Col sm={4}><RoomSidebar service={service} room={currentRoom} currentUserName={currentUserName} /></Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProperties = ({ currentUserName, currentRoom }) => {
  return { currentUserName, currentRoom };
};

const mapDispatchToProperties = (dispatch, { service, match }) => {
  return {
    fetchRoom: getFetchRoom(match.params.id, service, dispatch),
    connectionUp: createConnectionAndDispatch(service, dispatch, getFetchRoom(match.params.id, service, dispatch))
  };
};

export default compose(
  withService(),
  connect(mapStateToProperties, mapDispatchToProperties)
)(Room);
