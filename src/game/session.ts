/** This is for Session Storage */
export class SStore {
    changed = false;
    isWin = true;
    extra = {
      atk: 10,
      def: 10,
      hp: 1000,
      gold: 0,
      exp: 0,
      PurchaseGold: 10,
      magicResist:false,
      pocket:{
        yellowKey:0,
        blueKey:0,
        redKey:0,
      },
      fieldBook:false,
    };
    currentPage = 1;
    levels = 1;
    level1 = convertTo2DArray(mazeLayout1);
    level2 = convertTo2DArray(mazeLayout2);
}
function convertTo2DArray(layout: string[]): string[][] {
  let layout2D: string[][] = [];
  for (let i = 0; i < layout.length; i++) {
      layout2D.push(layout[i].split(''));
  }
  return layout2D;
}

const mazeLayout1 = [
  "#############",
  "#UL         #",
  "#   ##6#### #",
  "#   #     # #",
  "#####5### # #",
  "# M #r   g# #",
  "#N  ###4### #",
  "#           #",
  "#     #######",
  "#GFRB W     #",
  "######123   #",
  "#!@$%^&*()- #",
  "#############",
];
const mazeLayout2 = [
  "#############",
  "#DW #       #",
  "#   #       #",
  "#   #       #",
  "## ##  # #  #",
  "#   #  # #  #",
  "#   ######  #",
  "#   #    #  #",
  "#   ### ##  #",
  "#           #",
  "#####       #",
  "#           #",
  "#############",
];