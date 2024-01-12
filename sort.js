const conditions = {
    pixelColor: function(rowNum, row, pixel, baseIndex) {
        // Assuming pixel is an object with r, g, b properties
        return pixel.r + pixel.g + pixel.b;
    },

    pixelBrightness: function(rowNum, row, pixel, baseIndex) {
        // Simple brightness calculation
        return 0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b;
    },

    colorDistance: function(rowNum, row, pixel, baseIndex) {
        // Calculate average color of the row
        let avg = { r: 0, g: 0, b: 0 };
        row.forEach(p => {
            avg.r += p.r;
            avg.g += p.g;
            avg.b += p.b;
        });
        avg.r /= row.length;
        avg.g /= row.length;
        avg.b /= row.length;

        // Calculate distance from average
        return Math.sqrt(Math.pow(pixel.r - avg.r, 2) + Math.pow(pixel.g - avg.g, 2) + Math.pow(pixel.b - avg.b, 2));
    }
};


const algos = {
    quicksort: function(data, condition) {
        if (!data._sf) {
            data._sf = { sorted: false, stack: [{ start: 0, end: data.length - 1 }], type: 'quicksort' };
        }

        if (data._sf.sorted || data._sf.type !== 'quicksort') return data;

        // Perform sorting in steps
        if (data._sf.stack.length > 0) {
            const { start, end } = data._sf.stack.pop();
            if (start < end) {
                const pivotIndex = partition(data, start, end, condition);
                data._sf.stack.push({ start: pivotIndex + 1, end: end });
                data._sf.stack.push({ start: start, end: pivotIndex - 1 });
            }
        } else {
            data._sf.sorted = true;
        }

        return data;
    },

    bubblesort: function(data, condition) {
        if (!data._sf) {
            data._sf = { sorted: false, lastUnsorted: data.length, type: 'bubblesort' };
        }

        if (data._sf.sorted || data._sf.type !== 'bubblesort') return data;

        let swapped = false;
        for (let i = 0; i < data._sf.lastUnsorted - 1; i++) {
            if (condition(data[i + 1], data[i])) {
                [data[i], data[i + 1]] = [data[i + 1], data[i]];
                swapped = true;
            }
        }

        if (!swapped) {
            data._sf.sorted = true;
        } else {
            data._sf.lastUnsorted--;
        }

        return data;
    }
};

function partition(array, start, end, condition) {
    const pivotValue = array[end];
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
        if (condition(array[i], pivotValue)) {
            [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
            pivotIndex++;
        }
    }
    [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
    return pivotIndex;
}

