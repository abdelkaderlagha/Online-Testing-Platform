import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../../../routing/PageTitle";
import UserService from "./../../../services/UserService";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

function UsersContainer() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveUsers();
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

  const setActiveUser = (user, index) => {
    setCurrentUser(user);
    setCurrentIndex(index);
  };

  return (
    <div>
      <Fragment>
        <PageTitle
          heading="Candidates"
          subheading="Show all Candidates"
          icon="pe-7s-note2"
          enablePageTitleIcon
          enablePageTitleSubheading
          enablePageActions
          actions={() => (
            <div>
              <a href="/user/create">
                <div class="button-create" id="button-3">
                  <div id="circle"></div>
                  <Link
                    to="/user/create"
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
        <PageTitle
          heading="Assign candidates to test"
          icon="pe-7s-note2"
          enablePageTitleIcon
          enablePageActions
          actions={() => (
            <div>
              <a href="/user/assign">
                <div class="button-create" id="button-3">
                  <div id="circle"></div>
                  <Link
                    to="/user/assign"
                    style={{ color: "black", fontSize: "13px" }}
                  >
                    Assign
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
                {users &&
                  users.map((user, index) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => setActiveUser(user, index)}
                      key={index}
                    >
                      {user.prenom} {user.nom}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="col-md-6">
              {currentUser ? (
                <div>
                  <h4>User</h4>
                  <div>
                    <label>
                      <strong>Login:</strong>
                    </label>{" "}
                    {currentUser.login}
                  </div>

                  <Link
                    to={"/user/" + currentUser.login}
                    className="badge badge-warning"
                  >
                    Edit
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a user...</p>
                </div>
              )}
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    </div>
  );
}

export default UsersContainer;
