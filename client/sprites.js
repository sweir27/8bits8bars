import * as PIXI from "pixi.js";

const assets = [
  "images/FOREST_background.png",
  "images/FOREST_midground2.png",
  "images/FOREST_midground1.png",
  "images/FOREST_foreground.png",
  "images/walk_sprite.png",
];

const loadStage = (app) => {
  let background, midground2, midground1, foreground;

  PIXI.loader.add(assets).load(setup);

  function setup() {
    const backgroundTexture = PIXI.loader.resources["images/FOREST_background.png"].texture;
    background = new PIXI.extras.TilingSprite(backgroundTexture, app.screen.width, app.screen.height);
    background.anchor.x = 0;
    background.anchor.y = 0;

    const midground2Texture = PIXI.loader.resources["images/FOREST_midground2.png"].texture;
    midground2 = new PIXI.extras.TilingSprite(midground2Texture, app.screen.width, app.screen.height);
    midground2.anchor.x = 0;
    midground2.anchor.y = 0;

    const midground1Texture = PIXI.loader.resources["images/FOREST_midground1.png"].texture;
    midground1 = new PIXI.extras.TilingSprite(midground1Texture, app.screen.width, app.screen.height);
    midground1.anchor.x = 0;
    midground1.anchor.y = 0;

    const foregroundTexture = PIXI.loader.resources["images/FOREST_foreground.png"].texture;
    foreground = new PIXI.extras.TilingSprite(foregroundTexture, app.screen.width, app.screen.height);
    foreground.anchor.x = 0;
    foreground.anchor.y = 0;

    const walkSpriteTexture = PIXI.loader.resources["images/walk_sprite.png"].texture;
    const frames = [new PIXI.Texture(walkSpriteTexture, new PIXI.Rectangle(0, 0, 360, 351)), new PIXI.Texture(walkSpriteTexture, new PIXI.Rectangle(360, 0, 360, 351)), new PIXI.Texture(walkSpriteTexture, new PIXI.Rectangle(720, 0, 360, 351)), new PIXI.Texture(walkSpriteTexture, new PIXI.Rectangle(1080, 0, 360, 351)), new PIXI.Texture(walkSpriteTexture, new PIXI.Rectangle(1440, 0, 360, 351)), new PIXI.Texture(walkSpriteTexture, new PIXI.Rectangle(1800, 0, 360, 351)), new PIXI.Texture(walkSpriteTexture, new PIXI.Rectangle(2160, 0, 360, 351)), new PIXI.Texture(walkSpriteTexture, new PIXI.Rectangle(2520, 0, 360, 351))];

    const animatedWalkingSprite = new PIXI.extras.AnimatedSprite(frames);
    animatedWalkingSprite.animationSpeed = 0.08;
    animatedWalkingSprite.x = app.screen.width / 2.8;
    animatedWalkingSprite.y = app.screen.height - 360;
    animatedWalkingSprite.play();

    app.stage.addChild(background);
    app.stage.addChild(midground2);
    app.stage.addChild(midground1);
    app.stage.addChild(foreground);

    app.stage.addChild(animatedWalkingSprite);
    requestAnimationFrame(update);
  }

  function update() {
    // parallax
    background.tilePosition.x -= 0.2;
    midground2.tilePosition.x -= 0.5;
    midground1.tilePosition.x -= 1;
    foreground.tilePosition.x -= 2;

    app.render();
    requestAnimationFrame(update);
  }
}

function startSprites(app) {
  let currentStage = "forest"

  const ratio = 1920 / 1080;

  function resize() {
    if (window.innerWidth / window.innerHeight >= ratio) {
      var w = window.innerHeight * ratio;
      var h = window.innerHeight;
    } else {
      var w = window.innerWidth;
      var h = window.innerWidth / ratio;
    }
    app.view.style.width = w + 'px';
    app.view.style.height = h + 'px';
  }

  window.onresize = function () {
    resize();
  };

  document.addEventListener('click', function (e) {
    console.log("CLICKED!", currentStage)
  })

  loadStage(app);
}


export default startSprites;
