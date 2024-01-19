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
    currentPage = 0;
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
  "#K    #######",
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
  "## ##  #e# g#",
  "#a  #  # #  #",
  "#   ######  #",
  "#   #    #  #",
  "#  b###a##  #",
  "#           #",
  "#####       #",
  "#UL     h   #",
  "#############",
];
const mazeLayout3 = [
  "#############",
  "#        UL #",
  "#   #   #   #",
  "# ##### # ###",
  "#   #   #   #",
  "### # ##### #",
  "#   #   #   #",
  "# ##### # ###",
  "#   #   #   #",
  "#   #   #   #",
  "#           #",
  "#DW         #",
  "#############",
];
const mazeLayout4 = [
  "#############",
  "# ######### #",
  "#     UL    #",
  "# ### ### # #",
  "# #     #   #",
  "# # ##### # #",
  "#   #   #   #",
  "# ### ### # #",
  "# #       # #",
  "#   #   #   #",
  "# ######### #",
  "#    DW     #",
  "#############",
];
const mazeLayout5 = [
  "#############",
  "#    UL   # #",
  "# # ##### # #",
  "# #     # # #",
  "# ##### # # #",
  "#     # # # #",
  "##### # # # #",
  "#     # #   #",
  "##### ##### #",
  "#         # #",
  "# ######### #",
  "#     DW    #",
  "#############",
];
const mazeLayout6 = [
  "#############",
  "#           #",
  "# #### #### #",
  "# #   DW  # #",
  "# # ##### # #",
  "# #       # #",
  "#   # # #   #",
  "# #       # #",
  "# # ##### # #",
  "# #       # #",
  "# #### #### #",
  "# UL        #",
  "#############",
];
const mazeLayout7 = [
  "#############",
  "#    DW     #",
  "# ######### #",
  "# #  UL   # #",
  "# # ##### # #",
  "# #     # # #",
  "# ##### # # #",
  "#       # # #",
  "# ##### # # #",
  "# #     # # #",
  "# # ##### # #",
  "# #       # #",
  "#############",
];
const mazeLayout8 = [
  "#############",
  "#           #",
  "# ######### #",
  "# #       # #",
  "# # ##### # #",
  "# #     # # #",
  "# #####   # #",
  "#       #####",
  "# #     # # #",
  "# # ##### # #",
  "# #       # #",
  "# ######### #",
  "#############",
];
const mazeLayout9 = [
  "#############",
  "#           #",
  "# ######### #",
  "# #       # #",
  "# # ##### # #",
  "# #     # # #",
  "# #####   # #",
  "#         ###",
  "# ###     # #",
  "#   #     # #",
  "#####       #",
  "#           #",
  "#############",
];
const mazeLayout10 = [
  "#############",
  "#     #     #",
  "#     #     #",
  "# ######### #",
  "#           #",
  "# #####     #",
  "#   #####   #",
  "#     ##### #",
  "#           #",
  "# ######### #",
  "#     #     #",
  "#     #     #",
  "#############",
];
const mazeLayout11 = [
  "#############",
  "#           #",
  "#           #",
  "# ###########",
  "#           #",
  "# #### ##   #",
  "#   #   #   #",
  "#   ## ##   #",
  "#   #   #   #",
  "###### ######",
  "#        #  #",
  "#           #",
  "#############",
];
const mazeLayout12 = [
  "#############",
  "#           #",
  "#     #     #",
  "#  ######## #",
  "# #####     #",
  "#   #####   #",
  "#     ##### #",
  "#   #####   #",
  "# #######   #",
  "#  ######## #",
  "#     #     #",
  "#           #",
  "#############",
];
const mazeLayout13 = [
  "#############",
  "#           #",
  "#     #     #",
  "# ######### #",
  "#     #     #",
  "# ##### #####",
  "#     #     #",
  "# ##### #####",
  "#     #     #",
  "# ######### #",
  "#     #     #",
  "#     #     #",
  "#############",
];
const mazeLayout14 = [
  "#############",
  "#     #     #",
  "#           #",
  "# ######### #",
  "#     ##### #",
  "# #####     #",
  "#   #####   #",
  "#     ##### #",
  "#   #   #   #",
  "#   #   #   #",
  "#   #   #   #",
  "#           #",
  "#############",
];
const mazeLayout15 = [
  "#############",
  "#           #",
  "# ######### #",
  "#     #     #",
  "# ######### #",
  "#     #     #",
  "#   #####   #",
  "#     #     #",
  "#   #   #   #",
  "#           #",
  "# ######### #",
  "#           #",
  "#############",
];
const mazeLayout16 = [
  "#############",
  "#           #",
  "# ######### #",
  "#           #",
  "#     ##### #",
  "#     #     #",
  "#     #     #",
  "#     ##### #",
  "#     #     #",
  "#     #     #",
  "#           #",
  "# ######### #",
  "#############",
];
const mazeLayout17 = [
  "#############",
  "#           #",
  "# ######### #",
  "#     #     #",
  "# ######### #",
  "#     ##### #",
  "#   #     # #",
  "#     ##### #",
  "#   #     # #",
  "#   #####   #",
  "#           #",
  "# ######### #",
  "#############",
];
const mazeLayout18 = [
  "#############",
  "#           #",
  "# ######### #",
  "#           #",
  "#   ####### #",
  "#   #   #   #",
  "#   #####   #",
  "#     #     #",
  "#   #####   #",
  "#   #   #   #",
  "#   ####### #",
  "#           #",
  "#############",
];
const mazeLayout19 = [
  "#############",
  "#           #",
  "# ######### #",
  "#   #     # #",
  "#           #",
  "# #####     #",
  "#           #",
  "#     ##### #",
  "# ######### #",
  "#           #",
  "# ######### #",
  "#           #",
  "#############",
];
const mazeLayout20 = [
  "#############",
  "#           #",
  "# ######### #",
  "#   #   #   #",
  "#           #",
  "#   #####   #",
  "#   #   #   #",
  "#           #",
  "#   #####   #",
  "#   #   #   #",
  "# ######### #",
  "#           #",
  "#############",
];
