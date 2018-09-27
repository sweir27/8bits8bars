import "pixi.js"
import "pixi-sound"

import { forestStage } from "./stages/forest"
import { desertStage } from "./stages/desert";

const assets = [
  "images/FOREST_background.png",
  "images/FOREST_midground2.png",
  "images/FOREST_midground1.png",
  "images/FOREST_foreground.png",
  "images/DESERT_background.png",
  "images/DESERT_midground2.png",
  "images/DESERT_midground1.png",
  "images/DESERT_foreground.png",
  "images/walk_sprite.png",
  "sounds/forest.mp3"
];

let currentStage = "forest"

const stages = {
  forest: {
    currentFunc: forestStage,
    nextStage: "desert"
  },
  desert: {
    currentFunc: desertStage,
    nextStage: "forest"
  }
};

function startSprites(app) {
  const ratio = 1024 / 768;

  window.onresize = function () {
    resize();
  };

  document.addEventListener('click', function (e) {
    currentStage = stages[currentStage].nextStage;
    loadNextStage(app, currentStage)
  })

  document.addEventListener("touchstart", function(e) {
    currentStage = stages[currentStage].nextStage;
    loadNextStage(app, currentStage);
  });

  resize()
  PIXI.loader.add(assets).load(() => forestStage.setup(app));

  function resize() {
    if (window.innerWidth / window.innerHeight >= ratio) {
      var w = window.innerHeight * ratio;
      var h = window.innerHeight;
    } else {
      var w = window.innerWidth;
      var h = window.innerWidth / ratio;
    }

    console.log("optimal w",  w)
    console.log("optimal h", h)
    app.view.style.width = w + "px";
    app.view.style.height = h + "px";
  }

  function loadNextStage(app, currentStage) {
    if (currentStage === "forest") {
      desertStage.teardown(app)
      forestStage.setup(app);
    } else if (currentStage === "desert") {
      forestStage.teardown(app);
      desertStage.setup(app);
    }
  }
}

export default startSprites;
