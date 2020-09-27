import React, { Component, Fragment } from 'react';
import ResizeDetector from 'react-resize-detector';
import AppMain from './routing/';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContext, AppProvider } from './AppContext';
import cx from 'classnames';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      closedSmallerSidebar: false
    };
  }

  render() {
    let {
      colorScheme,
      enableFixedHeader,
      enableFixedSidebar,
      enableFixedFooter,
      closedSmallerSidebar
    } = this.props;
    colorScheme = 'white';
    enableFixedSidebar = true;
    enableFixedHeader = true;
    return (
      <Router>
        <ResizeDetector
          handleWidth
          render={({ width }) => (
            <Fragment>
              <AppProvider>
                <AppContext.Consumer>
                  {(context) => (
                    <div className={cx(
                      'app-container app-theme-' + colorScheme,
                      { 'fixed-header': enableFixedHeader },
                      { 'fixed-sidebar': enableFixedSidebar || width < 1250 },
                      { 'fixed-footer': enableFixedFooter },
                      { 'closed-sidebar': context.state.enableClosedSidebar || width < 1250 },
                      { 'closed-sidebar-mobile': closedSmallerSidebar || width < 1250 },
                      { 'sidebar-mobile-open': context.state.enableMobileMenu },
                    )}>
                      <AppMain />
                    </div>)}
                </AppContext.Consumer>
              </AppProvider>
            </Fragment>
          )}
        />
      </Router>
    );
  }
}
export default App;
