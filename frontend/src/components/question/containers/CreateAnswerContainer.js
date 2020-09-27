import React, { useState, useEffect } from "react";
import AnswerService from "../../../services/AnswerService";
import QuestionService from "../../../services/QuestionService";
import { Redirect } from "react-router-dom";
import PageTitle from "../../../routing/PageTitle";
import { Link } from "react-router-dom";
import { Input } from "reactstrap";

function CreateAnswerContainer(props) {
  const [redirect] = useState(false);
  const initialAnswerState = {
    id: null,
    answer: "",
    field_type: "",
    answer_image: "",
    is_correct: "",
    questionId: "",
  };

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

  const getQuestion = (id) => {
    QuestionService.get(id)
      .then((response) => {
        setQuestion(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const [question, setQuestion] = useState(initialQuestionState);
  const [answer, setAnswer] = useState(initialAnswerState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAnswer({ ...answer, [name]: value });
  };
  const saveAnswer = () => {
    var data = {
      answer: answer.answer,
      field_type: answer.field_type,
      answer_image: answer.answer_image,
      is_correct: answer.is_correct,
      questionId: answer.questionId,
    };

    AnswerService.create(data)
      .then((response) => {
        setAnswer({
          id: response.data.id,
          answer: response.data.answer,
          field_type: response.data.field_type,
          answer_image: response.data.answer_image,
          is_correct: response.data.is_correct,
          questionId: response.data.questionId,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newAnswer = () => {
    setAnswer(initialAnswerState);
    setSubmitted(false);
  };

  useEffect(() => {
    getQuestion(props.match.params.id);
  }, [props.match.params.id]);


  return redirect ? (
    <Redirect to="/question" />
  ) : (
    <div>
      <PageTitle
        heading="Add new Answer"
        subheading="Answers form "
        icon="pe-7s-rocket"
        enablePageTitleIcon
        enablePageTitleSubheading
        enablePageActions
        actions={() => (
          <div>
            <a href="/question">
              <div class="button-create" id="button-3">
                <div id="circle"></div>
                <Link
                  to="/question"
                  style={{ color: "black", fontSize: "13px" }}
                >
                  Go back question list
                </Link>
              </div>
            </a>
          </div>
        )}
      />
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={newAnswer}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">questionId</label>
              <Input
                type="select"
                name="questionId"
                id="exampleSelect"
                onChange={handleInputChange}
              >      <option>Please select the question</option>
                {question ? (
                    
                    <option key={question.id} value={question.id}>
                      {question.question}
                    </option>
                  )
                 : (
                  <option>loading...</option>
                )}
              </Input>
            </div>
            <div className="form-group">
              <label htmlFor="name">Answer</label>
              <input
                type="text"
                className="form-control"
                id="answer"
                required
                value={answer.answer}
                onChange={handleInputChange}
                name="answer"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Field Type</label>
              <Input
                type="select"
                className="form-control"
                id="field_type"
                required
                value={answer.field_type}
                onChange={handleInputChange}
                name="field_type"
              >
                <option value="Checkbox">Checkbox</option>
                <option value="TextArea">TextArea</option>
              </Input>
            </div>
            <div className="form-group">
              <label htmlFor="name">Answer Image</label>
              <input
                type="text"
                className="form-control"
                id="answer_image"
                required
                value={answer.answer_image}
                onChange={handleInputChange}
                name="answer_image"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Is correct</label>
              <Input
                type="select"
                className="form-control"
                id="is_correct"
                required
                onChange={handleInputChange}
                name="is_correct"
                value={answer.is_correct}
              >
                <option key="1" value="1">
                  True
                </option>
                <option key="2" value="0">
                  False
                </option>
                <option key="3" value="2">
                  Needs admin
                </option>
              </Input>
            </div>

            <button onClick={saveAnswer} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateAnswerContainer;
