import { Actor } from "../jetlag/Entities/Actor";

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