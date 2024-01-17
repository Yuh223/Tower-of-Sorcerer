import { FilledBox, ImageSprite, TextSprite } from "../jetlag/Components/Appearance";
import { Actor } from "../jetlag/Entities/Actor";
import { stage } from "../jetlag/Stage";
import { BoxBody } from "../jetlag/Components/RigidBody";
import { helpBuilder } from "./help";
import { gameBuilder } from "./play";
import { Hero } from "../jetlag/Components/Role";
import { SStore } from "./session";



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
  //this is where I should construct the session object. 
  if (!stage.storage.getSession("session_state"))
    stage.storage.setSession("session_state", new SStore());
  let sstore = stage.storage.getSession("session_state") as SStore;
  sstore.isWin = true;
  // Paint the background white
  stage.backgroundColor = "#FFFFFF";

  // Draw a brown box at the top of the screen, put some text in it
  new Actor({
    appearance: new FilledBox({ width: 19, height: 3, fillColor: "#523216" }),
    rigidBody: new BoxBody({ cx: 9.5, cy: 1.5, width: 16, height: 3 }),
  });
  new Actor({
    appearance: new TextSprite({ center: true, face: "Arial", size: 120, color: "#FFFFFF" }, "24 Level Tower of Sorcerer"),
    rigidBody: new BoxBody({ cx: 9.5, cy: 1.25, width: .1, height: .1 }),
  });
  new Actor({
    appearance: new TextSprite({ center: true, face: "Arial", size: 56, color: "#FFFFFF" }, "2D Games for Web and Mobile"),
    rigidBody: new BoxBody({ cx: 9.5, cy: 2.4, width: .1, height: .1 }),
  });

  // Draw some text.  Tapping its *rigidBody* will go to the first page of the
  // level chooser
  new Actor({
    appearance: new TextSprite({ center: true, face: "Arial", size: 96, color: "#000000" }, "Play"),
    rigidBody: new BoxBody({ cx: 9.5, cy: 8, width: 2.5, height: 1.25 }),
    gestures: { tap: () => { stage.switchTo(gameBuilder, 1); return true; } }
  });

  // Make some text for going to the help screen
  new Actor({
    appearance: new TextSprite({ center: true, face: "Arial", size: 72, color: "#000000" }, "Help"),
    rigidBody: new BoxBody({ cx: 4.75, cy: 10.5, width: 1.8, height: 0.9 }),
    gestures: { tap: () => { stage.switchTo(helpBuilder, 1); return true; } }
  });

  // Make a quit button.  This is probably not useful in browser games, only
  // mobile/desktop.
  new Actor({
    appearance: new TextSprite({ center: true, face: "Arial", size: 72, color: "#000000" }, "Quit"),
    rigidBody: new BoxBody({ cx: 14.25, cy: 10.5, width: 1.8, height: 0.9 }),
    gestures: { tap: () => { stage.exit(); return true; } }
  });

}