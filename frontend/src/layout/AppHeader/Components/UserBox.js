import React, { Fragment } from 'react';

import {
  DropdownToggle, 
  DropdownMenu,
  Nav, 
  NavItem, 
  NavLink,
  UncontrolledButtonDropdown
} from 'reactstrap';

import {
  toast,
  Bounce
} from 'react-toastify';


import {
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import avatar1 from '../../../assets/utils/images/avatars/1.jpg';

import { AppContext } from '../../../AppContext';

class UserBox extends React.Component {

  static contextType = AppContext

  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };

  }

  notify2 = () => this.toastId = toast('You don\'t have any new items in your calendar for today! Go out and play!', {
    transition: Bounce,
    closeButton: true,
    autoClose: 5000,
    position: 'bottom-center',
    type: 'success'
  });


  render() {
    return (
      <Fragment>
        <div className="header-btn-lg pr-0">
          <div className="widget-content p-0">
            <div className="widget-content-wrapper">
              <div className="widget-content-left">
                <UncontrolledButtonDropdown>
                  <DropdownToggle color="link" className="p-0">
                    <img width={42} className="rounded-circle" src={avatar1} alt="" />
                    <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown} />
                  </DropdownToggle>
                  <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                    <Nav vertical>
                      <NavItem>
                        <NavLink href="/profile">Profile</NavLink>
                      </NavItem>
                      <NavItem className="nav-item-header">
                        My Account
                      </NavItem>
                      <NavItem>

                        Sign out
                      </NavItem>
                    </Nav>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </div>
              
            </div>
          </div>
        </div>
      </Fragment >
    );
  }
}

export default UserBox;