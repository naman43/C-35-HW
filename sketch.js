var dog, happyDog, dogImage, dogImage2;
var food, foodStock;
var database;
var feed, addFood;
var fedTime, lastFed;
var foodObj;



function preload(){
    dogImage = loadImage("images/Dog.png");
    dogImage2 = loadImage("images/happyDog.png");
}

function setup() {
  database = firebase.database();
	createCanvas(1000, 500);
  
  foodObj = new Food();

  dog = createSprite(250,250,10,10);
  dog.addImage(dogImage);
  dog.scale = 0.15;

  feed = createButton("Feed The Dog!!");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {  
  background(255,255,255);

  feedTime = database.ref("FeedTime");
  feedTime.on("value",function (data){
    lastFed = data.val;
  })

  fill(255);
  textSize(20);
  if(lastFed >= 12){
    text("Last Feed :"+ lastFed %12 + "PM", 350, 350);
  }
  else if(lastFed === 0){
    text("Last Feed : 12 AM", 350, 350);
  }
  else{
    text("Last Feed :"+ lastFed+ "AM",350, 350);
  }

  foodObj.display();
  drawSprites();
}




function readStock(data){
  foodS = data.val;
  
}

function feedDog(){
  dog.addImage(dogImage2);

  database.ref('/').update({
  Food: foodObj.getFoodStock(),    
  FeedTime : hour()  
  })
}

function addFoods(){
  foodS ++;
  database.ref('/').update({
    Food: foodS
  })
}



