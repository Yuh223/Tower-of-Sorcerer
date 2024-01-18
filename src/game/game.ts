import { JetLagGameConfig} from "../jetlag/Config";
import { initializeAndLaunch} from "../jetlag/Stage";
import { splashBuilder } from './splash';


/**
 * Screen dimensions and other game configuration, such as the names of all
 * the assets (images and sounds) used by this game.
 */
class Config implements JetLagGameConfig {
    pixelMeterRatio = 100;
    screenDimensions = { width: 1900, height: 1300 };
    adaptToScreenSize = true;
    canVibrate = false;
    forceAccelerometerOff = true;
    storageKey = "--no-key--";
    hitBoxes = false;
    resourcePrefix = "./assets/";
    musicNames = ["bgm.mp3","opening.mp3"];
    soundNames = ["attack.mp3","door.mp3","floor.mp3","item.mp3"];
    imageNames = ["hero.json","terrains.json","items.json","enemies.json","animates.json","npcs.json","ground.png","sprites.json","bg.jpg","Pacifico-Regular.ttf","Salsa-Regular.ttf"];
}


    

// call the function that starts running the game in the `game-player` div tag
// of `index.html`
initializeAndLaunch("game-player", new Config(), splashBuilder);




