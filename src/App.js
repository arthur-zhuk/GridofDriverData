import React, { Component } from "react";
import MapGL from "react-map-gl";
import DeckGLOverlay from "./deckgl-overlay.js";
import { json as getJson } from "d3-request";
import "./App.css";

const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        ...DeckGLOverlay.defaultViewport,
        width: 800,
        height: 600
      },
      data: null
    };
  }

  componentDidMount() {
    getJson("/driverData", (error, response) => {
      if (!error) this.setState({ data: response });
    });
    window.addEventListener("resize", this._resize.bind(this));
  }

  _resize() {
    this._onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  _onViewportChange(viewport) {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  }

  render() {
    const { viewport, data } = this.state;

    return (
      <MapGL
        {...viewport}
        onViewportChange={this._onViewportChange.bind(this)}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={
          "pk.eyJ1IjoidWcwMmZhc3QiLCJhIjoiY2o4Z2Y3ZjByMGJxeDJxbXgwZjhwemN6MyJ9.eljyw1euC2hdZVvQFCXyMg"
        }
      >
        <DeckGLOverlay viewport={viewport} data={data} cellSize={20} />
      </MapGL>
    );
  }
}

export default App;
