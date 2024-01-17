import { ImageSprite, TextSprite } from '../jetlag/Components/Appearance';
import { BoxBody} from '../jetlag/Components/RigidBody';
import { Actor } from "../jetlag/Entities/Actor";
import { stage } from "../jetlag/Stage";
import { levelConstructor } from './level';
import { SStore } from './session';

export function gameBuilder(level: number){
  let sstore = stage.storage.getSession("session_state") as SStore;
  stage.score.onWin = { level: level + 1, builder: gameBuilder };
  stage.score.onLose = { level: level - 1, builder: gameBuilder };
  
  if (level == 1) {
    // Level 1 will just have a hero and a destination
    levelConstructor(sstore.mazeLayout1);
    UI(sstore);
  }
  if(level == 2){
    levelConstructor(sstore.mazeLayout2);
    UI(sstore);
  }
}
export function UI(sstore:SStore){
  new Actor({
    appearance: new TextSprite({ center: true, face: "TimesNewRoman", color: "#140000", size: 30, z: 1 }, 
    () => `HP: ${sstore.extra.hp}\nATK: ${sstore.extra.atk}\nDEF: ${sstore.extra.def}\nGold: ${sstore.extra.gold}\nExp: ${sstore.extra.exp}\nYellowKey: ${sstore.extra.pocket.yellowKey}\nBlueKey: ${sstore.extra.pocket.blueKey}\nRedKey: ${sstore.extra.pocket.redKey}`),
    rigidBody: new BoxBody({ cx: 16, cy: 3, width: .1, height: .1 }),
  });
}