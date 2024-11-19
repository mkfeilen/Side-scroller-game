// create Phaser.Game object assigned to global variable named game
const game = new Phaser.Game(1000, 600, Phaser.AUTO, 'my-game', { preload: preload, create: create, update: update });

// declare other global variables (for sprites, etc.)
var player;
var arrowKey;
var spacebar;
var sky, mountains, city;
var platformGroup;
var wallGroup;
var coinGroup;
var bigCoinGroup;
var score = 0;
var scoreText;
var coinSound;
var catGroup;
var healthBar;
var catSound;
var powerUpGroup;
var powerUpActive = false;
var messageText;
var timeBar;
var timeUp = false;
var timeLimit = 120;
var heartBonusGroup;
var batGroup;
var spikeGroup;
var golemGroup;
var golemSound;
var finishFlagGroup;


// preload game assets - runs one time when webpage first loads
function preload() {
  game.load.image('sky-background', 'assets/images/sky-clouds.jpg');
  game.load.image('mountains-background', 'assets/images/mountain-skyline.png');
  game.load.image('city-background', 'assets/images/city-skyline.png');
  game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
  game.load.image('platform-50', 'assets/images/platform-050w.png');
  game.load.image('platform-100', 'assets/images/platform-100w.png');
  game.load.image('platform-200', 'assets/images/platform-200w.png');
  game.load.image('platform-300', 'assets/images/platform-300w.png');
  game.load.image('platform-400', 'assets/images/platform-400w.png');
  game.load.image('platform-500', 'assets/images/platform-500w.png');
  game.load.image('wall-50', 'assets/images/wall-050h.png');
  game.load.image('wall-150', 'assets/images/wall-150h.png');
  game.load.image('wall-250', 'assets/images/wall-250h.png');
  game.load.spritesheet('coin', 'assets/images/coin.png', 32, 32);
  game.load.spritesheet('big-coin', 'assets/images/coin.png', 32, 32);
  game.load.audio('coinSpin', 'assets/sounds/coin.wav');
  game.load.spritesheet('cat', 'assets/images/cat.png', 32, 32);
  game.load.image('red-bar', 'assets/images/bar-red.png');
  game.load.image('green-bar', 'assets/images/bar-green.png');
  game.load.image('bar-outline', 'assets/images/bar-outline.png');
  game.load.audio('cat-sound', 'assets/sounds/meow.wav');
  game.load.image('star', 'assets/images/star.png');
  game.load.image('black-bar', 'assets/images/bar-black.png');
  game.load.image('yellow-bar', 'assets/images/bar-yellow.png');
  game.load.image('heart', 'assets/images/heart.png');
  game.load.spritesheet('bat', 'assets/images/bat.png', 50, 42);
  game.load.image('spike', 'assets/images/spike.png');
  game.load.spritesheet('golem', 'assets/images/golem-final.png', 96, 64);
  game.load.audio('golem-sound', 'assets/sounds/golem.wav');
  game.load.image('flag', 'assets/images/flag.png');
}

// create game world - runs one time after preload finishes
function create() {
  game.world.setBounds(0, 0, 5000, 600);
  sky = game.add.tileSprite(0, 0, 1000, 600, 'sky-background');
  mountains = game.add.tileSprite(0, 0, 1000, 600, 'mountains-background');
  city = game.add.tileSprite(0, 0, 1000, 600, 'city-background');
  sky.fixedToCamera = true;
  mountains.fixedToCamera = true;
  city.fixedToCamera = true;

  // PLATFORMS
  platformGroup = game.add.group();
  platformGroup.enableBody = true;

  var ground = platformGroup.create(0, game.world.height - 25, 'platform-500');
  ground.scale.setTo(10, 1); // 10 * 500 = 5000 pixels wide

  // other platforms
  platformGroup.create(200, 500, 'platform-100');
  platformGroup.create(400, 425, 'platform-100');
  platformGroup.create(600, 350, 'platform-100');
  platformGroup.create(50, 100, 'platform-50');
  platformGroup.create(250, 175, 'platform-50');
  platformGroup.create(450, 260, 'platform-50');
  platformGroup.create(890, 275, 'platform-200');
  platformGroup.create(1250, 400, 'platform-50');
  platformGroup.create(1425, 175, 'platform-100');
  platformGroup.create(1475, 475, 'platform-50');
  platformGroup.create(1850, 125, 'platform-50');
  platformGroup.create(1900, 425, 'platform-200');
  platformGroup.create(1775, 500, 'platform-50');
  platformGroup.create(2305, 125, 'platform-100');
  platformGroup.create(2300, 475, 'platform-100');
  platformGroup.create(2525, 375, 'platform-100');
  platformGroup.create(2800, 150, 'platform-50');
  platformGroup.create(2880, 500, 'platform-50');
  platformGroup.create(3200, 150, 'platform-50');
  platformGroup.create(3475, 150, 'platform-100');
  platformGroup.create(3840, 150, 'platform-50');
  platformGroup.create(3175, 500, 'platform-100');
  platformGroup.create(3450, 500, 'platform-100');
  platformGroup.create(3725, 500, 'platform-100');
  platformGroup.create(3900, 400, 'platform-200');
  platformGroup.create(4210, 500, 'platform-50');
  platformGroup.create(4250, 325, 'platform-50');
  platformGroup.create(4520, 275, 'platform-50');
  platformGroup.create(4770, 195, 'platform-50');
  platformGroup.create(4920, 110, 'platform-50');

  platformGroup.setAll('body.immovable', true);

  //WALL
  wallGroup = game.add.group();
  wallGroup.enableBody = true;
  wallGroup.create(525, 525, 'wall-50');
  wallGroup.create(1000, 425, 'wall-150');
  wallGroup.create(2000, 525, 'wall-50');
  wallGroup.create(3000, 525, 'wall-50');
  wallGroup.create(4000, 525, 'wall-50');
  wallGroup.setAll('body.immovable', true);

  //COIN

  coinGroup = game.add.group();
  coinGroup.enableBody = true;
  coinSound = game.add.audio('coinSpin', 0.3);

  //JSON array listing coin positions

  var coinData = [
    { x: 150, y: 0 },
    { x: 250, y: 250 },
    { x: 275, y: 0 },
    { x: 350, y: 0 },
    { x: 450, y: 300 },
    { x: 475, y: 0 },
    { x: 537, y: 0 },
    { x: 650, y: 0 },
    { x: 700, y: 400 },
    { x: 850, y: 0 },
    { x: 950, y: 0 },
    { x: 1050, y: 0 },
    { x: 1175, y: 0 },
    { x: 1375, y: 0 },
    { x: 1475, y: 0 },
    { x: 1875, y: 0 },
    { x: 1925, y: 300 },
    { x: 2000, y: 300 },
    { x: 2075, y: 300 },
    { x: 2350, y: 300 },
    { x: 2600, y: 300 },
    { x: 2300, y: 500 },
    { x: 2600, y: 500 },
    { x: 2900, y: 500 },
    { x: 2825, y: 0 },
    { x: 3225, y: 300 },
    { x: 3225, y: 0 },
    { x: 3500, y: 300 },
    { x: 3775, y: 300 },
    { x: 4000, y: 300 },
    { x: 4065, y: 300 },
    { x: 4140, y: 300 },
    { x: 4350, y: 500 },
    { x: 4650, y: 500 },
    { x: 4950, y: 500 },
    { x: 4275, y: 0 },
    { x: 4545, y: 0 },
    { x: 4790, y: 0 }
  ];

  for (let i = 0; i < coinData.length; i++) {
    var coin = coinGroup.create(coinData[i].x, coinData[i].y, 'coin');
    coin.anchor.setTo(0.5, 0.5);
    coin.body.gravity.y = 400;
    coin.body.bounce.y = 0.5;
    coin.animations.add('spin', [0, 1, 2, 3, 4, 5], 10, true);
    coin.animations.play('spin');
  }

  //BIG COIN 
  bigCoinGroup = game.add.group();
  bigCoinGroup.enableBody = true;
  coinSound = game.add.audio('coinSpin', 0.6);

  var bigCoinData = [
    { x: 75, y: 0 },
    { x: 2350, y: 0 },
    { x: 3865, y: 0 },
    { x: 4940, y: 0 }
  ];

  for (let i = 0; i < bigCoinData.length; i++) {
    var coin = bigCoinGroup.create(bigCoinData[i].x, bigCoinData[i].y, 'big-coin');
    coin.scale.setTo(1.8, 1.8);
    coin.anchor.setTo(0.5, 0.5);
    coin.body.gravity.y = 400;
    coin.body.bounce.y = 0.5;
    coin.animations.add('spin', [0, 1, 2, 3, 4, 5], 10, true);
    coin.animations.play('spin');

  }

  //SPIKES
  spikeGroup = game.add.group();
  spikeGroup.enableBody = true;
  for (let i=0; i < 29 ; i++ ){
    let spike = spikeGroup.create(i * 35 + 3025, 575, 'spike');
    spike.anchor.setTo(0.5, 0.5);
  }

  //POWERUP
  powerUpGroup = game.add.group();
  powerUpGroup.enableBody = true;
  powerUpGroup.create(1000, 200, 'star');
  powerUpGroup.create(3000, 400, 'star');
  powerUpGroup.setAll('anchor.set', 0.5);

  messageText = game.add.text(500, 100, '', { fontSize: '48px' });
  messageText.setShadow(2, 2, '#000000', 2);
  messageText.visible = false;
  messageText.anchor.setTo(0.5, 0.5);
  messageText.fixedToCamera = true;

  //HEART BONUS
  heartBonusGroup = game.add.group();
  heartBonusGroup.enableBody = true;
  heartBonusGroup.create(1500, 530, 'heart');
  heartBonusGroup.create(3525, 90, 'heart');
  heartBonusGroup.create(4230, 430, 'heart');
  // heartBonusGroup.setAll('scale.setTo',(2, 2));
  heartBonusGroup.setAll('anchor.set', 0.5);

  //END FLAG
  finishFlagGroup = game.add.group();
    finishFlagGroup.enableBody = true;
  finishFlagGroup.create(4950, 550, 'flag');
  finishFlagGroup.setAll('anchor.set', 0.5);


  // SCORE
  scoreText = game.add.text(20, 20, 'Score:' + score, { fontSize: '20px', fill: '#222222' });
  scoreText.fixedToCamera = true;

  //HEALTHBAR
  let healthText = game.add.text(325, 20, 'Health', { fontSize: '20px', fill: '#222222' });
  healthText.fixedToCamera = true;
  let barBackground, barOutline;
  barBackground = game.add.image(400, 20, 'red-bar');
  barBackground.fixedToCamera = true;
  healthBar = game.add.image(400, 20, 'green-bar');
  healthBar.fixedToCamera = true;
  barOutline = game.add.image(400, 20, 'bar-outline');
  barOutline.fixedToCamera = true;

  //TIMEBAR
  let timeText = game.add.text(720, 20, 'Time', { fontSize: '20px', fill: '#222222' });
  timeText.fixedToCamera = true;
  barBackground = game.add.image(780, 20, 'black-bar');
  barBackground.fixedToCamera = true;
  timeBar = game.add.image(780, 20, 'yellow-bar');
  timeBar.fixedToCamera = true;
  barOutline = game.add.image(780, 20, 'bar-outline');
  barOutline.fixedToCamera = true;

  //CAT ENEMY GROUP
  catGroup = game.add.group();
  catGroup.enableBody = true;
  for (let i = 0; i < 15; i++) {
    let cat = catGroup.create(i * 200 + 100, 0, 'cat');
    cat.anchor.setTo(0.5, 0.5);
    cat.body.gravity.y = 300;
    cat.body.bounce.x = 1;
    cat.body.collideWorldBounds = true;
    catSound = game.add.audio('cat-sound', 0.2);

    cat.animations.add('moving-left', [0, 1], 10, true);
    cat.animations.add('moving-right', [2, 3], 10, true);
    cat.body.velocity.x = Math.random() * 50 + 100;
    if (Math.random() < 0.5) cat.body.velocity.x *= -1; //reverse direction

  }

  //BAT GROUP
  batGroup = game.add.group();
  batGroup.enableBody = true;
  for (let i = 0; i < 10; i++) {
    let bat = batGroup.create(i * 500 + 100, 50, 'bat');
    bat.anchor.setTo(0.5, 0.5);
    bat.body.collideWorldBounds = true;
    bat.body.bounce.x = 1;

    bat.animations.add('moving-left', [0, 1], 10, true);
    bat.animations.add('moving-right', [2, 3], 10, true);
    bat.animations.play();
    bat.body.velocity.x = Math.random() * 50 + 50;
    if (Math.random() < 0.5) bat.body.velocity.x *= -1; //reverse direction

  }

  //GOLEM GROUP
  golemGroup = game.add.group();
  golemGroup.enableBody = true;
  for (let i = 0; i < 4; i++){
    let golem = golemGroup.create( i*300 + 4050, 500, 'golem');
    golem.anchor.setTo(0.5, 0.5);
    golem.body.collideWorldBounds = true;
    golem.body.bounce.x = 1;
    golem.body.gravity.y = 300;

    golemSound = game.add.audio('golem-sound', 0.3);
  
    
    golem.animations.add('moving-left', [0, 1 , 2, 3, 4, 5, 6, 7], 10, true);
    golem.animations.add('moving-right', [8,9 , 10, 11, 12, 13, 14, 15], 10, true);
    golem.body.velocity.x = 75;
   
  }

  //PLAYER 
  player = game.add.sprite(25, 300, 'dude');
  player.anchor.setTo(0.5, 0.5);
  game.camera.follow(player);
  player.events.onKilled.add(function () {
    player.reset(25, 300, 100);
    healthBar.scale.setTo(player.health / player.maxHealth, 1);
  });

  spacebar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
  arrowKey = game.input.keyboard.createCursorKeys();

  player.frame = 4;
  player.angle = 0;
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);
  game.physics.arcade.checkCollision.up = false; // won't hit the top of the game space
  player.body.gravity.y = 450;
  player.body.collideWorldBounds = true;
  player.body.bounce.y = 0.2;

  player.health = 100;
  player.maxHealth = 100;

  player.animations.add('moving_left', [0, 1, 2, 3], 10, true);
  player.animations.add('moving_right', [5, 6, 7, 8], 10, true);

  // TEMPORARY - distance markers
  game.add.text(1000, 300, '1000px', { fill: 'white' });
  game.add.text(2000, 300, '2000px', { fill: 'white' });
  game.add.text(3000, 300, '3000px', { fill: 'white' });
  game.add.text(4000, 300, '4000px', { fill: 'white' });
}

// update game - runs repeatedly in loop after create finishes
function update() {
  if (timeUp) gameOver();
  else displayTimeLeft();

  game.physics.arcade.collide(player, platformGroup);
  game.physics.arcade.collide(player, wallGroup);
  game.physics.arcade.collide(player, coinGroup, collectCoin, null, this);
  game.physics.arcade.collide(player, powerUpGroup, collectPowerUp, null, this);
  game.physics.arcade.collide(player, finishFlagGroup, gameEnd, null, this);
  game.physics.arcade.collide(player, heartBonusGroup, collectHeartBonus, null, this);
  game.physics.arcade.collide(coinGroup, platformGroup);
  game.physics.arcade.collide(coinGroup, wallGroup);
  game.physics.arcade.collide(bigCoinGroup, wallGroup);
  game.physics.arcade.collide(bigCoinGroup, platformGroup);
  game.physics.arcade.collide(player, bigCoinGroup, collectBigCoin, null, this);
  game.physics.arcade.collide(catGroup, wallGroup);
  game.physics.arcade.collide(catGroup, platformGroup, patrolPlatform, null, this);
  game.physics.arcade.collide(player, spikeGroup, touchSpike, null, this);

  game.physics.arcade.overlap(player, catGroup, touchCat);
  game.physics.arcade.collide(batGroup, wallGroup);
  game.physics.arcade.overlap(player, batGroup, touchBat);
  game.physics.arcade.collide(golemGroup, wallGroup);
  game.physics.arcade.collide(golemGroup, platformGroup);
  game.physics.arcade.overlap(player, golemGroup, touchGolem);
  
  




  if (arrowKey.left.isDown) {
    let runSpeed = -200
    if (powerUpActive) runSpeed = -300;
    player.body.velocity.x = runSpeed;
    player.animations.play('moving_left');
  } else if (arrowKey.right.isDown) {
    let runSpeed = 200;
    if (powerUpActive) runspeed = 300;
    player.body.velocity.x = runSpeed;
    player.animations.play('moving_right');
    if (powerUpActive) runspeed = 300;
  } // else if (spacebar.justDown && player.body.touching.down && arrowKey.left.isDown) {
   //if(powerUpActive) {
    // player.body.velocity.x = -300;
   //  player.body.velocity.x = -450;

  //  } else {
  //  player.body.velocity.x = -200;
   //  player.body.velocity.x = -300;

 //  }
 //   }
  else if (spacebar.justDown && player.body.touching.down) {
    //make player jump
    let jumpSpeed = -300;
    if (powerUpActive) jumpSpeed = -450;
    player.body.velocity.y = jumpSpeed;
  } else {
    player.body.velocity.x = 0;
    player.angle = 0;
    player.animations.stop();
    player.frame = 4;
  }

  //BACKGROUND PARALLAX
  sky.tilePosition.x = game.camera.x * -0.2;
  mountains.tilePosition.x = game.camera.x * -0.4;
  city.tilePosition.x = game.camera.x * -0.5;

  //CHECK CAT ANIMATION
  catGroup.forEach(function (cat) {
    if (cat.body.velocity.x < 0) { cat.animations.play('moving-left') }
    else { cat.animations.play('moving-right') };
  });


  //CHECK BAT ANIMATION
  batGroup.forEach(function (bat) {
    if (bat.body.velocity.x < 0) { bat.animations.play('moving-left') }
    else { bat.animations.play('moving-right') };
  });

  //CHECK GOLEM ANIMATION
  golemGroup.forEach(function (golem) {
    if (golem.body.velocity.x < 0) { golem.animations.play('moving-left') }
    else { 
          golem.animations.play('moving-right') };
  });


}



// add custom functions (for collisions, etc.) - only run when called
//TIMER
function displayTimeLeft() {
  let time = game.time.totalElapsedSeconds();
  let timeLeft = timeLimit - time;

  if (timeLeft < 0) {
    timeLeft = 0;
    timeUp = true;
  }

  timeBar.scale.setTo(timeLeft / timeLimit, 1);
}

function gameOver() {
  messageText.setText('Time Up');
  messageText.visible = true;
  // messageText.fill('#ff0000');
  player.exists = false;
}


function collectCoin(player, coin) {
  coinSound.play();
  coin.kill();
  score = score + 50;
  scoreText.setText('Score: ' + score);

}

function collectBigCoin(player, coin) {
  coinSound.play();
  coin.kill();
  score = score + 200;
  scoreText.setText('Score: ' + score);

}

function patrolPlatform(enemy, platform) {
  //if enemy about to go over right or left edge of platform
  if (enemy.body.velocity.x > 0 && enemy.right > platform.right
    || enemy.body.velocity.x < 0 && enemy.left < platform.left) {
    enemy.body.velocity.x *= -1; //reverse direction
  }
}

function touchCat(player, cat) {
  cat.body.velocity.x *= -1;
  cat.body.velocity.y = -150;
  if (player.x < cat.x) {
    cat.x += 20;
  } else { cat.x -= 20; }
  catSound.play();
  player.damage(5);
  healthBar.scale.setTo(player.health / player.maxHealth, 1);
}

function touchBat(player, bat) {
  bat.body.velocity.x *= -1;

  if (player.x < bat.x) {
    bat.x += 40;
  } else { bat.x -= 40; }

  player.damage(5);
  healthBar.scale.setTo(player.health / player.maxHealth, 1);
}

function touchGolem(player, golem) {
  golem.body.velocity.x *= -1;
  golem.body.velocity.y = -150;
  if (player.x < golem.x) {
    golem.x += 20;
  } else { golem.x -= 20; }
  golemSound.play();

  player.damage(15);
  healthBar.scale.setTo(player.health / player.maxHealth, 1);
}

function touchSpike(player, spike) {
  player.damage(100);
}

function collectPowerUp(player, powerUp) {
  powerUp.kill();
  powerUpActive = true;
  messageText.setText('Power Boost');
  //messageText.setFill('#00ff00');
  messageText.visible = true;
  //player.setTint(0x00ff00);
  game.time.events.add(Phaser.Timer.SECOND * 10, stopPowerUp, this);

}

function stopPowerUp() {
  powerUpActive = false;
  messageText.visible = false;
}

function collectHeartBonus(player, heart) {
  heart.kill();
  player.heal(100);
  healthBar.scale.setTo(player.health / player.maxHealth, 1);

}

function gameEnd(player, finishFlag) {
  finishFlag.kill();
  // let timeLeft = timeLimit - time;
 // score += timeLeft;
  messageText.setText('Final Score: ' + score);
  messageText.visible = true;
  //  let gamEndText = game.add.text(game.world.centerX, game.world.centerY + 80,
  //  'Final Score: ' + score,
  //  { font: 'Arial', fontSize: '25px', fontStyle: 'bold', fill: '#ffffff' });
    // game.scene.stop();

}