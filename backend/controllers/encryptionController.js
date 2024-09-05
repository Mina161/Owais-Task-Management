const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function encryptFile() {
    // Load the service account key file
    const serviceAccountPath = path.join(__dirname, "..", 'firebaseServiceKey.json');
    const serviceAccount = fs.readFileSync(serviceAccountPath, 'utf-8');

    // Generate a random key and IV (Initialization Vector)
    const algorithm = 'aes-256-cbc';
    const encryptionKey = crypto.randomBytes(32);  // 256-bit key
    const iv = crypto.randomBytes(16);             // Initialization vector

    // Encrypt the file
    const cipher = crypto.createCipheriv(algorithm, encryptionKey, iv);
    let encrypted = cipher.update(serviceAccount, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    fs.writeFileSync(path.join(__dirname, "../config/keys", 'firebaseServiceKey.enc'), encrypted);
    fs.writeFileSync(path.join(__dirname, "../config/keys", 'iv.enc'), iv.toString('hex'));

    console.log('Encryption key:', encryptionKey.toString('hex'));
}

function decryptFile() {
    // Load the encrypted service account key and IV
    const encryptedKeyPath = path.join(__dirname, "../config/keys", 'firebaseServiceKey.enc');
    const ivPath = path.join(__dirname, "../config/keys", 'iv.enc');

    const encryptedData = fs.readFileSync(encryptedKeyPath, 'utf-8');
    const iv = Buffer.from(fs.readFileSync(ivPath, 'utf-8'), 'hex');

    // Load the encryption key from environment variable
    const encryptionKey = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');

    // Decrypt the file
    const algorithm = 'aes-256-cbc';
    const decipher = crypto.createDecipheriv(algorithm, encryptionKey, iv);

    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    // Parse the decrypted data into JSON format
    const serviceAccount = JSON.parse(decrypted);
    return serviceAccount;
}

module.exports = { encryptFile, decryptFile }