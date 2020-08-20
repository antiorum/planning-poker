import './reminder.sass';
import { getActiveStory, hasActiveDiscussion } from '../../util/users-util';
import img from './img/timer.png';
import React from 'react';

class Reminder extends React.Component {
  state= {
    timeLeft: undefined
  };

  componentDidMount(): void {
    const end = this.getEndTime();
    this.initializeClock(end);
  }

  componentDidUpdate(previousProperties: Readonly<P>, previousState: Readonly<S>, snapshot: SS): void {
    if (previousProperties.room !== this.props.room) {
      const end = this.getEndTime();
      this.initializeClock(end);
    }
  }

  getEndTime = () => {
    if (!this.props.room || !hasActiveDiscussion(this.props.room) || this.props.room.timerDuration == null) return;
    const beginning = new Date(getActiveStory(this.props.room).beginning);
    let hoursMinutesSeconds = this.props.room.timerDuration.split(':').map(string => Number.parseInt(string));

    let ending = beginning;
    ending.setHours(ending.getHours() + hoursMinutesSeconds[0]);
    ending.setMinutes(ending.getMinutes() + hoursMinutesSeconds[1]);
    ending.setSeconds(ending.getSeconds() + hoursMinutesSeconds[2]);

    return ending;
  };

  getTimeRemaining = (endTime) => {
    if (endTime == undefined) return;
    let t = Date.parse(endTime) - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  };

   initializeClock = (endTime) => {
     if (endTime == undefined) return;
     let remindInterval = setInterval(() => {
       let timeLeft = this.getTimeRemaining(endTime);
       if (timeLeft.total <= 0) {
         clearInterval(remindInterval);
       }
       this.setState({
         timeLeft
       });
     }, 1000);
   };

   renderTimer = () => {
     if (this.state.timeLeft == undefined || this.state.timeLeft.total === 0 ) return null;

     return (
       <div className="timer">
         <img src={img} alt="timer" height='25' />
         {('0' + this.state.timeLeft.hours).slice(-2) + ':' + ('0' + this.state.timeLeft.minutes).slice(-2) + ':' + ('0' + this.state.timeLeft.seconds).slice(-2)}
       </div>);
   };


   render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
     return (
       <div className='users-remained'>
         Remains:
         {this.renderTimer()}
       </div>
     );
   }
}

export default Reminder;
