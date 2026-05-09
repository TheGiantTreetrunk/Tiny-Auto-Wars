//global variables
var battle_field = [1,1,1,1,1,2,2,2,2,2]; // 1 is player 2 is enemy territory
var classes = ["Hooman","Fighter","Alchemist","Theologian","Ranger","Monk","Knight","Troubadour","Artillerist","Cuirassier", "Duelist", "Dragoon", "Privateer", "Inquisitor", "Sapper"];
var class_health = [0, 15, 8, 15, 12, 10, 17, 12, 10, 16, 12, 14, 11, 13, 10];
var class_damage = [0, 6, 6, 3, 4, 3, 6, 3, 8, 7, 7, 5, 6, 5, 9];
var class_armor  = [0, 12, 0, 8, 5, 3, 18, 8, 5, 15, 4, 10, 6, 12, 3];
var class_colors = ["white","red","blue","brown","green","yellow","purple","cyan","magenta", "pink", "lime", "dark_gray", "light_gray", "dark_brown", "gray"];

//stats for nerds
var class_unique_weapon = ["Zweihandler","Musket","Mace","Long Bow","Quarterstaff","Long Sword","Rapier","Rifle"];
var class_unique_armor = ["Field Plate","Simple Clothes","Brigandine","Leather Coat","Padded Gambeson","Gothic Plate","Mail Hauberk","Leather Coat"];
var class_unique_shield = ["None","None","Heater","None","None","Kite","Buckler","None"];

var class_data = {
    1: { name: "Fighter", description: "High Health/Strength (Tank)" },
    2: { name: "Alchemist", description: "Pure Academic (Glass Cannon)" },
    3: { name: "Theologian", description: "Balanced Support" },
    4: { name: "Ranger", description: "Balanced Skirmisher" },
    5: { name: "Monk", description: "Pure Mobility (Evasion)" },
    6: { name: "Knight", description: "Durable Tank (Health/Strength)" },
    7: { name: "Troubadour", description: "Jack of All Trades" },
    8: { name: "Artillerist", description: "Focused Academic, Frail" }
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
    if(comand == 0) {
        //start
    }

    if(comand == 1) {
        //class viewer
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