import * as PIXI from "pixi.js";
import React from 'react'
import startSprites from '../sprites'
import Button from './button'

class Intro extends React.Component {
  constructor() {
    super();
    this.state = {
      app: "",
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    };
  }

  updateDimensions() {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  }

  componentDidMount() {
    // Create a Pixi Application
    let app = new PIXI.Application(
      this.state.windowWidth,
      this.state.windowHeight,
      {
        autoResize: true,
        transparent: true,
        antialias: false
      }
    );

    PIXI.settings.RESOLUTION = window.devicePixelRatio;
    PIXI.settings.PRECISION_FRAGMENT = "highp";

    document.getElementById("pixi-root").appendChild(app.view);
    window.addEventListener("resize", this.updateDimensions.bind(this))
    startSprites(app)
  }

  render() {
    return <div>
        <div id="pixi-root" />
      </div>;
  }
}

export default Intro;
