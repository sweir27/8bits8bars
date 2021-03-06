import "pixi.js";
import "pixi-sound";
import { setupTile, setupWalkingSprite } from "../util.js";

let background,
  midground2,
  midground1,
  foreground,
  animatedWalkingSprite,
  sound,
  ticker

const setupDesertStage = app => {
  sound = PIXI.sound.Sound.from("sounds/desert.mp3");

  background = setupTile(PIXI.loader.resources["images/DESERT_background.png"].texture, app);
  midground2 = setupTile(PIXI.loader.resources["images/DESERT_midground2.png"].texture, app);
  midground1 = setupTile(PIXI.loader.resources["images/DESERT_midground1.png"].texture, app);
  foreground = setupTile(PIXI.loader.resources["images/DESERT_foreground.png"].texture, app);

  animatedWalkingSprite = setupWalkingSprite(PIXI.loader.resources["images/desert_sprite.png"].texture, app);
  animatedWalkingSprite.animationSpeed = 0.11
  animatedWalkingSprite.play();

  app.stage.addChild(background);
  app.stage.addChild(midground2);
  app.stage.addChild(midground1);
  app.stage.addChild(foreground);
  app.stage.addChild(animatedWalkingSprite);

  sound.play({ loop: true });

  ticker = new PIXI.ticker.Ticker();
  ticker.add(() => {
    update()
  })
  ticker.start();

  function update() {
    // parallax
    midground2.tilePosition.x -= 0.5;
    midground1.tilePosition.x -= 1;
    foreground.tilePosition.x -= 4.8;

    app.render();
  }
};

function teardown(app) {
  app.stage.removeChild(background);
  app.stage.removeChild(midground2);
  app.stage.removeChild(midground1);
  app.stage.removeChild(foreground);
  app.stage.removeChild(animatedWalkingSprite);
  sound.stop();
  ticker.stop()
}

export const desertStage = {
  setup: app => setupDesertStage(app),
  teardown: app => teardown(app),
};
