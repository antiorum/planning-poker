import Card from '../card';
import React from 'react';
import { connect } from 'react-redux';

class CardsOrResult extends React.Component {
  constructor({ discussionResult }) {
    super();
    this.state = discussionResult;
  }

  async componentWillReceiveProps(nextProperties: Readonly<P>, nextContext: any): void {
    const { discussionResult } = this.props;
    if (nextProperties.discussionResult !== discussionResult) {
      this.setState({ discussionResult : nextProperties.discussionResult });
    }
  }

  renderUsersMarks = () => {
    const { discussionResult } = this.state;
    return (
      <ul>
        {
          Object.entries(discussionResult.usersMarks).map((k) => {
            return (
              <li key={k[0]}>User {k[0]} choose card {k[1].name} with value {k[1].value}</li>
            );
          })
        }
      </ul>
    );
  };

  renderDiscussionResult = () => {
    const { discussionResult } = this.state;
    return (
      <div>
        <p>Theme: {discussionResult.theme}</p>
        <p>Average mark: {discussionResult.averageMark}</p>
        {this.renderUsersMarks()}
        <p>Resume or comment: {discussionResult.resume}</p>
      </div>
    );
  };

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    if (!this.state) return null;
    const { discussionResult } = this.state;
    const { service, cards, currentRoom, currentUserName } = this.props;

    if (!discussionResult || discussionResult.errors) {
      return (
        <p>There are no stories yet...</p>
      );
    }

    if (discussionResult.isCompleted) {
      return this.renderDiscussionResult();
    }
    else {
      let chosenCardId;
      if (discussionResult.usersMarks[currentUserName]) {
        chosenCardId = discussionResult.usersMarks[currentUserName].id;
      }

      const clickOnCard = async(cardId) => {
        await service.vote(currentRoom.id, cardId, discussionResult.id);
      };

      const renderCards = () => {
        if (!currentRoom) {
          return null;
        }

        return (
          <div className="cards-container">
            {
              cards.map((card) => {
                const isSelected = chosenCardId === card.id;
                return (
                  <Card key={card.id} id={card.id} name={card.name} value={card.name} isSelected={isSelected} chooseOrChangeCard={async() => { await clickOnCard(card.id); }} />
                );
              })
            }
          </div>
        );
      };

      return renderCards();
    }
  }
}

const mapStateToProperties = ({ currentUserName, currentRoom }) => {
  return { currentUserName, currentRoom };
};

export default connect(mapStateToProperties)(CardsOrResult);
