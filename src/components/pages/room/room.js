import './room.sass';
import { compose } from '../../../util';
import withService from '../../hoc/with-service';
import { createConnectionAndDispatch, getFetchRoom } from '../../../actions';
import StoriesContainer from '../../stories-container';
import UsersContainer from '../../users-container';
import { connect } from 'react-redux';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

class Room extends React.Component {
  async componentDidMount(): void {
    if (this.props.currentUserName === '') {
      document.querySelector('#show-login-window').click();
    }
    else {
      if (!this.props.signalRConnection) {
        await this.props.connectionUp();
      }
      await this.props.fetchRoom();
    }
  }

  async componentDidUpdate(previousProperties: Readonly<P>, previousState: Readonly<S>, snapshot: SS): void {
    if (previousProperties.currentUserName !== this.props.currentUserName) {
      await this.props.fetchRoom();
      if (!this.props.signalRConnection) {
        await this.props.connectionUp();
      }
    }
  }

  componentWillUnmount(): void {

  }

  render() {
    if (this.props.currentUserName === '') {
      return null;
    }

    return (
      <Container>
        <Row>
          <Col sm={8}><StoriesContainer service={this.props.service} room={this.props.currentRoom} currentUserName={this.props.currentUserName} /></Col>
          <Col sm={4}><UsersContainer service={this.props.service} room={this.props.currentRoom} currentUserName={this.props.currentUserName} /></Col>
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
