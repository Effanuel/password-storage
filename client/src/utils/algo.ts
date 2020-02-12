/**
 * Encodes a utf8 string as a byte array.
 * @param {String} str
 * @returns {Uint8Array}
 */
const str2buf = (str: string): Uint8Array => {
  return new TextEncoder().encode(str); //utf8
};

/**
 * Decodes a byte array as a utf8 string.
 * @param {Uint8Array} buffer
 * @returns {String}
 */
function buf2str(buffer: any): string {
  return new TextDecoder("utf-8").decode(buffer);
}

/**
 * Decodes a string of hex to a byte array.
 * @param {String} hexStr
 * @returns {Uint8Array}
 */
function hex2buf(hexStr: any): Uint8Array {
  return new Uint8Array(hexStr.match(/.{2}/g).map((h: any) => parseInt(h, 16)));
}

/**
 * Encodes a byte array as a string of hex.
 * @param {ArrayBuffer} buffer//uint8buffer
 * @returns {String}
 */
function buf2hex(buffer: ArrayBuffer): string {
  return Array.prototype.slice
    .call(new Uint8Array(buffer))
    .map(x => [x >> 4, x & 15])
    .map(ab => ab.map(x => x.toString(16)).join(""))
    .join("");
}

/**
 * Given a passphrase, this generates a crypto key
 * using `PBKDF2` with SHA256 and 1000 iterations.
 * If no salt is given, a new one is generated.
 * The return value is an array of `[key, salt]`.
 * @param {String} passphrase
 * @param {UInt8Array} salt [salt=random bytes]
 * @returns {Promise<[CryptoKey,UInt8Array]>}
 */
const deriveKey = async (
  passphrase: string,
  salt1?: Uint8Array
): Promise<[CryptoKey, any]> => {
  const salt = salt1 || crypto.getRandomValues(new Uint8Array(8));
  const key = await crypto.subtle.importKey(
    "raw",
    str2buf(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  const key_1 = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 1000, hash: "SHA-256" },
    key,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
  return [key_1, salt];
};

/**
 * Given a passphrase and some plaintext, this derives a key
 * (generating a new salt), and then encrypts the plaintext with the derived
 * key using AES-GCM. The ciphertext, salt, and iv are hex encoded and joined
 * by a "-". So the result is `"salt-iv-ciphertext"`.
 * @param {String} passphrase
 * @param {String} plaintext
 * @returns {Promise<String>}
 */
export const encrypt = async (
  passphrase: string,
  plaintext: string
): Promise<string> => {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const data = str2buf(plaintext);
  const [key, salt] = await deriveKey(passphrase);
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );
  return `${buf2hex(salt)}-${buf2hex(iv)}-${buf2hex(ciphertext)}`;
};

/**
 * Given a key and ciphertext (in the form of a string) as given by `encrypt`,
 * this decrypts the ciphertext and returns the original plaintext
 * @param {String} passphrase
 * @param {String} saltIvCipherHex
 * @returns {Promise<String>}
 */
export const decrypt = async (
  passphrase: string,
  saltIvCipherHex: string
): Promise<string> => {
  const [salt, iv, data] = saltIvCipherHex.split("-").map(hex2buf);
  const [key] = await deriveKey(passphrase, salt);
  const v = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data);
  return buf2str(new Uint8Array(v));
};

// EXAMPLE
/*
  encrypt("hello", "world")
    .then(v => console.log("ENCRYPTED", v) || v)
    .then(v => decrypt("hello", v))
    .then(v => console.log("DECRYPTED ", v) || v);

    decrypt(
      "hello",
      "6102677198e41d98-84c95e2d7caf6f2d4ccbfe3c-3093cef35d0dba7a24d37f7d4580b5ad83c154329c",
    ).then(console.log);
  */
// NOT MY CODE.
