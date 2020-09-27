import React, { Fragment, useState } from "react";

import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import {
  Label,
  Col,
  Card,
  CardBody,
  CardTitle,
  Form,
  Button,
  FormGroup,
  Input
} from "reactstrap";

function UserForm(props) {

    const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        role: "",
        photo:"",
        email:"",
        password:""
      });
    
      const handleChange = event => {
        const { name, value } = event.target;
        setValues({
          ...values,
          [name]: value
        });
      };
    
      const handleSubmit = e => {
        e.preventDefault();
        props
          .submitForm({
            first_name: values.first_name,
            last_name: values.last_name,
            role: values.role,
            photo:values.photo,
            email:values.email,
            password:values.password
          })
          .then(() => {
            
            setValues({
              name: "",
              description: "",
              tags: "",
              link: "",
              image:"",
              role:""
            });
          })
          .catch(error => {
            console.log(error);
          });
      };
    

    return (
      <Fragment>
      <ReactCSSTransitionGroup
        component="div"
        transitionName="TabsAnimation"
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Card className="main-card mb-3">
          <CardBody>
            <CardTitle>Candidate</CardTitle>
            <Form initialValues={{ first_name: props.first_name,last_name: props.last_name,password: props.password, image: props.image,email:props.email, role: props.role }}
            onSubmit={handleSubmit}>
              <FormGroup row>
                <Label for="Name" sm={2}>
                  First name
                </Label>
                <Col sm={10}>
                  <Input type="text" value={values.first_name} name="first_name" onChange={handleChange} required/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="Name" sm={2}>
                  Last name
                </Label>
                <Col sm={10}>
                  <Input type="text" value={values.last_name} name="last_name" onChange={handleChange} required/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="Name" sm={2}>
                  Email
                </Label>
                <Col sm={10}>
                  <Input type="text" value={values.email} name="email" onChange={handleChange} required/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="Name" sm={2}>
                  Password
                </Label>
                <Col sm={10}>
                  <Input type="text" value={values.password} name="password" onChange={handleChange} required/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="Name" sm={2}>
                  Post
                </Label>
                <Col sm={10}>
                  <Input type="text" value={values.role} name="role" onChange={handleChange} required/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="Name" sm={2}>
                  Candidate unique ID
                </Label>
                <Col sm={10}>
                  <Input type="text" value={values.role} name="role" onChange={handleChange} required/>
                </Col>
              </FormGroup>

             
              <Button color="primary" className="mt-2">
              {" "}
                Save{" "}
              </Button>
            </Form>
          </CardBody>
        </Card>
      </ReactCSSTransitionGroup>
    </Fragment>
    )
}

export default UserForm
