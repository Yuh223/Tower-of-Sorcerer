import { AnimatedSprite, ImageSprite } from '../jetlag/Components/Appearance';
import { BoxBody } from "../jetlag/Components/RigidBody";
import { Destination, Hero, Obstacle } from "../jetlag/Components/Role";
import { AnimationSequence, AnimationState } from "../jetlag/Config";
import { Actor } from "../jetlag/Entities/Actor";
import { stage } from "../jetlag/Stage";
import { createArchMage, createArchWitch, createArmorSkeleton, createBeast, createBigBat, createBlackSlime, createBlueGuard, createCaptainSkeleton, createCrusader, createDarkKnight, createDemon, createDuosworder, createGrandSorcerer, createGreenSlime, createMage, createMerchant, createNPC, createPrincesImage, createPrincess, createRedBat, createRedGuard, createRedKnight, createRedSlime, createSkeleton, createSlimeKing, createSlimeMan, createSmallBat, createStone, createSubDemon, createSwordBeast, createSwordSkeleton, createVampire, createWitch, createYellowGuard, createYellowKnight } from "./EntitySheet";
import { heroControl } from "./common";
import { SStore } from "./session";

export function gate(x:number,y:number, gate:string,color:string){
  let animation_map = new Map();
  animation_map.set(AnimationState.IDLE_E,new AnimationSequence(true).to(gate,75));
  let a = new AnimatedSprite({ width: 1, height: 1, animations: animation_map,});
  new Actor({
    rigidBody: new BoxBody({ cx: x, cy: y, width: 1, height: 1 }),
    appearance: a,
    extra:{
      isGate:true,
      color: color,
      isWall:false,
    },
  });
}


export function levelConstructor(mazeLayout:string[][]){
  let sstore = stage.storage.getSession("session_state") as SStore;
  // Create walls and goodies from the `mazeLayout`
  for (let row = 0; row < mazeLayout.length; row++) {
    for (let col = 0; col < mazeLayout[row].length; col++) {
      new Actor({
        rigidBody: new BoxBody({ cx: col + 0.5, cy: row + 0.5, width: 1, height: 1 }),
        appearance: new ImageSprite({ width: 1, height: 1, img: "ground.png",z:-2}),
      });
      if (mazeLayout[row][col] === "#") {
        new Actor({
          rigidBody: new BoxBody({ cx: col + 0.5, cy: row + 0.5, width: 1, height: 1 }),
          appearance: new ImageSprite({ width: 1, height: 1, img: "wall_1.png" }),
          role: new Obstacle(),
          extra:{
            isWall: true,
          }
        });
      }
      if (mazeLayout[row][col] === "a") {
        createGreenSlime(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "b") {
        createRedSlime(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "c") {
        createMage(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "d") {
        createArchMage(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "e") {
        createSmallBat(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "f") {
        createBigBat(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "g") {
        createSkeleton(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "h") {
        createBlackSlime(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "i") {
        createSwordSkeleton(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "j") {
        createCaptainSkeleton(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "k") {
        createArmorSkeleton(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "l") {
        createBeast(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "m") {
        createSwordBeast(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "n") {
        createSlimeMan(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "o") {
        createStone(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "p") {
        createYellowKnight(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "q") {
        createRedKnight(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "r") {
        createCrusader(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "s") {
        createVampire(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "t") {
        createYellowGuard(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "u") {
        createBlueGuard(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "v") {
        createRedGuard(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "w") {
        createSlimeKing(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "x") {
        createRedBat(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "y") {
        createWitch(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "z") {
        createArchWitch(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "A") {
        createDarkKnight(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "C") {
        createDuosworder(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "E") {
        createSubDemon(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "H") {
        createDemon(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "I") {
        createGrandSorcerer(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "J") {
        createPrincess(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "K") {
        createPrincesImage(col + 0.5, row + 0.5);
      }
      if (mazeLayout[row][col] === "U") {
        new Actor({
          rigidBody: new BoxBody({ cx: col + 0.5, cy: row + 0.5, width: 1, height: 1 }),
          appearance: new ImageSprite({ width: 1, height: 1, img: "up.png",}),
          extra:{
            isUp: true,
          },
        });
      }
      if (mazeLayout[row][col] === "D") {
        new Actor({
          rigidBody: new BoxBody({ cx: col + 0.5, cy: row + 0.5, width: 1, height: 1 }),
          appearance: new ImageSprite({ width: 1, height: 1, img: "down.png",}),
          extra:{
            isDown: true,
          },
        });
      }
      if (mazeLayout[row][col] === "G") {
        new Actor({
          rigidBody: new BoxBody({ cx: col + 0.5, cy: row + 0.5, width: 1, height: 1 }),
          appearance: new ImageSprite({ width: 1, height: 1, img: "atkGem.png",}),
          extra:{
            isItem:true,
            atk: 2,
            def: 0,
            hp: 0,
          },
        });
      }
      if (mazeLayout[row][col] === "F") {
        new Actor({
          rigidBody: new BoxBody({ cx: col + 0.5, cy: row + 0.5, width: 1, height: 1 }),
          appearance: new ImageSprite({ width: 1, height: 1, img: "defGem.png",}),
          extra:{
            isItem: true,
            atk: 0,
            def: 2,
            hp: 0,
          },
        });
      }
      if (mazeLayout[row][col] === "R") {
        new Actor({
          rigidBody: new BoxBody({ cx: col + 0.5, cy: row + 0.5, width: 1, height: 1 }),
          appearance: new ImageSprite({ width: 1, height: 1, img: "redPotion.png",}),
          extra:{
            isItem: true,
            atk: 0,
            def: 0,
            hp: 200,
          },
        });
      }
      if (mazeLayout[row][col] === "B") {
        new Actor({
          rigidBody: new BoxBody({ cx: col + 0.5, cy: row + 0.5, width: 1, height: 1 }),
          appearance: new ImageSprite({ width: 1, height: 1, img: "bluePotion.png",}),
          extra:{
            isItem: true,
            atk: 0,
            def: 0,
            hp: 400,
          },
        });
      }
      if (mazeLayout[row][col] === "!") {
        new Actor({
          rigidBody: new BoxBody({ cx: col + 0.5, cy: row + 0.5, width: 1, height: 1 }),
          appearance: new ImageSprite({ width: 1, height: 1, img: "ironShield.png",}),
          extra:{
            isItem: true,
            atk: 0,
            def: 10,
            hp: 0,
          },
        });
      }
      if (mazeLayout[row][col] === "@") {
        new Actor({
          rigidBody: new BoxBody({ cx: col + 0.5, cy: row + 0.5, width: 1, height: 1 }),
          appearance: new ImageSprite({ width: 1, height: 1, img: "silverShield.png",}),
          extra:{
            isItem: true,
            atk: 0,
            def: 20,
            hp: 0,
          },
        });
      }
      if (mazeLayout[row][col] === "$") {
        new Actor({
          rigidBody: new BoxBody({ cx: col + 0.5, cy: row + 0.5, width: 1, height: 1 }),
          appearance: new ImageSprite({ width: 1, height: 1, img: "knightShield.png",}),
          extra:{
            isItem: true,
            atk: 0,
            def: 40,
            hp: 0,
          },
        });
      }
      if (mazeLayout[row][col] === "%") {
        new Actor({
          rigidBody: new BoxBody({ cx: col + 0.5, cy: row + 0.5, width: 1, height: 1 }),
          appearance: new ImageSprite({ width: 1, height: 1, img: "mithrilShield.png",}),
          extra:{
            isItem: true,
            atk: 0,
            def: 70,
            hp: 0,
          },
        });
      }
      if (mazeLayout[row][col] === "^") {
        new Actor({
          rigidBody: new BoxBody({ cx: col + 0.5, cy: row + 0.5, width: 1, height: 1 }),
          appearance: new ImageSprite({ width: 1, height: 1, img: "holyShield.png",}),
          extra:{
            isItem: true,
            atk: 0,
            def: 100,
            hp: 0,
            magicResist:true,
          },
        });
      }
      if (mazeLayout[row][col] === "&") {
        new Actor({
          rigidBody: new BoxBody({ cx: col + 0.5, cy: row + 0.5, width: 1, height: 1 }),
          appearance: new ImageSprite({ width: 1, height: 1, img: "ironlSword.png",}),
          extra:{
            isItem: true,
            atk: 10,
            def: 0,
            hp: 0,
          },
        });
      }
      if (mazeLayout[row][col] === "*") {
        new Actor({
          rigidBody: new BoxBody({ cx: col + 0.5, cy: row + 0.5, width: 1, height: 1 }),
          appearance: new ImageSprite({ width: 1, height: 1, img: "silverSword.png",}),
          extra:{
            isItem: true,
            atk: 20,
            def: 0,
            hp: 0,
          },
        });
      }
      if (mazeLayout[row][col] === "(") {
        new Actor({
          rigidBody: new BoxBody({ cx: col + 0.5, cy: row + 0.5, width: 1, height: 1 }),
          appearance: new ImageSprite({ width: 1, height: 1, img: "knightSword.png",}),
          extra:{
            isItem: true,
            atk: 40,
            def: 0,
            hp: 0,
          },
        });
      }
      if (mazeLayout[row][col] === ")") {
        new Actor({
          rigidBody: new BoxBody({ cx: col + 0.5, cy: row + 0.5, width: 1, height: 1 }),
          appearance: new ImageSprite({ width: 1, height: 1, img: "mithrilSword.png",}),
          extra:{
            isItem: true,
            atk: 70,
            def: 0,
            hp: 0,
          },
        });
      }
      if (mazeLayout[row][col] === "-") {
        new Actor({
          rigidBody: new BoxBody({ cx: col + 0.5, cy: row + 0.5, width: 1, height: 1 }),
          appearance: new ImageSprite({ width: 1, height: 1, img: "holySword.png",}),
          extra:{
            isItem: true,
            atk: 100,
            def: 0,
            hp: 0,
          },
        });
      }
      if (mazeLayout[row][col] === "1") {
        new Actor({
          rigidBody: new BoxBody({ cx: col + 0.5, cy: row + 0.5, width: 1, height: 1 }),
          appearance: new ImageSprite({ width: 1, height: 1, img: "yellow_key.png",}),
          extra:{
            isItem: true,
            isKey: true,
            isYellow: true,
          },
        });
      }
      if (mazeLayout[row][col] === "2") {
        new Actor({
          rigidBody: new BoxBody({ cx: col + 0.5, cy: row + 0.5, width: 1, height: 1 }),
          appearance: new ImageSprite({ width: 1, height: 1, img: "blue_key.png",}),
          extra:{
            isItem: true,
            isKey: true,
            isBlue: true,
          },
        });
      }
      if (mazeLayout[row][col] === "3") {
        new Actor({
          rigidBody: new BoxBody({ cx: col + 0.5, cy: row + 0.5, width: 1, height: 1 }),
          appearance: new ImageSprite({ width: 1, height: 1, img: "red_key.png",}),
          extra:{
            isItem: true,
            isKey: true,
            isRed: true,
          },
        });
      }
      if (mazeLayout[row][col] === "4") { 
        gate(col + 0.5, row + 0.5, "yellow_gate_0.png","yellow");
      }
      if (mazeLayout[row][col] === "5") {
        gate(col + 0.5, row + 0.5, "blue_gate_0.png","blue");
      }if (mazeLayout[row][col] === "6") {
        gate(col + 0.5, row + 0.5, "red_gate_0.png","red");
      }
      if (mazeLayout[row][col] === "M") {
        createMerchant(col + 0.5,row + 0.5);
      }
      if (mazeLayout[row][col] === "W" && sstore.isWin) {
        let animation_map = new Map();
        animation_map.set(AnimationState.IDLE_E,new AnimationSequence(true).to("hero_stand_d.png",75));
        let a = new AnimatedSprite({ width: 1, height: 1, animations: animation_map,});
        let hero = new Actor({
          rigidBody: new BoxBody({ cx: col + 0.5, cy: row + 0.5, width: 0.5, height: 0.5 },{disableRotation:true}),
          appearance: a,
          role: new Hero(),
          extra: sstore.extra,
        });
        heroControl(hero);    
      }
      if (mazeLayout[row][col] === "L" && !sstore.isWin) {
        let animation_map = new Map();
        animation_map.set(AnimationState.IDLE_E,new AnimationSequence(true).to("hero_stand_d.png",75));
        let a = new AnimatedSprite({ width: 1, height: 1, animations: animation_map,});
        let hero = new Actor({
          rigidBody: new BoxBody({ cx: col + 0.5, cy: row + 0.5, width: 0.5, height: 0.5 },{disableRotation:true}),
          appearance: a,
          role: new Hero(),
          extra: sstore.extra,
        });
        heroControl(hero);
      }
      if (mazeLayout[row][col] === "N") {
        createNPC(col + 0.5,row + 0.5);
      }
    }
  }
}
