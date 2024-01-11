import { AnimatedSprite, ImageSprite } from '../jetlag/Components/Appearance';
import { BoxBody } from '../jetlag/Components/RigidBody';
import { AnimationSequence, AnimationState } from '../jetlag/Config';
import { Actor } from '../jetlag/Entities/Actor';
export function createGreenSlime(cx:number, cy:number){
    let animation_map = new Map();
    let smile = AnimationSequence.makeSimple({
      timePerFrame: 600,
      repeat: true,
      images: ["green_slime_1.png", "green_slime_2.png"]
    });
    animation_map.set(AnimationState.IDLE_E, smile);
    let green_smile = new Actor({
        appearance: new AnimatedSprite({width: 1, height: 1, animations: animation_map }),
        rigidBody: new BoxBody({ cx, cy, width: 1, height: 1 },{disableRotation:true}),
        extra: {
          isEnemy: true,
          hp: 35,
          atk: 18,
          def: 1,
          gold: 1,
          exp: 1,
          
        }
    });
}
export function createRedSlime(cx:number, cy:number){
  let animation_map = new Map();
  let Redsmile = AnimationSequence.makeSimple({
    timePerFrame: 600,
    repeat: true,
    images: ["red_slime_1.png", "red_slime_2.png"]
  });
  animation_map.set(AnimationState.IDLE_E, Redsmile);
  let green_smile = new Actor({
      appearance: new AnimatedSprite({width: 1, height: 1, animations: animation_map }),
      rigidBody: new BoxBody({ cx, cy, width: 1, height: 1 },{disableRotation:true}),
      extra: {
        isEnemy: true,
        hp: 45,
        atk: 20,
        def: 2,
        gold: 2,
        exp: 2,
        
      }
  });
}
export function createMerchant(cx:number, cy:number){
  let animation_map = new Map();
  let merchant = AnimationSequence.makeSimple({
    timePerFrame: 600,
    repeat: true,
    images: ["merchant_1.png", "merchant_2.png"]
  });
  animation_map.set(AnimationState.IDLE_E, merchant);
  new Actor({
    appearance: new AnimatedSprite({width: 1, height: 1, animations: animation_map }),
    rigidBody: new BoxBody({ cx, cy, width: 1, height: 1 },{disableRotation:true}),
    extra: {
      isMerchant: true,
      isWall:true,
    }
  });
  let merchantLeft = cx-1;
  let merchantRight = cx+1;
  new Actor({
    appearance: new ImageSprite({width: 1, height: 1, img: "merchant_left.png" }),
    rigidBody: new BoxBody({ cx: merchantLeft, cy, width: 1, height: 1 },{disableRotation:true}),
    extra:{
      isWall:true,
    }
  });
  new Actor({
    appearance: new ImageSprite({width: 1, height: 1, img: "merchant_right.png" }),
    rigidBody: new BoxBody({ cx: merchantRight, cy, width: 1, height: 1 },{disableRotation:true}),
    extra:{
      isWall:true,
    }
  });
}