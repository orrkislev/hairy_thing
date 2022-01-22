




taltals = 0
function taltal(x, y, d, h) {
    taltals++
    let pos = createVector(x, y)
    let v = d.copy().normalize()
    const initialDir = random(-1, 1) * 3
    let dir = initialDir
    h *= random(.5, 1)
    let dirChange = random(-1, 1) * .1

    blendMode(REMOVE)
    strokeWeight(4)
    for (let i = 0; i < h; i++) {
        pos.add(v)
        dir += dirChange
        v.rotate(dir)
        v.rotate((90-v.heading())/10)
        line(pos.x, pos.y, pos.x, pos.y)
    }

    pos = createVector(x, y)
    v = d.copy().normalize()
    dir = initialDir

    strokeWeight(1)
    blendMode(BLEND)
    for (let i = 0; i < h; i++) {
        pos.add(v)
        dir += dirChange
        v.rotate(dir)
        v.rotate((90-v.heading())/10)
        strokeWeight(round(random(1, 3)))
        line(pos.x, pos.y, pos.x, pos.y)
        allDots++
    }
}

function dotV(v) {
    dot(v.x, v.y)
}

let allDots = 0
function dot(x, y, withRemove = true) {
    if (withRemove) {
        blendMode(REMOVE)
        strokeWeight(4)
        line(x, y, x, y)
        blendMode(BLEND)
    }
    strokeWeight(random(1, 2))
    line(x, y, x, y)
    allDots++
}


function getPointOnEllipse(w, h, a) {
    return createVector(w * 0.5 * cos(a), h * 0.5 * sin(a))
}
function getEllipse(w, h, step = 1, s = 0, e = 360) {
    const ps = []
    for (let a = s; a < e; a += step) ps.push(getPointOnEllipse(w, h, a))
    return ps
}

function makeCurve(ps) {
    const newCurve = []
    for (let i = 0; i < ps.length - 1; i++) {
        const curr = ps[i]
        const next = ps[i + 1]
        const l = p5.Vector.dist(curr, next)
        const control1 = i > 0 ? ps[i - 1] : curr
        const control2 = i < ps.length - 2 ? ps[i + 2] : next
        for (let j = 0; j < l; j++) {
            const t = j / l
            const x = curvePoint(control1.x, curr.x, next.x, control2.x, t)
            const y = curvePoint(control1.y, curr.y, next.y, control2.y, t)
            newCurve.push(v(x, y))
        }
    }
    return newCurve
}