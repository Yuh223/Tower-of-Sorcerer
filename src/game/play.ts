import { ImageSprite, TextSprite } from '../jetlag/Components/Appearance';
import { ManualMovement} from "../jetlag/Components/Movement";
import { BoxBody} from '../jetlag/Components/RigidBody';
import { Goodie, Hero} from "../jetlag/Components/Role";
import { Actor } from "../jetlag/Entities/Actor";
import { stage } from "../jetlag/Stage";
import { createMerchant } from './EntitySheet';
import { OuterWallConstructor } from './level';
import { heroControl, merchantPurchase} from './common';

export function gameBuilder(level: number){
  OuterWallConstructor();
  let hero = new Actor({
    rigidBody: new BoxBody({ cx: 7.5, cy: 9.5, width: 1, height: 1 },{disableRotation:true}),
    appearance: new ImageSprite({ width: 1, height: 1, img:"hero_stand_d.png"}),
    role: new Hero(),
    movement: new ManualMovement(),
    extra: {
      atk: 10,
      def: 10,
      hp: 1000,
      gold: 100,
      exp: 0,
      initialPurchaseGold: 10,
    }
  });
  heroControl(hero);
  createMerchant(5.5,1.5);
  let hs = new Actor({
    appearance: new ImageSprite({ width: 1, height: 1, img: "holyShield.png" }),
    rigidBody: new BoxBody({cx: 8.5, cy: 7.5, width: 1, height: 1},{disableRotation:true}),
    role: new Goodie(),
    extra:{
      isItem: true,
      isShield:true,
      def: 100,
    }
  });
  new Actor({
    appearance: new TextSprite({ center: true, face: "TimesNewRoman", color: "#140000", size: 30, z: 1 }, 
    () => `HP: ${hero.extra.hp}\nATK: ${hero.extra.atk}\nDEF: ${hero.extra.def}\nGold: ${hero.extra.gold}\nExp: ${hero.extra.exp}`),
    rigidBody: new BoxBody({ cx: 16, cy: 3, width: .1, height: .1 }),
  });

  new Actor({
    appearance: new ImageSprite({ img: "ground.png", width: 1, height: 1 }),
    rigidBody: new BoxBody({ cx: 15, cy: 9, width: 1, height: 1 }, { scene: stage.hud }),
    gestures: { tap: () => { merchantPurchase(hero); return true; } }
  });
}
