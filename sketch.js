/// <reference path="./p5.global-mode.d.ts" />

document.oncontextmenu = function () {
    return false;
}

const random = (a = 1, b = 0) => fxrand() * (b - a) + a
const round_random = (a = 1, b = 0) => floor(random(a, b + 1))
const choose = (arr) => arr[Math.floor(random(arr.length))]

const colors = ['#582f0e', '#03071e', '#ae2012', '#081c15']

function setup() {
    createCanvas(1000, 1000);
    angleMode(DEGREES)
    noFill()
    stroke(choose(colors) + "88")

    makeThings()
    edit()
}

function keyPressed() {
    if (keyCode == 49) edit()
    if (keyCode == 50) view()

}

function view() {
    state = 'view'
    clear()
    const c1 = color(choose(colors)+"88")
    const c2 = color(choose(colors)+"88")
    things.forEach(t => t.color1 = c1)
    things.forEach(t => t.color2 = c2)
    things.forEach(t => t.showHair())
    addBG()
}

function edit() {
    strokeWeight(1)
    stroke(0)
    state = 'edit'
}

function draw() {
    if (state == 'edit') {
        background(220)
        things.forEach(t => t.drawEdit())
    } else {
        things.forEach(t => t.drawHair())
    }
}
function doubleClicked() { 
    things.forEach(t => t.doubleClick()) 
    let selected = false
    things.forEach(t => { if (t.selected!=null) selected = true })
    if (!selected) {
        const t = new Thing()
        t.ps = [v(mouseX,mouseY)]
    }
}
function mousePressed() { things.forEach(t => t.mouseDown(mouseButton)) }
function mouseDragged() { things.forEach(t => t.mouseDragged()) }
function mouseWheel(event) {
    things.forEach(t => t.mouseWheel(Math.sign(event.delta)))
    return false
}

function addBG() {
    const p = get()
    background(220)
    image(p, 0, 0)
}



function v(x, y) {
    return createVector(x, y)
}