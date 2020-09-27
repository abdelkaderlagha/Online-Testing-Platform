import React, {Component, Fragment} from 'react';

import cx from 'classnames';
import Nav from '../AppNav/VerticalNavWrapper';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PerfectScrollbar from 'react-perfect-scrollbar';
import HeaderLogo from '../AppLogo';

class AppSidebar extends Component {

    state = {};

    render() {
      let {
        backgroundColor,
        enableBackgroundImage,
        enableSidebarShadow,
        backgroundImage,
        backgroundImageOpacity,
      } = this.props;
      backgroundColor = 'bg-royal sidebar-text-light';
      enableBackgroundImage = true;
      enableSidebarShadow = true;
      backgroundImage = 'https://www.samapartners.com/sites/default/files/slide_03_0.jpg';
      backgroundImageOpacity = 'opacity-2';
      return (
        <Fragment>
          <div className="sidebar-mobile-overlay" onClick={this.toggleMobileSidebar}/>
          <ReactCSSTransitionGroup
            component="div"
            className={cx('app-sidebar', backgroundColor, {'sidebar-shadow': enableSidebarShadow})}
            transitionName="SidebarAnimation"
            transitionAppear={true}
            transitionAppearTimeout={1500}
            transitionEnter={false}
            transitionLeave={false}>
            <HeaderLogo/>
            <PerfectScrollbar>
              <div className="app-sidebar__inner">
                <Nav/>
              </div>
            </PerfectScrollbar>
            <div
              className={cx('app-sidebar-bg sidebar-text-light', backgroundImageOpacity)}
              style={{
                backgroundImage: enableBackgroundImage ? 'url(' + backgroundImage + ')' : null
              }}>
            </div>
          </ReactCSSTransitionGroup>
        </Fragment>
      );
    }
}


export default AppSidebar;