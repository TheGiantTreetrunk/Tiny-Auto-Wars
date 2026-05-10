//global variables
var battle_field = [1,1,1,1,1,2,2,2,2,2]; // 1 is player 2 is enemy territory
var classes = [
    "Hooman", "Fighter", "Alchemist", "Theologian", "Ranger", 
    "Monk", "Knight", "Troubadour", "Artillerist", "Cuirassier", 
    "Duelist", "Dragoon", "Privateer", "Inquisitor", "Sapper", 
    "Mariner", "Plague Doc", "Grenadier", "Spy", "Pikeman", 
    "Highlander", "Musketeer", "Fletcher", "Cardinal", "Highwayman", 
    "Blacksmith", "Executioner", "Oracle", "Ochre Guard", "Juggernaut"
];
var class_health = [
    0, 15, 8, 15, 12, 10, 17, 12, 10, 16, 
    12, 14, 11, 13, 10, 13, 9, 14, 10, 15, 
    18, 12, 10, 14, 11, 16, 14, 8, 15, 25
];

var class_damage = [
    0, 6, 6, 3, 4, 3, 6, 3, 8, 7, 
    7, 5, 6, 5, 9, 6, 4, 8, 8, 4, 
    7, 7, 5, 3, 8, 5, 9, 4, 4, 5
];

var class_armor = [
    0, 12, 0, 8, 5, 3, 18, 8, 5, 15, 
    4, 10, 6, 12, 3, 7, 6, 11, 2, 14, 
    8, 8, 5, 10, 4, 12, 4, 0, 16, 22
];

var class_colors = [
    "white", "red", "blue", "brown", "green", 
    "yellow", "purple", "cyan", "magenta", "pink", 
    "lime", "dark_gray", "light_gray", "dark_brown", "gray", 
    "navy", "olive", "copper", "slate", "teal", 
    "burgundy", "gold", "forest", "indigo", "charcoal", 
    "clay", "mint", "violet", "ochre", "black"
];

var class_roles = [
    "Front Liner", // Hooman (Index 0)
    "Front Liner", "Support", "Support", "Vanguard", "Support", // 1-5
    "Front Liner", "Support", "Vanguard", "Front Liner", "Vanguard", // 6-10
    "Front Liner", "Support", "Front Liner", "Vanguard", "Vanguard", // 11-15
    "Support", "Front Liner", "Vanguard", "Front Liner", "Front Liner", // 16-20
    "Vanguard", "Vanguard", "Support", "Vanguard", "Support", // 21-25
    "Vanguard", "Support", "Support", "Front Liner", "Front Liner" // 26-30
];

//stats for nerds
var class_unique_weapon = [
    "None", "Zweihandler", "Musket", "Mace", "Long Bow", "Quarterstaff", 
    "Long Sword", "Rapier", "Rifle", "Pistol & Sabre", "Main Gauche", 
    "Carbine", "Cutlass", "Executioner Sword", "Grenades", "Harpoon", 
    "Plague Staff", "Mortar", "Stiletto", "Pike", "Claymore", 
    "Flintlock", "Recurve Bow", "Censer", "Blunderbuss", "War Hammer", 
    "Heavy Axe", "Crystal Ball", "Halberd", "Steam Cannon"
];

var class_unique_armor = [
    "None", "Field Plate", "Simple Clothes", "Brigandine", "Leather Coat", "Padded Gambeson", 
    "Gothic Plate", "Mail Hauberk", "Leather Coat", "Breastplate", "Silk Doublet", 
    "Buff Coat", "Canvas Tunic", "Heavy Leathers", "Apron", "Oilskins", 
    "Bird Mask & Robes", "Heavy Canvas", "Dark Cloak", "Breastplate", "Kilt & Mail", 
    "Uniform", "Linothorax", "Vestments", "Rugged Leathers", "Apron & Chain", 
    "Hooded Robes", "Ceremonial Silk", "Polished Steel", "Fortress Plate"
];

var class_unique_shield = [
    "None", "None", "None", "Heater", "None", "None", 
    "Kite", "Buckler", "None", "None", "None", 
    "None", "None", "None", "None", "None", 
    "None", "None", "None", "None", "None", 
    "None", "None", "None", "None", "None", 
    "None", "None", "Pavise", "Built-in Shield"
];
var class_data = {
    1: { name: "Fighter", description: "High Health/Strength (Tank)" },
    2: { name: "Alchemist", description: "Pure Academic (Glass Cannon)" },
    3: { name: "Theologian", description: "Balanced Support" },
    4: { name: "Ranger", description: "Balanced Skirmisher" },
    5: { name: "Monk", description: "Pure Mobility (Evasion)" },
    6: { name: "Knight", description: "Durable Tank (Health/Strength)" },
    7: { name: "Troubadour", description: "Jack of All Trades" },
    8: { name: "Artillerist", description: "Focused Academic, Frail" },
	9:  { name: "Cuirassier", description: "Armored Cavalry (Heavy Front Liner)" },
    10: { name: "Duelist", description: "Precision Striker (High Damage Vanguard)" },
    11: { name: "Dragoon", description: "Versatile Raider (Hybrid Skirmisher)" },
    12: { name: "Privateer", description: "Opportunistic Mercenary (Vanguard)" },
    13: { name: "Inquisitor", description: "Fearless Enforcer (Durable Support)" },
    14: { name: "Sapper", description: "Demolitions Expert (Extreme Vanguard)" },
    15: { name: "Mariner", description: "Seafaring Brawler (Front Liner)" },
    16: { name: "Plague Doc", description: "Debuff Specialist (Technical Support)" },
    17: { name: "Grenadier", description: "Heavy Explosives (Sturdy Front Liner)" },
    18: { name: "Spy", description: "Infiltration Expert (High Risk Vanguard)" },
    19: { name: "Pikeman", description: "Anti-Cavalry (Stable Front Liner)" },
    20: { name: "Highlander", description: "Ferocious Warrior (Aggressive Front Liner)" },
    21: { name: "Musketeer", description: "Line Infantry (Reliable Vanguard)" },
    22: { name: "Fletcher", description: "Ammo Supplier (Resource Support)" },
    23: { name: "Cardinal", description: "Holy Strategist (Leadership Support)" },
    24: { name: "Highwayman", description: "Ambush Expert (Speed Vanguard)" },
    25: { name: "Blacksmith", description: "Equipment Maintenance (Armor Support)" },
    26: { name: "Executioner", description: "Final Blow Specialist (Heavy Vanguard)" },
    27: { name: "Oracle", description: "Frail Seer (Vision/Roll Support)" },
    28: { name: "Ochre Guard", description: "Desert Sentry (Reliable Front Liner)" },
    29: { name: "Juggernaut", description: "Ultimate Anchor (Legendary Front Liner)" }
};

//battlefield variables
var terrain = [0,0,0,0,0,0,0,0,0,0];
var terrain_type = ["Flat","Hills","Mountains"];
var weather = [0,0,0,0,0,0,0,0,0,0];
var weather_type = ["Clear","Cloudy","Rain","Snow"];
var offensive = 0;
var till_offensive = 3;
var offensive_length = 3;

//player army variables
var pl_offensive_team = [1,1,1,1,1];
var pl_defensive_team = [1,1,1,1,1];
var pl_offensive_army_loc = 1;
var pl_defensive_army_loc = 0;


//enemy army variables
var en_offensive_team = [1,1,1,1,1];
var en_defensive_team = [1,1,1,1,1];
var en_offensive_army_loc = 8;
var en_defensive_army_loc = 9;


setInterval(function () {Battle()}, 1500);
var combat = 0;//0 = peace time 1 = war time
var plyr_points = 0;
var enmy_points = 0;

function Hud(comand){
	document.getElementById("mm").style.display = "none";
	document.getElementById("rooster").style.display = "none";
	document.getElementById("barracks").style.display = "none";

    if(comand == 0) {
        //start
		document.getElementById("mm").style.display = "block";
    }

    if(comand == 1) {
        //class viewer
		document.getElementById("rooster").style.display = "block";
    }

    if(comand == 2) {
        //how to play
    }

    if(comand == 3) {
        //team builder
    }

    if(comand == 4) {
        //the map radar
    }

    if(comand == 5) {
        //the event situation pane
    }

    if(comand == 6) {
        //the shoppe
    }

    if(comand == 7) {
        //battle
    }

    if(comand == 8) {
        //loot tables
    }

    if(comand == 9) {
        //the end of the game.
    }
}
	
function Battle(){
	if(combat == 1) {
			
		if( plyr_points != 5 && enmy_points	!= 5) {
			
			var x1 = 0;
			var x2 = 0;
			var i1 = Math.floor(Math.random() * 6) + 1;
			var i2 = Math.floor(Math.random() * 6) + 1;
					
			if(pl_bt_st == 0) {
				x1 = ((i1 + (ply_atk[enmy_points] + atk_mod)) );//player
				x2 = ((i2 + (eny_atk[plyr_points] + def_mod)) );//enemy
			} else {
				x1 = ((i1 + (ply_atk[enmy_points] + def_mod)) );//player
				x2 = ((i2 + (eny_atk[plyr_points] + atk_mod)) );//enemy
			}
			
			console.log(x1);
			console.log(x2);
			if(x1 > x2){
				var c = 0;
					
				if(pl_bt_st == 0) {
					if(npc_cls[tm_one[enmy_points]] == 0) {
						c = ((x1 - x2) + (ply_atk[enmy_points] + atk_mod));
						eny_hth[plyr_points] -=  c;
					} else {
						c = ((x1 - x2) + ply_atk[enmy_points]);
						eny_hth[plyr_points] -=  c;
					}
				} else {
					if(npc_cls[tm_one[enmy_points]] == 1) {
						c = ((x1 - x2) + (ply_atk[enmy_points] + def_mod));
						eny_hth[plyr_points] -=  c;
					} else {
						c = ((x1 - x2) + ply_atk[enmy_points]);
						eny_hth[plyr_points] -=  c;
					}
				}
					
				if(eny_hth[plyr_points] <= 0){
					eny_hth[plyr_points] = 0
					var x4 = eval('sts_' + plyr_points);
						
					plyr_points += 1;
				}
			}
				
			if(x2 > x1) {
				var d = 0;
				if(pl_bt_st == 0) {
					if(npc_cls[tm_two[plyr_points]] == 0) {
						d = ((x2 - x1) + (eny_atk[plyr_points] + atk_mod));
						ply_hth[enmy_points] -=  d;
					} else {
						d = ((x2 - x1) + eny_atk[plyr_points]);
						ply_hth[enmy_points] -=  d;
					}
				} else {
					if(npc_cls[tm_two[plyr_points]] == 1) {
						d = ((x2 - x1) + (eny_atk[plyr_points] + def_mod));
						ply_hth[enmy_points] -=  d;
					} else {
						d = ((x2 - x1) + eny_atk[plyr_points]);
						ply_hth[enmy_points] -=  d;
					}
				}
					
				if(ply_hth[enmy_points] <= 0){
					ply_hth[enmy_points] = 0;
					var x4 = eval('sts_' + enmy_points);
					enmy_points += 1;
						
				}
			}
				
			if(x1 == x2) {
				//alert("BLOCKED!");
			}
			Team_Loadout(3);
			Scene(8);
		} else {
			if(plyr_points == 5) {
				//player wina
				alert("You Win!");
				combat = 0;
				nodes_owned += 1;
				node_map[nodes_owned] = 1;
				if(nodes_owned >= 10) {
					alert("You Win the Game!");
				} else {
					if(pl_bt_st == 0) {
						next_off -= 1;
						//Scene(10);
					} else {
						next_rdd -= 1;
						if(next_rdd == 0) {
							if(turn_based == true) {
								next_off = 1;
							} else {
								next_off = 3;
							}
							//Scene(10);
						} else {
							//Scene(12);
						}
					}
				}
			}
			if(enmy_points == 5){
				//enemy wins
				alert("You Lose!");
				combat = 0;
				if(pl_bt_st == 0) {
					next_off -= 1;
					//Scene(10);
				} else {
					next_rdd -= 1;
					node_map[nodes_owned] = 2;
					nodes_owned -= 1;
					if(next_rdd == 0) {
						if(turn_based == true) {
							next_off = 1;
						} else {
							next_off = 3;
						}
						//Scene(10);
					} else {
						//Scene(12);
					}
				}
			}
			
		}
	} 
}