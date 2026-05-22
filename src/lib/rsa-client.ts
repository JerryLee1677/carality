function pemBodyToBase64(pem: string) {
  return pem
    .replace(/-----BEGIN [^-]+-----/g, "")
    .replace(/-----END [^-]+-----/g, "")
    .replace(/\s+/g, "")
    .trim();
}

function base64ToArrayBuffer(base64: string) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

function arrayBufferToBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i] ?? 0);
  }
  return btoa(binary);
}

async function importRsaOaepPublicKey(publicKeyPem: string) {
  const spki = base64ToArrayBuffer(pemBodyToBase64(publicKeyPem));
  return window.crypto.subtle.importKey(
    "spki",
    spki,
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["encrypt"],
  );
}

export async function encryptPassword(publicKeyPem: string, password: string) {
  const key = await importRsaOaepPublicKey(publicKeyPem);
  const plaintext = new TextEncoder().encode(password);
  const ciphertext = await window.crypto.subtle.encrypt({ name: "RSA-OAEP" }, key, plaintext);
  return arrayBufferToBase64(ciphertext);
}

