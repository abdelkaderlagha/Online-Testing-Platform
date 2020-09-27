import React, { Fragment } from 'react';
import Hamburger from 'react-hamburgers';
import AppMobileMenu from '../AppMobileMenu';
import { AppContext } from '../../AppContext';
import { Link } from 'react-router-dom';

class HeaderLogo extends React.Component {
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
      enableClosedSidebar,
    } = this.props;

    return (
      <AppContext.Consumer>
        {(context) => (
          <Fragment>
            <div className="app-header__logo">
            <Link to="/" ><div className="logo-src" /></Link>
              
              <div className="header__pane ml-auto">
                <div onClick={() => context.toggleEnableClosedSidebar()}>
                  <Hamburger
                    active={enableClosedSidebar}
                    type="elastic"
                    onClick={() => this.setState({ active: !this.state.active })}
                  />
                </div>
              </div>
            </div>
            <AppMobileMenu />
          </Fragment>
        )}
      </AppContext.Consumer>
    );
  }
}

export default HeaderLogo;