import "pixi.js";
import "pixi-sound";

export const setupTile = (texture, app) => {
  return new PIXI.extras.TilingSprite(
    texture,
    app.screen.width,
    app.screen.height
  );
}

export const setupWalkingSprite = (texture, app) => {
  const frames = [
    new PIXI.Texture(texture, new PIXI.Rectangle(0, 0, 360, 351)),
    new PIXI.Texture(texture, new PIXI.Rectangle(360, 0, 360, 351)),
    new PIXI.Texture(texture, new PIXI.Rectangle(720, 0, 360, 351)),
    new PIXI.Texture(
      texture,
      new PIXI.Rectangle(1080, 0, 360, 351)
    ),
    new PIXI.Texture(
      texture,
      new PIXI.Rectangle(1440, 0, 360, 351)
    ),
    new PIXI.Texture(
      texture,
      new PIXI.Rectangle(1800, 0, 360, 351)
    ),
    new PIXI.Texture(
      texture,
      new PIXI.Rectangle(2160, 0, 360, 351)
    ),
    new PIXI.Texture(texture, new PIXI.Rectangle(2520, 0, 360, 351))
  ];

  const animatedWalkingSprite = new PIXI.extras.AnimatedSprite(frames);
  animatedWalkingSprite.animationSpeed = 0.08;
  animatedWalkingSprite.x = app.screen.width / 2.8;
  animatedWalkingSprite.y = app.screen.height - 420;
  return animatedWalkingSprite
}