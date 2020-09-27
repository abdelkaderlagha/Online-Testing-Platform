import React, { useState, useEffect } from "react";
import UserService from "../../../services/UserService";
import { Link } from "react-router-dom";
import PageTitle from "../../../routing/PageTitle";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

function UserDetails(props) {
  const initialUserState = {
    login: "",
    pwd: "",
    urole: "",
    email: "",
    prenom: "",
    nom: "",
  };
  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [message, setMessage] = useState("");

  const getUser = (id) => {
    UserService.get(id)
      .then((response) => {
        setCurrentUser(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const deleteUser = () => {
    UserService.remove(currentUser.login)
      .then((response) => {
        console.log(response.data);
        props.history.push("/user");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <PageTitle
        icon="pe-7s-share"
        enablePageActions
        actions={() => (
          <div>
            <a href="/user">
              <div class="button-create" id="button-3">
                <div id="circle"></div>
                <Link to="/user" style={{ color: "black", fontSize: "13px" }}>
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
        {currentUser ? (
          <div className="edit-form">
            <h4>User</h4>
            <form>
              <div className="form-group">
                <label htmlFor="Category">User Login</label>
                <input
                  type="text"
                  className="form-control"
                  id="login"
                  required
                  value={currentUser.login}
                  onChange={handleInputChange}
                  name="login"
                />
              </div>

              <div className="form-group">
                <label htmlFor="Time">User Pwd</label>
                <input
                  type="text"
                  className="form-control"
                  id="pwd"
                  required
                  value={currentUser.pwd}
                  onChange={handleInputChange}
                  name="pwd"
                />
              </div>

              <div className="form-group">
                <label htmlFor="Time">User Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  required
                  value={currentUser.email}
                  onChange={handleInputChange}
                  name="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="Time">User Firstname</label>
                <input
                  type="text"
                  className="form-control"
                  id="prenom"
                  required
                  value={currentUser.prenom}
                  onChange={handleInputChange}
                  name="prenom"
                />
              </div>
              <div className="form-group">
                <label htmlFor="Time">User Lastname</label>
                <input
                  type="text"
                  className="form-control"
                  id="nom"
                  required
                  value={currentUser.nom}
                  onChange={handleInputChange}
                  name="nom"
                />
              </div>
            </form>

            <button className="badge badge-danger mr-2" onClick={deleteUser}>
              Delete
            </button>

            <p>{message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a user...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDetails;
