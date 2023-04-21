let frase = "hola que tal gente?"
let array = frase.split(" ");

array.splice(3,1);
frase = array.join(" ");

console.log(frase);