import React, { Component } from 'react';

export const AppContext = React.createContext();


export class AppProvider extends Component {
  state = {
    enableClosedSidebar: false,
    enableMobileMenu: false,
    enableMobileMenuSmall: false,
   
  }

  

  
  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        toggleEnableClosedSidebar: () => this.setState({
          enableClosedSidebar: !this.state.enableClosedSidebar
        }),
        toggleMobileSidebar: () => this.setState({
          enableMobileMenu: !this.state.enableMobileMenu
        }),
        toggleMobileSmall: () => this.setState({
          enableMobileMenuSmall: !this.state.enableMobileMenuSmall
        })
      }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
