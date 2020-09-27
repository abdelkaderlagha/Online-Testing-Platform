import React, { useState, useEffect } from "react";
import TestService from "../../../services/TestService";
import CategoryService from "../../../services/CategoryServices";
import { Redirect } from "react-router-dom";
import PageTitle from "../../../routing/PageTitle";
import { Link } from "react-router-dom";
import { Input } from "reactstrap";

function CreateTestContainer() {
  const [redirect] = useState(false);
  const initialTestState = {
    id: null,
    name: "",
    category: "",
    ttime: "",
    needs_score: "",
  };
  const [categories, setCategories] = useState([]);
  const [test, setTest] = useState(initialTestState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTest({ ...test, [name]: value });
  };
  const saveTest = () => {
    var data = {
      name: test.name,
      category: test.category,
      ttime: test.ttime,
      needs_score: test.needs_score,
    };

    TestService.create(data)
      .then((response) => {
        setTest({
          id: response.data.id,
          name: response.data.name,
          category: response.data.category,
          ttime: response.data.ttime,
          needs_score: response.data.needs_score,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newTest = () => {
    setTest(initialTestState);
    setSubmitted(false);
  };

  useEffect(() => {
    retrieveCategories();
  }, []);

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

  return redirect ? (
    <Redirect to="/test" />
  ) : (
    <div>
      <PageTitle
        heading="Add new Test"
        subheading="Test form "
        icon="pe-7s-rocket"
        enablePageTitleIcon
        enablePageTitleSubheading
        enablePageActions
        actions={() => (
          <div>
            <a href="/test">
              <div class="button-create" id="button-3">
                <div id="circle"></div>
                <Link to="/test" style={{ color: "black", fontSize: "13px" }}>
                  Go back Test list
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
            <button className="btn btn-success" onClick={newTest}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Test Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={test.name}
                onChange={handleInputChange}
                name="name"
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
              <label htmlFor="name">Test Time</label>
              <input
                type="text"
                className="form-control"
                id="ttime"
                required
                value={test.ttime}
                onChange={handleInputChange}
                name="ttime"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Needs Score ?</label>
              <Input
                type="select"
                name="needs_score"
                id="needs_score"
                className="form-control"
                onChange={handleInputChange}
                value={test.needs_score}
                required
              >
                <option key="1" value="yes">
                  Yes
                </option>
                <option key="2" value="no">
                  No
                </option>
              </Input>
            </div>

            <button onClick={saveTest} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateTestContainer;
