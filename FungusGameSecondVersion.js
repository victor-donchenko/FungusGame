var target;
var e;
var f;
var progressBar;
function setup() {
  createCanvas(400, 400);
  target = new Target(200,200,3);
  f = new Fungus(200,200);
  e = new Environment(10,f);
  progressBar = new ProgressBar();
}

function draw() {
  background(220); 
  e.Show();
  target.drawTarget();
  if(f.hyphaeGrowing){
    f.MoveHyphae();
  }
  f.Show();
  progressBar.Show();
}
function mouseClicked(){
  target.myPos.posX = mouseX;
  target.myPos.posY = mouseY;
  f.hyphaeGrowing = true;
}
class Fungus{

  constructor(x,y){
    this.state = "spore";
    this.position = new Position(x,y);
    
   /* this.currentNutrients;
    this.sporeNutrients;
    this.mycelliumNutrients;
    this.stripeNutrients;
    this.hymeniumNutrients;
    this.spreadSporeNutrients;*/
    
    this.hyphaeIndex = 0;
    this.hyphae = [];
    this.hyphae[this.hyphaeIndex] = new Hypha(this.position.posX,this.position.posY,1,target);
    this.hyphaeIndex += 1;
    this.hyphaeGrowing = false;
  }
  Show(){
    for(var i = 0; i < this.hyphae.length; i++){
      this.hyphae[i].Show();
    }
    if(this.state == "spore"){
      fill(255,0,0);
      ellipse(this.position.posX, this.position.posY,10,10);
    } else if(this.state == "mycellium"){
      
    } else if(this.state == "stipe"){
      
    } else if(this.state == "hymenium"){
      
    } else if(this.state == "mature"){
      
    }
  }
  MoveHyphae(){
    for(var i = 0; i < this.hyphae.length; i++){
      this.hyphae[i].Move(target.myPos);
    }
  }
  AddHypha(){
    this.hyphae[this.hyphaeIndex] = new Hypha(this.position.posX,this.position.posY,1,target);
    this.hyphaeIndex += 1;
  }
}
class Hypha{
  constructor(x,y,s, tar){
    this.myPos = new Position(x,y);
    this.positions = [];
    this.positions[0] = new Position(this.myPos.posX, this.myPos.posY);
    this.positionsIndex = 1;
    this.maxLength = 700;
    this.speed = s;
    this.target = tar;
  }
  Move(){
    if(this.positionsIndex == this.maxLength){
      return;
    }
    var movementX = 0;
    var movementY = 0;
    if(this.target.myPos.posX > this.myPos.posX){
      if(Math.random(1) < 0.7){
        movementX = this.speed;
      } else {
        movementX = -this.speed;
      }
    } else{
      if(Math.random(1) < 0.7){
        movementX = -this.speed;
      } else {
        movementX = this.speed;
      }
    }
    if(this.target.myPos.posY > this.myPos.posY){
      if(Math.random(1) < 0.6){
        movementY = this.speed;
      } else {
        if(this.myPos.posY > 200){
          movementY = -this.speed;
        }
      }
    } else {
      if(Math.random(1) < 0.6){
        if(this.myPos.posY > 200){
          movementY = -this.speed;
        }
      } else {
        movementY = this.speed;
      }
    }
    this.myPos.posX += movementX;
    this.myPos.posY += movementY;
    this.positions[this.positionsIndex] = new Position(this.myPos.posX, this.myPos.posY);
    this.positionsIndex += 1;
  }
  Show(){
    for(var i = 0; i < this.positions.length-1; i++){
      line(this.positions[i].posX, this.positions[i].posY, this.positions[i+1].posX, this.positions[i+1].posY);
    }
  }
}
class Position{
  constructor(x,y){
    this.posX = x;
    this.posY = y;
  }
}
class Nutrient{
  constructor(t,a,c,i){
    this.type = t;
    this.amount = a;
    this.color = c;
    this.radius = 5;
    this.position = new Position(random(400),random(200)+200);
    this.index = i;
    this.proxIdx = [];
    this.smallestDist = [];
    this.timerRefresh = 5;
    this.timer = 0;
    this.collected = false;
    this.speed = 1;
  }
  FindNearestPointOnHypha(hypha,hIdx){
    this.smallestDist[hIdx] = 570; //400sqrt(2)
    this.proxIdx[hIdx] = 0;
    for(var j = 0 ; j < hypha.positions.length; j ++){
      var dist = sqrt(pow(this.position.posX - hypha.positions[j].posX, 2) + pow(this.position.posY - hypha.positions[j].posY, 2));
      if(dist < this.smallestDist[hIdx]){
        this.smallestDist[hIdx] = dist;
        this.proxIdx[hIdx] = j;
      }
    }
  }
  FindNearestPointOnHyphae(hyphae){
    for(var i = 0; i < hyphae.length; i++){
      FindNearestPointOnHypha(hyphae[i],i);
    }
  }
  UpdateNearestPointOnHypha(hypha, hIdx){
    var lastProxIdx = this.proxIdx[hIdx];
    this.smallestDist[hIdx] = 570; //400sqrt(2)
    for(var j = this.proxIdx[hIdx] - 20*this.speed ; j < this.proxIdx[hIdx] + 20*this.speed; j ++){
      if (j < 0 || j >= hypha.positions.length){
        continue;
      }
      var dist = sqrt(pow(this.position.posX - hypha.positions[j].posX, 2) + pow(this.position.posY - hypha.positions[j].posY, 2));
      if(dist < this.smallestDist[hIdx]){
        this.smallestDist[hIdx] = dist;
        this.proxIdx[hIdx] = j;
      }
    }
    if (lastProxIdx === this.proxIdx[hIdx]){
      this.timer += 1;
    } else {
      this.timer = 0;
    }
  }
  Move(hyphae){
    if(this.collected){
      return;
    }
    var movementX = 0;
    var movementY = 0;
    if(Math.random(1) < 0.5){
      movementX = this.speed;
    } else {
      movementX = -this.speed;
    }
    if(Math.random(1) < 0.5){
      movementY = this.speed;
    } else {
      if(this.position.posY > 200){
        movementY = -this.speed;
      }
    }
    this.position.posX += movementX;
    if (this.position.posX <= 0 || this.position.posX > 400) {
      this.position.posX -= movementX;
    }
    this.position.posY += movementY;
    if (this.position.posY <= 0 || this.position.posY > 400) {
      this.position.posY -= movementY;
    }
  }
   
  IsNear(hIdx) {
    if(this.smallestDist[hIdx] < this.radius){
      this.collected = true;
    }
  }
  Show(){
    if(!this.collected){  
      fill(this.color);
      ellipse(this.position.posX, this.position.posY, this.radius*2, this.radius*2);
    }
  }
}
class Target {
  constructor(x, y, unit){
    this.myPos = new Position(x,y);
    this.baseUnit = unit;
  }
  drawTarget(){
    noFill();
    stroke(255,0,0);
    strokeWeight(2);
    ellipse(this.myPos.posX, this.myPos.posY, 4*this.baseUnit, 4 * this.baseUnit);
    line(this.myPos.posX, this.myPos.posY - 4*this.baseUnit, this.myPos.posX, this.myPos.posY + 4*this.baseUnit);
    line(this.myPos.posX - 4 * this.baseUnit, this.myPos.posY, this.myPos.posX + 4*this.baseUnit, this.myPos.posY);
  }
}
class Environment{
  constructor(numN,f){
    this.numNutrients = numN;
    this.nutrients = [];
    this.availIdx = [];
    this.fungus = f;
    for(var i = 0; i < this.numNutrients; i++){
      this.nutrients[i] = new Nutrient("Water", 10, color(0,0,255),i);
      for(var j = 0; j < this.fungus.hyphae.length; j++){
        this.nutrients[i].FindNearestPointOnHypha(this.fungus.hyphae[j],j);
      }
    }
  }
  Show(){
    //Draw Background
    stroke(0,0,0);
    fill(155,88,21)
    rect(0,200,400,200);
    fill(4,161,196);
    rect(0,0,400,200);
    fill(255,255,255);
    //Show nutrients
    for(var i = 0; i < this.numNutrients; i++){
      this.nutrients[i].Move();
      this.nutrients[i].UpdateNearestPointOnHypha(this.fungus.hyphae[0],0);
      if (this.nutrients[i].timer > this.nutrients[i].timerRefresh) {
          for(var j = 0; j < this.fungus.hyphae.length; j++){
            this.nutrients[i].FindNearestPointOnHypha(this.fungus.hyphae[j],j);
          }
      }
      //print(this.nutrients[i].collected);
      //print(this.nutrients[i].smallestDist[0]);
      this.nutrients[i].IsNear(0);
      this.nutrients[i].Show();
    }
  }
}
class ProgressBar{
  constructor(){
    this.position = new Position(320, 30);
 //   this.currentState;
   // this.nextState;
    this.nutrientNeeded = 100;
    this.nutrientPossessed = 0;
  }
  Show(){
    stroke(0,0,0);
    fill(255,0,0);
    rect(this.position.posX, this.position.posY, 60,15);
    fill(0,255,0);
    if(this.nutrientPossessed / this.nutrientNeeded < 1){
      rect(this.position.posX, this.position.posY, this.nutrientPossessed / this.nutrientNeeded * 60,15);
    } else {
      rect(this.position.posX, this.position.posY, 60,15);
    }
  }
}
