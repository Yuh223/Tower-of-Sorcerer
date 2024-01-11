import { FilledBox, ImageSprite, TextSprite } from "../jetlag/Components/Appearance";
import { BoxBody } from "../jetlag/Components/RigidBody";
import { Actor } from "../jetlag/Entities/Actor";
import { Scene } from "../jetlag/Entities/Scene";
import { stage } from "../jetlag/Stage";
import { calculation, checkfight } from "./battle";

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
  