import { FilledBox, ImageSprite, TextSprite, AppearanceComponent, AnimatedSprite } from '../jetlag/Components/Appearance';
import { BoxBody } from "../jetlag/Components/RigidBody";
import { AnimationSequence, AnimationState } from '../jetlag/Config';
import { Actor } from "../jetlag/Entities/Actor";
import { Scene } from "../jetlag/Entities/Scene";
import { KeyCodes } from "../jetlag/Services/Keyboard";
import { stage } from "../jetlag/Stage";
import { calculation, checkfight } from "./battle";
import { SStore } from "./session";
import { ISound } from '../jetlag/Services/AudioLibrary';
import { TimedEvent } from '../jetlag/Systems/Timer';

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
      gestures: { tap: () => { if(hero.extra.gold > hero.extra.PurchaseGold) 
          {hero.extra.hp += 800; hero.extra.gold -= hero.extra.PurchaseGold; hero.extra.PurchaseGold += 1;}
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
      gestures: { tap: () => { if(hero.extra.gold > hero.extra.PurchaseGold) 
          {hero.extra.atk += 1; hero.extra.gold -= hero.extra.PurchaseGold; hero.extra.PurchaseGold += 1;} 
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
      gestures: { tap: () => { if(hero.extra.gold > hero.extra.PurchaseGold) 
          {hero.extra.def += 2; hero.extra.gold -= hero.extra.PurchaseGold; hero.extra.PurchaseGold += 1;} 
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
      () => `HP: ${hero.extra.hp}\nATK: ${hero.extra.atk}\nDEF: ${hero.extra.def}\nGold: ${hero.extra.gold}\nExp: ${hero.extra.exp}\nYellowKey: ${hero.extra.pocket.yellowKey}\nBlueKey: ${hero.extra.pocket.blueKey}\nRedKey: ${hero.extra.pocket.redKey}`),
      rigidBody: new BoxBody({ cx: 16, cy: 3, width: .1, height: .1 }, { scene: overlay }),
    });
    
    new Actor({
      appearance: new FilledBox({ width: 2, height: 2, fillColor: "#FFFFFF" }),
      rigidBody: new BoxBody({ cx: 16, cy: 3, width: 2, height: 2 }, { scene: overlay }),
    });
  }, true);
}

export function movingCollision(cx:number,cy:number,hero:Actor){
  let sstore = stage.storage.getSession("session_state") as SStore;
  for (let o of stage.world.physics.actorsAt({x:cx, y:cy})) { 
    if(o.extra.isMerchant){
      merchantPurchase(hero);
    } 
    if(o.extra.isUp){
      //In the session, set that to win.
      sstore.isWin=true;
      stage.score.winLevel();
    }else if (o.extra.isDown){
      //In the session, set that to lose.
      sstore.isWin=false;
      stage.score.loseLevel();
    }
    if(o.extra.isGate){
      if(o.extra.color == "yellow"){
        if(hero.extra.pocket.yellowKey>=1){
          hero.extra.pocket.yellowKey-=1;
          (o.appearance as AnimatedSprite).animations.set(AnimationState.IDLE_E,AnimationSequence.makeSimple({
            timePerFrame:75,
            repeat:false,
            images: ["yellow_gate_1.png", "yellow_gate_2.png", "yellow_gate_3.png"]
          }));
          openGate(o);
          sstore.level1[Math.round(o.rigidBody.getCenter().y*10)/10-0.5][Math.round(o.rigidBody.getCenter().x*10)/10-0.5] = " ";
        }else return;
      }
      if(o.extra.color == "blue"){
        if(hero.extra.pocket.blueKey>=1){
          hero.extra.pocket.blueKey-=1;
          (o.appearance as AnimatedSprite).animations.set(AnimationState.IDLE_E,AnimationSequence.makeSimple({
            timePerFrame:75,
            repeat:false,
            images: ["blue_gate_1.png", "blue_gate_2.png", "blue_gate_3.png"]
          }));
          openGate(o);
          sstore.level1[Math.round(o.rigidBody.getCenter().y*10)/10-0.5][Math.round(o.rigidBody.getCenter().x*10)/10-0.5] = " ";
        }else return;
      }
      if(o.extra.color == "red"){
        if(hero.extra.pocket.redKey>=1){
          hero.extra.pocket.redKey-=1;
          (o.appearance as AnimatedSprite).animations.set(AnimationState.IDLE_E,AnimationSequence.makeSimple({
            timePerFrame:75,
            repeat:false,
            images: ["red_gate_1.png", "red_gate_2.png", "red_gate_3.png"]
          }));
          openGate(o);
          sstore.level1[Math.round(o.rigidBody.getCenter().y*10)/10-0.5][Math.round(o.rigidBody.getCenter().x*10)/10-0.5] = " ";
        }else return;
      }
    }
    else if (o.extra.isEnemy) {
      if(checkfight(hero,o)){
        return;
      }else{
        hero.extra.hp = calculation(hero,o);
        hero.extra.gold += o.extra.gold;
        hero.extra.exp += o.extra.exp;
        o.enabled = false;
        sstore.changed =true;
      }
    }else if (o.extra.isNPC){
      npcDialogue(o);
      if(sstore.levels==1){
        hero.extra.fieldBook = true;
      }
      sstore.level1[Math.round(o.rigidBody.getCenter().y*10)/10-0.5][Math.round(o.rigidBody.getCenter().x*10)/10-0.5] = " ";
    }else if (o.extra.isItem){
      if(o.extra.isKey){
        if(o.extra.isYellow){
          hero.extra.pocket.yellowKey+=1;
        }
        if(o.extra.isBlue){
          hero.extra.pocket.blueKey+=1;
        }
        if(o.extra.isRed){
          hero.extra.pocket.redKey+=1;
        }
      }else{
        hero.extra.atk = hero.extra.atk + o.extra.atk;
        hero.extra.def = hero.extra.def + o.extra.def;
        hero.extra.hp = hero.extra.hp + o.extra.hp;
        if(o.extra.magicResist){
          hero.extra.magicResist = true;
        }
      }
      o.enabled = false;
      sstore.changed =true;
    }
    if (o.extra.isWall) return;
    if(sstore.changed){
      sstore.level1[Math.round(o.rigidBody.getCenter().y*10)/10-0.5][Math.round(o.rigidBody.getCenter().x*10)/10-0.5] = " ";
      sstore.changed =false;
    }
  }
  hero.rigidBody.setCenter(cx,cy); 
}

export function heroControl(hero: Actor){
  stage.keyboard.setKeyDownHandler(KeyCodes.KEY_UP, () => {
    (hero.appearance as AnimatedSprite).animations.set(AnimationState.WALK_N,AnimationSequence.makeSimple({
      timePerFrame: 75,
      repeat:true,
      images:["hero_walk_u_1.png", "hero_walk_u_2.png", "hero_walk_u_3.png"],
    }));
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
function openGate(o:Actor){
  (o.appearance as AnimatedSprite).restartCurrentAnimation();
  o.extra.isWall = true;
  o.extra.isGate = false;
  stage.world.timer.addEvent(new TimedEvent(0.225,false,()=>{
    o.enabled = false;
    o.extra.isWall = false;
  }));
}

export function npcDialogue(npc: Actor) {
  stage.requestOverlay((overlay: Scene, screenshot: ImageSprite | undefined) => {
    new Actor({ appearance: screenshot!, rigidBody: new BoxBody({ cx: 9.5, cy: 6.5, width: 19, height: 13 }, { scene: overlay }), });
    new Actor({
      appearance: new FilledBox({ width: 10, height: 5, fillColor: "#CCE5E5" }),
      rigidBody: new BoxBody({ cx: 9.5, cy: 6.5, width: 10, height: 5 }, { scene: overlay }),
      gestures: { tap: () => { stage.clearOverlay(); npc.enabled = false; return true; } },
    });
    // npc image
    let npcIcon = npc.appearance;
    new Actor({
      appearance: npcIcon,
      rigidBody: new BoxBody({ cx: 5, cy: 4.5, width: 1, height: 1 }, { scene: overlay }),
    });

    // npc dialogue
    new Actor({
      appearance: new TextSprite({ center: true, face: "Arial", color: "#000000", size: 24, z: 0 }, npc.extra.dialogue),
      rigidBody: new BoxBody({ cx: 9.5, cy: 6.5, width: 8, height: 3 }, { scene: overlay }),
    });

    // npc dialogue
    new Actor({
      appearance: new TextSprite({ center: true, face: "Arial", color: "#000000", size: 24, z: 0 }, "click to to continue"),
      rigidBody: new BoxBody({ cx: 9.5, cy: 8.5, width: 8, height: 3 }, { scene: overlay }),
    });
  }, true);
}

export function fieldBookUI(){
  stage.requestOverlay((overlay: Scene) => {
    // 创建纯色背景
    new Actor({
      appearance: new FilledBox({ width: 19, height: 13, fillColor: "#F0F0F0" }),
      rigidBody: new BoxBody({ cx: 9.5, cy: 6.5, width: 19, height: 13 }, { scene: overlay }),
    });

    // 显示怪物数据


  }, true);
}
