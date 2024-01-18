
import { Actor } from "../jetlag/Entities/Actor";
import { FilledBox, ImageSprite, TextSprite } from "../jetlag/Components/Appearance";
import { stage } from "../jetlag/Stage";
import { BoxBody } from "../jetlag/Components/RigidBody";
import { splashBuilder } from "./splash";

/**
 * helpBuilder is for drawing the help screens.  These are no different from
 * game screens... except that you probably don't want them to involve "winning"
 * and "losing". 
 *
 * In this demonstration, we just provide a bit of information about the demo
 * game, and how to get started.  This is also often a good place to put
 * credits.
 *
 * For the purposes of this demonstration, there are two Help screens.  That
 * way, we can show how to move from one to the next.
 *
 * @param level Which help screen should be displayed
 */
export function helpBuilder(level: number) {
    

    // Tap anywhere to go back to the splash screen
    new Actor({
      appearance: new ImageSprite({ width: 19, height: 13, img: "bg.jpg" }),
      rigidBody: new BoxBody({ cx: 9.5, cy: 6.5, width: 19, height: 13 }),
      gestures: { tap: () => { stage.switchTo(splashBuilder, 1); return true; } }
    });
    const helpData = [
      { img: "hero_stand_d.png", text: "This is the hero, use arrow keys to control him." },
      { img: "atkGem.png", text: "This is gem, they will increase hero's atk/def." },
      { img: "ironlSword.png", text: "Sword/Shield would provide much more on atk/def." },
      { img: "redPotion.png", text: "Get potion to recover hp." },
      { img: "green_slime_1.png", text: "Defeat the enemy, accquiring their gold and exp." },
      { img: "merchant_1.png", text: "Meet the merchant, use gold/exp to become stronger!" }
  ];
    const imageWidth = 2; 
    const imageHeight = 2; 
    const textWidth = 5; 
    const textHeight = 1; 
    const startX = 3; 
    const startY = 2.5; 
    const gapX = 4.5; 
    const gapY = 4; 

    // 遍历helpData来创建图像和文本
    helpData.forEach((item, index) => {
        const x = startX + (index % 3) * (imageWidth + gapX);
        const y = startY + Math.floor(index / 3) * (imageHeight + textHeight + gapY);

        // 创建ImageSprite
        new Actor({
            appearance: new ImageSprite({
                img: item.img,
                width: imageWidth,
                height: imageHeight
            }),
            rigidBody: new BoxBody({ cx: x, cy: y, width: imageWidth, height: imageHeight })
        });

        // 创建TextSprite
        new Actor({
            appearance: new TextSprite({
                center: true,
                face: "Salsa",
                color: "#FFFFFF",
                size: 24
            }, item.text),
            rigidBody: new BoxBody({ cx: x, cy: y + imageHeight, width: textWidth, height: textHeight })
        });
    });
    
}