const form = document.getElementById("uploadForm");
const imageInput = document.getElementById("imageInput");
const tagInput = document.getElementById("tagInput");
const imageGrid = document.getElementById("imageGrid");

// Max file size (2MB)
const MAX_SIZE = 2 * 1024 * 1024;

// Allowed types
const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

// Load images from localStorage
window.onload = () => {
    const savedImages = JSON.parse(localStorage.getItem("animeImages")) || [];
    savedImages.forEach(addImageToGallery);
};

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const file = imageInput.files[0];
    const tag = tagInput.value.toLowerCase();

    if (!file) {
        alert("Please select an image.");
        return;
    }

    // File type validation
    if (!allowedTypes.includes(file.type)) {
        alert("Only JPG, PNG, WEBP allowed.");
        return;
    }

    // File size validation
    if (file.size > MAX_SIZE) {
        alert("File too large! Max 2MB.");
        return;
    }

    // Basic anime validation (keyword check)
    if (!tag.includes("anime")) {
        alert("Only anime images allowed (add 'anime' tag).");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
        const imageData = event.target.result;

        // Save to localStorage
        let savedImages = JSON.parse(localStorage.getItem("animeImages")) || [];
        savedImages.push(imageData);
        localStorage.setItem("animeImages", JSON.stringify(savedImages));

        addImageToGallery(imageData);
    };

    reader.readAsDataURL(file);

    form.reset();
});

// Add image to UI
function addImageToGallery(src) {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = src;

    const downloadBtn = document.createElement("a");
    downloadBtn.href = src;
    downloadBtn.download = "anime-image";
    downloadBtn.innerText = "Download";
    downloadBtn.className = "download-btn";

    card.appendChild(img);
    card.appendChild(downloadBtn);

    imageGrid.appendChild(card);
}
