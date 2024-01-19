import { AnimatedSprite, ImageSprite } from '../jetlag/Components/Appearance';
import { BoxBody } from '../jetlag/Components/RigidBody';
import { AnimationSequence, AnimationState } from '../jetlag/Config';
import { Actor } from '../jetlag/Entities/Actor';
import { stage } from '../jetlag/Stage';
import { fieldBookUI } from './fieldBook';
import { monsters } from './enemies';
import { SStore } from './session';
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
export function createMage(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "mage");
}

export function createArchMage(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "arch_mage");
}

export function createSmallBat(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "small_bat");
}

export function createBigBat(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "big_bat");
}

export function createSkeleton(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "skeleton");
}

export function createBlackSlime(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "black_slime");
}

export function createSwordSkeleton(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "sword_skeleton");
}

export function createCaptainSkeleton(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "captain_skeleton");
}

export function createArmorSkeleton(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "armor_skeleton");
}

export function createBeast(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "beast");
}

export function createSwordBeast(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "sword_beast");
}

export function createSlimeMan(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "slime_man");
}

export function createStone(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "stone");
}

export function createYellowKnight(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "yellow_knight");
}

export function createRedKnight(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "red_knight");
}

export function createCrusader(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "crusader");
}

export function createVampire(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "vampire");
}

export function createYellowGuard(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "yellow_guard");
}

export function createBlueGuard(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "blue_guard");
}

export function createRedGuard(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "red_guard");
}

export function createSlimeKing(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "slime_king");
}

export function createRedBat(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "red_bat");
}

export function createWitch(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "witch");
}

export function createArchWitch(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "arch_witch");
}

export function createDarkKnight(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "dark_knight");
}

export function createDuosworder(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "duosworder");
}

export function createSubDemon(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "sub_demon");
}

export function createDemon(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "demon");
}

export function createGrandSorcerer(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "grand_sorcerer");
}

export function createPrincess(cx: number, cy: number) {
  return monsterBuilder(cx, cy, "?????");
}
export function createPrincesImage(cx: number, cy: number){
  let animation_map = new Map();
  let animation = AnimationSequence.makeSimple({
    timePerFrame: 600,
    repeat: true,
    images: ["true_princess_1.png","true_princess_2.png"],
  });
  animation_map.set(AnimationState.IDLE_E, animation);
  let monster = new Actor({
    appearance: new AnimatedSprite({ width: 1, height: 1, animations: animation_map }),
    rigidBody: new BoxBody({ cx, cy, width: 1, height: 1 }, { disableRotation: true }),
    extra: {
      isPrincess: true,
      isWall:true,
      dialogue:"Ah, my brave hero, you've come so far, only to find that my heart\nnow belongs to a greater power. The power and knowledge I've gained here,\nwith the Grand Sorcerer, far surpass any futile promises of a 'happily ever\nafter.' I am no longer the damsel in distress you thought you knew.",
    }
  });
  return monster;
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
      dialogue: "Hello, I will help you, here is a illustrated guide through which you can plan your battles.",
    }
  });
}
export function callfieldBook(){
  let sstore = stage.storage.getSession("session_state") as SStore;
  if(sstore.extra.fieldBook){
    new Actor({
      appearance: new ImageSprite({width:1,height:1,img:"book.png"}),
      rigidBody: new BoxBody({ cx: 14.5, cy: 9.5, width: 1, height: 1 }),
      gestures: { tap: () => { fieldBookUI(); return true; } },
    });
  }
}