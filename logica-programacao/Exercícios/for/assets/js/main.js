const container = document.querySelector(".container");

function private() {
  const elementos = [
    { tag: "p", texto: "Frase 1" },
    { tag: "div", texto: "Frase 2" },
    { tag: "footer", texto: "Frase 3" },
    { tag: "section", texto: "Frase 4" },
  ];

  for (let i = 0; i < elementos.length; i++) {
    const { tag, texto } = elementos[i];
    container.innerHTML += `<${tag}> ${texto} </${tag}> <br>`;
  }
}

private();

/*
Outra forma de resolver o exercício - Forma do professor

const elementos = [
    { tag: "p", texto: "Frase 1" },
    { tag: "div", texto: "Frase 2" },
    { tag: "footer", texto: "Frase 3" },
    { tag: "section", texto: "Frase 4" },
  ];

  const container = document.querySelector(".container");
  const div = document.createElement("div");

  for(let i = 0; i < elementos.length; i++) {
   const {tag, texto} = elementos[i]
   let elemento = document.createElement(tag)
   elemento.innerText = texto;
   div.appendChild(elemento)
  }

  container.appendChild(div)

*/
