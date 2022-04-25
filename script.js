/*<!--In the name of kindly generous ALLAH
Thanks ALLAH-->
 */

const shower = document.querySelector(".clock .shower")
const letter = document.querySelector(".clock .letter .content")
const themes = document.querySelectorAll(".themes .item")

const ledWidth = 5, ledHeight = ledWidth

const rowNo = 31, colNo = rowNo

let cX = parseInt((colNo - 1) / 2)
let cY = parseInt((rowNo - 1) / 2)
cX = Math.max(0, Math.min(colNo - 1, cX))
cY = Math.max(0, Math.min(rowNo - 1, cY))

const radius = colNo/2

let showerContent = ""
for (let row = 0; row < rowNo; row++) {
    showerContent += '<div class="row">'
    for (let col = 0; col < colNo; col++)
        showerContent += `<div class="led i${row}j${col}"></div>`
    showerContent += "</div>"
}

shower.innerHTML = showerContent

function drawLine(x1, y1, x2, y2, strict = .5) {
    //ax+b -> linear graph formula

    let a = (y2 - y1) / (x2 - x1);
    // if(x2-x1==0 || y2-y1==0)
    //     a = 0;

    let b = y1 - a * x1

    const minX = Math.min(x1, x2), maxX = Math.max(x1, x2)
    const minY = Math.min(y1, y2), maxY = Math.max(y1, y2)
    for (let row = 0; row < rowNo; row++)
        for (let col = 0; col < colNo; col++) {
            let toggled = true
            toggled &&= minX <= col && col <= maxX
            toggled &&= minY <= row && row <= maxY
            toggled &&= isPointOnLine(a, b, col, row, x1, y1, x2, y2, strict)
            if (toggled)
                toggleLed(toggled, col, row)
        }
}

//toggles off all leds
function clear() {
    for (let row = 0; row < rowNo; row++)
        for (let col = 0; col < colNo; col++)
            toggleLed(false, col, row)
    drawClockBase()
}

function drawClockBase() {
    for (let row = 0; row < rowNo; row++) {
        for (let col = 0; col < colNo; col++) {
            let toggeled = false;
            toggeled ||= Math.abs(Math.sqrt((col - cX) ** 2 + (row - cY) ** 2) - (colNo - 1) / 2) <= .5
            if (toggeled)
                toggleLed(1, col, row)
        }
    }
}

//returns related boolean value (true / false)
//to that is the point on the line(base of its formula ax+b)
//a : ax+b
//b : ax+b
//x : point x
//y : point y
function isPointOnLine(a, b, x, y, lx1, ly1, lx2, ly2, strict) {
    // console.log('----',a,b,x,y)
    return getPointDistToLine(x, y, lx1, ly1, lx2, ly2) <= strict
    if (Math.abs(a) == Infinity) return x == x1
    return a * x + b == y
}


//returns dist of point related to line (vertically to line)
// px : point x
// py : point y
// lx2 : line point 2 x
// ly2 : line point 2 y
// lx1 : line point 1 x
// ly1 : line point 1 y
function getPointDistToLine(px, py, lx1, ly1, lx2, ly2) {
    let deltaDeg = (Math.atan2(ly2 - ly1, lx2 - lx1) - Math.atan2(ly2 - py, lx2 - px))
    let distToL2 = Math.sqrt((ly2 - py) ** 2 + (lx2 - px) ** 2)
    return Math.abs(Math.sin(deltaDeg) * distToL2)
}
//mode : true(turn on) / false(turn off)
//x : led x position
//y : led y position
function toggleLed(mode, x, y) {
    document.querySelector(`.i${y}j${x}`).style.opacity = mode ? "1" : ".2"
}

//draw time on shower
//h : hour
//m : minute
//s : second
function showTime(h, m, s) {
    clear()
    showHand(h%12+m/60,12,radius/7*4)
    showHand(m,60,radius/3*2)
    showHand(s,60,radius-3.5)
}

//write time on letter
//h : hour
//m : minute
//s : second
function writeTime(h, m, s) {
    letter.innerHTML = `${(h+"").padStart(2,"0")} : ${(m+"").padStart(2,"0")} : ${(s+"").padStart(2,"0")}`
}
function showHand(val, max, width) {
    val = val % max
    //center point of clock
    let hX = parseInt(cX + Math.cos(val / (max / 2) * Math.PI - Math.PI/2 ) * width), hY = parseInt(cY + Math.sin(val / (max / 2) * Math.PI - Math.PI/2) * width)

    hY = Math.max(0, Math.min(rowNo - 1, hY))
    hX = Math.max(0, Math.min(colNo - 1, hX))

    //console.log(cX, cY, hX, hY)
    drawLine(cX, cY, hX, hY)
}


// to test
let inter
function start() {
    let deg = 0
    inter = setInterval(() => {
        clear()
        let date = new Date();
        let h = date.getHours()
        let m = date.getMinutes()
        let s = date.getSeconds()
        showTime(h,m,s)
        writeTime(h,m,s)
    }, 1000)
}
//to stop clock
function stop() {
    clearInterval(inter)
}

//turn on clock !!!
start()


function disableAllThemes(){
    for(let theme of themes)
        theme.className = theme.className.replace(" enabled","")
}
function enableTheme(color){
    document.body.style.setProperty("--theme-color",""+color);
}


for(let theme of themes){
    //theme.setAttribute("disabled","")
    let color = theme.classList[1]
    theme.style.setProperty("--bg-color",color)
    document.body.style.setProperty("--theme-color",color)
    theme.addEventListener("click",()=>{
        disableAllThemes()
        enableTheme(color)
        theme.className = theme.className.replace(" enabled","") + " enabled"
    })
}