let connectedBoxes = [];
let connectionSwitch = false;
let activeBoxPair = [];
document.addEventListener("DOMContentLoaded", () => {
	const container = document.querySelector("#container");
	addBoxes(container, 5, 50, 50, 20, 20, 10);
	addConnectionButton(container, 200, 50, "Start connection", 20, 200);
	createCanvasAndGetContext(container);
});

function addBox(container, width, height, posX, posY, color) {
	const box = container.appendChild(getBox(width, height, posX, posY, color));
	let dragEnabled = false;
	box.addEventListener("mousedown", (e) => {
		e.preventDefault();
		dragEnabled = true;
	});
	document.addEventListener("mouseup", (e) => {
		e.preventDefault();
		dragEnabled = false;
	})
	document.addEventListener("mousemove", (e) => {
		if (e.buttons == 1 && dragEnabled) {
			moveElement(box, e.clientX - width / 2, e.clientY - height / 2);
		}
	});
	box.addEventListener("click", (e) => {
		if (connectionSwitch) {
			activeBoxPair.push(e.target);
			if (activeBoxPair.length == 2) {
				connectedBoxes.push(activeBoxPair.concat());
				activeBoxPair.length = 0;
			}
		}
	});
	return box;
}

function addBoxes(container, boxCount, width, height, startX, startY, space) {
	const boxes = [];
	for (let i = 0; i < boxCount; i++) {
		const color = getRandomColor();
		console.log(i, color);
		boxes.push(addBox(container, width, height, startX + i * (width + space), startY, color));
	}
	return boxes;
}

function getBoxPairs(boxes) {
	const boxPairs = {};
	for (const box of boxes) {
		console.log(`box: ${box}`);
		let other_boxes = [];
		for (const other_box of boxes) {
			if (box != other_box) {
				other_boxes.push(other_box);
			}
		}
		boxPairs.box = other_boxes;
	}
	return boxPairs;
}

function moveElement(element, left, top) {
	element.style.left = `${left}px`;
	element.style.top = `${top}px`;
}

function getBox(width, height, posX, posY, color) {
	const box = document.createElement("div");
	box.classList.add("box");
	box.style.width = `${width}px`;
	box.style.height = `${height}px`;
	box.style.position = "absolute";
	box.style.left = `${posX}px`;
	box.style.top = `${posY}px`;
	box.style.backgroundColor = color;
	return box
}

function changeColor(box, color) {
	box.style.backgroundColor = color;
}

function changeColors(boxes, colors) {
	for (let i = 0; i < boxes.length; i++) {
		changeColor(boxes[i], colors[i]);
	}
}

function changeColorsRandom(boxes) {
	for (const box of boxes) {
		changeColor(box, getRandomColor());
	}
}

function getRandomColor() {
	const rgbComp = getRandomRGBComponents();
	return `rgb(${rgbComp[0]}, ${rgbComp[1]}, ${rgbComp[2]})`;
}

function getRandomRGBComponents() {
	const rgbComponenets = new Array(3);
	for (let i = 0; i < 3; i++) {
		rgbComponenets[i] = Math.floor(Math.random() * 256);
	}
	return rgbComponenets;
}

function addConnectionButton(container, width, height, text, posX, posY) {
	const button = document.createElement("button");
	button.style.width = `${width}px`;
	button.style.height = `${height}px`;
	button.style.position = "absolute";
	button.style.left = `${posX}px`;
	button.style.top = `${posY}px`;
	button.innerText = text;
	button.type = "button";
	setConnectionButtonColor(button);
	button.addEventListener("click", (e) => {
		connectionSwitch = !connectionSwitch;
		setConnectionButtonColor(e.target);
	});
	container.appendChild(button);
	return button;
}

function setConnectionButtonColor(button) {
	button.style.backgroundColor = connectionSwitch ? "palegreen" : "palevioletred";
}

// function drawBoxConnections() {
// 	for (const pair of connectedBoxes) {
		
// 	}
// }

function createCanvasAndGetContext(container) {
	const canvas = document.createElement("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	container.appendChild(canvas);
	const ctx = canvas.getContext("2d");

	ctx.fillStyle = "green";
	ctx.fillRect(10, 10, 300, 300);
}
