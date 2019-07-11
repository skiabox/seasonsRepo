import React from "react";
import ReactDOM from "react-dom";

/* const App = () => {

  window.navigator.geolocation.getCurrentPosition(
    (position) => console.log(position),
    (err) => console.log(err)
  );

  return <div>Latitude: </div>;
}; */

class App extends React.Component {
  constructor(props) {
    super(props);

    //THIS IS THE ONLY TIME we do direct assignment
    //to this.state
    this.state = { lat: null, errorMessage: "" };

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

  //Content visible on screen
  //componentDidMount method (called one time)
  componentDidMount() {
    console.log("My component was rendered to the screen!");
  }

  //Sit and wait for updates
  //componentDidUpdate method (called every time the component updates itself)
  componentDidUpdate() {
    console.log("My component was just updated - it rerendered!");
  }

  //React says we have to define render!!
  render() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <div>Latitude: {this.state.lat}</div>;
    }

    return <div>Loading!</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
