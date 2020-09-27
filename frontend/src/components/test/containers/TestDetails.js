import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../../../routing/PageTitle";
import TestService from "../../../services/TestService";
import {
  Card,
  CardBody,
  CardTitle,
  Alert,
  CardSubtitle,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "bootstrap/dist/css/bootstrap.min.css";

function TestDetails(props) {
  const initialTestState = {
    id: null,
    name: "",
    category: "",
    ttime: "",
    needs_score: "",
  };
  const [currentTest, setCurrentTest] = useState(initialTestState);

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

  useEffect(() => {
    getTest(props.match.params.id);
  }, [props.match.params.id]);

  const deleteTest = () => {
    TestService.remove(currentTest.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/test");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Fragment>
        <PageTitle
          heading="Test Details"
          icon="pe-7s-note2"
          enablePageTitleIcon
          enablePageActions
          actions={() => (
            <div>
              <a href={"/test/addQuestion/" + props.match.params.id}>
                <div class="button-create" id="button-3">
                  <div id="circle"></div>
                  <Link
                    to={"/test/addQuestion/" + props.match.params.id}
                    style={{ color: "black", fontSize: "13px" }}
                  >
                    Add questions
                  </Link>
                </div>
              </a>
              <a href={"/test/" + props.match.params.id}>
                <div class="button-create" id="button-3">
                  <div id="circle"></div>
                  <Link
                    to="/test/"
                    style={{ color: "black", fontSize: "13px" }}
                  >
                    Go back
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
          <Card className="main-card mb-3">
            <CardBody>
              <CardTitle>{currentTest.name} </CardTitle>
              <CardSubtitle>{currentTest.category}</CardSubtitle>
              <button className="badge badge-danger mr-2" onClick={deleteTest}>
                Delete
              </button>
              {console.log(currentTest.questions)}
              <ListGroup>
                <ListGroupItem>
                  <ListGroupItemHeading>Questions</ListGroupItemHeading>
                  {currentTest.questions ? (
                    currentTest.questions.map((question, index) => (
                      <div>
                        <ListGroupItemText>
                          <span className="text-danger">
                            {question.question}{" "}
                          </span>
                        </ListGroupItemText>

                        <ListGroupItemText>
                          <strong>Question Category:</strong>
                          {question.category}
                        </ListGroupItemText>
                        <ListGroupItemText>
                          <strong>Question Difficulty:</strong>{" "}
                          {question.difficulty}
                        </ListGroupItemText>
                      </div>
                    ))
                  ) : (
                    <Alert color="info">No Questions yet ...</Alert>
                  )}
                </ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
        </ReactCSSTransitionGroup>
      </Fragment>
    </div>
  );
}

export default TestDetails;
