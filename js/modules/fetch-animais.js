import AnimaNumeros from '../../../animais-fantasticos/animaisapi.json';

export default function fetchAnimais(url, target) {
  // Cria a div contendo informações com o total de animais
  function createAnimal(animal) {
    const div = document.createElement('div');
    div.classList.add('numero-animal');
    div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`;
    return div;
  }

  // Preenche cada animal no DOM
  const numerosGrid = document.querySelector(target);
  function preencherAnimais(animal) {
    const divAnimal = createAnimal(animal);
    numerosGrid.appendChild(divAnimal);
  }
  // Anima os números de cada animal
  function animaAnimaisNumneros() {
    const animaNumeros = new AnimaNumeros('[data-numero]', '.numeros', 'ativo');
    animaNumeros.init();
  }


  // Puxa os animais atráves de um arquivo JSON
  // e cria cada animal utilizando createAnimal
  async function criarAnimais() {
    try {
      // Fetch e espera a resposta e transforma em json.
      const animaisResponse = await fetch(url);
      // Após a transformação de json, ativa as funções
      // para preencher e animar os números
      const animaisJSON = await animaisResponse.json();
      animaisJSON.forEach(animal => preencherAnimais(animal));
      animaAnimaisNumneros();
    } catch (erro) {
      console.log(erro);
    }
  }
  return criarAnimais();
}
