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
  callfieldBook();
}
export function UI(sstore:SStore){
  new Actor({
    appearance: new TextSprite({ center: true, face: "TimesNewRoman", color: "#140000", size: 30, z: 1 }, 
    () => `HP: ${sstore.extra.hp}\nATK: ${sstore.extra.atk}\nDEF: ${sstore.extra.def}\nGold: ${sstore.extra.gold}\nExp: ${sstore.extra.exp}\nYellowKey: ${sstore.extra.pocket.yellowKey}\nBlueKey: ${sstore.extra.pocket.blueKey}\nRedKey: ${sstore.extra.pocket.redKey}`),
    rigidBody: new BoxBody({ cx: 16, cy: 3, width: .1, height: .1 }),
  });
  
}