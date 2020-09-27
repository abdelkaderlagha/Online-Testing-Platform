import React, { useState, useEffect } from "react";
import QuestionService from "../../../services/QuestionService";
import { Link } from "react-router-dom";
import PageTitle from "../../../routing/PageTitle";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

function QuestionDetails(props) {
  const initialQuestionState = {
    id: null,
    question: "",
    category: "",
    difficulty: "",
    qtime: "",
    score: "",
    question_img: "",
    is_enabled: "",
  };
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestionState);
  const [message, setMessage] = useState("");

  const getQuestion = (id) => {
    QuestionService.get(id)
      .then((response) => {
        setCurrentQuestion(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getQuestion(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentQuestion({ ...currentQuestion, [name]: value });
  };

  const updateQuestion = () => {
    QuestionService.update(currentQuestion.id, currentQuestion)
      .then((response) => {
        console.log(response.data);
        setMessage("The question was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteQuestion = () => {
    QuestionService.remove(currentQuestion.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/question");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  
  return (
    <div>
      <PageTitle
        heading="Update Question"
        icon="pe-7s-share"
        enablePageTitleIcon
        enablePageTitleSubheading
        enablePageActions
        actions={() => (
          <div>
            <a href={"/addAnswer/"+currentQuestion.id}>
              <div class="button-create" id="button-3">
                <div id="circle"></div>
                <Link
                  to={"/addAnswer/"+currentQuestion.id}
                  style={{ color: "black", fontSize: "13px" }}
                >
                  Add Answer
                </Link>
              </div>
            </a>
            <a href="/question">
              <div class="button-create" id="button-3">
                <div id="circle"></div>
                <Link
                  to="/question"
                  style={{ color: "black", fontSize: "13px" }}
                >
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
      ></ReactCSSTransitionGroup>
      <div>
     
        {currentQuestion ? (
          <div className="edit-form">
            <h4>Question</h4>
            <form>
              <div className="form-group">
                <label htmlFor="Question">Question</label>
                <input
                  type="text"
                  className="form-control"
                  id="question"
                  required
                  value={currentQuestion.question}
                  onChange={handleInputChange}
                  name="question"
                />
              </div>

              <div className="form-group">
                <label htmlFor="Time">Question Time</label>
                <input
                  type="text"
                  className="form-control"
                  id="qtime"
                  required
                  value={currentQuestion.qtime}
                  onChange={handleInputChange}
                  name="qtime"
                />
              </div>
              <div className="form-group">
                <label htmlFor="Question">Question Score</label>
                <input
                  type="text"
                  className="form-control"
                  id="score"
                  required
                  value={currentQuestion.score}
                  onChange={handleInputChange}
                  name="score"
                />
              </div>
              <div className="form-group">
                <label htmlFor="Question">Question Image</label>
                <input
                  type="text"
                  className="form-control"
                  id="question_img"
                  required
                  value={currentQuestion.question_img}
                  onChange={handleInputChange}
                  name="question_img"
                />
              </div>
              <div className="form-group">
                <label htmlFor="Question">Is Enabled</label>
                <input
                  type="text"
                  className="form-control"
                  id="is_enabled"
                  required
                  value={currentQuestion.is_enabled}
                  onChange={handleInputChange}
                  name="is_enabled"
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={deleteQuestion}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={updateQuestion}
            >
              Update
            </button>
            <p>{message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a question...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionDetails;
