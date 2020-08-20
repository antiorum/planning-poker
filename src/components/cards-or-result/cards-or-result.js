import Card from '../card';
import React from 'react';
import { connect } from 'react-redux';

class CardsOrResult extends React.Component {
  state = {
    discussionResult: undefined
  };

  async componentDidMount(): void {
    if (this.props.discussionResult) {
      this.setState({ discussionResult: this.props.discussionResult });
    }
  }

  async componentDidUpdate(previousProperties: Readonly<P>, previousState: Readonly<S>, snapshot: SS): void {
    if (previousProperties.discussionResult !== this.props.discussionResult) {
      this.setState({ discussionResult: this.props.discussionResult });
    }
  }

  renderUsersMarks = () => {
    return (
      <ul>
        {
          Object.entries(this.state.discussionResult.usersMarks).map((k) => {
            return (
              <li key={k[0]}>User {k[0]} choose card {k[1].name} with value {k[1].value}</li>
            );
          })
        }
      </ul>
    );
  };

  renderDiscussionResult = () => {
    return (
      <div>
        <p>Theme: {this.state.discussionResult.theme}</p>
        <p>Average mark: {this.state.discussionResult.averageMark}</p>
        {this.renderUsersMarks()}
        <p>Resume or comment: {this.state.discussionResult.resume}</p>
      </div>
    );
  };

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    if (!this.state.discussionResult || this.state.discussionResult.errors) {
      return (
        <p>No active discussion yet.</p>
      );
    }

    if (this.state.discussionResult.isCompleted) {
      return this.renderDiscussionResult();
    }
    else {
      let chosenCardId;
      try {
        chosenCardId = this.state.discussionResult.usersMarks[this.props.currentUserName].id;
      }
      catch (e) {

      }

      const clickOnCard = async(cardId) => {
        await this.props.service.vote(this.props.currentRoom.id, cardId, this.state.discussionResult.id);
      };

      const renderCards = () => {
        try {
          return (
            <div className="cards-container">
              {
                this.props.cards.map((card) => {
                  const isSelected = chosenCardId === card.id;
                  return (
                    <Card key={card.id} id={card.id} name={card.name} value={card.name} isSelected={isSelected} chooseOrChangeCard={async() => { await clickOnCard(card.id); }} />
                  );
                })
              }
            </div>
          );
        }
        catch {
          return null;
        }
      };

      return renderCards();
    }
  }
}

const mapStateToProperties = ({ currentUserName, currentRoom }) => {
  return { currentUserName, currentRoom };
};

export default connect(mapStateToProperties)(CardsOrResult);
