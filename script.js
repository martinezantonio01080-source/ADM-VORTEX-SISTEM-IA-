function generateCertificate() {
    const input = document.getElementById('projectName').value.trim();
    const cert = document.getElementById('certificate');
    const resName = document.getElementById('resName');
    const serialNum = document.getElementById('serialNumber');
    const timestamp = document.getElementById('timestamp');

    if (!input) {
        alert('Please type the name of your masterpiece first!');
        return;
    }

    resName.textContent = input;
    
    // Generate serial number and current date
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    serialNum.textContent = `SERIAL: TC-${randomCode}`;
    
    const now = new Date();
    timestamp.textContent = `DATE: ${now.toLocaleDateString()}`;

    cert.style.display = 'block';
    cert.scrollIntoView({ behavior: 'smooth' });
}
