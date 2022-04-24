const shower = document.querySelector(".clock .shower")

const ledWidth = 5, ledHeight = ledWidth

const rowNo = 5,colNo = rowNo

let showerContent = ""
for(let row=0; row < rowNo ; row++){
    showerContent += '<div class="row">'
    for(let col=0 ; col < colNo ; col++)
        showerContent += `<div class="led i${row}j${col}"></div>`
    showerContent += "</div>"
}

shower.innerHTML = showerContent