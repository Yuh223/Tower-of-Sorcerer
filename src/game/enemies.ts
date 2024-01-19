interface MonsterData {
  images: string[];
  hp: number;
  atk: number;
  def: number;
  gold: number;
  exp: number;
}


export const monsters: { [key: string]: MonsterData } = {
  "green_slime": {
    images: ["green_slime_1.png", "green_slime_2.png"],
    hp: 35,
    atk: 18,
    def: 1,
    gold: 1,
    exp: 1
  },
  "red_slime": {
    images: ["red_slime_1.png", "red_slime_2.png"],
    hp: 45,
    atk: 20,
    def: 2,
    gold: 2,
    exp: 1
  },
  "mage": {
    images: ["mage_1.png", "mage_2.png"],
    hp: 60,
    atk: 32,
    def: 8,
    gold: 5,
    exp: 2
  },
  "arch_mage": {
    images: ["arch_mage_1.png", "arch_mage_2.png"],
    hp: 100,
    atk: 95,
    def: 30,
    gold: 22,
    exp: 8
  },
  "small_bat": {
    images: ["small_bat_1.png", "small_bat_2.png"],
    hp: 35,
    atk: 38,
    def: 3,
    gold: 3,
    exp: 1
  },
  "big_bat": {
    images: ["big_bat_1.png", "big_bat_2.png"],
    hp: 60,
    atk: 100,
    def: 8,
    gold: 12,
    exp: 4
  },
  "skeleton": {
    images: ["skeleton_1.png", "skeleton_2.png"],
    hp: 50,
    atk: 42,
    def: 6,
    gold: 6,
    exp: 2
  },
  "black_slime": {
    images: ["black_slime_1.png", "black_slime_2.png"],
    hp: 130,
    atk: 60,
    def: 3,
    gold: 8,
    exp: 3
  },
  "sword_skeleton": {
    images: ["sword_skeleton_1.png", "sword_skeleton_2.png"],
    hp: 55,
    atk: 52,
    def: 12,
    gold: 8,
    exp: 3
  },
  "captain_skeleton": {
    images: ["captain_skeleton_1.png", "captain_skeleton_2.png"],
    hp: 100,
    atk: 65,
    def: 15,
    gold: 30,
    exp: 10
  },
  "armor_skeleton": {
    images: ["armor_skeleton_1.png", "armor_skeleton_2.png"],
    hp: 220,
    atk: 180,
    def: 30,
    gold: 35,
    exp: 12
  },
  "beast": {
    images: ["beast_1.png", "beast_2.png"],
    hp: 260,
    atk: 85,
    def: 5,
    gold: 18,
    exp: 6
  },
  "sword_beast": {
    images: ["sword_beast_1.png", "sword_beast_2.png"],
    hp: 320,
    atk: 120,
    def: 15,
    gold: 30,
    exp: 10
  },
  "slime_man": {
    images: ["slime_man_1.png", "slime_man_2.png"],
    hp: 320,
    atk: 140,
    def: 20,
    gold: 30,
    exp: 10
  },
  "stone": {
    images: ["stone_1.png", "stone_2.png"],
    hp: 20,
    atk: 100,
    def: 68,
    gold: 28,
    exp: 10
  },
  "yellow_knight": {
    images: ["yellow_knight_1.png", "yellow_knight_2.png"],
    hp: 120,
    atk: 150,
    def: 50,
    gold: 100,
    exp: 34
  },
  "red_knight": {
    images: ["red_knight_1.png", "red_knight_2.png"],
    hp: 160,
    atk: 230,
    def: 105,
    gold: 65,
    exp: 22
  },
  "crusader": {
    images: ["crusader_1.png", "crusader_2.png"],
    hp: 210,
    atk: 200,
    def: 65,
    gold: 45,
    exp: 15
  },
  "vampire": {
    images: ["vampire_1.png", "vampire_2.png"],
    hp: 444,
    atk: 199,
    def: 66,
    gold: 144,
    exp: 48
  },
  "yellow_guard": {
    images: ["yellow_guard_1.png", "yellow_guard_2.png"],
    hp: 50,
    atk: 48,
    def: 22,
    gold: 12,
    exp: 4
  },
  "blue_guard": {
    images: ["blue_guard_1.png", "blue_guard_2.png"],
    hp: 100,
    atk: 180,
    def: 110,
    gold: 100,
    exp: 34
  },
  "red_guard": {
    images: ["red_guard_1.png", "red_guard_2.png"],
    hp: 180,
    atk: 460,
    def: 360,
    gold: 200,
    exp: 67
  },
  "slime_king": {
    images: ["slime_king_1.png", "slime_king_2.png"],
    hp: 360,
    atk: 310,
    def: 20,
    gold: 40,
    exp: 14
  },
  
  "red_bat": {
    images: ["red_bat_1.png", "red_bat_2.png"],
    hp: 200,
    atk: 390,
    def: 90,
    gold: 50,
    exp: 17
  },
  "witch": {
    images: ["witch_1.png", "witch_2.png"],
    hp: 220,
    atk: 370,
    def: 110,
    gold: 80,
    exp: 27
  },
  "arch_witch": {
    images: ["arch_witch_1.png", "arch_witch_2.png"],
    hp: 200,
    atk: 380,
    def: 130,
    gold: 90,
    exp: 30
  },
  "dark_knight": {
    images: ["dark_knight_1.png", "dark_knight_2.png"],
    hp: 180,
    atk: 430,
    def: 210,
    gold: 120,
    exp: 40
  },
  "duosworder": {
    images: ["duosworder_1.png", "duosworder_2.png"],
    hp: 100,
    atk: 680,
    def: 50,
    gold: 55,
    exp: 19
  },
  "sub_demon": {
    images: ["sub_demon_1.png", "sub_demon_2.png"],
    hp: 230,
    atk: 450,
    def: 100,
    gold: 100,
    exp: 34
  },
  "demon": {
    images: ["demon_1.png", "demon_2.png"],
    hp: 800,
    atk: 500,
    def: 100,
    gold: 500,
    exp: 167
  },
  "grand_sorcerer": {
    images: ["grand_sorcerer_1.png", "grand_sorcerer_2.png"],
    hp: 4500,
    atk: 560,
    def: 310,
    gold: 1000,
    exp: 334
  },
  "?????": {
    images: ["princess_1.png", "princess_2.png"],
    hp: 300,
    atk: 10,
    def: 10,
    gold: 1,
    exp: 1
  }
};