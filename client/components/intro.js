import * as PIXI from "pixi.js";
import React from 'react'
import startSprites from '../sprites'

class Intro extends React.Component {
  constructor() {
    super();
    this.state = {
      app: "",
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    };
  }

  componentDidMount() {
    // Create a Pixi Application
    let app = new PIXI.Application(1024, 768, {
      transparent: true,
      antialias: false
    });

    app.view.style.width = window.innerWidth + "px";
    app.view.style.height = window.innerHeight + "px";

    PIXI.settings.RESOLUTION = window.devicePixelRatio;
    PIXI.settings.PRECISION_FRAGMENT = "highp";

    document.getElementById("pixi-root").appendChild(app.view);
    startSprites(app);
  }

  render() {
    return (
      <div>
        <div id="pixi-root" />
      </div>
    );
  }
}

export default Intro;
