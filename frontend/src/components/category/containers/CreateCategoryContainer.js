import React, { useState } from "react";
import CategoryService from "./../../../services/CategoryServices";
import { Redirect } from "react-router-dom";
import PageTitle from "../../../routing/PageTitle";
import { Link } from "react-router-dom";

function CreateCategoryContainer() {
  const [redirect] = useState(false);
  const initialCategoryState = {
    id: null,
    name: "",
    description: "",
  };
  const [category, setCategory] = useState(initialCategoryState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value });
  };
  const saveCategory = () => {
    var data = {
      name: category.name,
      description: category.description,
    };

    CategoryService.create(data)
      .then((response) => {
        setCategory({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newCategory = () => {
    setCategory(initialCategoryState);
    setSubmitted(false);
  };

  return redirect ? (
    <Redirect to="/category" />
  ) : (
    <div>
      <PageTitle
        heading="Add new Category"
        subheading="Category form "
        icon="pe-7s-rocket"
        enablePageTitleIcon
        enablePageTitleSubheading
        enablePageActions
        actions={() => (
          <div>
            <a href="/category">
              <div class="button-create" id="button-3">
                <div id="circle"></div>
                <Link
                  to="/category"
                  style={{ color: "black", fontSize: "13px" }}
                >
                  Go back category list
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
            <button className="btn btn-success" onClick={newCategory}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={category.name}
                onChange={handleInputChange}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={category.description}
                onChange={handleInputChange}
                name="description"
              />
            </div>

            <button onClick={saveCategory} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateCategoryContainer;
