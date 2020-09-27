import React, { Fragment, useState, useEffect } from "react";
import QuestionService from "../../../services/QuestionService";
import TestService from "../../../services/TestService";
import { Link } from "react-router-dom";
import PageTitle from "../../../routing/PageTitle";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Col, Card, CardBody, Input } from "reactstrap";

function AddQuestionsContainer(props) {
  const initialSaveState = {
    testId: "",
    questionId: "",
  };
  const initialTestState = {
    id: null,
    name: "",
    category: "",
    ttime: "",
    needs_score: "",
  };
  const [currentTest, setCurrentTest] = useState(initialTestState);
  const [questions, setQuestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [save, setSave] = useState(initialSaveState);

  const getTest = (testId) => {
    TestService.get(testId)
      .then((response) => {
        setCurrentTest(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const retrieveQuestions = () => {
    QuestionService.getAll()
      .then((response) => {
        setQuestions(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSave({ ...save, [name]: value });
  };

  useEffect(() => {
    getTest(props.match.params.id);
    retrieveQuestions();
  }, [props.match.params.id]);

  const saveQuestion = () => {
    var data = {
      testId: save.testId,
      questionId: save.questionId,
    };

    TestService.addQuestions(data)
      .then((response) => {
        setSubmitted(true);
        setSave({
          testId: response.data.testId,
          questionId: response.data.questionId,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const newQuestion = () => {
    setSave(initialSaveState);
    setSubmitted(false);
  };

  return (
    <div>
      <Fragment>
        <PageTitle
          enablePageActions
          actions={() => (
            <div>
              <a href="/test">
                <div class="button-create" id="button-3">
                  <div id="circle"></div>
                  <Link to="/test" style={{ color: "black", fontSize: "13px" }}>
                    Go Back
                  </Link>
                </div>
              </a>
            </div>
          )}
        />
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Col md="1">
            <Card
              className="cards"
              style={{ width: "70rem", height: "100%", align: "center" }}
            >
              <CardBody>
                <div className="submit-form">
                  {submitted ? (
                    <div>
                      <h4>You submitted successfully!</h4>
                      <buttion class="btn btn-success" onClick={newQuestion}>
                        add
                      </buttion>
                    </div>
                  ) : (
                    <div>
                      <div className="form-group">
                        <label htmlFor="Question">Tests</label>
                        <Input
                          type="select"
                          name="testId"
                          id="testId"
                          onChange={handleInputChange}
                        >
                          <option>Tests</option>

                          {currentTest ? (
                            <option key={currentTest.id} value={currentTest.id}>
                              {currentTest.name}
                            </option>
                          ) : (
                            <option>loading...</option>
                          )}
                        </Input>
                      </div>
                      <div className="form-group">
                        <label htmlFor="Question">Questions</label>
                        <Input
                          type="select"
                          name="questionId"
                          id="questionId"
                          onChange={handleInputChange}
                        >
                          <option>Questions</option>

                          {questions ? (
                            questions.map((question) =>
                              question.category === currentTest.category ? (
                                <option key={question.id} value={question.id}>
                                  {question.question}--{question.difficulty}
                                </option>
                              ) : (
                                <option>void</option>
                              )
                            )
                          ) : (
                            <option>loading...</option>
                          )}
                        </Input>
                      </div>

                      <button
                        onClick={saveQuestion}
                        className="btn btn-success"
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </ReactCSSTransitionGroup>
      </Fragment>
    </div>
  );
}

export default AddQuestionsContainer;
