
let WIDTH = 800,HEIGHT = 600

let canvas = document.querySelector('#chart')
let ctx = canvas.getContext('2d')

canvas.width = WIDTH
canvas.height = HEIGHT

let util = new DrawCanvas(ctx)

// 设置坐标
ctx.translate(0, 550)


util.drawText("折线图", 50, -500)

// x轴
let xAxisLength = 750
util.drawLine(xAxisLength, 0 ,50 ,0, 1)

for(let i = 0; i < 7; i++){
    util.drawLine(xAxisLength/8*i + 120, -5 ,xAxisLength/8*i + 120 ,0, 1)
    util.drawText("星期"+(i+1), xAxisLength/8*i + 120, 15)
}


// y轴
let yAxisLength = 550

for(let i = 0; i < 5; i++){
    util.drawText((i+1)*100, 30, (xAxisLength/8*i + 50)*-1)
}

// data
let data = [300, 230, 400, 100, 420, 380, 320]

data.forEach((item, i) => {
    util.drawCircle(xAxisLength/8*i + 120, item * -1, 3)
    if(data[i+1]){
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(xAxisLength/8*i + 120, item * -1)
        ctx.lineTo(xAxisLength/8*(i+1) + 120, data[i+1] * -1)
        ctx.stroke()
        ctx.closePath()
        ctx.restore()
    }
})


