import React, { useState, useEffect } from "react";
import CategoryService from "../../../services/CategoryServices";
import { Link } from "react-router-dom";
import PageTitle from "../../../routing/PageTitle";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

function CategoryDetails(props) {
  const initialCategoryState = {
    name: "",
    description: "",
  };
  const [currentCategory, setCurrentCategory] = useState(initialCategoryState);
  const [message, setMessage] = useState("");

  const getCategory = (id) => {
    CategoryService.get(id)
      .then((response) => {
        setCurrentCategory(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCategory(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentCategory({ ...currentCategory, [name]: value });
  };

  const updateCategory = () => {
    CategoryService.update(currentCategory.name, currentCategory)
      .then((response) => {
        console.log(response.data);
        setMessage("The category was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteCategory = () => {
    CategoryService.remove(currentCategory.name)
      .then((response) => {
        console.log(response.data);
        props.history.push("/category");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  console.log(currentCategory);
  return (
    <div>
      <PageTitle
        heading="Update Category"
        icon="pe-7s-share"
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
        {currentCategory ? (
          <div className="edit-form">
            <h4>Category</h4>
            <form>
              <div className="form-group">
                <label htmlFor="Category">Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={currentCategory.name}
                  onChange={handleInputChange}
                  name="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="Time">Category Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={currentCategory.description}
                  onChange={handleInputChange}
                  name="description"
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={deleteCategory}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={updateCategory}
            >
              Update
            </button>
            <p>{message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a category...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryDetails;
