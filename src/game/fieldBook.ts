import { FilledBox, ImageSprite, TextSprite } from "../jetlag/Components/Appearance";
import { BoxBody } from "../jetlag/Components/RigidBody";
import { Actor } from "../jetlag/Entities/Actor";
import { Scene } from "../jetlag/Entities/Scene";
import { stage } from "../jetlag/Stage";
import { calculation, checkfight } from "./battle";
import { monsters } from "./enemies";
import { SStore } from "./session";

let currentMonsterActors: Actor[] = [];
const monstersPerPage = 4;
export function fieldBookUI(){
  let sstore = stage.storage.getSession("session_state") as SStore;
  stage.requestOverlay((overlay: Scene) => {
    new Actor({
      appearance: new FilledBox({ width: 19, height: 13, fillColor: "#F0F0F0" }),
      rigidBody: new BoxBody({ cx: 9.5, cy: 6.5, width: 19, height: 13 }, { scene: overlay }),
    });
    new Actor({
      appearance: new TextSprite({ center: true, face: "Arial", color: "#000000", size: 24, z: 0 }, "click here to turn back to game"),
      rigidBody: new BoxBody({ cx: 9.5, cy: 12.5, width: 10, height: 2 }, { scene: overlay }),
      gestures: { tap: () => { stage.clearOverlay(); return true; } },
    });
    new Actor({
      appearance: new TextSprite({ center: true, face: "Arial", color: "#000000", size: 48, z: 0 }, "Field Book"),
      rigidBody: new BoxBody({ cx: 9.5, cy: 0.5, width: 0.1, height: 0.1 }, { scene: overlay }),
    });
    displayMonsters(sstore.currentPage, overlay);

    // page change
    new Actor({
      appearance: new TextSprite({ center: true, face: "Arial", color: "#000000", size: 24, z: 0 }, "Next Page"),
      rigidBody: new BoxBody({ cx: 18, cy: 6.5, width: 1, height: 1 }, { scene: overlay }),
      gestures: { tap: () => { sstore.currentPage = Math.min(sstore.currentPage + 1, 7); 
        displayMonsters(sstore.currentPage, overlay);
        return true; 
      } },
    });
    new Actor({
      appearance: new TextSprite({ center: true, face: "Arial", color: "#000000", size: 24, z: 0 }, "Previous Page"),
      rigidBody: new BoxBody({ cx: 1, cy: 6.5, width: 1, height: 1 }, { scene: overlay }),
      gestures: { tap: () => {
        sstore.currentPage = Math.max(sstore.currentPage - 1, 0);
        displayMonsters(sstore.currentPage, overlay);
        return true;
      } },
    });
  }, true);
}

function displayMonsters(page: number, overlay: Scene) {
  let sstore = stage.storage.getSession("session_state") as SStore;
  // clear current actor on the scene
  currentMonsterActors.forEach(actor => actor.enabled=false);
  currentMonsterActors = [];
  // calculate enemies' data's position
  let start = page * monstersPerPage;
  let end = Math.min(start + monstersPerPage, Object.keys(monsters).length);
  let x = 2.5;
  let y = 0;
  let yIncrement = 2;
  for (let i = start; i < end; i++) {
    y+=yIncrement;
    let monsterName = Object.keys(monsters)[i];
    let monster = monsters[monsterName];
    let fakeHero = new Actor({
      appearance: new ImageSprite({
        img: "",
        width: 0.1,
        height: 0.1,
      }),
      rigidBody: new BoxBody({ cx: 0, cy: 0, width: 0.1, height: 0.1 }, { scene: overlay }),
      extra: sstore.extra
    })
    // enemy image
    let image = new Actor({
      appearance: new ImageSprite({
        img: monster.images[0],
        width: 1,
        height: 1,
      }),
      rigidBody: new BoxBody({ cx: x, cy: y, width: 1, height: 1 }, { scene: overlay }),
      extra:{
        hp: monster.hp,
        atk:monster.atk,
        def:monster.def
      }
    });
    // enemy text
    let text = new Actor({
      appearance: new TextSprite({
        center: true,
        face: "Arial",
        color: "#000000",
        size: 24,
      }, `${monsterName}\nHP: ${monster.hp} ATK: ${monster.atk} DEF: ${monster.def} Gold: ${monster.gold} EXP: ${monster.exp}}`,),
      rigidBody: new BoxBody({ cx: x + 4, cy: y, width: 1, height: 1 }, { scene: overlay })
    });

    let color = "#000000"; //default black
    let resultText = "";
    if (checkfight(fakeHero, image)) {
        // if invincible
        color = "red";
        resultText = "Invincible";
    } else {
        const remainingHeroHp = calculation(fakeHero, image);
        const damageToHero = fakeHero.extra.hp - remainingHeroHp;
        const percentageDamage = damageToHero / fakeHero.extra.hp;
        if (percentageDamage <= 0.25) {
            color = "green"; // < 25%
        } else if (percentageDamage <= 0.75) {
            color = "brown"; // 25% to 75%
        } else {
            color = "red"; // > 75%
        }
        resultText = `Damage: ${damageToHero}`;
    }
    let damage = new Actor({
        appearance: new TextSprite({
            center: true,
            face: "Arial",
            color: color,
            size: 24,
        }, resultText),
        rigidBody: new BoxBody({ cx: x+4, cy: y+0.5, width: 0.1, height: 0.1 }, { scene: overlay })
    });
    currentMonsterActors.push(image);
    currentMonsterActors.push(text);
    currentMonsterActors.push(damage);
  }
}