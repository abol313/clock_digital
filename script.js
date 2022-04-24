const shower = document.querySelector(".clock .shower")

const ledWidth = 5, ledHeight = ledWidth

const rowNo = 20,colNo = rowNo

let showerContent = ""
for(let row=0; row < rowNo ; row++){
    showerContent += '<div class="row">'
    for(let col=0 ; col < colNo ; col++)
        showerContent += `<div class="led i${row}j${col}"></div>`
    showerContent += "</div>"
}

shower.innerHTML = showerContent

function drawLine(x1,y1,x2,y2){
    //ax+b -> linear graph formula
    let a = (y2-y1) / (x2-x1)
    let b = y1 - a*x1
    for(let row=0; row < rowNo ; row++)
        for(let col=0 ; col < colNo ; col++)
            if(x1<=col && col<=x2 && y1<=row && row<=y2 && isPointOnLine(a,b,row,col))
                toggleLed(true,col,row)
}

//toggles off all leds
function clear(){
    for(let row=0; row < rowNo ; row++)
        for(let col=0 ; col < colNo ; col++)
            toggleLed(false,col,row)
}


//returns related boolean value (true / false)
//to that is the point on the line(base of its formula ax+b)
//a : ax+b
//b : ax+b
//x : point x
//y : point y
function isPointOnLine(a,b,x,y){
    return a*x+b == y
}

//mode : true(turn on) / false(turn off)
//x : led x position
//y : led y position
function toggleLed(mode,x,y){
    document.querySelector(`.i${y}j${x}`).style.opacity = mode ? "1" : ".2"
}