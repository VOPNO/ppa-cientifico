$ = (element) => document.querySelector(element);

$('.play').addEventListener('click', inicioGame);

function inicioGame(){
    $('.play').remove();
    $('.return').classList.add('novaPosicao');
    selectCategorias();
    addEvent();
}

function createElement(element){
    return document.createElement(element);
}

function selectCategorias(){
    const buttonsCategoria = [
        { name: 'buttonCientistasFamosas', text: 'Cientistas Famosas' },
        { name: 'buttonDescobertas', text: 'Descobertas e contribuições' },
        { name: 'buttonDesigualdade', text: 'Desigualdade de Gênero' },
        { name: 'buttonIniciativas', text: 'Iniciativas e Políticas de Equidade' },
        { name: 'buttonTodas', text: 'Todas' }
    ];

    const divContCategorias = createElement('div');
    divContCategorias.classList.add('categoriasSelect');

    buttonsCategoria.forEach(buttonInfo => {
        const button = createElement('button');
        button.innerText = buttonInfo.text;
        button.classList.add('buttons-categoria');
        button.setAttribute('id', buttonInfo.name);
        divContCategorias.appendChild(button);
    });

    $('.cont-game').appendChild(divContCategorias);

}

function addEvent (){
    const buttons = document.querySelectorAll('.buttons-categoria');

    buttons.forEach(button => {
        button.addEventListener('click',() => {
            perguntas(button.id)
        })
    });    
}

function perguntas (categoria){
    alert(categoria)
}

function bancoDePerguntas(ctg){ //Ctg = categoria
    const descobertas = [{
        enunciado: 'Quem é conhecido como a “mãe da programação” por seu trabalho com a máquina analítica de Charles Babbage?',
        alternativas: ['Grace Hopper', 'Ada Lovelace', 'Catarina Johnson', 'Hedy Lamarr'],
        resposta: 'Ada Lovelace'
    }, 
    {
        enunciado: "Qual cientista desenvolveu a teoria da retroalimentação hormonal e contribuiu para o desenvolvimento da pílula anticoncepcional?",
        alternativas: ['Rita Levi-Montalcini', 'Rosalyn Yalow', 'Maria Goeppert Mayer', 'Dorothy Crowfoot Hodgkin'],
        resposta: 'Rosalyn Yalow'
    }];
}



























// function perguntas(){
//     const questions = [{
//         enunciado: 'Quem é conhecido como a “mãe da programação” por seu trabalho com a máquina analítica de Charles Babbage?',
//         alternativas: ['Grace Hopper', 'Ada Lovelace', 'Catarina Johnson', 'Hedy Lamarr'],
//         resposta: 'Ada Lovelace'
//     }, {
//         enunciado: ""
//     }]
// }