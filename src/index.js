import React from "react";
import ReactDOM from "react-dom";

import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

/* const App = () => {

  window.navigator.geolocation.getCurrentPosition(
    (position) => console.log(position),
    (err) => console.log(err)
  );

  return <div>Latitude: </div>;
}; */

class App extends React.Component {
  // constructor(props) {
  //   super(props);

  //   //THIS IS THE ONLY TIME we do direct assignment
  //   //to this.state
  //   this.state = { lat: null, errorMessage: "" };
  // }

  //2nd way to initialize state
  state = { lat: null, errorMessage: "" };

  //Content visible on screen
  //componentDidMount method (called one time)
  //Good place to do data-loading!
  componentDidMount() {
    console.log("My component was rendered to the screen!");

    window.navigator.geolocation.getCurrentPosition(
      position => {
        //we called setState function!!! (component re-renders itself)
        this.setState({ lat: position.coords.latitude });
      },
      err => {
        this.setState({ errorMessage: err.message });
      }
    );
  }

  //Sit and wait for updates
  //componentDidUpdate method (called every time the component updates itself)
  //Good place to do more data-loading when state/props change
  componentDidUpdate() {
    console.log("My component was just updated - it rerendered!");
  }

  //put conditional logic in a helper method
  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }

    return <Spinner message="Please accept location request" />;
  }

  //React says we have to define render!!
  //just return jsx - try not to use conditionals
  render() {
    return <div className="border red">{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
