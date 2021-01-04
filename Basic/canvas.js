const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');

const cursor = {
	x: 0,
	y: 0,
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// EVENT LISTENER
window.addEventListener('mousemove', (e) => {
	cursor.x = e.x;
	cursor.y = e.y;
})

window.onload = () => {
	main();
}


window.onresize = () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}


function draw() {
	//Rectangle
	c.fillStyle = 'rgba(255, 0, 0, 0.5)';
	c.fillRect(100, 100, 100, 100);
	c.fillStyle = 'rgba(0, 255, 0, 0.5)';
	c.fillRect(300, 100, 100, 100);
	c.fillStyle = 'rgba(0, 0, 255, 0.5)';
	c.fillRect(500, 100, 100, 100);
	c.strokeRect(450, 50, 200, 200);

	// c.clearRect(100, 100, 100, 100);   // clears rectangle at given x, y


	//Line
	c.beginPath();
	c.moveTo(50, 50);
	c.lineTo(50, 250);
	c.lineTo(250, 250);
	c.lineTo(250, 50);
	// c.lineTo(50, 50);
	c.closePath();                     // draws a line form current point to initial point
	c.strokeStyle = "#ff0088";
	c.stroke();


	//Arc - Circle
	// c.beginPath();
	// c.arc(350, 400, 100, 0, 2*Math.PI, false);
	// c.stroke();

	// c.beginPath();
	// c.arc(350, 400, 50, 0, 2*Math.PI, false);
	// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
	// c.fill();

	const colorIn = ['rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(0, 0, 255, 0.5)'];
	const colorOut = ['rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(0, 0, 255, 0.5)'];

	for(var i=0; i<3; i++) {
		c.beginPath();
		c.arc(150 + i*200, 400, 90, 0, 2*Math.PI, false);
		c.lineWidth = 8;
		c.strokeStyle = colorOut[i];
		c.stroke();

		c.beginPath();
		c.arc(150 + i*200, 400, 45, 0, 2*Math.PI, false);
		c.fillStyle = colorIn[i];
		c.fill();
	}
}



let radius = 30,
	x = Math.random() * (innerWidth - 2*radius) + radius,
	y = Math.random() * (innerHeight - 2*radius) + radius, 
	dx=4, 
	dy=4;  
	alpha=1;

function animate() {
	requestAnimationFrame(animate);

	c.clearRect(0, 0, innerWidth, innerHeight);

	c.beginPath();
	c.arc(x, y, radius, 0, 2*Math.PI, false);
	c.fillStyle = 'red';
	c.fill();

	if (x > window.innerWidth-radius || x < radius) {
		dx *= -alpha;
	};

	if (y > window.innerHeight-radius || y < radius) {
		dy *= -alpha;
	}

	x += dx;
	y += dy;


	// if( ((cursor.x - x) ** 2 + (cursor.y - y) ** 2) ** .5 < 50 ) {
	// 	console.log(cursor.x, cursor.y);
	// 	radius += 1; 
	// } else {
	// 	radius = 30;
	// }

	if ( cursor.x - x < 50 && cursor.x - x > -50 && cursor.y - y < 50 && cursor.y - y > -50) {
		if(radius < 60) {
			radius += 2;
		}
	} else if(radius >= 10){
		radius -= 2;
	}

}


function main() {
	// draw();

	animate();
}