/*
Revisando Objetos

Declaração:
*/
const pessoa = {
  nome: "Lady",
  sobrenome: "Gaga",
};

console.log(pessoa.nome);
console.log(pessoa["sobrenome"]);

/*
Acessando via colchetes
*/
const chave = "nome";
console.log(pessoa[chave]);

/*
Criando novo objeto com métodos.
Métodos são funções dentro de objetos que executam ações.
*/
const pessoa1 = new Object();
pessoa1.nome = "Britney";
pessoa1.sobrenome = "Spears";
pessoa1.idade = 43;
pessoa1.falarNome = function () {
  return `${this.nome} está falando seu nome.`;
};
pessoa1.getDataNascimento = function () {
  const dataAtual = new Date();
  return dataAtual.getFullYear() - this.idade;
};

console.log(pessoa1.falarNome());
console.log(pessoa1.getDataNascimento());

/*
Iteração para ver as chaves do objeto.
*/
for (let chave in pessoa1) {
  console.log(pessoa1[chave]);
}

/*
Temos formas de criar objetos:

Factory Function - Funções de fábrica
Constructor Function - Funções construtoras
Classes 
*/

/* Factory Function */
function criaPessoa(nome, sobrenome) {
  return {
    nome,
    sobrenome,
    get nomeCompleto() {
      return `${this.nome} ${this.sobrenome}`;
    },
  };
}

const p1 = criaPessoa("Lady", "Gaga");
console.log(p1.nomeCompleto);

/* 
Constructor Function 
A função construtora pode adicionar propriedades e métodos ao objeto usando this.
O objeto é implicitamente retornado ao final da execução da função (a menos que você retorne explicitamente outro objeto).
*/

function Pessoa(nome, sobrenome) {
  this.nome = nome;
  this.sobrenome = sobrenome;

  this.nomeCompleto = function () {
    return `${this.nome} ${this.sobrenome}`;
  };
}

/*
A palavra new cria um objeto vazio {} 
A palavra this referencia os atributos do novo objeto.
*/
const p2 = new Pessoa("Chappel", "Roan");
console.log(p2.nomeCompleto());

/*
defineProperty -> DefineProperties
*/

function Produto3(nome, preco, estoque) {
  this.nome = nome;
  this.preco = preco;

  /*
    O defineProperty recebe o objeto e a propriedade que não quer alterar.
    Quando o configurable está habilitado, você pode redefinir a 
    configuração da propriedade.
    Value pode ser qualquer coisa (função, int, string, boolean...)
    Para exibir e não permitir que o atributo seja alterado:
  */
  Object.defineProperty(this, "estoque", {
    enumerable: true, // Mostra a chave
    value: estoque, // Valor da chave
    writable: false, //Se puder alterar esse valor ou não
    configurable: false, // Se puder apagar a chave ou não.
  });
}

const p3 = new Produto3("Camiseta", 20, 3);
console.log(p3.nome);

/*
Para mostrar as chaves do objeto.
*/
console.log(Object.keys(p3));

/*
defineProperties faz o mesmo, mas com mais de 1 objeto.
*/

function Produto4(nome, preco, estoque) {
  this.nome = nome;
  this.preco = preco;

  Object.defineProperties(this, {
    nome: {
      enumerable: true, // Mostra a chave
      value: estoque, // Valor da chave
      writable: false, //Se puder alterar esse valor ou não
      configurable: false, // Se puder apagar a chave ou não.
    },
    preco: {
      enumerable: true, // Mostra a chave
      value: estoque, // Valor da chave
      writable: false, //Se puder alterar esse valor ou não
      configurable: false, // Se puder apagar a chave ou não.
    },
  });
}

/*
Getters e Setters

Maneira de proteger as propriedades.

Get -> Apenas PEGAR a informação.
Set -> Atribuir informação.
*/

function Produto5(nome, preco, estoque) {
  this.nome = nome;
  this.preco = preco;

  let estoquePrivado = estoque;

  Object.defineProperty(this, "estoque", {
    enumerable: true, // Mostra a chave
    configurable: false, // Se puder apagar a chave ou não.
    get: function () {
      return estoquePrivado;
    },
    set: function (valor) {
      if (typeof valor !== "number") {
        throw new TypeError("Foi passado um valor que não é número.");
      }
      estoquePrivado = valor;
    },
  });
}

const p5 = new Produto5("Camiseta", 20, 3);
console.log(p5.estoque);

/*
Funçaõ Factory
*/

function criaProduto(nome) {
  return {
    get nome() {
      return nome;
    },
    set nome(valor) {
      if (typeof valor !== "String") {
        throw new TypeError("Necessário passar uma string!");
      }
      nome = valor;
    },
  };
}

const p6 = criaProduto("Camiseta");
// p6.nome = 123; -> Gera uma exceção (erro).
console.log(p6.nome);

/*
Métodos Úteis de Objetos

Object.keys -> Retorna as chaves
Object.freeze -> Congela o objeto
Object.defineProperties -> Define várias propriedades
Object.defineProperty -> Define uma propriedade
*/

const produto6 = {
  nome: "Caneca",
  preco: 25.99,
};

/**
 Apenas referenciando o mesmo objeto. 
 Aponta para o mesmo lugar na memória.
 */
const outraCoisa = produto6;
outraCoisa.nome = "Produto base"; //Muda de Produto6 e outraCoisa

/*
Copiando o objeto e alocando em outro lugar na memória:
*/
const caneca = { ...produto6 };
caneca.nome = "Caneca";
caneca.preco = 29.99;
console.log(caneca);

/*
Object.assign()

Método usado para copiar os valores de todas as propriedades 
próprias enumeráveis de um ou mais objetos de origem para
um objeto DESTINO. Após a cópia, ele retorna o objeto destino 
modificado.
Podemos também mesclar objetos.

Características importantes
Cópia superficial (shallow copy):

Copia apenas as referências de objetos aninhados, não os 
objetos em si

Se uma propriedade da origem for um objeto, apenas a 
referência é copiada

Sobrescreve propriedades existentes:
Se o objeto destino já tiver uma propriedade com o 
mesmo nome, ela será sobrescrita

Múltiplas origens:

Você pode especificar vários objetos de origem

As propriedades são copiadas na ordem em que os 
objetos são fornecidos

Objetos posteriores sobrescrevem propriedades com 
o mesmo nome de objetos anteriores

1° Argumento: {} -> Objeto vazio
2° Argumento: Qual objeto copiar
3° Argumento: O que gostaria de criar
*/

const talheres = Object.assign({}, produto6, { material: "Metal" });
talheres.nome = "Talheres";
talheres.preco = 460.87;
console.log(talheres);

/*
get.OwnPropertyDescriptor(o, "prop")
Retorna as configurações de determinada propriedade de
um objeto.

1° Argumento: Objeto.
2° Argumento: Propriedade.
*/

console.log(Object.getOwnPropertyDescriptor(produto6, "nome"));

/*
Object.values

Retorna o valor das chaves
*/

console.log(Object.values(produto6));

/*
Object.values

Retorna as chaves e o valor
*/

console.log(Object.entries(produto6));

/*
Podemos fazer destructuring no for:
*/

for (let [chave, valor] of Object.entries(produto6)) {
  console.log(chave, valor);
}

/*
Prototypes

O JavaScript é baseado em protótipos para passar propriedades
e métodos de um objeto para outro.

Definição
Protótipo é o que se cria pela primeira vez, serve de modelo
ou molde para futuras produções.

Todos os objetos tem uma referência interna para um protótipo
(__proto__) que vem da propriedade prototype da função
construtora que foi usada para criá-lo. Quando tentamos acessar
um membro de um objeto, primeiro o motor do JS vai tentar
encontrar este membro no próprio objeto e depois a cadeia
de protótipos é usada até o topo (null) até encontrar (ou não)
tal membro.
 */

function Student(nome, sobrenome) {
  this.nome = nome;
  this.sobrenome = sobrenome;
  this.nomeCompleto = () => this.nome + " " + this.sobrenome;
}

/*
Isso adiciona ao prototype linkado ao objeto construtor
Quando se adiciona ao prototype, ele adiciona para todos
os objetos que instanciam o objeto construtor.
*/
Student.prototype.carteirinha = "";

const student1 = new Student("Sophia", "Bush"); // Student -> Função construtora
const data = new Date(); // Date -> Função construtora

console.dir(student1);
console.dir(data);

/*
Podemos adicionar métodos para todos os objetos:
 */

Student.prototype.apresentar = function () {
  `Meu nome é ${this.nome} ${this.sobrenome} e estudo nesta instituição.`;
};

/*
Caso escreva uma função no prototype para substituir, por hierarquia, o 
JS procura primeiramente no objeto e apenas depois no prototype.

Manipulando Prototype
*/

const objA = {
  chaveA: "A",
};

const objB = {
  chaveB: "B",
};

const objC = new Object();
objC.chaveC = "C";

/*
Definindo o objA como prototype e 
objB como prototype de objC:
*/
Object.setPrototypeOf(objB, objA);
Object.setPrototypeOf(objC, objB);
console.log(objB.chaveA);

/*
Não é recomendado utilizar o __proto__ porque pode atrapalhar
a performance.

Se quiser acessar o prototype, utilize:
*/

Object.getPrototypeOf(objA);

/*
A partir de agora vamos criar métodos via prototype:
*/

function ProdutoTecnologia(nome, preco) {
  this.nome = nome;
  this.preco = preco;
}

ProdutoTecnologia.prototype.desconto = function (percentual) {
  this.preco = this.preco - this.preco * (percentual / 100);
};

ProdutoTecnologia.prototype.aumento = function (percentual) {
  this.preco = this.preco + this.preco * (percentual / 100);
};

const pTec = new ProdutoTecnologia("Teclado", 359.4);
pTec.desconto(10);
pTec.aumento(26);
console.log(pTec);

/* Objeto Literal */
const pTec2 = {
  nome: "Mouse",
  preco: 250.99,
};

/*
O novo objeto recebe o prototype do objeto construtor
*/
Object.setPrototypeOf(pTec2, ProdutoTecnologia.prototype);
pTec2.aumento(10);
console.log(pTec2);

/*
Podemos criar o objeto já colocando o prototype

a função create() do prototype pode receber algumas coisas:
- Prototype
- Chaves
- Configurações
*/

const pTec3 = Object.create(ProdutoTecnologia.prototype, {
  preco: {
    writable: true,
    configurable: true,
    enumerable: true,
    value: 40,
  },
});

pTec3.aumento(15);
console.log(pTec3);

/*
Herança

Um objeto recebe os atributos de um objeto pai.
Em JavaScript não há a característica de "herança". O que
ocorre, na verdade, é "delegação".
*/

function Product(name, price) {
  this.name = name;
  this.price = price;
}

Product.prototype.increase = function (quantity) {
  this.price += quantity;
};

Product.prototype.discount = function (quantity) {
  this.price -= quantity;
};

/*
O call é quem recebe os atributos de Product.
Primeiro argumento passamos o objeto que queremos 
referenciar e os próximos são quais atributos.
*/
function Shirt(name, price, color) {
  Product.call(this, name, price);
  this.color = color;
}

/*
Criando um objeto vazio e setando o Prototype desse objeto
vazio como produto.
 */
Shirt.prototype = Object.create(Product.prototype);
/*
Passando o constructor do novo objeto.
*/
Shirt.prototype.constructor = Shirt;

/* Podemos sobrescrever um método */
Shirt.prototype.aumento = function (percent) {
  this.price = this.price + this.price * (percent / 100);
};

const product = new Product("Cropped", 50);
const shirt = new Shirt("Regata", 35.7, "Preta");
shirt.increase(30);
console.log(shirt);
console.log(product);

function Mug(name, price, material, stock) {
  Product.call(this, name, price);
  this.material = material;

  Object.defineProperty(this, "stock", {
    enumerable: true,
    configurable: false,
    get: function () {
      return stock;
    },
    set: function (value) {
      if (typeof value !== "number") return;
      stock = value;
    },
  });
}

Mug.prototype = Object.create(Product.prototype);
Mug.prototype.constructor = Mug;
const mug = new Mug("Caneca", 19.99, "Cerâmica", 20);
mug.stock = 10;
console.log(mug);

/*
Polimorfismo
Maneira de fazer métodos se comportarem de maneiras 
diferentes (sub-classes).

Factory Functions e Prototypes
*/

const estudar = {
  estudar() {
    console.log(`${this.nome} está estudando`);
  },
};

const pessoaPrototype = { ...estudar };
function StudentDevelopment(nome, sobrenome) {
  return Object.create(pessoaPrototype, {
    nome: {
      value: nome,
    },
    sobrenome: {
      value: sobrenome,
    },
  });
}

const s1 = StudentDevelopment("Britney", "Spears");

/*
Objeto Map() -> Estrutura de dados
*/

const pessoas = [
  { id: 3, nome: "Luiz" },
  { id: 2, nome: "Maria" },
  { id: 1, nome: "Helena" },
];

/*
Colocar o id como chave mantendo a ordem
*/
const novasPessoas = new Map();
for (const pessoa of pessoas) {
  const { id } = pessoa;
  /* Para colocar em novas pessoas */
  novasPessoas.set(id, { ...pessoa });
}

console.log(novasPessoas);
/* Para retornar uma pessoa baseada na chave */
console.log(novasPessoas.get(2));

/* Retornar um Array */
for (const pessoa of novasPessoas) {
  console.log(pessoa);
}

/*
Em JavaScript podemos acessar ou criar uma propriedade de 
um objeto da seguinte forma:
const obj = {};
obj["maçã"] = 1;

Em JavaScript, objetos são estruturas de chave-valor.
A chave pode ser qualquer string e você pode criar
ou acessar dinamicamente usando a notação
obj[chave]. Ou seja, uma chave não se repete,
ela é criada ou sobrescrita.
*/
