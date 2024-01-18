import { FilledBox, ImageSprite, TextSprite } from "../jetlag/Components/Appearance";
import { Actor } from "../jetlag/Entities/Actor";
import { stage } from "../jetlag/Stage";
import { BoxBody } from "../jetlag/Components/RigidBody";
import { helpBuilder } from "./help";
import { gameBuilder } from "./play";
import { SStore } from "./session";
import { MusicComponent } from "../jetlag/Components/Music";
import { drawMuteButton } from "./common";



/**
 * splashBuilder will draw the scene that we see when the game starts. In our
 * case, it's just a menu and some branding.
 *
 * There is usually only one splash screen, but JetLag allows for many, so there
 * is a `level` parameter.  In this code, we just ignore it.
 *
 * @param level Which splash screen should be displayed
 */
export function splashBuilder(_level: number) {
  drawMuteButton({cx:18.5,cy:12.5,width:1,height:1,scene:stage.hud});
  // start the music
  if (stage.gameMusic === undefined)
    stage.gameMusic = new MusicComponent(stage.musicLibrary.getMusic("bgm.mp3"));
  stage.gameMusic!.pause();
  
  //this is where I should construct the session object. 
  if (!stage.storage.getSession("session_state"))
    stage.storage.setSession("session_state", new SStore());
  let sstore = stage.storage.getSession("session_state") as SStore;
  sstore.isWin = true;
  // Paint the background white
  stage.backgroundColor = "#FFFFFF";

  // Draw a brown box at the top of the screen, put some text in it
  new Actor({
    appearance: new ImageSprite({ width: 19, height: 13, img:"bg.jpg" }),
    rigidBody: new BoxBody({ cx: 9.5, cy: 6.5, width: 19, height: 13 }),
  });
  new Actor({
    appearance: new TextSprite({ center: true, face: "Pacifico", size: 120, color: "#FFFFFF" }, "24 Level Tower of Sorcerer"),
    rigidBody: new BoxBody({ cx: 9.5, cy: 1.25, width: .1, height: .1 }),
  });
  new Actor ({
    appearance: new TextSprite({ center: true, face: "Salsa", size: 30, color: "#FFFFFF" }, "Start Opening Music"),
    rigidBody: new BoxBody({ cx: 17.5, cy: 0.5, width: 3, height: 1 }),
    gestures: { tap: () => { stage.levelMusic = new MusicComponent(stage.musicLibrary.getMusic("opening.mp3")); return true; } }
  });
  // Draw some text.  Tapping its *rigidBody* will go to the first page of the
  // level chooser
  new Actor({
    appearance: new TextSprite({ center: true, face: "Salsa", size: 96, color: "red" }, "Play"),
    rigidBody: new BoxBody({ cx: 9.5, cy: 8, width: 2.5, height: 1.25 }),
    gestures: { tap: () => { stage.switchTo(gameBuilder, sstore.levels); return true; } }
  });

  // Make some text for going to the help screen
  new Actor({
    appearance: new TextSprite({ center: true, face: "Salsa", size: 72, color: "green" }, "Help"),
    rigidBody: new BoxBody({ cx: 4.75, cy: 10.5, width: 1.8, height: 0.9 }),
    gestures: { tap: () => { stage.switchTo(helpBuilder, 1); return true; } }
  });

  // Make a quit button.  This is probably not useful in browser games, only
  // mobile/desktop.
  new Actor({
    appearance: new TextSprite({ center: true, face: "Salsa", size: 72, color: "yellow" }, "Quit"),
    rigidBody: new BoxBody({ cx: 14.25, cy: 10.5, width: 1.8, height: 0.9 }),
    gestures: { tap: () => { stage.exit(); return true; } }
  });

}