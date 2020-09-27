import React, {Fragment} from 'react';

import Hamburger from 'react-hamburgers';

import cx from 'classnames';

import {
  faEllipsisV,

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
  Button
} from 'reactstrap';
import { AppContext } from '../../AppContext';

class AppMobileMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      mobile: false,
      activeSecondaryMenuMobile: false
    };

  }

    state = {
      openLeft: false,
      openRight: false,
      relativeWidth: false,
      width: 280,
      noTouchOpen: false,
      noTouchClose: false,
    };

    render() {
      let {
        enableMobileMenu,
      } = this.props;

      return (
        <AppContext.Consumer>
          {(context) => (
            <Fragment>
              <div className="app-header__mobile-menu">
                <div onClick={() => context.toggleMobileSidebar()}>
                  <Hamburger
                    active={enableMobileMenu}
                    type="elastic"
                    onClick={() => this.setState({activeMobile: !this.state.activeMobile})}
                  />
                </div>
              </div>
              <div className="app-header__menu">
                <span onClick={() => context.toggleMobileSmall()}>
                  <Button size="sm"
                    className={cx('btn-icon btn-icon-only', {active: this.state.activeSecondaryMenuMobile})}
                    color="primary"
                    onClick={() => this.setState({activeSecondaryMenuMobile: !this.state.activeSecondaryMenuMobile})}>
                    <div className="btn-icon-wrapper"><FontAwesomeIcon icon={faEllipsisV}/></div>
                  </Button>
                </span>
              </div> 
            </Fragment>
          )}</AppContext.Consumer>
      );
    }
}

export default AppMobileMenu;