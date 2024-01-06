import { AnimatedSprite, FilledBox, ImageSprite, TextSprite } from '../jetlag/Components/Appearance';
import { ChaseMovement, GravityMovement, ManualMovement, Path, PathMovement, ProjectileMovement, TiltMovement } from "../jetlag/Components/Movement";
import { BoxBody, CircleBody, RigidBodyComponent } from '../jetlag/Components/RigidBody';
import { Destination, Enemy, Goodie, Hero, Obstacle, Projectile } from "../jetlag/Components/Role";
import { AnimationSequence, AnimationState, JetLagGameConfig, Sides } from "../jetlag/Config";
import { Actor } from "../jetlag/Entities/Actor";
import { Scene } from "../jetlag/Entities/Scene";
import { KeyCodes } from "../jetlag/Services/Keyboard";
import { initializeAndLaunch, stage } from "../jetlag/Stage";
import { OuterWallConstructor } from "./common";
import { splashBuilder } from "./splash";


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
    imageNames = ["hero.json","terrains.json"];
}


/**
 * Build the levels of the game.
 *
 * @param level Which level should be displayed
 */
function builder(level: number) {
  OuterWallConstructor();
  let animations = new Map();
    animations.set(AnimationState.WALK_N, AnimationSequence.makeSimple({
      timePerFrame: 75, repeat: true,
      images: ["hero_walk_u_1.png", "hero_walk_u_2.png", "hero_walk_u_3.png"]
    }));
    animations.set(AnimationState.WALK_W, AnimationSequence.makeSimple({
      timePerFrame: 75, repeat: true,
      images: ["hero_walk_l_1.png", "hero_walk_l_2.png", "hero_walk_l_3.png"]
    }));
    animations.set(AnimationState.WALK_S, AnimationSequence.makeSimple({
      timePerFrame: 75, repeat: true,
      images: ["hero_walk_d_1.png", "hero_walk_d_2.png", "hero_walk_d_3.png"]
    }));
    animations.set(AnimationState.WALK_E, AnimationSequence.makeSimple({
      timePerFrame: 75, repeat: true,
      images: ["hero_walk_r_1.png", "hero_walk_r_2.png", "hero_walk_r_3.png"]
    }));
    animations.set(AnimationState.IDLE_N, new AnimationSequence(true).to("hero_stand_u.png", 750));
    animations.set(AnimationState.IDLE_W, new AnimationSequence(true).to("hero_stand_l.png", 750));
    animations.set(AnimationState.IDLE_S, new AnimationSequence(true).to("hero_stand_d.png", 750));
    animations.set(AnimationState.IDLE_E, new AnimationSequence(true).to("hero_stand_r.png", 750));
    
    let hero = new Actor({
      rigidBody: new BoxBody({ cx: 6.5, cy: 1.5, width: 1, height: 1 },{disableRotation:true}),
      appearance: new AnimatedSprite({ width: 1, height: 1, animations }),
      role: new Hero(),
      movement: new ManualMovement(),
    });

    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_UP, () => (animations.get(AnimationState.IDLE_N)));
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_DOWN, () => ((hero.movement as ManualMovement).updateYVelocity(0)));
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_LEFT, () => ((hero.movement as ManualMovement).updateXVelocity(0)));
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_RIGHT, () => ((hero.movement as ManualMovement).updateXVelocity(0)));
    if(hero.rigidBody.getCenter().x<=1.5){
      
    }else{
      stage.keyboard.setKeyDownHandler(KeyCodes.KEY_UP, () => (hero.rigidBody.setCenter(hero.rigidBody.getCenter().x,hero.rigidBody.getCenter().y-1)));
      stage.keyboard.setKeyDownHandler(KeyCodes.KEY_LEFT, () => (hero.rigidBody.setCenter(hero.rigidBody.getCenter().x-1,hero.rigidBody.getCenter().y)));
      stage.keyboard.setKeyDownHandler(KeyCodes.KEY_RIGHT, () => (hero.rigidBody.setCenter(hero.rigidBody.getCenter().x+1,hero.rigidBody.getCenter().y)));
      stage.keyboard.setKeyDownHandler(KeyCodes.KEY_DOWN, () => (hero.rigidBody.setCenter(hero.rigidBody.getCenter().x,hero.rigidBody.getCenter().y+1)));
    }

}

    

// call the function that starts running the game in the `game-player` div tag
// of `index.html`
initializeAndLaunch("game-player", new Config(), builder);

