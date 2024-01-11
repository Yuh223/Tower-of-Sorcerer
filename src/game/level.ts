import { ImageSprite } from "../jetlag/Components/Appearance";
import { BoxBody } from "../jetlag/Components/RigidBody";
import { Obstacle } from "../jetlag/Components/Role";
import { Actor } from "../jetlag/Entities/Actor";
import { createGreenSlime, createRedSlime } from "./EntitySheet";



export function OuterWallConstructor(){
    const mazeLayout = [
      "#############",
      "#           #",
      "#       ### #",
      "#   #     # #",
      "##### ### # #",
      "#   #r   g# #",
      "#   ### ### #",
      "#           #",
      "#     #######",
      "#           #",
      "######      #",
      "#           #" ,
      "#############",
    ];
    // Create walls and goodies from the `mazeLayout`
    for (let row = 0; row < mazeLayout.length; row++) {
      for (let col = 0; col < mazeLayout[row].length; col++) {
        new Actor({
          rigidBody: new BoxBody({ cx: col + 0.5, cy: row + 0.5, width: 1, height: 1 }),
          appearance: new ImageSprite({ width: 1, height: 1, img: "ground.png",z:-1}),
        });
        if (mazeLayout[row][col] === "#") {
          new Actor({
            rigidBody: new BoxBody({ cx: col + 0.5, cy: row + 0.5, width: 1, height: 1 }),
            appearance: new ImageSprite({ width: 1, height: 1, img: "wall_1.png" }),
            role: new Obstacle(),
            extra:{
              isWall: true,
            }
          });
        }
        if (mazeLayout[row][col] === "g") {
          createGreenSlime(col + 0.5,row + 0.5);
        }
        if (mazeLayout[row][col] === "r") {
          createRedSlime(col + 0.5,row + 0.5);
        }
      }
    }
  
  }