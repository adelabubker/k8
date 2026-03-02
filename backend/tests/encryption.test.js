const { encrypt, decrypt } = require('../utils/cryptoUtils');
const crypto = require('crypto');

// Setup environment for test
process.env.ENCRYPTION_KEY = crypto.randomBytes(32).toString('hex');

const testEncryption = () => {
  console.log('Starting Encryption/Decryption Tests...');

  const originalText = 'my-secret-token-123';
  console.log(`Original Text: ${originalText}`);

  try {
    // Test 1: Encryption
    const encryptedText = encrypt(originalText);
    console.log(`Encrypted Text: ${encryptedText}`);

    if (encryptedText === originalText) {
      throw new Error('Encryption failed: Encrypted text matches original text');
    }

    if (!encryptedText.includes(':')) {
      throw new Error('Encryption failed: Invalid format (missing IV separator)');
    }

    console.log('✅ Encryption Test Passed');

    // Test 2: Decryption
    const decryptedText = decrypt(encryptedText);
    console.log(`Decrypted Text: ${decryptedText}`);

    if (decryptedText !== originalText) {
      throw new Error(`Decryption failed: Expected ${originalText}, got ${decryptedText}`);
    }

    console.log('✅ Decryption Test Passed');

    // Test 3: Multiple encryptions produce different IVs
    const encryptedText2 = encrypt(originalText);
    if (encryptedText === encryptedText2) {
      throw new Error('Security Test failed: Multiple encryptions produced the same output (IV not random)');
    }
    console.log('✅ Security (Random IV) Test Passed');

    console.log('\nAll tests passed successfully!');
  } catch (error) {
    console.error(`❌ Test Failed: ${error.message}`);
    process.exit(1);
  }
};

testEncryption();
