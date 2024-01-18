
import { Actor } from "../jetlag/Entities/Actor";
import { FilledBox } from "../jetlag/Components/Appearance";
import { stage } from "../jetlag/Stage";
import { BoxBody } from "../jetlag/Components/RigidBody";
import { splashBuilder } from "./splash";

/**
 * helpBuilder is for drawing the help screens.  These are no different from
 * game screens... except that you probably don't want them to involve "winning"
 * and "losing". 
 *
 * In this demonstration, we just provide a bit of information about the demo
 * game, and how to get started.  This is also often a good place to put
 * credits.
 *
 * For the purposes of this demonstration, there are two Help screens.  That
 * way, we can show how to move from one to the next.
 *
 * @param level Which help screen should be displayed
 */
export function helpBuilder(level: number) {
    

    // Tap anywhere to go back to the splash screen
    new Actor({
      appearance: new FilledBox({ width: 19, height: 13, fillColor: "#00000000" }),
      rigidBody: new BoxBody({ cx: 9.5, cy: 6.5, width: 19, height: 13 }),
      gestures: { tap: () => { stage.switchTo(splashBuilder, 1); return true; } }
    });
    
}