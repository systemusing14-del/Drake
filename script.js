class AnimeShare {
    constructor() {
        this.images = JSON.parse(localStorage.getItem('animeImages')) || [];
        this.sortOrder = 'newest';
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderGallery();
        this.updateImageCount();
    }

    bindEvents() {
        // Upload events
        const uploadArea = document.getElementById('uploadArea');
        const imageInput = document.getElementById('imageInput');
        const uploadBtn = document.getElementById('uploadBtn');
        const confirmUpload = document.getElementById('confirmUpload');
        const cancelUpload = document.getElementById('cancelUpload');

        // Drag & drop
        uploadArea.addEventListener('click', () => imageInput.click());
        uploadArea.addEventListener('dragover', this.handleDragOver.bind(this));
        uploadArea.addEventListener('dragleave', this.handleDragLeave.bind(this));
        uploadArea.addEventListener('drop', this.handleDrop.bind(this));

        imageInput.addEventListener('change', this.handleImageSelect.bind(this));
        uploadBtn.addEventListener('click', () => imageInput.click());
        confirmUpload.addEventListener('click', this.uploadImage.bind(this));
        cancelUpload.addEventListener('click', this.cancelUpload.bind(this));

        // Gallery events
        document.getElementById('searchInput').addEventListener('input', this.searchImages.bind(this));
        document.getElementById('sortBtn').addEventListener('click', this.toggleSort.bind(this));
    }

    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('dragover');
    }

    handleDragLeave(e) {
        e.currentTarget.classList.remove('dragover');
    }

    handleDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.handleImageSelect({ target: { files } });
        }
    }

    handleImageSelect(e) {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file
        if (!file.type.startsWith('image/')) {
            this.showMessage('Please select an image file!', 'error');
            return;
        }

        if (file.size > 10 * 1024 * 1024) { // 10MB
            this.showMessage('Image size must be less than 10MB!', 'error');
            return;
        }

        // Check if anime image using simple heuristic (you can enhance this)
        this.isAnimeImage(file).then(isAnime => {
            if (!isAnime) {
                this.showMessage('This doesn\'t look like an anime image! Please upload anime-style images only.', 'error');
                return;
            }

            // Show preview
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('previewImg').src = e.target.result;
                document.getElementById('previewContainer').style.display = 'block';
                document.getElementById('uploadArea').style.display = 'none';
                document.getElementById('uploadBtn').disabled = true;
                this.selectedFile = file;
            };
            reader.readAsDataURL(file);
        });
    }

    async isAnimeImage(file) {
        // Simple anime detection using image analysis
        // In production, use a proper ML model like TensorFlow.js with anime classifier
        return new Promise((resolve) => {
            const img = new Image();
            const reader = new FileReader();
            
            reader.onload = (e) => {
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    
                    // Simple anime detection heuristics
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const data = imageData.data;
                    
                    let vibrantColors = 0;
                    let flatRegions = 0;
                    
                    for (let i = 0; i < data.length; i += 4) {
                        const r = data[i];
                        const g = data[i + 1];
                        const b = data[i + 2];
                        
                        // Check for vibrant, saturated colors typical of anime
                        const saturation = Math.max(r, g, b) - Math.min(r, g, b);
                        if (saturation > 80) vibrantColors++;
                        
                        // Check for flat color regions
                        if (Math.abs(r - g) < 20 && Math.abs(g - b) < 20) flatRegions++;
                    }
                    
                    // Anime images typically have high color saturation and flat regions
                    const isLikelyAnime = (vibrantColors / (data.length / 4) > 0.3) && 
                                        (flatRegions / (data.length / 4) > 0.4);
                    
                    resolve(isLikelyAnime);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    uploadImage() {
        if (!this.selectedFile) return;

        const progressBar = document.getElementById('uploadProgress');
        const progressFill = document.getElementById('uploadProgress').querySelector('.progress-fill');
        progressBar.style.display = 'block';

        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            progressFill.style.width = progress + '%';
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageData = e.target.result;
                const newImage = {
                    id: Date.now(),
                    data: imageData,
                    name: this.selectedFile.name,
                    uploadedAt: new Date().
