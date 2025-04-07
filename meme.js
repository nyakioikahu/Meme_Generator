function generateMeme() {
    const file = document.getElementById('imageUpload').files[0];
    if (!file) return alert("Please upload an image!");

    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('memeCanvas');
            const ctx = canvas.getContext('2d');

            // Set canvas size while maintaining aspect ratio
            const maxWidth = 500;
            const scaleFactor = maxWidth / img.width;
            canvas.width = maxWidth;
            canvas.height = img.height * scaleFactor;

            // Draw the image on the canvas
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Get input text
            const topText = document.getElementById('topText').value.toUpperCase();
            const bottomText = document.getElementById('bottomText').value.toUpperCase();

            // Style the text
            ctx.font = `${Math.floor(canvas.height / 10)}px Impact`; // Auto-scale text
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            ctx.textAlign = 'center';

            // Add text with stroke effect
            ctx.strokeText(topText, canvas.width / 2, canvas.height * 0.1);
            ctx.fillText(topText, canvas.width / 2, canvas.height * 0.1);

            ctx.strokeText(bottomText, canvas.width / 2, canvas.height * 0.9);
            ctx.fillText(bottomText, canvas.width / 2, canvas.height * 0.9);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

function downloadMeme() {
    const canvas = document.getElementById('memeCanvas');
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}