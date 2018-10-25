const bigR = 200
const maxFrameCount = 100000
let colored = false
let counter = 0

function setup() {
    createCanvas(windowWidth, windowHeight)
	background(255)
	document.getElementById('restart').addEventListener("click", function(){
		counter = 0
	})
}

function getFrameCount() {
	return counter % maxFrameCount
}

function draw() {
	background(255)
	counter += 1
	let k1 = document.getElementById('k1').value
	let k = Math.floor(getFrameCount() / Math.min(k1 || 1), 1)
	colored = document.getElementById('colored').checked
	//renderAll(calculateAllCircles(bigR, k))
	drawAllCircles(bigR, k, drawCircle)
	// drawCircleOfCirclesK(windowWidth/2, windowHeight/2, bigR, k)
}

function drawAllCircles(radius, k, renderFn) {
	calculateAllCircles(windowWidth/2, windowHeight/2, bigR, k, drawCircleOfCircles).forEach(function(fn) {
		fn();
	});
}

function drawCircleOfCircles(x, y, rad) {
	let k = Math.floor(getFrameCount() / 10)
	calculateAllCircles(x, y, bigR, k, drawCircle).forEach(function(fn) {
		fn();
	});
}

/*
function drawCircleOfCirclesK(x, y, rad, k) {
	if (k > 1) {
		function drawCirclesK(nx, ny, nrad) {
			drawCircleOfCirclesK(nx, ny, nrad, k / 2)
		}

		calculateAllCircles(x, y, rad, k, drawCirclesK).forEach(function(fn) {
			fn();
		});
	} else {
		drawCircle(x, y, rad);
	}
}
*/

function calculateAllCircles(x, y, radius, k, renderFn) {
	const calculatedCircles = []
	for(let i = 0; i < k ; i++){
		const angle = i*2*Math.PI/k + Math.PI/2
		const newRad = 2*Math.PI*radius/k 
		const newX = x + Math.cos(angle) * radius
		const newY = y + Math.sin(angle) * radius
		//const newC = new Circle(newX, newY, newRad)
		calculatedCircles.push(function() {
			renderFn(newX, newY, newRad);
		});
	}
	return calculatedCircles
}


function drawCircle (x,y,r) {
	noFill()
	var relX = x - windowWidth / 2
	var relY = y - windowHeight / 2
	const hue = Math.floor(Math.sqrt(relX*relX + relY*relY))
	if (colored)
		stroke(color(`hsla(${hue}, 100%, 50%, 1)`))
	else
		stroke(0, 0, 0)
	ellipse(x, y, r, r)
}
