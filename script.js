document.addEventListener("DOMContentLoaded", () => {
	addBox(document.body, 50, 50, 10, 10, "red");
	addBox(document.body, 50, 50, 100, 10, "blue");
	addBox(document.body, 50, 50,  10, 100, "green");
	console.log(document.querySelectorAll(".box"));
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
	const boxPairs = [];
	for (const box1 in boxes) {
		for (const box2 in boxes) {
			if (box1 != box2) {
				boxPairs.push([box1, box2]);
			}
		}
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