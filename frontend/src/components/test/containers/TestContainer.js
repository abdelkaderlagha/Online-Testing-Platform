import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../../../routing/PageTitle";
import TestService from "../../../services/TestService";
import { Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "bootstrap/dist/css/bootstrap.min.css";

const TestContainer = (props) => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    retrieveTests();
  }, []);

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

  return (
    <div>
      <Fragment>
        <PageTitle
          heading="Tests"
          subheading="Interview Tests"
          icon="pe-7s-note2"
          enablePageTitleIcon
          enablePageTitleSubheading
          enablePageActions
          actions={() => (
            <div>
              <a href="/test/create">
                <div class="button-create" id="button-3">
                  <div id="circle"></div>
                  <Link
                    to="/test/create"
                    style={{ color: "black", fontSize: "13px" }}
                  >
                    Create
                  </Link>
                </div>
              </a>
            </div>
          )}
        />
      </Fragment>
      <Fragment>
        <div>
          <ReactCSSTransitionGroup
            component="div"
            transitionName="TabsAnimation"
            transitionAppear={true}
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}
          >
            <Row align="center">
              <Col md="3">
                {tests.map((test) => (
                  <Card
                    className="cards"
                    style={{ width: "15rem", height: "15rem", align: "center" }}
                  >
                    <CardBody>
                      <div>
                        <CardTitle>
                          <h3>{test.name}</h3>
                        </CardTitle>
                      </div>
                      <div>
                        <CardTitle>
                          <span class="badge badge-warning">
                            {test.category}
                          </span>
                        </CardTitle>
                      </div>
                      <div>
                        <CardTitle>
                          <span class="badge badge-success">
                           ID: {test.id}
                          </span>
                        </CardTitle>
                      </div>
                      <div>
                        <CardTitle>
                          <span class="badge badge-danger">
                            Time :{test.ttime}
                          </span>
                        </CardTitle>
                      </div>

                      <div>
                        <br />
                      </div>
                      <div>
                        <p
                          style={{
                            position: "absolute",
                            bottom: 5,
                            left: 27,
                          }}
                        >
                        <Link to={"/test/view/"+test.id}>
                          <Button
                            outline
                            className="mb-2 mr-2 btn-transition"
                            color="danger"
                          >
                            Start Test
                          </Button>
                          </Link>
                          <Link to={"/test/" + test.id}>
                            <Button
                              outline
                              className="mb-2 mr-2 btn-transition"
                              color="primary"
                            >
                              Details
                            </Button>
                          </Link>
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </Col>
            </Row>
          </ReactCSSTransitionGroup>
        </div>
      </Fragment>
    </div>
  );
};
export default TestContainer;
