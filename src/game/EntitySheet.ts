import { AnimatedSprite, ImageSprite } from '../jetlag/Components/Appearance';
import { BoxBody } from '../jetlag/Components/RigidBody';
import { AnimationSequence, AnimationState } from '../jetlag/Config';
import { Actor } from '../jetlag/Entities/Actor';
import { monsters } from './enemies';
type MonsterName = keyof typeof monsters;

function monsterBuilder(cx: number, cy: number, monsterName: MonsterName) {
  const monsterData = monsters[monsterName];
  
  if (!monsterData) {
    console.error("Monster data not found for:", monsterName);
    return;
  }

  let animation_map = new Map();
  let animation = AnimationSequence.makeSimple({
    timePerFrame: 600,
    repeat: true,
    images: monsterData.images
  });
  animation_map.set(AnimationState.IDLE_E, animation);
  let monster = new Actor({
    appearance: new AnimatedSprite({ width: 1, height: 1, animations: animation_map }),
    rigidBody: new BoxBody({ cx, cy, width: 1, height: 1 }, { disableRotation: true }),
    extra: {
      isEnemy: true,
      hp: monsterData.hp,
      atk: monsterData.atk,
      def: monsterData.def,
      gold: monsterData.gold,
      exp: monsterData.exp,
    }
  });
  return monster;
}
export function createGreenSlime(cx:number, cy:number){
  return monsterBuilder(cx, cy, "green_slime");
}
export function createRedSlime(cx:number, cy:number){
  return monsterBuilder(cx, cy, "red_slime");
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