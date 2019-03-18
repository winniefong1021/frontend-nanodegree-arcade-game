// Enemies our player must avoid
var Enemy = function (x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.x = x;
  this.y = y;
  this.speed = Math.floor((Math.random() * 175) + 100);
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.x <= 550) {
    this.x += this.speed * dt;
  } else {
    this.x = -2;
  }

  if (player.x >= this.x - 30
    && player.x <= this.x + 30
    && player.y >= this.y - 30
    && player.y <= this.y + 30) {
    player.reset('Game Over');
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function () {
  // set initial x and y position
  this.x = 200;
  this.y = 400;
  this.sprite = 'images/char-boy.png';
}

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function () {
  //if left key is pressed and player is not on edge of map, pressed decrement x
  if (this.arrowKey === 'left' && this.x > 0) {
    this.x = this.x - 50;
    //if right key is pressed and player is not on edge of map increment x
  } else if (this.arrowKey === 'right' && this.x != 400) {
    this.x = this.x + 50;
    //if up key is pressed increment y
  } else if (this.arrowKey === 'up') {
    this.y = this.y - 50;
    //if down key is pressed and player is not on edge of map decrement y
  } else if (this.arrowKey === 'down' && this.y != 400) {
    this.y = this.y + 50;
  }
  this.arrowKey = null;

  //If on water, pop a message and reset the game
  if (this.y < 25) {
    this.reset('You made it!');
  }
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (event) {
  this.arrowKey = event;
};

Player.prototype.reset = function (msg) {
  this.x = 200;
  this.y = 400;

  var div = document.createElement('div');

  div.id = 'message';
  div.innerHTML = '<h2>' + msg + '</h2>';

  document.body.appendChild(div);

  setTimeout(function () {
    document.body.removeChild(div);
  }, 1000);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

/** New player instance, we need only one per game **/
var player = new Player();

/** Array for enemy objects **/
var allEnemies = [];

(function addEnemies() {
  allEnemies.push(new Enemy(-2, 60));
  allEnemies.push(new Enemy(-2, 100));
  allEnemies.push(new Enemy(-2, 150));
  allEnemies.push(new Enemy(-2, 220));
}());

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
