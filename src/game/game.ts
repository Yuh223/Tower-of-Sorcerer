import { FilledBox, ImageSprite, TextSprite } from "../jetlag/Components/Appearance";
import { ChaseMovement, GravityMovement, ManualMovement, Path, PathMovement, ProjectileMovement, TiltMovement } from "../jetlag/Components/Movement";
import { BoxBody, CircleBody } from "../jetlag/Components/RigidBody";
import { Destination, Enemy, Goodie, Hero, Obstacle, Projectile } from "../jetlag/Components/Role";
import { JetLagGameConfig, Sides } from "../jetlag/Config";
import { Actor } from "../jetlag/Entities/Actor";
import { Scene } from "../jetlag/Entities/Scene";
import { KeyCodes } from "../jetlag/Services/Keyboard";
import { initializeAndLaunch, stage } from "../jetlag/Stage";
import { TimedEvent } from "../jetlag/Systems/Timer";
import { splashBuilder } from "./splash";
import { ActorPoolSystem } from '../jetlag/Systems/ActorPool';
import { b2Vec2 } from "@box2d/core";

/**
 * Screen dimensions and other game configuration, such as the names of all
 * the assets (images and sounds) used by this game.
 */
class Config implements JetLagGameConfig {
    pixelMeterRatio = 100;
    screenDimensions = { width: 1600, height: 900 };
    adaptToScreenSize = true;
    canVibrate = true;
    forceAccelerometerOff = true;
    storageKey = "--no-key--";
    hitBoxes = true;
    resourcePrefix = "./assets/";
    musicNames = [];
    soundNames = [];
    imageNames = ["sprites.json","noise.png"];
}


/**
 * Build the levels of the game.
 *
 * @param level Which level should be displayed
 */
function builder(level: number) {


}

    

// call the function that starts running the game in the `game-player` div tag
// of `index.html`
initializeAndLaunch("game-player", new Config(), builder);

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

/**
 * Create an overlay (blocking all game progress) consisting of a black screen
 * with text.  Clearing the overlay will start the next level.
 *
 * @param message A message to display in the middle of the screen
 */
function winMessage(message: string) {
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
  function loseMessage(message: string) {
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