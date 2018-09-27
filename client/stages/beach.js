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

const setupBeachStage = app => {
  sound = PIXI.sound.Sound.from("sounds/beach.mp3");

  background = setupTile(PIXI.loader.resources["images/BEACH-background.png"].texture, app);
  midground3 = setupTile(PIXI.loader.resources["images/BEACH-midground3.png"].texture, app);
  midground2 = setupTile(PIXI.loader.resources["images/BEACH-midground2.png"].texture, app);
  midground1 = setupTile(PIXI.loader.resources["images/BEACH-midground1.png"].texture, app);
  foreground = setupTile(PIXI.loader.resources["images/BEACH-foreground.png"].texture, app);

  animatedWalkingSprite = setupWalkingSprite(PIXI.loader.resources["images/beach_sprite.png"].texture, app);
  animatedWalkingSprite.animationSpeed = 0.115
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
    midground2.tilePosition.x -= 0.8;
    midground1.tilePosition.x -= 1;
    foreground.tilePosition.x -= 4.2;

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

export const beachStage = {
  setup: app => setupBeachStage(app),
  teardown: app => teardown(app)
};
