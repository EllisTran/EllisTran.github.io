
var maps = [{"Sprites":[{"Category":"Mario","x":21,"y":500,"w":60,"h":95},{"x":700,"y":300,"w":89,"h":83,"Category":"CoinBlock"},{"x":1400,"y":300,"w":89,"h":83,"Category":"CoinBlock"},{"x":2100,"y":300,"w":89,"h":83,"Category":"CoinBlock"},{"x":306,"y":500,"w":94,"h":93,"Category":"Brick"},{"x":407,"y":398,"w":120,"h":103,"Category":"Brick"},{"x":540,"y":510,"w":0,"h":0,"Category":"Brick"},{"x":532,"y":499,"w":106,"h":99,"Category":"Brick"},{"x":704,"y":567,"w":89,"h":22,"Category":"Brick"},{"x":810,"y":238,"w":116,"h":90,"Category":"Brick"},{"x":930,"y":330,"w":88,"h":90,"Category":"Brick"},{"x":1017,"y":139,"w":99,"h":94,"Category":"Brick"},{"x":1118,"y":70,"w":77,"h":71,"Category":"Brick"},{"x":1099,"y":341,"w":84,"h":95,"Category":"Brick"},{"x":1228,"y":480,"w":95,"h":81,"Category":"Brick"},{"x":1398,"y":527,"w":77,"h":59,"Category":"Brick"},{"x":1730,"y":527,"w":70,"h":56,"Category":"Brick"},{"x":1808,"y":453,"w":70,"h":70,"Category":"Brick"},{"x":1881,"y":527,"w":64,"h":60,"Category":"Brick"},{"x":1963,"y":560,"w":56,"h":35,"Category":"Brick"},{"x":2050,"y":500,"w":88,"h":64,"Category":"Brick"},{"x":2359,"y":220,"w":111,"h":95,"Category":"Brick"},{"x":2537,"y":222,"w":119,"h":92,"Category":"Brick"},{"x":2293,"y":434,"w":67,"h":100,"Category":"Brick"},{"x":2361,"y":488,"w":308,"h":39,"Category":"Brick"},{"x":2658,"y":432,"w":88,"h":105,"Category":"Brick"},{"x":2494,"y":372,"w":16,"h":16,"Category":"Brick"},{"x":2842,"y":121,"w":128,"h":31,"Category":"Brick"},{"x":2889,"y":153,"w":33,"h":132,"Category":"Brick"},{"x":2979,"y":126,"w":33,"h":157,"Category":"Brick"},{"x":3009,"y":196,"w":50,"h":27,"Category":"Brick"},{"x":3038,"y":202,"w":33,"h":83,"Category":"Brick"},{"x":3097,"y":202,"w":31,"h":83,"Category":"Brick"},{"x":3104,"y":205,"w":75,"h":27,"Category":"Brick"},{"x":3160,"y":208,"w":28,"h":74,"Category":"Brick"},{"x":3099,"y":246,"w":87,"h":10,"Category":"Brick"},{"x":3215,"y":209,"w":34,"h":88,"Category":"Brick"},{"x":3221,"y":210,"w":106,"h":28,"Category":"Brick"},{"x":3296,"y":218,"w":34,"h":72,"Category":"Brick"},{"x":3299,"y":274,"w":30,"h":26,"Category":"Brick"},{"x":3349,"y":135,"w":50,"h":172,"Category":"Brick"},{"x":3365,"y":189,"w":134,"h":55,"Category":"Brick"},{"x":3448,"y":141,"w":49,"h":101,"Category":"Brick"},{"x":3385,"y":230,"w":44,"h":31,"Category":"Brick"},{"x":3411,"y":247,"w":43,"h":32,"Category":"Brick"},{"x":3437,"y":269,"w":49,"h":32,"Category":"Brick"},{"x":3460,"y":288,"w":42,"h":18,"Category":"Brick"},{"x":3542,"y":140,"w":108,"h":54,"Category":"Brick"},{"x":3545,"y":149,"w":25,"h":94,"Category":"Brick"},{"x":3551,"y":218,"w":89,"h":36,"Category":"Brick"},{"x":3609,"y":233,"w":35,"h":62,"Category":"Brick"},{"x":3552,"y":265,"w":84,"h":40,"Category":"Brick"},{"x":3669,"y":96,"w":89,"h":156,"Category":"Brick"},{"x":3676,"y":277,"w":72,"h":25,"Category":"Brick"}]}]


class Sprite
{
	constructor(x, y,w,h, image_url, model)
	{
		//this.variable creates the classes member variables
		this.mario_imagesRight = [];
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.image = new Image();
		this.vert_vel = 0;
		this.image.src = image_url;
		this.model = model;
	}

	checkCollision(model, mario, sprite)
	{
		if (mario.x + mario.w < sprite.x)		//Checks to see if Mario is colliding with the left side of the sprite
			return false;
		if (mario.x > sprite.x + sprite.w)      //Checks to see if Mario is colliding with the right side of the sprite
            return false;
        if (mario.y + mario.h < sprite.y)       //Checks to see if Mario is colliding with the top of the sprite
            return false;
        if (mario.y > sprite.y + sprite.h)      //Checks to see if Mario is colliding with the bottom of the sprite
            return false;
        this.collisionHandler(model, mario, sprite);     //Calls Collision method if collision occurs
        return true;
	}

	collisionHandler(model, mario, sprite)
	{
		if (mario.x + mario.w >= sprite.x && mario.prev_X +mario.w <= sprite.x)                  //Left Side Collision
        {
            mario.x = sprite.x - mario.w - 3;
        }
        else if (mario.x <= sprite.x + sprite.w && mario.prev_X >= sprite.x + sprite.w)          //Right Side Collision
        {
            mario.x = sprite.x + sprite.w + 3;
        }
        else if (mario.y + mario.h > sprite.y && mario.prev_Y + mario.h <= sprite.y + sprite.h)  //Top Collision
        {
            mario.y = sprite.y - mario.h;
            mario.jumpFrame = 0;
            mario.vert_vel = 2.1;
            mario.coinPop = 0;
        }
        else if (mario.y < sprite.y + sprite.h && mario.prev_Y >= sprite.h)                      //Under Brick
        {
            mario.y = sprite.y + sprite.h;
			mario.vert_vel = 0.0;
			if (sprite.isCoinBlock() && mario.coinPop == 0)
			{
				mario.coinPop++;
				sprite.coinLimit++;
				if(sprite.coinLimit<=5)
					model.addCoin(sprite.x, sprite.y, 75, 75);
				
			}
        }

	}

	go_toward_destination()
	{
		if(this.dest_x === undefined)
			return;
		if(this.x < this.dest_x)
			this.x++;
		else if(this.x > this.dest_x)
			this.x--;
		if(this.y < this.dest_y)
			this.y++;
		else if(this.y > this.dest_y)
			this.y--;
	}

	set_destination(x, y)
	{
		this.dest_x = x;
		this.dest_y = y;
	}

	move(dx, dy)
	{
		this.dest_x = this.x + dx;
		this.dest_y = this.y + dy;
	}

	ignore_click(x, y) {}
	sit_still() {}
	update() {}

}

class Mario extends Sprite
{
    constructor(x, y,w,h, image_url, model)
    {
		super(x, y,w,h, image_url,model);				//Calls the super constructor for class Sprite
		this.prev_X = 0;								//Previous X and Y are to calculate for Collision
		this.prev_Y = 0;
		this.vert_vel = 0;								//vert_vel calls for gravity and jumping to work
		this.jumpFrame = 0;								
		this.coinPop = 0;								//coinPop is to make sure only one coin pops out
	}

	prevDestination()
	{
		this.prev_X = this.x;
		this.prev_Y = this.y;
	}
	isCoinBlock()
	{
		return false;
	}
	isCoin()
	{
		return false;
	}

	isMario() 
	{
		return true;
	}
	isBrick()
	{
		return false;
	}

	update()
	{
		this.model.camPos = this.x - 300;
		if (this.y < 500) //Gravity
		{
			this.vert_vel += 2.1;
			this.y += this.vert_vel;
		}
		if (this.y >= 500) //Stops gravity
		{
			this.jumpFrame = 0;
			this.y = 500;
			this.vert_vel = 0.0;
			this.coinPop = 0;
		}
		this.jumpFrame++;
	}
}

class CoinBlock extends Sprite
{
	constructor(x, y, w, h , image_url, model)
	{
		super(x, y, w, h, image_url, model);
		this.coinLimit = 0;
		this.emptyImage = new Image();
		this.emptyImage.src = "emptycoinblock.png";
	}
	isMario()
	{
		return false;
	}
	isBrick()
	{
		return false;
	}
	isCoinBlock()
	{
		return true;
	}
	isCoin()
	{
		return false;
	}
}

class Brick extends Sprite
{
	constructor(hor, vert, w,h,image_url, model)
	{
		super(hor, vert,w,h, image_url, model);
	}
	isMario()
	{
		return false;
	}
	isBrick()
	{
		return true;
	}
	isCoinBlock()
	{
		return false;
	}
	isCoin()
	{
		return false;
	}

}


class Coin extends Sprite
{
	constructor(x, y, w, h, image_url, model)
	{
		super(x, y, w , h, image_url, model);
		this.moveCoinX = Math.floor( Math.random()*10);
		this.vert_vel = -20.0;
	}

	isCoinBlock()
	{
		return false;
	}

	isMario() 
	{
		return false;
	}

	isBrick()
	{
		return false;
	}

	isCoin()
	{
		return true;
	}

	update()
	{
		if (this.y < 500)
		{
			this.vert_vel += 1.7;
			this.y += this.vert_vel;

			this.vert_vel+= 3.1;

			this.y+=this.vert_vel;
			if (this.moveCoinX <=5)
				this.x+= this.moveCoinX+5;
			else
				this.x-= this.moveCoinX;
		}
		if (this.y >= 500)
		{
			this.model.removeCoin(this);
		}
	}
}
class Model
{
	constructor()
	{
		this.camPos=0;
		this.sprites = [];
		this.mario = new Mario(300,0,65,90, "mariofrontwards1.png", this);
		this.sprites.push(this.mario);
		this.marioRight = false;
		this.marioLeft = false;

		for (let i = 1; i < maps[0].Sprites.length; i++)
		{
			if(maps[0].Sprites[i].Category === "Brick")
			{
				this.sprites.push(new Brick(maps[0].Sprites[i].x, maps[0].Sprites[i].y, maps[0].Sprites[i].w, maps[0].Sprites[i].h,"dirtGround.png" , this));
			}
			else if (maps[0].Sprites[i].Category === "CoinBlock")
			{
				this.sprites.push(new CoinBlock(maps[0].Sprites[i].x, maps[0].Sprites[i].y, maps[0].Sprites[i].w, maps[0].Sprites[i].h, "coinblock1.png", this));
			}
		}
	}

	removeCoin(coin)
	{
		this.sprites.pop(coin);
	}
	addBrick(x, y, w , h)
	{
		this.b = new Brick(x, y , w , h,"dirtGround.png" ,this);
		this.sprites.push(this.b);
	}
	addCoin(x, y, w, h)
	{
		this.coin = new Coin(x, y , w ,h, "coin.png", this);
		this.sprites.push(this.coin);
	}

	move(dx, dy)
	{
		this.sprites.move(dx, dy);
	}	
	
	update()
	{
		for(let i = 0; i < this.sprites.length; i++)
		{
			let s = this.sprites[i];
			if (s.isBrick())
				if(s.checkCollision(this, this.mario, s));
			if (s.isCoinBlock())
				if(s.checkCollision(this, this.mario, s));
			s.update();
		}
	}
}

class View
{
	constructor(model)
	{
		this.model = model;
		this.canvas = document.getElementById("myCanvas");
		this.marioPicsRight= [];
		this.marioPicsLeft = [];
		this.marioSourceRight = ["mariofrontwards1.png", "mariofrontwards2.png", "mariofrontwards3.png", "mariofrontwards4.png", "mariofrontwards5.png"];
		this.marioSourceLeft = ["mariobackwards1.png","mariobackwards2.png","mariobackwards3.png","mariobackwards4.png","mariobackwards5.png"];
		for (let i = 0; i < 5; i++)
		{
			this.marioPicsRight.push(new Image());
			this.marioPicsLeft.push(new Image());
			this.marioPicsRight[i].src = this.marioSourceRight[i];
			this.marioPicsLeft[i].src = this.marioSourceLeft[i];
		}
		this.floorImage = new Image();
		this.backgroundImage = new Image();
		this.floorImage.src = "dirtGround.png";
		this.backgroundImage.src = "Background.png";
		this.brickImage = new Image();
		this.brickImage.src = "dirtGround.png";
		this.cycle=0;
		this.switching = -1;
		this.jumpFrame = 0;
		this.coinPop= 0;
		this.cycleLeft = 0;
	}

	update()
	{
		let ctx = this.canvas.getContext("2d");

		for(let i = 0;i < 5; i++)
		{
			ctx.drawImage(this.backgroundImage, (i*1800) - (this.model.camPos/10), -200);
			ctx.drawImage(this.floorImage, (i*500) - (this.model.camPos/5), 600,1000, 200);
		}
		for(let i = 0; i < this.model.sprites.length; i++)
		{
			let sprite = this.model.sprites[i];
			if(sprite.isMario())
			{
				if (this.switching == -1)
				{
					ctx.drawImage(this.marioPicsRight[this.cycle], 300, sprite.y,sprite.w, sprite.h);
				}
				else if (this.switching == 0)
				{
					ctx.drawImage(this.marioPicsLeft[this.cycleLeft], 300, sprite.y, sprite.w, sprite.h);
				}
				if (this.model.marioRight)
				{
					ctx.drawImage(this.marioPicsRight[this.cycle],300, sprite.y, sprite.w, sprite.h);
					this.cycle++;
					if(this.cycle == 4)
						this.cycle = 0;
						this.switching = -1;
				}
				if (this.model.marioLeft)
				{
					ctx.drawImage(this.marioPicsLeft[this.cycleLeft], 300, sprite.y, sprite.w, sprite.h);
					this.cycleLeft++;
					this.switching = 0;
					if(this.cycleLeft == 4)
						this.cycleLeft = 0;
				}

			}
			else if (sprite.isBrick())
				ctx.drawImage(sprite.image, sprite.x-this.model.camPos, sprite.y, sprite.w, sprite.h);
			else if (sprite.isCoinBlock())
			{
				if (sprite.coinLimit < 5)
					ctx.drawImage(sprite.image, sprite.x-this.model.camPos, sprite.y, sprite.w, sprite.h);
				else
					ctx.drawImage(sprite.emptyImage, sprite.x-this.model.camPos, sprite.y, sprite.w, sprite.h);
			}
			else if (sprite.isCoin())
				ctx.drawImage(sprite.image, sprite.x-this.model.camPos, sprite.y, sprite.w, sprite.h);
		}
	}
}

class Controller
{
	constructor(model, view)
	{
		this.model = model;
		this.view = view;
		this.key_right = false;
		this.key_left = false;
		this.key_up = false;
		this.key_down = false;
		this.keySpace = false;
		this.mouseDownX = 0;
		this.mouseDownY = 0;
		let self = this;
		this.mario = model.mario;
		document.addEventListener('keydown', function(event) { self.keyDown(event); }, false);
		document.addEventListener('keyup', function(event) { self.keyUp(event); }, false);
		document.addEventListener('mouseup', function(event) {self.mouseReleased(event); }, false);
		document.addEventListener('mousedown', function(event) {self.mousePressed(event); }, false);
	}

	mouseReleased(event)
	{
		//console.log("MouseClick");
		let x1 = this.mouseDownX;
		let x2 = event.pageX - this.view.canvas.offsetLeft;
		let y1 = this.mouseDownY;
		let y2 = event.pageY - this.view.canvas.offsetTop;
		let left = Math.min(x1, x2);
		let right = Math.max(x1, x2);
		let top = Math.min(y1, y2);
		let bot = Math.max(y1, y2);
		this.model.addBrick(left + this.model.camPos, top, right - left, bot - top);
	}

	mousePressed(event)
	{
		this.mouseDownX = event.pageX - this.view.canvas.offsetLeft;
		this.mouseDownY = event.pageY - this.view.canvas.offsetTop;
	}

	keyDown(event)
	{
		if(event.keyCode == 39) 
		{
			this.key_right = true;
			this.model.marioRight = true;
		}
		else if(event.keyCode == 37) 
		{
			this.key_left = true;
			this.model.marioLeft = true;
		}
		else if(event.keyCode == 38) 
			this.key_up = true;
		else if(event.keyCode == 40) 
			this.key_down = true;
		else if (event.keyCode == 32) 
			this.keySpace = true;
		
	}

	keyUp(event)
	{
		if(event.keyCode == 39)
		{
			this.key_right = false;
			this.model.marioRight = false;
		}
		else if(event.keyCode == 37) 
		{
			this.model.marioLeft = false;
			this.key_left = false;
		}
		else if(event.keyCode == 38) 
			this.key_up = false;
		else if(event.keyCode == 40) 
			this.key_down = false;
		else if (event.keyCode == 32) 
			this.keySpace = false;
	}

	update()
	{
		this.mario.prevDestination();
		if(this.key_left) 
			this.mario.x -= 10;
		if(this.key_right)
			this.mario.x += 10;
			
		if (this.keySpace)
		{
			if (this.mario.jumpFrame < 5)
			{
				this.mario.vert_vel -= 8.0;
				this.mario.y += this.mario.vert_vel;
			}
		}
	}
}

class Game
{
	constructor()
	{
		this.model = new Model();
		this.view = new View(this.model);
		this.controller = new Controller(this.model, this.view);
	}

	onTimer()
	{
		this.controller.update();
		this.model.update();
		this.view.update();
	}
}


let game = new Game();
let timer = setInterval(function() { game.onTimer(); }, 40);