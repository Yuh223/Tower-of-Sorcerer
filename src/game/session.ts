/** This is for Session Storage */
export class SStore {
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
      }
    };
    mazeLayout1 = [
        "#############",
        "#UL         #",
        "#   ##6#### #",
        "#   #     # #",
        "#####5### # #",
        "# M #r   g# #",
        "#   ###4### #",
        "#           #",
        "#     #######",
        "#GFRB W     #",
        "######123   #",
        "#!@$%^&*()- #",
        "#############",
    ];
    mazeLayout2 = [
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
  }