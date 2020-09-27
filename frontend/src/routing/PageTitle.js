import React, { Component } from 'react';
import cx from 'classnames';

class PageTitle extends Component {

  render() {
    let {
      enablePageTitleIcon,
      enablePageTitleSubheading,
      enablePageActions,
      heading,
      icon,
      
      subheading,
      actions
    } = this.props;

    return (

      <div className="app-page-title">
        <div className="page-title-wrapper">
          <div className="page-title-heading">
            <div
              className={cx('page-title-icon', { 'd-none': !enablePageTitleIcon })}>
              <i className={cx(icon, 'icon-gradient bg-mean-fruit')} />
            </div>
            <div>
              {heading}
              <div
                className={cx('page-title-subheading', { 'd-none': !enablePageTitleSubheading })}>
                {subheading}
              </div>
            </div>
          </div>
          <div className="page-title-actions">
            {enablePageActions && actions()}
          </div>
        </div>
      </div>
    );
  }
}

export default PageTitle;