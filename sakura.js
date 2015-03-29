'use strict';

(function() {
window.addEventListener('load', init, false);
var mouse = {x: 0, y: 0, bx: 0, by: 0};
window.addEventListener('mousemove', function(e) {
  mouse.bx=mouse.x,mouse.by=mouse.y,mouse.x=e.clientX,mouse.y=e.clientY;
});

function init() {
  var SAKURA_NUM = 10;
  var sakuraArray = Array();
  for(var i=0; i<SAKURA_NUM; i++) {
    sakuraArray.push(new Sakura());
  }
  var i = 0,diffX = 0, wind = {x: 0, y: 0, dx: 1, dy: 1, blow: false};
  var drop = setInterval(function() {
    wind.dx=0;
    wind.dy=0;
    if (innerWidth < wind.x) {
      wind.x = -1;
      wind.y = Math.random() * innerHeight;
      wind.blow = false;
    } else if (wind.blow) {
      wind.x += 5;
    }
    if (i%100 == 0) {
      wind.blow = true;
    }
    if (wind.blow) {
      wind.dx = 3;
    }
    /*
    if (Math.abs(diffX) != 0) {
      diffX>0 ? diffX-- : diffX++;
    } else {
      diffX = mouse.x - mouse.bx;
    }
    if (diffX > 50) {
      wind.blow = true;
      wind.x = mouse.x;
      wind.y = mouse.y;
      wind.dx = diffX;
    }
    */
    sakuraArray.forEach(function(sakura, index, array) {
      sakura.fall(wind);
    });
    if (i > 2000) {
      console.log('clear');
      clearInterval(drop);
    }
    i++;
  }, 1000/60);
}

function Sakura() {
  this.sakuraElement = document.createElement('div');
  this.sakuraElement.className = 'sakura';
  this.sakuraElement.style.position = 'absolute';
  this.sakuraElement.style.height = 0;
  this.sakuraElement.style.width = 0;
  this.sakuraElement.style.border = '10px solid pink';
  this.sakuraElement.style.borderRadius = '16px 0 16px 0';

  this.init();

  var css = '.sakura::after{content: "";display: block;position: absolute;top: -6px;left: -7px;height: 0;width: 0;border: 10px solid pink;border-radius: 16px 0 16px 0;-webkit-transform: rotate(19deg);-ms-transform: rotate(19deg);transform: rotate(19deg);}';
  var style = document.createElement('style');
  style.appendChild(document.createTextNode(css));
  document.getElementsByTagName('head')[0].appendChild(style);

  document.body.appendChild(this.sakuraElement);
}

Sakura.prototype.init = function() {
  this.x = Math.random() * (window.innerWidth);
  this.y = - 50;
  this.t = Math.random() * 10;
  this.scaleX = this.scaleY = Math.random() * 0.5 + 0.5;
  this.rotate = Math.random() * 360;
  this.vx = Math.random() * 50;
  this.vy = this.scaleY * 2;
  this.rx = Math.random() * 360;
  this.rvx = 7 - 10 * Math.random();
  this.turn = Math.round(Math.random());
  this.turn = this.turn==0 ? -1 : this.turn;
};

Sakura.prototype.fall = function(wind) {
  this.t++;
  var fx = Math.sin(this.t * Math.PI/innerWidth * 20);
  var kyori = Math.sqrt(Math.pow(this.x - wind.x, 2) + Math.pow(this.y - wind.y, 2));
  if (wind.blow && kyori <= 100) {
    this.x += wind.dx*200/kyori;
    this.sakuraElement.style.border = '10px solid black';
  } else {
    this.sakuraElement.style.border = '10px solid pink';
  }
  this.sakuraElement.style.left = (this.x + fx * this.vx) + 'px';
  if (document.documentElement.clientHeight < this.y) {
    this.init();
  }
  this.y += this.vy;
  this.sakuraElement.style.top = this.y + 'px';

  this.rx += this.rvx;

  var degX = Math.sin(this.rx / this.scaleX * Math.PI / 180);
  this.sakuraElement.style.webkitTransform = 'rotate('+this.rotate+'deg) matrix('+this.turn+',0,0,'+degX+', 0, 0) scale('+this.scaleX+','+this.scaleY+')';
  this.sakuraElement.style.mozTransform    = 'matrix('+this.turn+',0,0,'+degX+', 0, 0) scale('+this.scaleX+','+this.scaleY+')';
  this.sakuraElement.style.msTransform     = 'matrix('+this.turn+',0,0,'+degX+', 0, 0) scale('+this.scaleX+','+this.scaleY+')';
}

})();
