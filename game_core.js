//global variables
var is_dev = 1;
var day = 0;
var distance = 0;

var enemy_nme = ["Ghost","Glarb","Serpant","Golem","Skeleton","Toad","Blob","Ember","Goblin"];
var enemy_hth = [3,4,3,8,4,2,2,2,4];
var enemy_dmg = [3,4,4,6,3,2,4,4,3];
var enemy_arm = [1,2,2,3,1,1,2,1,2];
var enemy_icn = ["&","?","!",".",",","+",";","=","\x5C"];
var enemy_clr = ["white","green","lime","gray","white","olive","purple","orange","green"];

var enemy_type = 0;

var enemy = {
    name: "",
    health: 0,
    max_health: 0,
    status: "Normal"
};

var unlockedClasses = [
    true, true, false, false, false, false, false
];

var classes = [
    "Hooman",
    "Fighter",
    "Knight",
    "Alchemist",
    "Theologian",
    "Ranger",
    "Artillerist"
];

var class_colors = [
    "white", "red", "purple", "blue", "lime", "yellow", "magenta"
];

// Base stats (Representing Level 1 Tiers)
var class_health = [0, 15, 18, 8,  15, 12, 10];
var class_damage = [0, 6,  5,  7,  3,  5,  9];
var class_armor  = [0, 12, 18, 0,  8,  5,  3];

var class_unique_weapon = ["None", "Zweihandler", "Long Sword", "Chemicals", "Mace", "Long Bow", "Mortar"];
var class_unique_armor  = ["None", "Field Plate", "Gothic Plate", "Simple Clothes", "Brigandine", "Leather Coat", "Heavy Canvas"];
var class_unique_shield = ["None", "None", "Kite", "None", "Heater", "None", "None"];

var class_data = {
    1: { name: "Fighter", description: "High Health/Strength (Balanced Tank)" },
    2: { name: "Knight", description: "Durable Tank (Maximum Armor & Shielding)" },
    3: { name: "Alchemist", description: "Pure Academic (High Damage Glass Cannon)" },
    4: { name: "Theologian", description: "Durable Backline Support & Protector" },
    5: { name: "Ranger", description: "Precision Striker (Speed & High Criticals)" },
    6: { name: "Artillerist", description: "Focused Heavy Firepower (Frail Vanguard)" }
};

//battlefield variables
var terrain = [0,0,0,0,0,0,0,0,0,0];
var terrain_type = ["Flat","Hills","Mountains"];
var weather = [0,0,0,0,0,0,0,0,0,0];
var weather_type = ["Clear","Cloudy","Rain","Snow"];

//player army variables
var player = {
    class: 0,
	lvl: 1,
    hp: 40,  
    dmg: 20,   
    arm: 10, 
	inv: {
        gold: 0,
		pot_lvl: 0,
		pot_health: 0,
		pot_poison: 0,
		pot_armor: 0,
		pot_damage: 0,
        pot_speed: 0,
        food: 3,
        water: 3,
        wood: 0
	}
};

setInterval(function () {Battle()}, 1500);
var combat = 0;//0 = peace time 1 = war time
var plyr_points = 0;
var enmy_points = 0;

function Hud(comand){
	document.getElementById("mm").style.display = "none";
	document.getElementById("htp").style.display = "none";
	document.getElementById("rooster").style.display = "none";
	document.getElementById("store_front").style.display = "none";
    document.getElementById("day_counter_hud").style.display = "none";

    if(comand == 0) {
        //start
        document.body.classList.add('body_class_main_menu');
		document.getElementById("mm").style.display = "block";
    }

    if(comand == 1) {
        //class selecter is a new game
		document.getElementById("rooster").style.display = "block";
        if(is_dev == 0) {
		    renderClassTable();
        } else {
            cheatUnlockAll();
        }
    }

    if(comand == 2) {
        //how to play
		document.getElementById("htp").style.display = "block";
    }

    if(comand == 3) {
        //pre battle prep
		if(player.class != 0) {
            document.getElementById("rooster").style.display = "block";
            toggleFade();
            setTimeout(toggleFade, 2000);
            setTimeout(function(){ document.getElementById("rooster").style.display = "none" }, 1200);
            setTimeout(function(){ document.getElementById("store_front").style.display = "block" }, 1500);
            setTimeout(function(){ document.body.classList.remove('body_class_main_menu'); }, 1500);
            setTimeout(function(){ document.body.classList.add('body_class_hut'); }, 1500);
            setTimeout(Hud(4), 1750);
		} else {
            
			document.getElementById("rooster").style.display = "block";

		}
    }

    if(comand == 4) {
        //when just loading the tavern in general...

        var selected_class = class_data[player.class];
        var selectedColorClass = class_colors[player.class]; 

        document.getElementById("name_of_class1").innerHTML = selected_class.name.toUpperCase();
        document.getElementById("tavern_day").innerHTML = "Day " + day + "<br>" + "Distance Traveled " + distance + " --km";
        
        document.getElementById("class_icon1").innerHTML = `<a class='icns ${selectedColorClass}'>@</a>`;
        document.getElementById("class_level").innerHTML = "Level " + player.lvl;
        let gearInfo = `<br><span style='font-size:10px; color:#888;'>WEAPON: ${class_unique_weapon[player.class]}<br>
                        ARMOR: ${class_unique_armor[player.class]}</span>`;

        document.getElementById("class_stats1").innerHTML = `
            <a class='red icns'>~</a> ${class_health[player.class]} 
            <a class='yellow icns'>$</a> ${class_damage[player.class]} 
            <a class='purple icns'>%</a> ${class_armor[player.class]}
            ${gearInfo}`;

        document.getElementById("gold_total").innerHTML = player.inv.gold;
        document.getElementById("hth_pot_total").innerHTML = player.inv.gold;
        document.getElementById("pos_pot_total").innerHTML = player.inv.gold;
        document.getElementById("arm_pot_total").innerHTML = player.inv.gold;

        document.getElementById("dmg_pot_total").innerHTML = player.inv.gold;
        document.getElementById("spd_pot_total").innerHTML = player.inv.gold;
        document.getElementById("food_total").innerHTML = player.inv.gold;
        document.getElementById("water_total").innerHTML = player.inv.gold;

        document.getElementById("wood_total").innerHTML = player.inv.gold;
        document.getElementById("steel_total").innerHTML = player.inv.gold;
        document.getElementById("ruby_total").innerHTML = player.inv.gold;
        document.getElementById("daimond_total").innerHTML = player.inv.gold;
    }

    if(comand == 5) {
        //embark fade out shit
            document.getElementById("embark_day_counter").style.display = "none";
            document.getElementById("embark_distance_counter").style.display = "none";
            document.getElementById("embark_cont_bttn").style.display = "none";
            toggleFade();
            setTimeout(function(){ document.getElementById("store_front").style.display = "none" }, 1200);
            setTimeout(function(){ document.getElementById("day_counter_hud").style.display = "block" }, 1500);
            setTimeout(function(){ document.body.classList.remove('body_class_hut'); }, 1500);
            setTimeout(function(){ document.body.classList.add('body_class_battle'); }, 1500);

            setTimeout(function(){ document.getElementById("embark_day_counter").style.display = "block" }, 1500);
            setTimeout(function(){ document.getElementById("embark_distance_counter").style.display = "block" }, 2000);
            setTimeout(function(){ document.getElementById("embark_cont_bttn").style.display = "block" }, 2500);
    }

    if(comand == 6) {
        //the shoppe
        document.getElementById("day_counter_hud").style.display = "none";
        setTimeout(toggleFade, 2000);
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

function renderClassTable() {
	document.getElementById("class_selection_container").innerHTML = "";
	
    let tableHtml = '<table style="margin: auto; text-align: center;"><tr>';
    let cols = 3;

    for (let i = 0; i < 7; i++) {
        // If we hit 6 columns, start a new row
        if (i > 0 && i % cols === 0) {
            tableHtml += '</tr><tr>';
        }

        if (unlockedClasses[i]) {
            // UNLOCKED: Show the class icon and color
            let color = class_colors[i];
            tableHtml += `<td><button data-class-num="${i}" class="class_select" onclick="class_selection(${i}, this)"><a class="icns ${color}">@</a></button></td>`;
        } else {
            // LOCKED: Show a grayed out question mark or padlock
            tableHtml += `<td><button class="class_select locked" disabled><a class="icns dark_gray">@</a></button></td>`;
        }
    }

    tableHtml += '</tr></table>';
    document.getElementById("class_selection_container").innerHTML = tableHtml;
}

function unlockNextClass() {
    for (let i = 0; i < unlockedClasses.length; i++) {
        if (unlockedClasses[i] === false) {
            unlockedClasses[i] = true;
            console.log("New Class Unlocked: " + classes[i]);
            break; // Only unlock one per win
        }
    }
}

function cheatUnlockAll() {
    unlockedClasses = new Array(30).fill(true);
    renderClassTable();
}

function class_selection(class_num, button_element) {
    
    var buttons = document.querySelectorAll('.class_select');
    buttons.forEach(function(button) {
        button.classList.remove('selected');
    });
    button_element.classList.add('selected');

    
    player.class = class_num;
    player.hp = class_health[class_num];
    player.str = class_damage[class_num];
    player.thp = class_armor[class_num];
    
    
    player.weapon_mult = 1.0; 
    player.isPanicked = false;
    player.stress = 0;

    if (class_data[class_num]) {
        var selected_class = class_data[class_num];
        var selectedColorClass = class_colors[class_num]; 

        document.getElementById("name_of_class").innerHTML = selected_class.name.toUpperCase();
        document.getElementById("class_description").innerHTML = selected_class.description;
        
        document.getElementById("class_icon").innerHTML = `<a class='icns ${selectedColorClass}'>@</a>`;
        
        let gearInfo = `<br><span style='font-size:10px; color:#888;'>WEAPON: ${class_unique_weapon[class_num]}<br>
                        ARMOR: ${class_unique_armor[class_num]}</span>`;

        document.getElementById("class_stats").innerHTML = `
            <a class='red icns'>~</a> ${class_health[class_num]} 
            <a class='yellow icns'>$</a> ${class_damage[class_num]} 
            <a class='purple icns'>%</a> ${class_armor[class_num]}
            ${gearInfo}`;
    }
}

function toggleFade() {
    document.getElementById('fadeElement').classList.toggle('fade-out');
}

// Dynamic stat generator linked directly to player.lvl
function updatePlayerStats() {
    var classIndex = player.class;
    var level = player.lvl;

    // Safety check for level out of bounds
    if (level < 1) level = 1;
    if (level > 3) level = 3;

    // Grab Base Stats from your arrays
    var baseHp  = class_health[classIndex];
    var baseDmg = class_damage[classIndex];
    var baseArm = class_armor[classIndex];

    // Overwrite the actual player properties directly based on tier level
    if (level === 1) {
        player.hp  = baseHp;
        player.dmg = baseDmg;
        player.arm = baseArm;
    } 
    else if (level === 2) {
        player.hp  = Math.ceil(baseHp * 1.5);
        player.dmg = Math.ceil(baseDmg * 1.5);
        player.arm = Math.ceil(baseArm * 1.5);
    } 
    else if (level === 3) {
        player.hp  = baseHp * 2;
        player.dmg = baseDmg * 2;
        player.arm = baseArm * 2;
    }
}