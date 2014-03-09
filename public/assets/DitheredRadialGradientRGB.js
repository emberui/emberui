/*
Dan Gries
rectangleworld.com
Nov 19 2012

Uses Floyd-Steinberg dither algorithm.
*/

function DitheredRadialGradient(_x0,_y0,_rad0,_x1,_y1,_rad1) {
	this.x0 = _x0;
	this.y0 = _y0;
	this.x1 = _x1;
	this.y1 = _y1;
	this.rad0 = _rad0;
	this.rad1 = _rad1;
	this.colorStops = [];
}
	
DitheredRadialGradient.prototype.addColorStop = function(ratio,r,g,b) {
	if ((ratio < 0) || (ratio > 1)) {
		return;
	}
	var n;
	var newStop = {ratio:ratio, r:r, g:g, b:b};
	if ((ratio >= 0) && (ratio <= 1)) {
		if (this.colorStops.length == 0) {
			this.colorStops.push(newStop);
		}
		else {
			var i = 0;
			var found = false;
			var len = this.colorStops.length;
			//search for proper place to put stop in order.
			while ((!found) && (i<len)) {
				found = (ratio <= this.colorStops[i].ratio);
				if (!found) {
					i++;
				}
			}
			//add stop - remove next one if duplicate ratio
			if (!found) {
				//place at end
				this.colorStops.push(newStop);
			}
			else {
				if (ratio == this.colorStops[i].ratio) {
					//replace
					this.colorStops.splice(i, 1, newStop);
				}
				else {
					this.colorStops.splice(i, 0, newStop);
				}
			}
		}
	}
}

	
DitheredRadialGradient.prototype.fillRect = function(ctx, rectX0, rectY0, rectW, rectH) {
	
	if (this.colorStops.length == 0) {
		return;
	}
	
	var image = ctx.getImageData(rectX0, rectY0, rectW, rectH);
	var pixelData = image.data;
	var len = pixelData.length;
	var oldpixel, newpixel, nearestValue;
	var quantError;
	var x;
	var y;
	
	var vx = this.x1 - this.x0;
	var vy = this.y1 - this.y0;
	var vMagSquareRecip = 1/(vx*vx+vy*vy);
	var ratio;
	
	var r,g,b;
	var r0,g0,b0,r1,g1,b1;
	var ratio0,ratio1;
	var f;
	var stopNumber;
	var found;
	var q;
	
	var rBuffer = [];
	var gBuffer = [];
	var bBuffer = [];
	var aBuffer = [];
	
	var a,b,c,discrim;
	var dx,dy;
	
	var xDiff = this.x1 - this.x0;
	var yDiff = this.y1 - this.y0;
	var rDiff = this.rad1 - this.rad0;
	a = rDiff*rDiff - xDiff*xDiff - yDiff*yDiff;
	var rConst1 = 2*this.rad0*(this.rad1-this.rad0);
	var r0Square = this.rad0*this.rad0;

 	//first complete color stops with 0 and 1 ratios if not already present
	if (this.colorStops[0].ratio != 0) {
		var newStop = {	ratio:0,
						r: this.colorStops[0].r,
						g: this.colorStops[0].g,
						b: this.colorStops[0].b}
		this.colorStops.splice(0,0,newStop);
	}
	if (this.colorStops[this.colorStops.length-1].ratio != 1) {
		var newStop = {	ratio:1,
						r: this.colorStops[this.colorStops.length-1].r,
						g: this.colorStops[this.colorStops.length-1].g,
						b: this.colorStops[this.colorStops.length-1].b}
		this.colorStops.push(newStop);
	}

	//create float valued gradient
	for (i = 0; i<len/4; i++) {
		
		x = rectX0 + (i % rectW);
		y = rectY0 + Math.floor(i/rectW);
		
		dx = x - this.x0;
		dy = y - this.y0;
		b = rConst1 + 2*(dx*xDiff + dy*yDiff);
		c = r0Square - dx*dx - dy*dy;
		discrim = b*b-4*a*c;
		
		if (discrim >= 0) {
			ratio = (-b + Math.sqrt(discrim))/(2*a);
		
			if (ratio < 0) {
				ratio = 0;
			}
			else if (ratio > 1) {
				ratio = 1;
			}
			
			//find out what two stops this is between
			if (ratio == 1) {
				stopNumber = this.colorStops.length-1;
			}
			else {
				stopNumber = 0;
				found = false;
				while (!found) {
					found = (ratio < this.colorStops[stopNumber].ratio);
					if (!found) {
						stopNumber++;
					}
				}
			}
			
			//calculate color.
			r0 = this.colorStops[stopNumber-1].r;
			g0 = this.colorStops[stopNumber-1].g;
			b0 = this.colorStops[stopNumber-1].b;
			r1 = this.colorStops[stopNumber].r;
			g1 = this.colorStops[stopNumber].g;
			b1 = this.colorStops[stopNumber].b;
			ratio0 = this.colorStops[stopNumber-1].ratio;
			ratio1 = this.colorStops[stopNumber].ratio;
				
			f = (ratio-ratio0)/(ratio1-ratio0);
			r = r0 + (r1 - r0)*f;
			g = g0 + (g1 - g0)*f;
			b = b0 + (b1 - b0)*f;
		}
		
		else {
			r = r0;
			g = g0;
			b = b0;
		}
		
		//set color as float values in buffer arrays
		rBuffer.push(r);
		gBuffer.push(g);
		bBuffer.push(b);
	}
	
	//While converting floats to integer valued color values, apply Floyd-Steinberg dither.
	for (i = 0; i<len/4; i++) {
		nearestValue = ~~(rBuffer[i]);
		quantError =rBuffer[i] - nearestValue;
		rBuffer[i+1] += 7/16*quantError;
		rBuffer[i-1+rectW] += 3/16*quantError;
		rBuffer[i + rectW] += 5/16*quantError;
		rBuffer[i+1 + rectW] += 1/16*quantError;
		
		nearestValue = ~~(gBuffer[i]);
		quantError =gBuffer[i] - nearestValue;
		gBuffer[i+1] += 7/16*quantError;
		gBuffer[i-1+rectW] += 3/16*quantError;
		gBuffer[i + rectW] += 5/16*quantError;
		gBuffer[i+1 + rectW] += 1/16*quantError;
		
		nearestValue = ~~(bBuffer[i]);
		quantError =bBuffer[i] - nearestValue;
		bBuffer[i+1] += 7/16*quantError;
		bBuffer[i-1+rectW] += 3/16*quantError;
		bBuffer[i + rectW] += 5/16*quantError;
		bBuffer[i+1 + rectW] += 1/16*quantError;
	}
		
	//copy to pixel data
	for (i=0; i<len; i += 4) {
		q = i/4;
		pixelData[i] = ~~rBuffer[q];
		pixelData[i+1] = ~~gBuffer[q];
		pixelData[i+2] = ~~bBuffer[q];
		pixelData[i+3] = 255;		
	}
	
	ctx.putImageData(image,rectX0,rectY0);
	
}
