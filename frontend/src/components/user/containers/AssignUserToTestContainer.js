import React, { Fragment, useState, useEffect } from "react";
import UserService from "../../../services/UserService";
import TestService from "../../../services/TestService";
import { Link } from "react-router-dom";
import PageTitle from "../../../routing/PageTitle";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Col, Card, CardBody, Input } from "reactstrap";

function AssignUserToTestContainer(props) {
  const initialEnrollState = {
    user_login: "",
    test_id: null,
    test_date: "",
    test_status: "",
    score: ""
  };
  const [enroll, setEnroll] = useState(initialEnrollState);
  const [users, setUsers] = useState([]);
  const [tests, setTests] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEnroll({ ...enroll, [name]: value });
  };
  useEffect(() => {
    retrieveUsers();
    retrieveTests();
  }, []);

  const retrieveUsers = () => {
    UserService.getAll()
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const retrieveTests = () => {
    TestService.getAll()
      .then((response) => {
        setTests(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const saveEnroll = () => {
    var data = {
      user_login: enroll.user_login,
      test_id: enroll.test_id,
      test_date: enroll.test_date,
      test_status: enroll.test_status,
      score: enroll.score
    };

    UserService.addTests(data)
      .then((response) => {
        setSubmitted(true);
        setEnroll({
          user_login: response.data.user_login,
          test_id: response.data.test_id,
          test_date: response.data.test_date,
          test_status: response.data.test_status,
          score: response.data.score
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <Fragment>
        <PageTitle
          enablePageActions
          actions={() => (
            <div>
              <a href="/user">
                <div class="button-create" id="button-3">
                  <div id="circle"></div>
                  <Link to="/user" style={{ color: "black", fontSize: "13px" }}>
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
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="Question">User Login</label>
              <Input
                type="select"
                name="user_login"
                id="user_login"
                onChange={handleInputChange}
              >
                <option>User Login</option>

                {users ? (
                  users.map(user => (
                    <option key={user.login} value={user.login}>
                      {user.login} : {user.prenom}-{user.nom}
                    </option>
                  ))
                ) : (
                  <option>loading...</option>
                )}
              </Input>
            </div>
            <div className="form-group">
              <label htmlFor="Question">Test Name</label>
              <Input
                type="select"
                name="test_id"
                id="test_id"
                onChange={handleInputChange}
              >
                <option>Tests</option>

                {tests ? (
                  tests.map(test => (
                    <option key={test.id} value={test.id}>
                      {test.name}
                    </option>
                  ))
                ) : (
                  <option>loading...</option>
                )}
              </Input>
            </div>
            <div className="form-group">
              <label htmlFor="Difficulty">Test Date</label>
              <input
                type="date"
                className="form-control"
                id="test_date"
                required
                value={enroll.test_date}
                onChange={handleInputChange}
                name="test_date"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Time">Test Status</label>
              <Input
                type="select"
                name="test_status"
                id="test_status"
                onChange={handleInputChange}
              >
                <option key="1" value="pending">pending</option>
                <option key="2" value="progress">progress</option>
                <option key="3" value="finished">finished</option>
               
              </Input>
            </div>
            <div className="form-group">
              <label htmlFor="Question">Test Score</label>
              <input
                type="text"
                className="form-control"
                id="score"
                placeholder="Test Score"
                required
                value={enroll.score}
                onChange={handleInputChange}
                name="score"
              />
            </div>
            

            <button onClick={saveEnroll} className="btn btn-success">
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

export default AssignUserToTestContainer;
