import { Actor } from "../jetlag/Entities/Actor";
import { stage } from "../jetlag/Stage";

export function fight(hero: Actor, enemy: Actor){
    for (let o of stage.world.physics.actorsAt({x: hero.rigidBody.getCenter().x, y: hero.rigidBody.getCenter().y})) { 
        if(checkfight(hero,enemy)){
            hero.extra.hp = calculation(hero,enemy);
            return true;
        }else{
            return false;
        }
    }
}
export function checkfight(hero: Actor, enemy: Actor){
    let tempHeroHp = hero.extra.hp;
    let tempEnemyHp = enemy.extra.hp;
    if (hero.extra.atk <= enemy.extra.def) {
        return true;
    }
    while (tempEnemyHp > 0 && tempHeroHp > 0) {
        tempEnemyHp = tempEnemyHp - (hero.extra.atk-enemy.extra.def);
        tempHeroHp = tempHeroHp - (enemy.extra.atk-hero.extra.def);
    }
    if (tempHeroHp < 0) {
        return true;
    }else{
        return false;
    }
}
export function calculation(hero: Actor, enemy: Actor){
    let tempHeroHp = hero.extra.hp;
    let tempEnemyHp = enemy.extra.hp;
    if(enemy.extra.atk<=hero.extra.def){
        return tempHeroHp;
    }
    while (tempEnemyHp > 0) {
        tempEnemyHp = tempEnemyHp - (hero.extra.atk-enemy.extra.def);
        tempHeroHp = tempHeroHp - (enemy.extra.atk-hero.extra.def);
    }
    return tempHeroHp;
}