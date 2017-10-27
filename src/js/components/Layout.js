import React from "react";

import Footer from "./Footer";
import Header from "./Header";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
     name: "Will"
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

  render() {
    setTimeout (() => {
      this.setState ({name: "Bob"});
    }, 1000)
    return (
      <div>
        {this.state.name}
        {/* <Header />
        <Footer /> */}
      </div>
    );
  }
}
