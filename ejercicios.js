// EJERCICIO 1
function invertirPalabras(texto) {
    return texto
      .split(" ")
      .map(palabra => palabra.split("").reverse().join(""))
      .join(" ");
  }
  
  // EJERCICIO 2
  function paresUnicos(arr) {
    return [...new Set(arr.filter(n => n % 2 === 0))];
  }
  
  // EJERCICIO 3
  function esPrimo(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  }
  
  function primosGemelos(inicio, fin) {
    let resultado = [];
    for (let i = inicio; i <= fin - 2; i++) {
      if (esPrimo(i) && esPrimo(i + 2) && i + 2 <= fin) {
        resultado.push([i, i + 2]);
      }
    }
    return resultado.length ? resultado : 0;
  }
  
  // EJERCICIO 4
  function existeCombinacion(arr, objetivo) {
    function backtrack(index, suma) {
      if (suma === objetivo) return true;
      if (suma > objetivo || index === arr.length) return false;
  
      return (
        backtrack(index + 1, suma + arr[index]) ||
        backtrack(index + 1, suma)
      );
    }
    return backtrack(0, 0);
  }
  
  /* PRUEBAS */
  console.log(invertirPalabras("Hola soy Liz y esta es una prueba técnica"));
  console.log(paresUnicos([1,2,3,4,5,6,7,2,4,6,8,6]));
  console.log(primosGemelos(700, 800));
  console.log(existeCombinacion([4,8,48,44,1], 11));
  