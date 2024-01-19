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
    level3 = convertTo2DArray(mazeLayout3);
    level4 = convertTo2DArray(mazeLayout4);
    level5 = convertTo2DArray(mazeLayout5);
    level6 = convertTo2DArray(mazeLayout6);
    level7 = convertTo2DArray(mazeLayout7);
    level8 = convertTo2DArray(mazeLayout8);
    level9 = convertTo2DArray(mazeLayout9);
    level10 = convertTo2DArray(mazeLayout10);
    level11 = convertTo2DArray(mazeLayout11);
    level12 = convertTo2DArray(mazeLayout12);
    level13 = convertTo2DArray(mazeLayout13);
    level14 = convertTo2DArray(mazeLayout14);
    level15 = convertTo2DArray(mazeLayout15);
    level16 = convertTo2DArray(mazeLayout16);
    level17 = convertTo2DArray(mazeLayout17);
    level18 = convertTo2DArray(mazeLayout18);
    level19 = convertTo2DArray(mazeLayout19);
    level20 = convertTo2DArray(mazeLayout20);
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
  "# M #a   b# #",
  "#N  ###4### #",
  "#           #",
  "#     #######",
  "#          a#",
  "######123   #",
  "#W  ab      #",
  "#############",
];
const mazeLayout2 = [
  "#############",
  "#DW # 1     #",
  "#   #    c  #",
  "#   #       #",
  "## ##  #4# g#",
  "#a  #GF#R#  #",
  "#   ######  #",
  "#   # B$ #  #",
  "#  b###a##  #",
  "#           #",
  "##### 2     #",
  "#UL     h   #",
  "#############",
];
const mazeLayout3 = [
  "#############",
  "#        UL #",
  "#   #   #   #",
  "#g#####f# ###",
  "# G # G #   #",
  "### # ##### #",
  "#  F# R #   #",
  "#g#####c#5###",
  "#   #   #   #",
  "# 3 # 1 #   #",
  "#         a #",
  "#DW         #",
  "#############",
];
const mazeLayout4 = [
  "#############",
  "# ######### #",
  "#  (  UL c  #",
  "# ###4### # #",
  "# #  ^  #   #",
  "# #h##### # #",
  "#   #   #   #",
  "# ###i### # #",
  "# #   b   # #",
  "#   #   #   #",
  "#a#########j#",
  "#    DW     #",
  "#############",
];
const mazeLayout5 = [
  "#############",
  "#    UL     #",
  "# # ##### # #",
  "# #  e  #&# #",
  "# ##### # # #",
  "# !   # # #1#",
  "##### # # # #",
  "# GF  #   d #",
  "##### ##### #",
  "# f     g # #",
  "# ######### #",
  "#     DW    #",
  "#############",
];
const mazeLayout6 = [
  "#############",
  "#   i    i  #",
  "# ####4#### #",
  "# #  DW   # #",
  "#2# ##### # #",
  "# #  2    # #",
  "#   # # #   #",
  "# #     3 # #",
  "#b######### #",
  "# # $ * R #a#",
  "# ####5#### #",
  "# UL        #",
  "#############",
];
const mazeLayout7 = [
  "#############",
  "# c  DW   e #",
  "# ######### #",
  "# #  UL   #G#",
  "# # ##### # #",
  "#F# g   # # #",
  "# ##### #j# #",
  "#k      # # #",
  "#5##### # # #",
  "#R#  b  # # #",
  "#$# ##### # #",
  "#(#       g #",
  "#############",
];
const mazeLayout8 = [
  "#############",
  "#    k      #",
  "# ######### #",
  "# #  UL   # #",
  "# # ##### #R#",
  "# #  g  # # #",
  "# #####   # #",
  "#  !    # l #",
  "# #  f  # # #",
  "#b# ##### #6#",
  "#2#  DW   #(#",
  "#3#########$#",
  "#############",
];
const mazeLayout9 = [
  "#############",
  "#   n       #",
  "# ######### #",
  "# #   UL  # #",
  "# # ##### #5#",
  "# # d   # # #",
  "# #####   #^#",
  "#         ###",
  "#   #     #)#",
  "# M  #    # #",
  "#####  1   m#",
  "#DW         #",
  "#############",
];
const mazeLayout10 = [
  "#############",
  "#     # UL  #",
  "#     #     #",
  "# ######### #",
  "#           #",
  "# #####     #",
  "#   #####   #",
  "#     ##### #",
  "#           #",
  "# ######### #",
  "#     #     #",
  "# DW  #     #",
  "#############",
];
const mazeLayout11 = [
  "#############",
  "#    DW     #",
  "#           #",
  "# ###########",
  "#           #",
  "# #### ##   #",
  "#   #   #   #",
  "#   ## ##   #",
  "#   #   #   #",
  "###### ######",
  "#        #  #",
  "#UL         #",
  "#############",
];
const mazeLayout12 = [
  "#############",
  "# UL        #",
  "#     #     #",
  "#  ######## #",
  "# #####     #",
  "#   #####   #",
  "#     ##### #",
  "#   #####   #",
  "# #######   #",
  "#  ######## #",
  "#     #     #",
  "#        DW #",
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
  "# DW  # UL  #",
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
