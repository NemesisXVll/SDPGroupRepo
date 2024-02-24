const CryptoJS = require("crypto-js");

//Encryption function
export function encryptData(data: string, key: string): string {
    try {
        return CryptoJS.AES.encrypt(data, key).toString();
    }catch(e){
        return "Invalid key";
    }
}
//Decryption function
export function decryptData(data: string, key: string): string {
    try {
        return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
    }catch(e){
        return "Invalid key";
    }
}


// //Example
// const dataToEncrypt = "sensitive data";
// const key = "password";
// const dd =
// 	"U2FsdGVkX1+wHUpXZX572u8WhXUMHTsGkuETc8WJbrYyU5iLJ/hxzKgr/loNRFQf4adspb7Q8naskYB5HLDy9Q==";
// const encryptedData = encryptData(dataToEncrypt, key);
// console.log(typeof encryptedData);

// const decryptedData = JSON.parse(decryptData(dd, key));
// console.log(decryptedData.userName);
