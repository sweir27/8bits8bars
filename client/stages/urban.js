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

const setupUrbanStage = app => {
  sound = PIXI.sound.Sound.from("sounds/forest.mp3");

  background = setupTile(PIXI.loader.resources["images/URBAN-background.png"].texture, app);
  midground3 = setupTile(PIXI.loader.resources["images/URBAN-midground3.png"].texture, app);
  midground2 = setupTile(PIXI.loader.resources["images/URBAN-midground2.png"].texture, app);
  midground1 = setupTile(PIXI.loader.resources["images/URBAN-midground1.png"].texture, app);
  foreground = setupTile(PIXI.loader.resources["images/URBAN-foreground.png"].texture, app);

  animatedWalkingSprite = setupWalkingSprite(PIXI.loader.resources["images/walk_sprite.png"].texture, app);
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
    midground3.tilePosition.x -= 0.5;
    midground2.tilePosition.x -= 1;
    midground1.tilePosition.x -= 2.5;
    foreground.tilePosition.x -= 3.9;

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

export const urbanStage = {
  setup: app => setupUrbanStage(app),
  teardown: app => teardown(app)
};
