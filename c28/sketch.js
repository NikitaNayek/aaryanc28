const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boats = [];
var boatanimation = []
var brokenboatanimation = []

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  boatPng= loadImage('./assets/boat/boat.png')
  boatJson= loadJSON('./assets/boat/boat.json')
  brokenboatPng= loadImage('./assets/boat/broken_boat.png')
  brokenboatJson= loadJSON('./assets/boat/broken_boat.json')
}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 100, 50, angle);
  var boatframes = boatJson.frames
  var brokenboatframes = brokenboatJson.frames
  for(var i=0;i<boatframes.length;i++){
    var pos=boatframes[i].position
    var img=boatPng.get(pos.x,pos.y,pos.w,pos.h)
    boatanimation.push(img)
  }
  for(var i=0;i<brokenboatframes.length;i++){
    var pos=brokenboatframes[i].position
    var img=brokenboatPng.get(pos.x,pos.y,pos.w,pos.h)
    brokenboatanimation.push(img)
  }

  
}

function draw() {
  showBoats()
  background(189);
  image(backgroundImg, 0, 0, width, height);

 

  Engine.update(engine);
  ground.display();
showBoats();
 

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
  }

  cannon.display();
  tower.display();

  
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

//function to show the ball
function showCannonBalls(ball, index) {
  ball.display();
  if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
    Matter.World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}

 

    function showBoats() {
      if (boats.length > 0) {
        if (
          boats.length < 4 &&
          boats[boats.length - 1].body.position.x < width - 300
        ) {
          var positions = [-40, -60, -70, -20];
          var position = random(positions);
          var boat = new Boat( width, height - 100,170, 170, position,boatanimation);
          boats.push(boat);
        }
    
        for (var i = 0; i < boats.length; i++) {
          Matter.Body.setVelocity(boats[i].body, {
            x: -0.9,
            y: 0
          });
    
          boats[i].display();
          boats[i].animate();
        }
      } else {
        var boat = new Boat(width, height - 60, 170, 170, -60, boatanimation);
        boats.push(boat);
      }
    }
function keyReleased() {
  if (keyCode === DOWN_ARROW) { 
    balls[balls.length - 1].shoot();
  }
}



