/*
Funções - Avançado

Maneiras de declarar função:

1. function saudacao() {} -> Function hoisting
    A engine do JavaScript vai elevar as declarações de funções e variáveis
    declaradas com a palavra "var" para o topo do JavaScript. Ou seja,
    você pode chamar sua função antes da declaração dela.

As funções são First-class objects (Objetos de primeira classe).
Você pode lidar com uma função como se fosse um dado.

2. const souUmDado = function () {} -> Function expression
    Essa função pode ser parâmetro de outra função. Ex:
    function executaFuncao(funcao) {funcao()}
    executaFuncao(souUmDado)

3. const funçãoArrow = () => {} - Arrow Function
    Funciona como a função expression.

4. Função dentro de um Objeto

const objeto = {
    falar: function() {
        console.log("Falando...")
    }
}
objeto.falar()

Pârametros da função

Quando definimos uma função com a palavra function, fica disponível
uma variável chamada arguments que fica disponível todos os argumentos.
*/

function exemploFuncao() {
  console.log(arguments[0]); // Valor
}

exemploFuncao("Valor", 1, 2, 3, 4, 5);

/*
Argumentos que sustentam todos os argumentos enviados.

function funcao(a, b = 2, c = 4){
    console.log(a + b + c)
}

funcao(2, 10)

Se enviar uma string quando chamar a função, o JS assumirá esse valor.
A única forma do JS assumir o valor definido no parâmetro é se passar
Undefined.

Podemos mandar objetos:
function funcao({nome, sobrenome, idade}){
    console.log(nome + sobrenome + idade)
}

funcao({nome : "Harry", sobrenome: "Styles", idade: 31})

Desestruturação de array:
function funcao([nome, sobrenome, idade]){
    console.log(nome + sobrenome + idade)
}

funcao(["Lola", "Argento", "38"])

Pode ter um rest operator e ele sempre deve ser o último:
*/
function conta(operador, acumulador, ...numeros) {
  for (let numero of numeros) {
    if (operador === "+") acumulador += numero;
    if (operador === "-") acumulador -= numero;
    if (operador === "*") acumulador *= numero;
    if (operador === "/") acumulador /= numero;
  }

  console.log(acumulador);
}
conta("+", 0, 20, 30, 40, 50);

/*
Sempre que precisar enviar parâmetros indeterminados para uma função,
pense em usar o rest Operator.

O "args" é a mesma coisa que arguments, mas funciona em qualquer função.

RETURN -> Retorna um valor.
A função termina quando utiliza-se o return.

Lembrando que pode retornar qualquer coisa. Ex: array, objeto, função, valor...
_________________________________________________________________________________

ESCOPO LÉXICO
A função conhece o local onde ela foi declarada, o que está dentro dela
e o que está fora. 
__________________________________________________________________________________

CLOSURE
É a habilidade da função em acessar o seu escopo léxico.
__________________________________________________________________________________

Funções de Callback - Funções que são executadas quando uma ação finaliza, 
e então executa a função de Callback.
*/

function f1(callback) {
  console.log("f1");
  if (callback) callback();
}

function f2(callback) {
  console.log("f2");
  if (callback) callback();
}

function f3(callback) {
  console.log("f3");
  if (callback) callback();
}

/*
________________________________________________________________

 Callback hell - MÁ PRÁTICA, NÃO FAÇA!

f1(function () {
  f2(function () {
    f3(function () {
      console.log("Olá, mundo!");
    });
  });
});
__________________________________________________________________

*/

f1(f1Callback);

function f1Callback() {
  f2(f2Callback);
}

function f2Callback() {
  f3(f3Callback);
}

function f3Callback() {
  console.log("Olá, mundo!");
}

/*
Funções Imediatas - (IIFE)

Function expression imediatamente invocada.

Declaração:
*/
(function () {
  console.log('Executado imediatamente...')
})();

/*
Factory Functions - Funções que retornam objetos.

Quando uma função está dentro de um objeto, isso é um método.
*/