import React, {Fragment} from 'react';
import cx from 'classnames';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import HeaderLogo from '../AppLogo';


import UserBox from './Components/UserBox';
import { AppContext } from '../../AppContext';

class Header extends React.Component {
  render() {
    let {
      headerBackgroundColor,
      enableHeaderShadow
    } = this.props;
    enableHeaderShadow = true;
    headerBackgroundColor = 'bg-strong-bliss header-text-light';

    return (
      <AppContext.Consumer>
        { (context) => (
          <Fragment>
            <ReactCSSTransitionGroup
              component="div"
              className={cx('app-header', headerBackgroundColor, {'header-shadow': enableHeaderShadow})}
              transitionName="HeaderAnimation"
              transitionAppear={true}
              transitionAppearTimeout={1500}
              transitionEnter={false}
              transitionLeave={false}>

              <HeaderLogo/>
                    
              <div className={cx(
                'app-header__content',
                {'header-mobile-open': context.state.enableMobileMenuSmall},
              )}>
                
                <div className="app-header-right">
                  <UserBox/>
                </div>
              </div>
            </ReactCSSTransitionGroup>
          </Fragment>)}
      </AppContext.Consumer>
    );
  }
}


export default Header;