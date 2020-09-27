import React, { useState, useEffect } from "react";
import QuestionService from "../../../services/QuestionService";
import CategoryService from "../../../services/CategoryServices";
import { Redirect } from "react-router-dom";
import PageTitle from "../../../routing/PageTitle";
import { Link } from "react-router-dom";
import { Input } from "reactstrap";

function CreateQuestionContainer() {
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
  const [categories, setCategories] = useState([]);
  const [question, setQuestion] = useState(initialQuestionState);
  const [submitted, setSubmitted] = useState(false);
  const [redirect] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setQuestion({ ...question, [name]: value });
  };

  const retrieveCategories = () => {
    CategoryService.getAll()
      .then((response) => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const saveQuestion = () => {
    var data = {
      question: question.question,
      category: question.category,
      difficulty: question.difficulty,
      qtime: question.qtime,
      score: question.score,
      question_img: question.question_img,
      is_enabled: question.is_enabled,
    };

    QuestionService.create(data)
      .then((response) => {
        setQuestion({
          id: response.data.id,
          question: response.data.question,
          category: response.data.category,
          difficulty: response.data.difficulty,
          qtime: response.data.qtime,
          score: response.data.score,
          question_img: response.data.question_img,
          is_enabled: response.data.is_enabled,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const newQuestion = () => {
    setQuestion(initialQuestionState);
    setSubmitted(false);
  };

  useEffect(() => {
    retrieveCategories();
  }, []);
  return redirect ? (
    <Redirect to="/question" />
  ) : (
    <div>
      <PageTitle
        heading="Add new Question"
        subheading="Question form "
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
                  Go back to question list
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
            <buttion class="btn btn-success" onClick={newQuestion}>
                        add
                      </buttion>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="Question">Question</label>
              <input
                type="text"
                className="form-control"
                id="question"
                required
                value={question.question}
                onChange={handleInputChange}
                name="question"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Question">Category</label>
              <Input
                type="select"
                name="category"
                id="exampleSelect"
                onChange={handleInputChange}
              >
                <option>Category</option>

                {categories ? (
                  categories.map(({ name }) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))
                ) : (
                  <option>loading...</option>
                )}
              </Input>
            </div>
            <div className="form-group">
              <label htmlFor="Difficulty">Difficulty</label>
              <Input
                type="select"
                name="difficulty"
                id="exampleSelect"
                onChange={handleInputChange}
              >
                <option key="1" value="easy">
                  Easy
                </option>
                <option key="2" value="medium">
                  Medium
                </option>
                <option key="3" value="expert">
                  Expert
                </option>
              </Input>
            </div>
            <div className="form-group">
              <label htmlFor="Time">Question Time</label>
              <input
                type="text"
                className="form-control"
                id="qtime"
                required
                value={question.qtime}
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
                value={question.score}
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
                value={question.question_img}
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
                value={question.is_enabled}
                onChange={handleInputChange}
                name="is_enabled"
              />
            </div>

            <button onClick={saveQuestion} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateQuestionContainer;
