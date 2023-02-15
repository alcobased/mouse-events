document.addEventListener("DOMContentLoaded", () => {
	addBox(document.body, 50, 50, 10, 10, "red");
	addBox(document.body, 50, 50, 100, 10, "blue");
	addBox(document.body, 50, 50, 10, 100, "green");
	const pairs = getBoxPairs(document.querySelectorAll(".box"));
	console.log(pairs);
	// addButtons(document.body, 3, pairs);

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
	return box;
}

function drawLines(boxes) {

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

function getRandomColor() {
	return `#${(Math.floor(Math.random() * 16777216)).toString(16)}`;
}

function getRandomColorPair() {
	return [getRandomColor(), getRandomColor()];
}

function addButtons(container, count, pairs) {
	for (let i = 0; i < count; i++) {
		const button = document.createElement("button");
		button.innerText = `Pair ${i + 1}`;
		button.addEventListener("click", () => {
			const colors = getRandomColorPair();
			changeColors(pairs[i], colors);
		});
		container.appendChild(button);
	}
}