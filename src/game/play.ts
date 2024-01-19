import { ImageSprite, TextSprite } from '../jetlag/Components/Appearance';
import { BoxBody} from '../jetlag/Components/RigidBody';
import { Actor } from "../jetlag/Entities/Actor";
import { stage } from "../jetlag/Stage";
import { callfieldBook } from './EntitySheet';
import { drawMuteButton } from './common';
import { levelConstructor } from './level';
import { SStore } from './session';
import { splashBuilder } from './splash';

export function gameBuilder(level: number){
  drawMuteButton({cx:18.5,cy:12.5,width:1,height:1,scene:stage.hud});
  new Actor({
    appearance: new ImageSprite({ width: 1, height: 1, img: "back_arrow.png" }),
    rigidBody: new BoxBody({ cx:17, cy:12.5, width: 1, height: 1 }),
    gestures: { tap: () => { stage.switchTo(splashBuilder, level); return true; } }
  });
  let sstore = stage.storage.getSession("session_state") as SStore;
  stage.score.onWin = { level: level + 1, builder: gameBuilder };
  stage.score.onLose = { level: level - 1, builder: gameBuilder };
  if (level == 1) {
    // Level 1 will just have a hero and a destination
    sstore.levels=1;
    levelConstructor(sstore.level1);
    UI(sstore);
    stage.gameMusic!.play();
  }
  if(level == 2){
    sstore.levels=2;
    levelConstructor(sstore.level2);
    UI(sstore);
    stage.gameMusic!.play();
  }
  if(level == 3){
    sstore.levels=3;
    levelConstructor(sstore.level3);
    UI(sstore);
    stage.gameMusic!.play();
  }
  if(level == 4){
    sstore.levels=4;
    levelConstructor(sstore.level4);
    UI(sstore);
    stage.gameMusic!.play();
  }
  if(level == 5){
    sstore.levels=5;
    levelConstructor(sstore.level5);
    UI(sstore);
    stage.gameMusic!.play();
  }
  if(level == 6){
    sstore.levels=6;
    levelConstructor(sstore.level6);
    UI(sstore);
    stage.gameMusic!.play();
  }
  if(level == 7){
    sstore.levels=7;
    levelConstructor(sstore.level7);
    UI(sstore);
    stage.gameMusic!.play();
  }
  if(level == 8){
    sstore.levels=8;
    levelConstructor(sstore.level8);
    UI(sstore);
    stage.gameMusic!.play();
  }
  if(level == 9){
    sstore.levels=9;
    levelConstructor(sstore.level9);
    UI(sstore);
    stage.gameMusic!.play();
  }
  if(level == 10){
    sstore.levels=10;
    levelConstructor(sstore.level10);
    UI(sstore);
    stage.gameMusic!.play();
  }
  if(level == 11){
    sstore.levels=11;
    levelConstructor(sstore.level11);
    UI(sstore);
    stage.gameMusic!.play();
  }
  if(level == 12){
    sstore.levels=12;
    levelConstructor(sstore.level12);
    UI(sstore);
    stage.gameMusic!.play();
  }
  if(level == 13){
    sstore.levels=13;
    levelConstructor(sstore.level13);
    UI(sstore);
    stage.gameMusic!.play();
  }
  if(level == 14){
    sstore.levels=14;
    levelConstructor(sstore.level14);
    UI(sstore);
    stage.gameMusic!.play();
  }
  if(level == 15){
    sstore.levels=15;
    levelConstructor(sstore.level15);
    UI(sstore);
    stage.gameMusic!.play();
  }
  if(level == 16){
    sstore.levels=16;
    levelConstructor(sstore.level16);
    UI(sstore);
    stage.gameMusic!.play();
  }
  if(level == 17){
    sstore.levels=17;
    levelConstructor(sstore.level17);
    UI(sstore);
    stage.gameMusic!.play();
  }
  if(level == 18){
    sstore.levels=18;
    levelConstructor(sstore.level18);
    UI(sstore);
    stage.gameMusic!.play();
  }
  if(level == 19){
    sstore.levels=19;
    levelConstructor(sstore.level19);
    UI(sstore);
    stage.gameMusic!.play();
  }
  if(level == 20){
    sstore.levels=20;
    levelConstructor(sstore.level20);
    UI(sstore);
    stage.gameMusic!.play();
  }
  callfieldBook();
}
  
  

  

export function UI(sstore:SStore){
  new Actor({
    appearance: new TextSprite({ center: true, face: "TimesNewRoman", color: "#140000", size: 30, z: 1 }, 
    () => `HP: ${sstore.extra.hp}\nATK: ${sstore.extra.atk}\nDEF: ${sstore.extra.def}\nGold: ${sstore.extra.gold}\nExp: ${sstore.extra.exp}\nYellowKey: ${sstore.extra.pocket.yellowKey}\nBlueKey: ${sstore.extra.pocket.blueKey}\nRedKey: ${sstore.extra.pocket.redKey}`),
    rigidBody: new BoxBody({ cx: 16, cy: 3, width: .1, height: .1 }),
  });
  
}
