import { TextSprite } from "../jetlag/Components/Appearance";
import { BoxBody } from "../jetlag/Components/RigidBody";
import { Actor } from "../jetlag/Entities/Actor";
import { Scene } from "../jetlag/Entities/Scene";

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

export function estimateFightResult(hero: Actor, enemy: Actor, x: number, y: number, overlay: Scene) {
    let color = "#000000"; // 默认颜色为黑色
    let resultText = "";

    if (checkfight(hero, enemy)) {
        // 如果敌人无法被击败
        color = "red";
        resultText = "Invincible";
    } else {
        const remainingHeroHp = calculation(hero, enemy);
        const damageToHero = hero.extra.hp - remainingHeroHp;
        const percentageDamage = damageToHero / hero.extra.hp;

        if (percentageDamage <= 0.25) {
            color = "green"; // 小于25%伤害，使用绿色
        } else if (percentageDamage <= 0.75) {
            color = "yellow"; // 25%到75%伤害，使用黄色
        } else {
            color = "red"; // 大于75%伤害，使用红色
        }
        resultText = `Damage: ${damageToHero}`;
    }

    // 创建带有结果文本的Actor
    new Actor({
        appearance: new TextSprite({
            center: true,
            face: "Arial",
            color: color,
            size: 24,
        }, resultText),
        rigidBody: new BoxBody({ cx: x, cy: y, width: 1, height: 1 }, { scene: overlay })
    });
}