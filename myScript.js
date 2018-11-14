
var maps = [{"Sprites":[{"Category":"Mario","x":-20,"y":500,"w":60,"h":95},{"x":700,"y":100,"w":89,"h":83,"Category":"CoinBlock"},{"x":1400,"y":100,"w":89,"h":83,"Category":"CoinBlock"},{"x":2100,"y":100,"w":89,"h":83,"Category":"CoinBlock"},{"x":1050,"y":200,"w":113,"h":240,"Category":"Brick"},{"x":1680,"y":529,"w":106,"h":79,"Category":"Brick"},{"x":2371,"y":558,"w":87,"h":10,"Category":"Brick"},{"x":88,"y":320,"w":187,"h":125,"Category":"Brick"},{"x":375,"y":300,"w":122,"h":198,"Category":"Brick"},{"x":61,"y":306,"w":114,"h":98,"Category":"Brick"},{"x":664,"y":130,"w":75,"h":75,"Category":"Coin"}]}]

console.log(maps[0].Sprites)



class Sprite
{
	constructor(x, y,w,h, image_url, model)
	{
		this.mario_imagesRight = [];
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.image = new Image();
		this.vert_vel = 0;
		this.image.src = image_url;
		this.model = model;
		//this.move = move_method;
		
		//this. refers to this class's variable
	}

	set_destination(x, y)
	{
		this.dest_x = x;
		this.dest_y = y;
	}

	ignore_click(x, y)
	{
	}

	move(dx, dy)
	{
		this.dest_x = this.x + dx;
		this.dest_y = this.y + dy;
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

	update() 
	{

	}

	checkCollision(model, mario, sprite)
	{
		if (mario.x + mario.w < sprite.x)
		{
			return false;
		}
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
				sprite.coinLimit++;
				if(sprite.coinLimit<=5)
					model.addCoin(sprite.x, sprite.y, 75, 75);
				//console.log(sprite.coinLimit);
			}
        }

	}

	sit_still()
	{
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
class Mario extends Sprite
{
    constructor(x, y,w,h, image_url, model)
    {
		super(x, y,w,h, image_url,model);
		this.prev_X = 0;
		this.prev_Y = 0;
		this.vert_vel = 0;
		this.jumpFrame = 0;
		this.coinPop = 0;

	}
	update()
	{
		this.model.camPos = this.x - 300;
		if (this.y < 300) //Gravity
		{
			this.vert_vel += 2.1;
			this.y += this.vert_vel;
		}
		else if (this.y >= 300) //Stops gravity
		{
			this.jumpFrame = 0;
			this.y = 300;
			this.vert_vel = 0.0;
		}
		this.jumpFrame++;
	}

	prevdestination()
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
}
class Coin extends Sprite
{
	constructor(x, y, w, h, image_url, model)
	{
		super(x, y, w , h, image_url, model);
		this.moveCoinX = Math.floor( Math.random()*10);
		console.log(this.moveCoinX);
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
	update()
	{
		
		if (this.y < 300)
		{
			this.vert_vel += 1.2;
			this.y += this.vert_vel;

			this.vert_vel+= 2.1;

			this.y+=this.vert_vel;
			if (this.moveCoinX <=5)
				this.x+= this.moveCoinX+5;
			else
				this.x-= this.moveCoinX;
		}

		if (this.y >= 300)
		{
			this.y = 300;
			this.model.removeCoin(this);
		}
	}
	isCoin()
	{
		return true;
	}
}
class Model
{
	constructor()
	{
		this.camPos=0;
		this.sprites = [];
		//this.sprites.push(new Sprite(0, 100, 51, 46, "lettuce.png", this));
		this.mario = new Mario(300,300,65,90, "mariofrontwards1.png", this);
		// this.brick = new Brick(300, 0, "dirtGround.png", 0, 0 , this);
		this.sprites.push(this.mario);
		// this.sprites.push(this.brick);
		this.marioRight = false;

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
		//console.log(this.coin);
	}

	update()
	{
		//console.log(this.sprites);

		for(let i = 0; i < this.sprites.length; i++)
		{
			let s = this.sprites[i];
			if (s.isBrick())
			{
				if(s.checkCollision(this, this.mario, s));
			}
			if (s.isCoinBlock())
			{
				if(s.checkCollision(this, this.mario, s));
			}
			s.update();

			console.log(this.mario.x);
		}

	}

	move(dx, dy)
	{
		this.sprites.move(dx, dy);
	}	
}

class View
{
	constructor(model)
	{
		this.model = model;
		this.canvas = document.getElementById("myCanvas");
		this.marioPics= [];
		this.marioSource = ["mariofrontwards1.png", "mariofrontwards2.png", "mariofrontwards3.png", "mariofrontwards4.png", "mariofrontwards5.png"];
		for (let i = 0; i < 5; i++)
		{
			this.marioPics.push(new Image());
			this.marioPics[i].src = this.marioSource[i];
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
	}

	update()
	{
		let ctx = this.canvas.getContext("2d");
		ctx.clearRect(0, 0, 1000, 500);

		for(let i = 0;i < 5; i++)
		{
			ctx.drawImage(this.backgroundImage, (i*1800) - (this.model.camPos/10), -200);
			ctx.drawImage(this.floorImage, (i*500) - (this.model.camPos/5), 400, 1000, 200);
		}
		for(let i = 0; i < this.model.sprites.length; i++)
		{
			let sprite = this.model.sprites[i];
			if(sprite.isMario())
			{
				if (this.switching == -1)
					ctx.drawImage(this.marioPics[this.cycle], 300, sprite.y,sprite.w, sprite.h);
				if (this.model.marioRight)
				{
					ctx.drawImage(this.marioPics[this.cycle],300, sprite.y, sprite.w, sprite.h);
					this.cycle++;
					if(this.cycle == 4)
					{
						this.cycle = 0;
					}
				}

			}
			else if (sprite.isBrick()){
				ctx.drawImage(sprite.image, sprite.x-this.model.camPos, sprite.y, sprite.w, sprite.h);
			}
			else if (sprite.isCoinBlock())
			{
				if (sprite.coinLimit < 5){
					ctx.drawImage(sprite.image, sprite.x-this.model.camPos, sprite.y, sprite.w, sprite.h);
					//sprite.coinLimit++;
				}
				else
					ctx.drawImage(sprite.emptyImage, sprite.x-this.model.camPos, sprite.y, sprite.w, sprite.h);
			}
			else if (sprite.isCoin()){
				//console.log("DRAWING A COIN");
				//console.log(sprite.image);
				//console.log(sprite.y);
				ctx.drawImage(sprite.image, sprite.x-this.model.camPos, sprite.y, sprite.w, sprite.h);
			}
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

	mousePressed(event)
	{
		this.mouseDownX = event.pageX - this.view.canvas.offsetLeft;
		this.mouseDownY = event.pageY - this.view.canvas.offsetTop;
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
		//console.log("CamPos" + this.model.camPos);
		this.model.addBrick(left + this.model.camPos, top, right - left, bot - top);
	}



	keyDown(event)
	{
		if(event.keyCode == 39) 
		{
			this.key_right = true;
			this.model.marioRight = true;
		}
		else if(event.keyCode == 37) this.key_left = true;
		else if(event.keyCode == 38) this.key_up = true;
		else if(event.keyCode == 40) this.key_down = true;
		else if (event.keyCode == 32){
			this.keySpace = true;
		} 
	}

	keyUp(event)
	{
		if(event.keyCode == 39){

		 this.key_right = false;
		 this.model.marioRight = false;
		}
		else if(event.keyCode == 37) this.key_left = false;
		else if(event.keyCode == 38) this.key_up = false;
		else if(event.keyCode == 40) this.key_down = false;
		else if (event.keyCode == 32) this.keySpace = false;
	}

	update()
	{

		this.mario.prevdestination();

		if(this.key_left) 
		{
			this.mario.x -= 10;
		}
		if(this.key_right)
		{
			this.mario.x += 10;
		}
		if (this.keySpace)
		{
			//console.log("SPACE");
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