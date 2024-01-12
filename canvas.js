function drawImageData(canvas, imageData) {
    const ctx = canvas.getContext('2d');
    
    // Set the canvas size based on the image data dimensions
    canvas.width = imageData[0].length;
    canvas.height = imageData.length;
    
    // Loop through the image data and draw each pixel
    for (let y = 0; y < imageData.length; y++) {
        for (let x = 0; x < imageData[y].length; x++) {
            const pixel = imageData[y][x];
            ctx.fillStyle = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
            ctx.fillRect(x, y, 1, 1);
        }
    }
}