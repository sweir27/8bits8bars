import "pixi.js"
import "pixi-sound"

import { forestStage } from "./stages/forest"
import { desertStage } from "./stages/desert"
import { iceStage } from "./stages/ice";
import { volcanoStage } from "./stages/volcano";
import { urbanStage } from "./stages/urban";
import { beachStage } from "./stages/beach";

const assets = [
  "images/FOREST_background.png",
  "images/FOREST_midground2.png",
  "images/FOREST_midground1.png",
  "images/FOREST_foreground.png",
  "images/DESERT_background.png",
  "images/DESERT_midground2.png",
  "images/DESERT_midground1.png",
  "images/DESERT_foreground.png",
  "images/ICE-background.png",
  "images/ICE-midground3.png",
  "images/ICE-midground2.png",
  "images/ICE-midground1.png",
  "images/ICE-foreground.png",
  "images/VOLCANO-background.png",
  "images/VOLCANO-midground3.png",
  "images/VOLCANO-midground2.png",
  "images/VOLCANO-midground1.png",
  "images/VOLCANO-foreground.png",
  "images/URBAN-background.png",
  "images/URBAN-midground3.png",
  "images/URBAN-midground2.png",
  "images/URBAN-midground1.png",
  "images/URBAN-foreground.png",
  "images/BEACH-background.png",
  "images/BEACH-midground3.png",
  "images/BEACH-midground2.png",
  "images/BEACH-midground1.png",
  "images/BEACH-foreground.png",
  "images/forest_sprite.png",
  "images/desert_sprite.png",
  "images/ice_sprite.png",
  "images/urban_sprite.png",
  "images/beach_sprite.png",
  "images/volcano_sprite.png",
  "sounds/forest.mp3",
  "sounds/desert.mp3",
  "sounds/volcano.mp3",
  "sounds/ice.mp3",
  "sounds/beach.mp3"
];

let currentStage = "forest"

const stages = {
  forest: {
    currentFunc: forestStage,
    nextStage: "desert"
  },
  desert: {
    currentFunc: desertStage,
    nextStage: "ice"
  },
  ice: {
    currentFunc: iceStage,
    nextStage: "volcano"
  },
  volcano: {
    currentFunc: volcanoStage,
    nextStage: "urban"
  },
  urban: {
    currentFunc: urbanStage,
    nextStage: "beach"
  },
  beach: {
    currentFunc: beachStage,
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

    app.view.style.width = w + "px";
    app.view.style.height = h + "px";
  }

  function loadNextStage(app, currentStage) {
    switch (currentStage) {
      case "forest":
        beachStage.teardown(app);
        forestStage.setup(app);
        break;
      case "desert":
        forestStage.teardown(app);
        desertStage.setup(app);
        break;
      case "ice":
        desertStage.teardown(app);
        iceStage.setup(app);
        break;
      case "volcano":
        iceStage.teardown(app);
        volcanoStage.setup(app);
        break;
      case "urban":
        volcanoStage.teardown(app);
        urbanStage.setup(app);
        break;
      case "beach":
        urbanStage.teardown(app);
        beachStage.setup(app);
        break;
    }
  }
}

export default startSprites;
