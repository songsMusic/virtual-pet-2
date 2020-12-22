var dog,dogImage,happyDog, database, foodS, foodStock;
var feed , addFood ; 
var fedTime , lastFed ; 
var foodObj ; 

function preload()
{

// loading the images 
 dogImage = loadImage("images/dogImg.png") ; 
 happyDog = loadImage("images/dogImg1.png") ; 


}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  
  dog = createSprite(250,300,150,150) ; 
  dog.scale = 0.15 ; 
  dog.addImage(dogImage) ; 
  foodStock = database.ref('food');
  foodStock.on("value" , readStock) ; 
  textSize(20); 

 // creating a object from the food class 
 foodObj = new Food(); 

 // creating the button for feeding the dog 
 feed = createButton("FEED THE DOG");
 feed.position(700,95);
 feed.mousePressed(feedDog); 

 //creating button for adding the food 
 addFood.createButton("ADD FOOD");
 addFood.position(800,95);
 addFood.mousePressed(addFoods);
}


function draw() {  
  background(46, 139, 87);


 foodObj.display();

 
 fedTime = database.ref('FeedTime') ;
 fedTime.on("value" , function(data){
   lastFed = data.val();
 })

  drawSprites();

  stroke("black") ; 
  text ("FOOD REMAINING : " + foodS , 170,200); 
  textSize(15) ; 
  text ("PRESS THE UP ARROW KEY TO FEED THE DOG " , 130,10,300,20) ; 
  

}



function feedDog(){
 dog.addImage(happyDog) ;

 foodObj.updateFoodStock(foodObj.getFoodStock() - 1 ) ; 
 database.ref('/').update({
   Food:foodObj.getFoodStock(),
   FeedTime:hour()
 })

}

function addFoods(){
  foodS++ ; 
  database.ref('/').update({
    Food:foodS
  })
}

function readStock(data){
  foodS = data.val() ; 

}

function writeStock(x){
  if(x<=0){
    x = 0 
  } else{
    x = x-1 
  }
  database.ref('/').update({
    food:x
  })
}

