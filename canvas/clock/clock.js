let canvas = document.querySelector('#clock')
canvas.width = 300
canvas.height = 300

let clock_radius = 150

ctx = canvas.getContext('2d')

let drawUtil = new DrawCanvas(ctx)
ctx.translate(150, 150)


function runClock() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawUtil.drawCircle(0, 0, clock_radius, 0, Math.PI * 2, '#fff')
    drawUtil.drawCircle(0, 0, 6, 0, Math.PI * 2, '#000')

    let hour_deg = Math.PI / 6
    let minute_deg = Math.PI / 30
    let hour_r = 120
    let minute_r = 140

    // drawHourText
    for (let i = 0; i < 12; i++) {
        drawUtil.drawText(i + 1, Math.sin(hour_deg * (i + 1)) * hour_r, - Math.cos(hour_deg * (i + 1)) * hour_r)
    }
    // drawMinuteLine
    for (let i = 0; i < 60; i++) {
        let radius = minute_r
        let color = '#999'
        let lineWidth = 1
        if ((i + 1) % 5 === 0) {
            radius -= 3
            color = '#333'
            lineWidth = 2
        }

        drawUtil.drawLine(Math.sin(minute_deg * (i + 1)) * radius, - Math.cos(minute_deg * (i + 1)) * radius, Math.sin(minute_deg * (i + 1)) * clock_radius, - Math.cos(minute_deg * (i + 1)) * clock_radius, lineWidth, 'square', color)
    }

    let hour_radius = 70
    let hour_line_width = 5
    let minute_radius = 90
    let minute_line_width = 3
    let second_radius = 110
    let second_line_width = 1

    let time = new Date()
    let current_hour_deg = time.getHours() * hour_deg - Math.PI/2
    // let hour_range_per_minute = hour_deg / 60
    let current_minute_deg = time.getMinutes() * minute_deg - Math.PI/2
    let current_seconds_deg = time.getSeconds() * minute_deg - Math.PI/2

    //hours
    drawUtil.drawLine(0, 0, Math.cos(current_hour_deg) * hour_radius, Math.sin(current_hour_deg) * hour_radius, hour_line_width, 'round')
    //minutes
    drawUtil.drawLine(0, 0, Math.cos(current_minute_deg) * minute_radius, Math.sin(current_minute_deg) * minute_radius, minute_line_width, 'round')
    //seconds
    drawUtil.drawLine(0, 0, Math.cos(current_seconds_deg) * second_radius, Math.sin(current_seconds_deg) * second_radius, second_line_width, 'round', 'red')

    // 帧动画
    window.requestAnimationFrame(runClock)
}

runClock()
