import {
    Route,
    Switch
  } from 'react-router-dom';
  import React, { Suspense, lazy, Fragment } from 'react';
  import AppHeader from '../layout/AppHeader';
  import AppSidebar from '../layout/AppSidebar';
  import { ToastContainer } from 'react-toastify';
  import { AppContext } from '../AppContext';
import AddQuestionsContainer from '../components/test/containers/AddQuestionsContainer';
  

  
  const Users = lazy(() => import('../components/user/containers/UsersContainer'));
  const CreateUsers = lazy(() => import('../components/user/containers/CreateUserContainer'));
  const AssignUsers = lazy(() => import('../components/user/containers/AssignUserToTestContainer'));
  const UsersDetails = lazy(() => import('../components/user/containers/UserDetails'));

  const Categories = lazy( () => import('../components/category/containers/CategoryContainer'))
  const CreateCategories = lazy(() => import('../components/category/containers/CreateCategoryContainer'));
  const CategoryDetails = lazy(() => import('../components/category/containers/CategoryDetails'));

  

  const Questions = lazy( () => import('../components/question/containers/QuestionContainer'));
  const CreateQuestions = lazy(() => import('../components/question/containers/CreateQuestionContainer'));
  const QuestionsDetails = lazy(() => import('../components/question/containers/QuestionDetails'));
  const AddAnwsers = lazy(() => import('../components/question/containers/CreateAnswerContainer'));
  

  const Tests = lazy( () => import('./../components/test/containers/TestContainer'));
  const ViewTests = lazy(() => import('./../components/test/containers/ViewTestContainer'));
  const CreateTests = lazy( () => import('./../components/test/containers/CreateTestContainer'));
  const testDetails = lazy( () => import('./../components/test/containers/TestDetails'));
  const addQuestion = lazy( () => import('./../components/test/containers/AddQuestionsContainer'));

  const dash = lazy( () => import('./../components/dashboard/DashboardContainer'));
  const results = lazy( () => import('./../components/test/Result/index'));
  class AppMain extends React.Component {
  
    static contextType = AppContext;
    render() {
    
      return (
        <Fragment>
          <AppHeader />
          <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
              <div className="app-main__inner">
                <Suspense fallback={
                  <div className="loader-container">
                    <div className="loader-container-inner">
                      <h6 className="mt-3">
                        Loading page
                      </h6>
                    </div>
                  </div>
                }>
                  <Switch>
                   
                  <Route  exact path="/" component={Tests} />
                    <Route path="/user" exact component={Users} />
                    <Route path="/user/create" exact component={CreateUsers} />
                    <Route path="/user/assign" exact component={AssignUsers} />
                    <Route path="/user/:id" exact component={UsersDetails} />
                    
                    
                   
                    

                    <Route path="/category" exact component={Categories} />
                    <Route path="/category/create" exact component={CreateCategories} />
                    <Route path="/category/:id" exact component={CategoryDetails} />
                    
                  
                    <Route path="/question" exact component={Questions} />
                    <Route path="/question/create" exact component={CreateQuestions} />
                    <Route path="/addAnswer/:id" exact component={AddAnwsers} />
                    <Route path="/question/:id" exact component={QuestionsDetails} />
                    
                    
                    <Route path="/test" exact component={Tests} />
                    <Route path="/test/create" exact component={CreateTests} />
                    <Route path="/test/addQuestion/:id" exact component={addQuestion} />
                    <Route path="/test/view/:id" exact component={ViewTests} />
                    <Route path="/test/:id" exact component={testDetails} />
                    
                    
                    <Route path="/dashboard" exact component={dash} />
                    <Route path="/results/:id" exact component={results} />
                    
                    
                  </Switch>
  
                </Suspense>
  
  
              </div>
  
            </div>
          </div>
          <ToastContainer />
        </Fragment>
      );
    }
  };
  
  export default AppMain;
  