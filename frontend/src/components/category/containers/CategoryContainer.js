import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import CategoryService from "./../../../services/CategoryServices";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import PageTitle from "../../../routing/PageTitle";
function CategoryContainer(props) {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

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

  const setActiveCategory = (category, index) => {
    setCurrentCategory(category);
    setCurrentIndex(index);
  };

  return (
    <div>
      <Fragment>
        <PageTitle
          heading="Categories"
          icon="pe-7s-share"
          enablePageTitleIcon
          enablePageTitleSubheading
          enablePageActions
          actions={() => (
            <div>
              <a href="/category/create">
                <div class="button-create" id="button-3">
                  <div id="circle"></div>
                  <Link
                    to="/category/create"
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
          <div className="list row">
            <div className="col-md-6">
              <ul className="list-group">
                {categories &&
                  categories.map((category, index) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => setActiveCategory(category, index)}
                      key={index}
                    >
                      {category.name}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="col-md-6">
              {currentCategory ? (
                <div>
                  <h4>Category</h4>
                  <div>
                    <label>
                      <strong>Name:</strong>
                    </label>{" "}
                    {currentCategory.name}
                  </div>
                  <div>
                    <label>
                      <strong>Description:</strong>
                    </label>{" "}
                    {currentCategory.description}
                  </div>

                  <Link
                    to={"/category/" + currentCategory.name}
                    className="badge badge-warning"
                  >
                    Edit
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a category...</p>
                </div>
              )}
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    </div>
  );
}

export default CategoryContainer;