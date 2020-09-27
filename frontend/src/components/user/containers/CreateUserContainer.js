import React, { useState } from "react";
import UserService from "./../../../services/UserService";
import { Redirect } from "react-router-dom";
import PageTitle from "../../../routing/PageTitle";
import { Link } from "react-router-dom";
import {Input} from 'reactstrap';
function CreateUserContainer() {
  const [redirect] = useState(false);
  const initialUserState = {
    login: "",
    pwd: "",
    urole: "",
    email: "",
    prenom: "",
    nom: "",
  };
  const [user, setUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const saveUser = () => {
    var data = {
      login: user.login,
      pwd: user.pwd,
      urole: user.urole,
      email: user.email,
      prenom: user.prenom,
      nom: user.nom,
    };

    UserService.create(data)
      .then((response) => {
        setUser({
          login: response.data.login,
          pwd: response.data.pwd,
          urole: response.data.urole,
          email: response.data.email,
          prenom: response.data.prenom,
          nom: response.data.nom,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return redirect ? (
    <Redirect to="/user" />
  ) : (
    <div>
      <PageTitle
        heading="Add new User"
        subheading="User form "
        icon="pe-7s-rocket"
        enablePageTitleIcon
        enablePageTitleSubheading
        enablePageActions
        actions={() => (
          <div>
            <a href="/user">
              <div class="button-create" id="button-3">
                <div id="circle"></div>
                <Link to="/user" style={{ color: "black", fontSize: "13px" }}>
                  Go back users list
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
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Login</label>
              <input
                type="text"
                className="form-control"
                id="login"
                required
                value={user.login}
                onChange={handleInputChange}
                name="login"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">PWD</label>
              <input
                type="text"
                className="form-control"
                id="pwd"
                required
                value={user.pwd}
                onChange={handleInputChange}
                name="pwd"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">urole</label>
              <Input
                type="select"
                className="form-control"
                id="urole"
                required
                onChange={handleInputChange}
                name="urole"
              >
                <option key="1" value="admin">Admin</option>
                <option key="2" value="user">Candidate</option>
              </Input>
            </div>

            <div className="form-group">
              <label htmlFor="description">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                value={user.email}
                onChange={handleInputChange}
                name="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="prenom"
                required
                value={user.prenom}
                onChange={handleInputChange}
                name="prenom"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">First Name</label>
              <input
                type="text"
                className="form-control"
                id="nom"
                required
                value={user.nom}
                onChange={handleInputChange}
                name="nom"
              />
            </div>

            <button onClick={saveUser} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateUserContainer;
