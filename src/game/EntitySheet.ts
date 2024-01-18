import { AnimatedSprite, ImageSprite } from '../jetlag/Components/Appearance';
import { BoxBody } from '../jetlag/Components/RigidBody';
import { AnimationSequence, AnimationState } from '../jetlag/Config';
import { Actor } from '../jetlag/Entities/Actor';
function monsterBuilder(cx:number, cy:number,img1:string,img2:string,hp:number,atk:number,def:number,gold:number,exp:number){
  let animation_map = new Map();
  let a = AnimationSequence.makeSimple({
    timePerFrame: 600,
    repeat: true,
    images: [img1, img2]
  });
  animation_map.set(AnimationState.IDLE_E, a);
  let green_slime = new Actor({
    appearance: new AnimatedSprite({width: 1, height: 1, animations: animation_map }),
    rigidBody: new BoxBody({ cx, cy, width: 1, height: 1 },{disableRotation:true}),
    extra: {
      isEnemy: true,
      hp: hp,
      atk: atk,
      def: def,
      gold: gold,
      exp: exp,
      
    }
});
}
export function createGreenSlime(cx:number, cy:number){
  monsterBuilder(cx,cy,"green_slime_1.png","green_slime_2.png",35,18,1,1,1);
}
export function createRedSlime(cx:number, cy:number){
  monsterBuilder(cx,cy,"red_slime_1.png","red_slime_2.png",45,20,2,2,2);
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
export function createNPC(cx:number, cy:number){
  let animation_map = new Map();
  let NPC = AnimationSequence.makeSimple({
    timePerFrame: 600,
    repeat: true,
    images: ["oldGuy_1.png", "oldGuy_2.png"]
  });
  animation_map.set(AnimationState.IDLE_E, NPC);
  new Actor({
    appearance: new AnimatedSprite({width: 1, height: 1, animations: animation_map }),
    rigidBody: new BoxBody({ cx, cy, width: 1, height: 1 },{disableRotation:true}),
    extra: {
      isNPC: true,
      isWall:true,
      dialogue: "hello, this is the field book.",
    }
  });
}