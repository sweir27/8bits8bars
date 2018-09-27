import "pixi.js";
import "pixi-sound";
import { setupTile, setupWalkingSprite } from "../util.js";

let background,
  midground3,
  midground2,
  midground1,
  foreground,
  animatedWalkingSprite,
  sound,
  ticker;

const setupIceStage = app => {
  sound = PIXI.sound.Sound.from("sounds/ice.mp3");

  background = setupTile(PIXI.loader.resources["images/ICE-background.png"].texture, app);
  midground3 = setupTile(PIXI.loader.resources["images/ICE-midground3.png"].texture, app);
  midground2 = setupTile(PIXI.loader.resources["images/ICE-midground2.png"].texture, app);
  midground1 = setupTile(PIXI.loader.resources["images/ICE-midground1.png"].texture, app);
  foreground = setupTile(PIXI.loader.resources["images/ICE-foreground.png"].texture, app);

  animatedWalkingSprite = setupWalkingSprite(PIXI.loader.resources["images/ice_sprite.png"].texture, app);
  animatedWalkingSprite.animationSpeed = 0.1
  animatedWalkingSprite.play();

  app.stage.addChild(background);
  app.stage.addChild(midground3);
  app.stage.addChild(midground2);
  app.stage.addChild(midground1);
  app.stage.addChild(foreground);
  app.stage.addChild(animatedWalkingSprite);

  sound.play({ loop: true });

  ticker = new PIXI.ticker.Ticker();
  ticker.add(() => {
    update();
  });
  ticker.start();

  function update() {
    // parallax
    midground3.tilePosition.x -= 0.2;
    midground2.tilePosition.x -= 0.5;
    midground1.tilePosition.x -= 1.5;
    foreground.tilePosition.x -= 4;

    app.render();
  }
};

function teardown(app) {
  app.stage.removeChild(background);
  app.stage.removeChild(midground3);
  app.stage.removeChild(midground2);
  app.stage.removeChild(midground1);
  app.stage.removeChild(foreground);
  app.stage.removeChild(animatedWalkingSprite);
  sound.stop();
  ticker.stop();
}

export const iceStage = {
  setup: app => setupIceStage(app),
  teardown: app => teardown(app)
};
