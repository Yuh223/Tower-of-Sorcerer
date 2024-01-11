import { FilledBox, ImageSprite, TextSprite } from "../jetlag/Components/Appearance";
import { ManualMovement } from "../jetlag/Components/Movement";
import { BoxBody } from "../jetlag/Components/RigidBody";
import { Obstacle } from "../jetlag/Components/Role";
import { Actor } from "../jetlag/Entities/Actor";
import { Scene } from "../jetlag/Entities/Scene";
import { KeyCodes } from "../jetlag/Services/Keyboard";
import { stage } from "../jetlag/Stage";
import { calculation, checkfight } from "./battle";

/**
 * Draw a mute button
 *
 * @param cfg         Configuration for how to draw the button
 * @param cfg.scene   The scene where the button should be drawn
 * @param cfg.cx      The center X coordinate of the button
 * @param cfg.cy      The center Y coordinate of the button
 * @param cfg.width   The width of the button
 * @param cfg.height  The height of the button
 */
export function drawMuteButton(cfg: { cx: number, cy: number, width: number, height: number, scene: Scene }) {
  // Draw a mute button
  let getVolume = () => (stage.storage.getPersistent("volume") ?? "1") === "1";
  let mute = new Actor({
    appearance: new ImageSprite({ width: cfg.width, height: cfg.height, img: "audio_off.png" }),
    rigidBody: new BoxBody({ cx: cfg.cx, cy: cfg.cy, width: cfg.width, height: cfg.height }, { scene: cfg.scene }),
  });
  // If the game is not muted, switch the image
  if (getVolume())
    (mute.appearance as ImageSprite).setImage("audio_on.png");
  // when the obstacle is touched, switch the mute state and update the picture
  mute.gestures = {
    tap: () => {
      // volume is either 1 or 0, switch it to the other and save it
      let volume = 1 - parseInt(stage.storage.getPersistent("volume") ?? "1");
      stage.storage.setPersistent("volume", "" + volume);
      // update all music
      stage.musicLibrary.resetMusicVolume(volume);

      if (getVolume()) (mute.appearance as ImageSprite).setImage("audio_on.png");
      else (mute.appearance as ImageSprite).setImage("audio_off.png");
      return true;
    }
  };
}

/** Draw a bounding box that surrounds the default world viewport */
function boundingBox() {
    // Draw a box around the world
    let t = new Actor({
      appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: 8, cy: -.05, width: 16, height: .1 }),
      role: new Obstacle(),
    });
    let b = new Actor({
      appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: 8, cy: 9.05, width: 16, height: .1 }),
      role: new Obstacle(),
    });
    let l = new Actor({
      appearance: new FilledBox({ width: .1, height: 9, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: -.05, cy: 4.5, width: .1, height: 9 }),
      role: new Obstacle(),
    });
    let r = new Actor({
      appearance: new FilledBox({ width: .1, height: 9, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: 16.05, cy: 4.5, width: .1, height: 9 }),
      role: new Obstacle(),
    }); 
    // Return the four sides as an object with fields "t", "b", "l", and "r" 
    // (for top/bottom/left/right)
    return { t, b, l, r };
  }
  
  /**
   * Enable Tilt, and set up arrow keys to simulate it
   *
   * @param xMax  The maximum X force
   * @param yMax  The maximum Y force
   */
  function enableTilt(xMax: number, yMax: number) {
    stage.tilt.tiltMax.Set(xMax, yMax);
    if (!stage.accelerometer.tiltSupported) {
      stage.keyboard.setKeyUpHandler(KeyCodes.KEY_UP, () => (stage.accelerometer.accel.y = 0));
      stage.keyboard.setKeyUpHandler(KeyCodes.KEY_DOWN, () => (stage.accelerometer.accel.y = 0));
      stage.keyboard.setKeyUpHandler(KeyCodes.KEY_LEFT, () => (stage.accelerometer.accel.x = 0));
      stage.keyboard.setKeyUpHandler(KeyCodes.KEY_RIGHT, () => (stage.accelerometer.accel.x = 0));
      stage.keyboard.setKeyDownHandler(KeyCodes.KEY_UP, () => (stage.accelerometer.accel.y = -5));
      stage.keyboard.setKeyDownHandler(KeyCodes.KEY_DOWN, () => (stage.accelerometer.accel.y = 5));
      stage.keyboard.setKeyDownHandler(KeyCodes.KEY_LEFT, () => (stage.accelerometer.accel.x = -5));
      stage.keyboard.setKeyDownHandler(KeyCodes.KEY_RIGHT, () => (stage.accelerometer.accel.x = 5));
    }
  }
  
  /** Draw a bounding box that surrounds an extended (32m) world viewport */
  function wideBoundingBox() {
    // Draw a box around the world
    new Actor({
      appearance: new FilledBox({ width: 32, height: .1, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: 16, cy: -.05, width: 32, height: .1 }),
      role: new Obstacle(),
    });
    new Actor({
      appearance: new FilledBox({ width: 32, height: .1, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: 16, cy: 9.05, width: 32, height: .1 }),
      role: new Obstacle(),
    });
    new Actor({
      appearance: new FilledBox({ width: .1, height: 9, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: -.05, cy: 4.5, width: .1, height: 9 }),
      role: new Obstacle(),
    });
    new Actor({
      appearance: new FilledBox({ width: .1, height: 9, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: 32.05, cy: 4.5, width: .1, height: 9 }),
      role: new Obstacle(),
    });
  }

  /**
 * Create an overlay (blocking all game progress) consisting of a black screen
 * with text.  Clearing the overlay will start the next level.
 *
 * @param message A message to display in the middle of the screen
 */
export function winMessage(message: string) {
  stage.score.winSceneBuilder = (overlay: Scene) => {
    new Actor({
      appearance: new FilledBox({ width: 16, height: 9, fillColor: "#000000" }),
      rigidBody: new BoxBody({ cx: 8, cy: 4.5, width: 16, height: 9 }, { scene: overlay }),
      gestures: {
        tap: () => {
          stage.clearOverlay();
          stage.switchTo(stage.score.onWin.builder, stage.score.onWin.level);
          return true;
        }
      },
    });
    new Actor({
      appearance: new TextSprite({ center: true, face: "Arial", color: "#FFFFFF", size: 28, z: 0 }, message),
      rigidBody: new BoxBody({ cx: 8, cy: 4.5, width: .1, height: .1 }, { scene: overlay }),
    });
  };
}

/**
 * Create an overlay (blocking all game progress) consisting of a black screen
 * with text.  Clearing the overlay will restart the level.
 *
 * @param message A message to display in the middle of the screen
 */
export function loseMessage(message: string) {
  stage.score.loseSceneBuilder = (overlay: Scene) => {
    new Actor({
      appearance: new FilledBox({ width: 16, height: 9, fillColor: "#000000" }),
      rigidBody: new BoxBody({ cx: 8, cy: 4.5, width: 16, height: 9 }, { scene: overlay }),
      gestures: {
        tap: () => {
          stage.clearOverlay();
          stage.switchTo(stage.score.onLose.builder, stage.score.onLose.level);
          return true;
        }
      },
    });
    new Actor({
      appearance: new TextSprite({ center: true, face: "Arial", color: "#FFFFFF", size: 28, z: 0 }, message),
      rigidBody: new BoxBody({ cx: 8, cy: 4.5, width: .1, height: .1 }, { scene: overlay }),
    })
  };
}

/**
 * Create an overlay (blocking all game progress) consisting of a text box over
 * a snapshot of the in-progress game.  Clearing the overlay will resume the
 * current level.
 *
 * @param level The current level
 */
export function merchantPurchase(hero:Actor) {
  // Immediately install the overlay, to pause the game
  stage.requestOverlay((overlay: Scene, screenshot: ImageSprite | undefined) => {
    // Draw the screenshot
    new Actor({ appearance: screenshot!, rigidBody: new BoxBody({ cx: 9.5, cy: 6.5, width:19, height: 13 }, { scene: overlay }), });
    
    new Actor({
      appearance: new FilledBox({width:5,height: 8,fillColor: "#CCE5E5"}),
      rigidBody: new BoxBody({ cx: 6.5, cy: 6.5, width: 5, height: 8 }, { scene: overlay }),
    });
    new Actor({
      appearance: new TextSprite({ center: true, face: "Arial", color: "#fa0505", size: 90, z: 0 }, "Shop"),
      rigidBody: new BoxBody({ cx: 6.5, cy: 3, width: .1, height: .1 }, { scene: overlay }),
    });

    new Actor({
      appearance: new FilledBox({ width: 2, height: 1, fillColor: "#000000" }),
      rigidBody: new BoxBody({ cx: 6.5, cy: 4.5, width: 2, height: 1 }, { scene: overlay }),
      gestures: { tap: () => { if(hero.extra.gold > hero.extra.initialPurchaseGold) 
          {hero.extra.hp += 800; hero.extra.gold -= hero.extra.initialPurchaseGold; hero.extra.initialPurchaseGold += 1;}
          else{alert("Gold not enough!");}
          return true; } },
    });
    new Actor({
      appearance: new TextSprite({ center: true, face: "Arial", color: "#FFFFFF", size: 28, z: 0 }, "Health"),
      rigidBody: new BoxBody({ cx: 6.5, cy: 4.5, width: .1, height: .1 }, { scene: overlay }),
    });

    new Actor({
      appearance: new FilledBox({ width: 2, height: 1, fillColor: "#000000" }),
      rigidBody: new BoxBody({ cx: 6.5, cy: 6, width: 2, height: 1 }, { scene: overlay }),
      gestures: { tap: () => { if(hero.extra.gold > hero.extra.initialPurchaseGold) 
          {hero.extra.atk += 1; hero.extra.gold -= hero.extra.initialPurchaseGold; hero.extra.initialPurchaseGold += 1;} 
          else{alert("Gold not enough!");}
          return true; } },
    });
    new Actor({
      appearance: new TextSprite({ center: true, face: "Arial", color: "#FFFFFF", size: 28, z: 0 }, "Attack"),
      rigidBody: new BoxBody({ cx: 6.5, cy: 6, width: .1, height: .1 }, { scene: overlay }),
    });

    new Actor({
      appearance: new FilledBox({ width: 2, height: 1, fillColor: "#000000" }),
      rigidBody: new BoxBody({ cx: 6.5, cy: 7.5, width: 2, height: 1 }, { scene: overlay }),
      gestures: { tap: () => { if(hero.extra.gold > hero.extra.initialPurchaseGold) 
          {hero.extra.def += 2; hero.extra.gold -= hero.extra.initialPurchaseGold; hero.extra.initialPurchaseGold += 1;} 
          else{alert("Gold not enough!");}
          return true; } },
    });
    new Actor({
      appearance: new TextSprite({ center: true, face: "Arial", color: "#FFFFFF", size: 28, z: 0 }, "Defense"),
      rigidBody: new BoxBody({ cx: 6.5, cy: 7.5, width: .1, height: .1 }, { scene: overlay }),
    });

    // Pressing anywhere on the text box will make the overlay go away
    new Actor({
      appearance: new FilledBox({ width: 2, height: 1, fillColor: "#000000" }),
      rigidBody: new BoxBody({ cx: 6.5, cy: 9, width: 2, height: 1 }, { scene: overlay }),
      gestures: { tap: () => { stage.clearOverlay(); return true; } },
    });
    new Actor({
      appearance: new TextSprite({ center: true, face: "Arial", color: "#FFFFFF", size: 28, z: 0 }, "Resume"),
      rigidBody: new BoxBody({ cx: 6.5, cy: 9, width: .1, height: .1 }, { scene: overlay }),
    });
    new Actor({
      appearance: new TextSprite({ center: true, face: "Arial", color: "#fa0505", size: 28, z: 0 }, 
      () => `Gold Required: ${hero.extra.initialPurchaseGold}`),
      rigidBody: new BoxBody({ cx: 6.5, cy: 10, width: .1, height: .1 }, { scene: overlay }),
    });
    new Actor({
      appearance: new TextSprite({ center: true, face: "TimesNewRoman", color: "#140000", size: 30, z: 1 }, 
      () => `HP: ${hero.extra.hp}\nATK: ${hero.extra.atk}\nDEF: ${hero.extra.def}\nGold: ${hero.extra.gold}\nExp: ${hero.extra.exp}`),
      rigidBody: new BoxBody({ cx: 16, cy: 3, width: .1, height: .1 }, { scene: overlay }),
    });
    
    new Actor({
      appearance: new FilledBox({ width: 2, height: 2, fillColor: "#FFFFFF" }),
      rigidBody: new BoxBody({ cx: 16, cy: 3, width: 2, height: 2 }, { scene: overlay }),
    });
  }, true);
}

export  function movingCollision(cx:number,cy:number,hero:Actor){
  for (let o of stage.world.physics.actorsAt({x:cx, y:cy})) { 
    if(o.extra.isMerchant){
      merchantPurchase(hero);
    } 
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

export function heroControl(hero: Actor){
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
}