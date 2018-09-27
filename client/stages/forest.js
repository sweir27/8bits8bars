import "pixi.js"
import "pixi-sound"

let background,
  midground2,
  midground1,
  foreground,
  animatedWalkingSprite,
  sound,
  ticker

const setupForestStage = app => {
  sound = PIXI.sound.Sound.from("sounds/forest.mp3");

  const backgroundTexture =
    PIXI.loader.resources["images/FOREST_background.png"].texture;
  background = new PIXI.extras.TilingSprite(
    backgroundTexture,
    app.screen.width,
    app.screen.height
  );
  background.anchor.x = 0;
  background.anchor.y = 0;

  const midground2Texture =
    PIXI.loader.resources["images/FOREST_midground2.png"].texture;
  midground2 = new PIXI.extras.TilingSprite(
    midground2Texture,
    app.screen.width,
    app.screen.height
  );
  midground2.anchor.x = 0;
  midground2.anchor.y = 0;

  const midground1Texture =
    PIXI.loader.resources["images/FOREST_midground1.png"].texture;
  midground1 = new PIXI.extras.TilingSprite(
    midground1Texture,
    app.screen.width,
    app.screen.height
  );
  midground1.anchor.x = 0;
  midground1.anchor.y = 0;

  const foregroundTexture =
    PIXI.loader.resources["images/FOREST_foreground.png"].texture;
  foreground = new PIXI.extras.TilingSprite(
    foregroundTexture,
    app.screen.width,
    app.screen.height
  );
  foreground.anchor.x = 0;
  foreground.anchor.y = 0;

  const walkSpriteTexture =
    PIXI.loader.resources["images/walk_sprite.png"].texture;
  const frames = [
    new PIXI.Texture(walkSpriteTexture, new PIXI.Rectangle(0, 0, 360, 351)),
    new PIXI.Texture(walkSpriteTexture, new PIXI.Rectangle(360, 0, 360, 351)),
    new PIXI.Texture(walkSpriteTexture, new PIXI.Rectangle(720, 0, 360, 351)),
    new PIXI.Texture(
      walkSpriteTexture,
      new PIXI.Rectangle(1080, 0, 360, 351)
    ),
    new PIXI.Texture(
      walkSpriteTexture,
      new PIXI.Rectangle(1440, 0, 360, 351)
    ),
    new PIXI.Texture(
      walkSpriteTexture,
      new PIXI.Rectangle(1800, 0, 360, 351)
    ),
    new PIXI.Texture(
      walkSpriteTexture,
      new PIXI.Rectangle(2160, 0, 360, 351)
    ),
    new PIXI.Texture(walkSpriteTexture, new PIXI.Rectangle(2520, 0, 360, 351))
  ];

  animatedWalkingSprite = new PIXI.extras.AnimatedSprite(frames);
  animatedWalkingSprite.animationSpeed = 0.08;
  animatedWalkingSprite.x = app.screen.width / 2.8;
  animatedWalkingSprite.y = app.screen.height - 420;
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
    midground1.tilePosition.x -= 2;
    foreground.tilePosition.x -= 3.9;

    app.render();
  }
};

function teardown(app) {
  app.stage.removeChild(background);
  app.stage.removeChild(midground2);
  app.stage.removeChild(midground1);
  app.stage.removeChild(foreground);
  app.stage.removeChild(animatedWalkingSprite);
  ticker.stop()
  sound.stop()
}

export const forestStage = {
  setup: (app) => setupForestStage(app),
  teardown: (app) => teardown(app),
}