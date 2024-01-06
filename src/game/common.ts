import { FilledBox, ImageSprite } from "../jetlag/Components/Appearance";
import { BoxBody } from "../jetlag/Components/RigidBody";
import { Obstacle } from "../jetlag/Components/Role";
import { Actor } from "../jetlag/Entities/Actor";
import { Scene } from "../jetlag/Entities/Scene";
import { KeyCodes } from "../jetlag/Services/Keyboard";
import { stage } from "../jetlag/Stage";

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
export function OuterWallConstructor(){
  const mazeLayout = [
    "#############",
    "#           #",
    "#           #",
    "#           #",
    "#           #",
    "#           #",
    "#           #",
    "#           #",
    "#           #",
    "#           #",
    "#           #",
    "#           #",
    "#############",
  ];
  // Create walls and goodies from the `mazeLayout`
  for (let row = 0; row < mazeLayout.length; row++) {
    for (let col = 0; col < mazeLayout[row].length; col++) {
      if (mazeLayout[row][col] === "#") {
        new Actor({
          rigidBody: new BoxBody({ cx: col + 0.5, cy: row + 0.5, width: 1, height: 1 }),
          appearance: new ImageSprite({ width: 1, height: 1, img: "wall_1.png" }),
          role: new Obstacle(),
        });
      }
    }
  }

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

  