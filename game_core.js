//global variables
var battle_field = [1,1,1,1,1,2,2,2,2,2]; // 1 is player 2 is enemy territory
var classes = ["Pikeman","Landsknecht","Knight","Longbowman","Crossbowman","Arquebusier","Bombardier","Sapper","Dragoon"];
var class_type_name = ["Vangaurd","Middleguard","Rearguard"];
var class_type = [0,0,0,1,1,1,2,2,2];
var class_health = [];
var class_armor = [];
var class_damage = [];

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