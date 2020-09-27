import React, { Component, Fragment } from "react";
import Main from "../Main";
import Quiz from "../Quiz";
import Loader from "../Loader";
import TestService from "../../../services/TestService";

export class ViewTestContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTest:{
        id: null,
        name: "",
        category: "",
        ttime: "",
        needs_score: "",
        questions:[]
      },
      isQuizStart: false,
      API: null,
      countdownTime: null,
      isLoading: false,
      
    };

    this.startQuiz = this.startQuiz.bind(this);
    this.backToHome = this.backToHome.bind(this);
    this.getTest = this.getTest.bind(this);
  }
  componentDidMount() {
    this.getTest(this.props.match.params.id);
  }

  getTest(id) {
    TestService.get(id)
      .then((response) => {
        this.setState({
          currentTest: response.data
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  startQuiz() {    
    this.setState({
      isQuizStart: true,
      API: this.currentTest,
      countdownTime: this.currentTest?(this.currentTest.ttime):(120),
    });
  }

  backToHome() {
    this.setState({ isLoading: true });

    setTimeout(() => {
      this.setState({
        isQuizStart: false,
        API: null,
        countdownTime: null,
        isLoading: false
      });
    }, 1000);
  }

  render() {
    const { isQuizStart, API, countdownTime, isLoading } = this.state;
    
    
    return (
      <div>   
        <Fragment>
      {console.log(API)}
        {!isLoading && !isQuizStart && <Main startQuiz={this.startQuiz} />}
        {!isLoading && isQuizStart && (
          <Quiz
            API={API}
            countdownTime={countdownTime}
            backToHome={this.backToHome}
          />
        )}
        {isLoading && <Loader />}

        
      </Fragment>
      </div>
    );
  }
}

export default ViewTestContainer;
