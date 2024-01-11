import { AnimatedSprite, FilledBox, ImageSprite, TextSprite } from '../jetlag/Components/Appearance';
import { ChaseMovement, GravityMovement, ManualMovement, Path, PathMovement, ProjectileMovement, TiltMovement } from "../jetlag/Components/Movement";
import { BoxBody, CircleBody, RigidBodyComponent } from '../jetlag/Components/RigidBody';
import { Destination, Enemy, Goodie, Hero, Obstacle, Projectile } from "../jetlag/Components/Role";
import { AnimationSequence, AnimationState, JetLagGameConfig, Sides } from "../jetlag/Config";
import { Actor } from "../jetlag/Entities/Actor";
import { Scene } from '../jetlag/Entities/Scene';
import { KeyCodes } from "../jetlag/Services/Keyboard";
import { initializeAndLaunch, stage } from "../jetlag/Stage";
import { calculation, checkfight, fight } from './battle';
import { loseMessage, winMessage } from "./common";
import { createGreenSlime, createMerchant, createRedSlime } from './EntitySheet';
import { OuterWallConstructor } from './level';


/**
 * Screen dimensions and other game configuration, such as the names of all
 * the assets (images and sounds) used by this game.
 */
class Config implements JetLagGameConfig {
    pixelMeterRatio = 100;
    screenDimensions = { width: 1900, height: 1300 };
    adaptToScreenSize = true;
    canVibrate = true;
    forceAccelerometerOff = true;
    storageKey = "--no-key--";
    hitBoxes = true;
    resourcePrefix = "./assets/";
    musicNames = [];
    soundNames = [];
    imageNames = ["hero.json","terrains.json","items.json","enemies.json","npcs.json"];
}


/**
 * Build the levels of the game.
 *
 * @param level Which level should be displayed
 */
function builder(level: number) {
  stage.score.onLose = { level, builder };
  stage.score.onWin = { level, builder };
  winMessage("Yay");
  loseMessage("Try Again");
  OuterWallConstructor();
  let hero = new Actor({
    rigidBody: new BoxBody({ cx: 6.5, cy: 4.5, width: 1, height: 1 },{disableRotation:true}),
    appearance: new ImageSprite({ width: 1, height: 1, img:"hero_stand_d.png"}),
    role: new Hero(),
    movement: new ManualMovement(),
    extra: {
      atk: 10,
      def: 10,
      hp: 1000,
      gold: 0,
      exp: 0,
    }
  });
  stage.keyboard.setKeyUpHandler(KeyCodes.KEY_UP, () => ((hero.movement as ManualMovement).updateYVelocity(0)));
  stage.keyboard.setKeyUpHandler(KeyCodes.KEY_DOWN, () => ((hero.movement as ManualMovement).updateYVelocity(0)));
  stage.keyboard.setKeyUpHandler(KeyCodes.KEY_LEFT, () => ((hero.movement as ManualMovement).updateXVelocity(0)));
  stage.keyboard.setKeyUpHandler(KeyCodes.KEY_RIGHT, () => {((hero.movement as ManualMovement).updateXVelocity(0))});
  stage.keyboard.setKeyDownHandler(KeyCodes.KEY_UP, () => {
    movingCollision(hero.rigidBody.getCenter().x,hero.rigidBody.getCenter().y-1,hero);
  });
  stage.keyboard.setKeyDownHandler(KeyCodes.KEY_LEFT, () => {
    movingCollision(hero.rigidBody.getCenter().x-1,hero.rigidBody.getCenter().y,hero);
  });
  stage.keyboard.setKeyDownHandler(KeyCodes.KEY_RIGHT, () => {
    movingCollision(hero.rigidBody.getCenter().x+1,hero.rigidBody.getCenter().y,hero);
  });
  stage.keyboard.setKeyDownHandler(KeyCodes.KEY_DOWN, () => {
    movingCollision(hero.rigidBody.getCenter().x,hero.rigidBody.getCenter().y+1,hero);
  });
  createMerchant(5.5,1.5);
  let hs = new Actor({
    appearance: new ImageSprite({ width: 1, height: 1, img: "holyShield.png" }),
    rigidBody: new BoxBody({cx: 3.5, cy: 7.5, width: 1, height: 1},{disableRotation:true}),
    role: new Goodie(),
    extra:{
      isItem: true,
      isShield:true,
      def: 100,
    }
  });
  new Actor({
    rigidBody: new CircleBody({ cx: 15, cy: 2, radius: .001 }),
    appearance: new TextSprite(
      { center: false, face: "TimesNewRoman", size: 30, color: "#140000" },
      () => `HP: ${hero.extra.hp}\nATK: ${hero.extra.atk}\nDEF: ${hero.extra.def}\nGold: ${hero.extra.gold}\nExp: ${hero.extra.exp}`),
  });
}

    

// call the function that starts running the game in the `game-player` div tag
// of `index.html`
initializeAndLaunch("game-player", new Config(), builder);



function movingCollision(cx:number,cy:number,hero:Actor){
  for (let o of stage.world.physics.actorsAt({x:cx, y:cy})) { 
    if (o.extra.isWall) return;
    else if (o.extra.isEnemy) {
      if(checkfight(hero,o)){
        return;
      }else{
        hero.extra.hp = calculation(hero,o);
        hero.extra.gold += o.extra.gold;
        hero.extra.exp += o.extra.exp;
        o.enabled = false;
      }
    }else if (o.extra.isItem){
      if(o.extra.isShield){
        hero.extra.def = hero.extra.def + o.extra.def;
        o.enabled = false;
      }
    } 
  }
  hero.rigidBody.setCenter(cx,cy);
}
