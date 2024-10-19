import cryptojs from "crypto-js";

export const encryptText = (plaintext: string) => {
	const ciphertext = cryptojs.AES.encrypt(
		plaintext,
		"asdasre123qsdlkj;2l3j41"
	);
	return ciphertext.toString();
};

export const decryptText = (ciphertext: string) => {
	const bytes = cryptojs.AES.decrypt(ciphertext, "asdasre123qsdlkj;2l3j41");
	const plaintext = bytes.toString(cryptojs.enc.Utf8);
	return plaintext;
};
