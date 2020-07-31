//Create variables here
var dog,happyDog,database,foodS,foodStock;
var dogImg,dogHappy;

function preload(){
  //load images here
 dogImg = loadImage("dogImg.png");
 dogHappy = loadImage("happydog.png");

}

function setup() {
  var canvas = createCanvas(500,500);
  database = firebase.database();
  foodStock = database.ref("Food");
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
  }
  
  drawSprites();
  //add styles here
  fill("blue");
  textSize(20);
  stroke(5);
  text("Press Up Arrow Kew To Feed drago milk",100,100);
  text("food remaining : " + foodS,100,400);
}
function readStock(data){
  foodS = data.val();
}
function writeStock(x){

   if(x<=0){
     x = 0;
   }else{
     x = x-1;
   }

  database.ref('/').update({
    Food:x
  })
}


