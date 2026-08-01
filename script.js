function generateCertificate() {
    const projectInput = document.getElementById('projectName').value.trim();
    const authorInput = document.getElementById('authorName').value.trim();
    const titleInput = document.getElementById('techTitle').value;
    
    const cert = document.getElementById('certificate');
    const resName = document.getElementById('resName');
    const resAuthor = document.getElementById('resAuthor');
    const resTitle = document.getElementById('resTitle');
    const serialNum = document.getElementById('serialNumber');
    const timestamp = document.getElementById('timestamp');

    if (!projectInput || !authorInput) {
        alert('Please fill out both text fields, master!');
        return;
    }

    resName.textContent = projectInput;
    resAuthor.textContent = authorInput;
    resTitle.textContent = titleInput;
    
    // Generate serial number and current date
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    serialNum.textContent = `SERIAL: TC-${randomCode}`;
    
    const now = new Date();
    timestamp.textContent = `DATE: ${now.toLocaleDateString()}`;

    cert.style.display = 'block';
    cert.scrollIntoView({ behavior: 'smooth' });
}
