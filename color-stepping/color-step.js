'use strict'
document.addEventListener("DOMContentLoaded", function(event) {
    const canvas = document.getElementById('atlas');
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.antialias = false;
    canvas.setAttribute('width', canvas.width + 'px')
    canvas.setAttribute('height', canvas.height + 'px')
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);
    generateImage(ctx);
    canvas.addEventListener('click', function (evt) {
        generateImage(ctx);
    });
});

function updateSize(elem) {
    const canvas = document.getElementById('atlas');
    if (elem.name === 'orientation') {
        let oldWidth = canvas.width;
        canvas.setAttribute('width', canvas.height + 'px');
        canvas.setAttribute('height', oldWidth + 'px');
        canvas.dataset.orientation = elem.value;
    } else if (elem.name === 'resolution') {
        let resolution = elem.value.split('-');
        if (canvas.dataset.orientation === 'V') {
            resolution = resolution.reverse();
        }
        canvas.setAttribute('width', resolution[0] + 'px')
        canvas.setAttribute('height', resolution[1] + 'px')
    }
    generateImage(canvas.getContext('2d'));
}

function generateImage(ctx, step = 20) {
    ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height)
    let imageData = ctx.getImageData(0,0, ctx.canvas.width, ctx.canvas.height);
    const w = ctx.canvas.width * 4;
    for (let i = 0; i < w; i+=4) {
        let rgbColor = (Math.random() * 16777215) | 0;
        imageData.data[i] = rgbColor >> 16;
        imageData.data[i + 1] = (rgbColor >> 8) % 256;
        imageData.data[i + 2] = rgbColor % 256;
    }
    for (let i = 0; i < w; i+=4) {
        for (let j = i + w; j < imageData.data.length; j += w) {
            let percent = ((Math.random() * step * 2) - step) / 100 + 1;
            imageData.data[j] = imageData.data[j - w] * percent;
            imageData.data[j + 1] = imageData.data[j - w + 1] * percent;
            imageData.data[j + 2] = imageData.data[j - w + 2] * percent;
            if ((imageData.data[j] | imageData.data[j + 1] | imageData.data[j + 2]) === 0) {
                break;
            }
        }
    }
    ctx.putImageData(imageData, 0, 0,0,0, ctx.canvas.width, ctx.canvas.height);
}