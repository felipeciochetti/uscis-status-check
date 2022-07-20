let msisdn = "";
for (let i = 0; i <= 10; i++) {
  msisdn += Math.floor(Math.random() * 9 + 1);
}

let imei = "";
for (let i = 0; i <= 15; i++) {
  imei += Math.floor(Math.random() * 9 + 1);
}

console.log("imei > " + imei);
console.log("msisdn > " + msisdn);
