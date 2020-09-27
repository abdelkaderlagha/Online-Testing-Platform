import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import MetisMenu from 'react-metismenu';

import { MainNav } from './NavItems';

class Nav extends Component {

  state = {};

  render() {
    return (
      <div style={{ fontSize: '1rem', paddingTop: '1rem' }}>
        <h5 className="app-sidebar__heading">Menu</h5>
        <MetisMenu content={MainNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />

      </div>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Nav);