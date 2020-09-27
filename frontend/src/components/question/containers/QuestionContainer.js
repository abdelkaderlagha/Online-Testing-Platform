import React, { useState, useEffect, Fragment } from "react";
import QuestionService from "../../../services/QuestionService";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import PageTitle from "../../../routing/PageTitle";
import { Link } from "react-router-dom";
function QuestionContainer() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveQuestions();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
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

  const setActiveQuestion = (question, index) => {
    setCurrentQuestion(question);
    setCurrentIndex(index);
  };

  const findByTitle = () => {
    QuestionService.findByQuetionName(searchTitle)
      .then((response) => {
        setQuestions(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Fragment>
      <PageTitle
        heading="Questions"
        icon="pe-7s-share"
        enablePageTitleIcon
        enablePageTitleSubheading
        enablePageActions
        actions={() => (
          <div>
            <a href="/question/create">
              <div class="button-create" id="button-3">
                <div id="circle"></div>
                <Link
                  to="/question/create"
                  style={{ color: "black", fontSize: "13px" }}
                >
                  Create
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
        <div>
          <div className="list row">
            <div className="col-md-8">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by question"
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={findByTitle}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h4>Questions List</h4>

              <ul className="list-group">
                {questions &&
                  questions.map((question, index) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => setActiveQuestion(question, index)}
                      key={index}
                    >
                      {question.question}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="col-md-6">
              {currentQuestion ? (
                <div>
                  <h4>question</h4>
                  <div>
                    <label>
                      <strong>Question/Statement:</strong>
                    </label>{" "}
                    {currentQuestion.question}
                  </div>
                  <div>
                    <label>
                      <strong>Category:</strong>
                    </label>{" "}
                    {currentQuestion.category}
                  </div>
                  <div>
                    <label>
                      <strong>Answers:</strong>
                    </label>{" "}
                    {currentQuestion.answers.map((answer) => (
                      <div> {answer.answer} </div>
                    ))}
                  </div>

                  <Link
                    to={"/question/" + currentQuestion.id}
                    className="badge badge-warning"
                  >
                    Edit
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a Question...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    </Fragment>
  );
}

export default QuestionContainer;
