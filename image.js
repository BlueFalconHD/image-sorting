function loadAndProcessImage(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const pixelArray = getImagePixels(img);
            console.log(pixelArray); // Pixel array with .r, .g, .b properties
            // Further processing can be done here
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function getImagePixels(img, canvas) {
    const ctx = canvas.getContext('2d');

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;
    const pixels = [];
    let row = [];

    for (let i = 0; i < data.length; i += 4) {
        row.push({
            r: data[i],
            g: data[i + 1],
            b: data[i + 2]
            // You can also add alpha: data[i + 3] if needed
        });

        if (row.length === img.width) {
            pixels.push(row);
            row = [];
        }
    }

    return pixels;
}