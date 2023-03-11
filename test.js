const canvas = document.getElementById('canvas');
		const context = canvas.getContext('2d');
		const spaceship = {
			x: 240,
			y: 240,
			angle: 0,
			speed: 0,
			dead: false
		};
		const obstacle = {
			x: 100,
			y: 100,
			width: 50,
			height: 50
		};

		// handle user input
		document.addEventListener('keydown', function(event) {
			switch (event.keyCode) {
				case 37: // left arrow key
					spaceship.angle -= Math.PI / 30;
					break;
				case 38: // up arrow key
					spaceship.speed = 5;
					break;
				case 39: // right arrow key
					spaceship.angle += Math.PI / 30;
					break;
			}
		});

		// game loop
		setInterval(function() {
			if (!spaceship.dead) {
				// update spaceship position
				spaceship.x += spaceship.speed * Math.cos(spaceship.angle);
				spaceship.y += spaceship.speed * Math.sin(spaceship.angle);

				// check for collision with obstacle
				if (spaceship.x > obstacle.x && spaceship.x < obstacle.x + obstacle.width &&
				    spaceship.y > obstacle.y && spaceship.y < obstacle.y + obstacle.height) {
					spaceship.dead = true;
				}

				// draw game objects
				context.clearRect(0, 0, canvas.width, canvas.height);
				context.fillStyle = 'blue';
				context.beginPath();
				context.arc(spaceship.x, spaceship.y, 10, 0, 2 * Math.PI);
				context.fill();
				context.fillStyle = 'red';
				context.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
			}
		}, 30);