import React, { Component } from 'react';
import Swal from 'sweetalert2';

import { timeConverter } from '../utils/timeConverter';

class Countdown extends Component {
  constructor(props) {
    super(props);

    const countdownTime = props.countdownTime * 60000;

    this.state = {
      timerStart: 0,
      timerTime: countdownTime,
      totalTime: countdownTime
    };
  }

  startTimer() {
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 1000;

      if (newTime >= 0) {
        this.setState({
          timerTime: newTime
        });
      } else {
        clearInterval(this.timer);
        Swal.fire({
          title: 'YOUR TIME IS UP',
          type: 'info',
          timer: 5000,
          onClose: () => {
            this.props.timesUp();
          }
        });
      }
    }, 1000);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);

    const { timerTime, totalTime } = this.state;
    this.props.timeAmount(timerTime, totalTime);
  }

  render() {
    const { timerTime } = this.state;
    const { hours, minutes, seconds } = timeConverter(timerTime);

    return (
      <div>
        {hours}:{minutes}:{seconds}
      </div>
    );
  }
}

export default Countdown;
