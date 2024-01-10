import { AnimatedSprite } from '../jetlag/Components/Appearance';
import { BoxBody } from '../jetlag/Components/RigidBody';
import { AnimationSequence, AnimationState } from '../jetlag/Config';
import { Actor } from '../jetlag/Entities/Actor';
export function createSlime(cx:number, cy:number){
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
