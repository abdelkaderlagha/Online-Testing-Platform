import React, { useState, useEffect, Fragment } from "react";
import { Table } from "reactstrap";
import UserService from "../../services/UserService";
import TestService from "../../services/TestService";
import { Link } from "react-router-dom";
function DashboardContainer(props) {

  const initialTestState = {
    id: null,
    name: "",
    category: "",
    ttime: "",
    needs_score: "",
  };
  const [currentTest, setCurrentTest] = useState(initialTestState);
  const [users, setUsers] = useState([]);
  const getTest = (testId) => {
    TestService.get(testId)
      .then((response) => {
        setCurrentTest(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveUsers = () => {
    UserService.getAllUsertests()
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
  useEffect(() => {
    retrieveUsers();
  }, []);

  
    return (
        <Fragment>
            <Table>
        <thead>
          <tr>
            <th className=" text-center">#</th>
            <th>Test_ID</th>
            <th>Tests Status</th>
            <th>Test Date</th>
            <th className=" text-right">Details</th>
          </tr>
        </thead>
        <tbody>
        { users?(users.map(user =>
          <tr>
            <td className=" text-center">{user.user_login}</td>
            <td>{user.test_id}</td>
            <td>{user.test_status}</td>
            <td>{user.test_date}</td>
            <td className=" text-right"><a href={"/results/"+user.user_login}>
               See details ..
              </a></td>
          </tr>
          )):(<p>Emty set ...</p>)}
        </tbody>
      </Table>
        </Fragment>
    )
}

export default DashboardContainer
