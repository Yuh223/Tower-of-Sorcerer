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
import { splashBuilder } from './splash';


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
    imageNames = ["hero.json","terrains.json","items.json","enemies.json","npcs.json","ground.png"];
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
initializeAndLaunch("game-player", new Config(), splashBuilder);




