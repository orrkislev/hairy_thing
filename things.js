
things = []
class Thing {
    constructor() {
        this.ps = []
        this.r1 = 30; this.r2 = 0
        this.color1 = null; this.color2 = null
        this.density = 50
        this.hairLength = 50
        things.push(this)
    }
    drawEdit() {
        this.selected = null
        this.ps.forEach((p, i) => {
            const r = this.ps.length > 1 ? lerp(this.r1, this.r2, i / (this.ps.length - 1)) + 10 : this.r1
            if (abs(mouseX - p.x) < r && abs(mouseY - p.y) < r) {
                this.selected = i
                if (i==0 || i==this.ps.length-1) text(r,p.x,p.y-r)
                fill(255, 255, 0, 100)
            } else noFill()
            circle(p.x, p.y, r * 2)
        })
        for (let i = 0; i < this.ps.length - 1; i++) {
            line(this.ps[i].x, this.ps[i].y, this.ps[i + 1].x, this.ps[i + 1].y)
        }
    }
    mouseDown(mouseButton) {
        if (state == 'edit' && this.selected != null) {
            if (mouseButton == 'left') this.dragOffset = p5.Vector.sub(v(mouseX, mouseY), this.ps[this.selected])
            if (mouseButton == 'right') {
                if (this.ps.length > 1) this.ps.splice(this.selected, 1)
                else things.splice(things.indexOf(this), 1)
            }
        }

    }
    mouseDragged() {
        if (state == 'edit' && this.selected != null) {
            this.ps[this.selected].x = mouseX - this.dragOffset.x
            this.ps[this.selected].y = mouseY - this.dragOffset.y
        }
    }
    doubleClick() {
        if (state == 'edit' && this.selected != null) {
            if (this.selected == 0) this.ps = [this.ps[0].copy().add(0, -50), ...this.ps]
            else if (this.selected == this.ps.length - 1) this.ps.push(this.ps[this.selected].copy().add(0, 50))
        }
    }

    mouseWheel(dir) {
        if (state == 'edit' && this.selected != null) {
            if (this.selected == 0) this.r1 = max(this.r1 - dir, 5)
            if (this.selected == this.ps.length - 1) this.r2 = max(this.r2 - dir, 5)
        }
    }

    edit() { }

    showHair() {
        this.taltals = []
        const crv = makeCurve(this.ps)
        for (let i = crv.length - 2; i > 0; i -= 5) {
            const crvDir = p5.Vector.sub(crv[i + 1], crv[i])
            const sideDir = crvDir.copy().rotate(90).normalize()
            const r = map(i, 0, crv.length, this.r1, this.r2)
            for (let j = 0; j < this.density; j++) {
                const l = random(-r, r)
                let x = crv[i].x + sideDir.x * l
                let y = crv[i].y + sideDir.y * l

                let c= null
                if (this.color1) c = lerpColor(this.color1, this.color2, i / crv.length + random(-.3, .3))
                this.taltals.push({ x: x, y: y, dir: crvDir, l: this.hairLength, color:c})
            }
        }

        for (let j = 0; j < this.density * 8; j++) {
            let a = random(360)
            let r = random(-this.r1, this.r1)
            const d = p5.Vector.fromAngle(a).setMag(r)
            let x = crv[0].x + d.x
            let y = crv[0].y + d.y
            this.taltals.push({ x: x, y: y, dir: v(d.x, d.y).rotate(random(-30, 30)), l: this.hairLength })
        }
    }

    drawHair() {
        for (let i = 0; i < 25; i++) {
            if (this.taltals.length > 0) {
                const data = this.taltals.shift()
                if (data.color) stroke(data.color)
                taltal(data.x, data.y, data.dir, data.l)
            }
        }
    }
}





function makeThings() {
    // left Arm
    t = new Thing()
    t.ps = [v(457, 310), v(437, 486), v(382, 604), v(379, 651)]

    // left leg
    t = new Thing()
    t.ps = [v(481, 464), v(484, 695), v(518, 855), v(517, 934)]

    // body
    t = new Thing()
    t.ps = [v(439, 205), v(546, 287), v(519, 542)]

    // right leg
    t = new Thing()
    t.ps = [v(565, 511), v(558, 712), v(665, 830), v(674, 930)]

    // right arm
    t = new Thing()
    t.ps = [v(613, 295), v(689, 424), v(691, 582), v(697, 633)]
}
