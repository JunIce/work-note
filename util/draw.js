class DrawCanvas {
    constructor(ctx) {
        this.ctx = ctx
    }

    drawCircle(x, y, r, start, end , fillColor = '#000') {
        this.ctx.save()
        this.ctx.fillStyle = fillColor
        this.ctx.beginPath()
        this.ctx.arc(x, y, r, start, end )
        this.ctx.fill()
        this.ctx.closePath()
        this.ctx.restore()
    }
    
    drawLine(x, y, start, end , lineWidth = 1, lineCap = 'square', color = '#000') {
        this.ctx.save()
        this.ctx.strokeStyle = color
        this.ctx.lineWidth = lineWidth
        this.ctx.lineCap = lineCap
        this.ctx.beginPath()
        this.ctx.moveTo(x, y)
        this.ctx.lineTo(start, end )
        this.ctx.stroke()
        this.ctx.closePath()
        this.ctx.restore()
    }
    
    drawText(text, x, y) {
        this.ctx.save()
        this.ctx.font = '16px bold 微软雅黑'
        this.ctx.textBaseline="middle"
        this.ctx.textAlign = 'center'
        this.ctx.fillText(text, x, y)
        this.ctx.restore()
    }
}