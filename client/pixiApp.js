import * as PIXI from "pixi.js";

// Create a Pixi Application
let app = new PIXI.Application(window.innerWidth, window.innerHeight, {
  autoResize: true,
  transparent: true
});

// Add the canvas that Pixi automatically created for you to the HTML document
document.getElementById("pixi-root").appendChild(app.view);

// var background = PIXI.Sprite.fromImage("images/bg.png");
// background.width = app.screen.width;
// background.height = app.screen.height;
// app.stage.addChild(background);

window.addEventListener("resize", function() {
  // Get the p
	const parent = app.view.parentNode;

	// Resize the renderer
	app.renderer.resize(parent.clientWidth, parent.clientHeight);

  // app.renderer.resize(window.innerWidth, window.innerHeight);
});

export default app
