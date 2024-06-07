$ = (element) => document.querySelector(element);

$('.play').addEventListener('click', inicioGame);

function inicioGame(){
    $('.play').remove();
    $('.return').classList.add('novaPosicao');
    introduction();
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

function introduction(){

    let i = 0 
    const mensageWelcome = ['Bem vindo ao meu trabalho do Ceara Cientifico', 'Aqui vamos trabalhar isso isso isso e isso', 'a importancia de sla oque sla oque', 'Segunda parte sla oque sla oque', 'O jogo funciona assim assim e assado'];

    const divCont = createElement('div');
    const buttonAvancar = createElement('button');

    buttonAvancar.innerText = '>';
    buttonAvancar.classList.add('avancar');
    buttonAvancar.addEventListener('click', () => {
        if(i < mensageWelcome.length-1){
            i++
            divCont.innerText = mensageWelcome[i]
            divCont.appendChild(buttonAvancar)
        } else {
            $('.div-cont-inicio').remove()
            selectCategorias();
            addEvent();
        }
    })
    
    divCont.innerText = mensageWelcome[i];
    divCont.classList.add('div-cont-inicio');
    divCont.appendChild(buttonAvancar);

    $('.cont-game').appendChild(divCont);

}



function perguntas (categoria){
    let nPergunta = 0;
    $('.categoriasSelect').remove();

    const {enunciado, alternativas, resposta, info} = bancoDePerguntas(categoria, nPergunta);

    const p = createElement('p');
    const divCont = createElement('div');

    p.innerText = `Pergunta ${nPergunta+1} - ${enunciado}`;

    divCont.appendChild(p);

    for(let i in alternativas){
        const orde = ['a', 'b', 'c', 'd']
        const button = createElement('button');
        button.classList.add('button-escolha');
        button.innerText = `${orde[i].toUpperCase()}) ${alternativas[i]}`;
        button.setAttribute('id', orde[i])
        divCont.appendChild(button);
    }

    $('.cont-game').appendChild(divCont);

    const escolhas = document.querySelectorAll('.button-escolha');

    escolhas.forEach(clicado => {
        clicado.addEventListener('click', () => {
            alert('Voce apertou em ' + clicado.id.toUpperCase())
        })
    })
}

function verificarPergunta(resposta){
    
}

function bancoDePerguntas(ctg, prg){ //Ctg = categoria prg = nPergunta
    switch (ctg) {
        case 'buttonDescobertas':
            return bancoDescobertas(prg);
            break
        case 'buttonCientistasFamosas':
            return bancoCientistaFamosas(prg);
            break
        default:
            alert('Em serviço')
    }
}


function bancoDescobertas(prg){
    
    const descobertas = [{
        enunciado: 'Quem é conhecido como a “mãe da programação” por seu trabalho com a máquina analítica de Charles Babbage?',
        alternativas: ['Grace Hopper', 'Ada Lovelace', 'Catarina Johnson', 'Hedy Lamarr'],
        resposta: 'Ada Lovelace',
        info: 'Ada Lovelace escreveu o primeiro algoritmo destinado a ser processado por uma máquina, tornando-se a primeira programadora da história.'
    }, 
    {
        enunciado: "Qual cientista desenvolveu a teoria da retroalimentação hormonal e contribuiu para o desenvolvimento da pílula anticoncepcional?",
        alternativas: ['Rita Levi-Montalcini', 'Rosalyn Yalow', 'Maria Goeppert Mayer', 'Dorothy Crowfoot Hodgkin'],
        resposta: 'Rosalyn Yalow',
        info: 'Rosalyn Yalow ganhou o Prêmio Nobel de Medicina em 1977 por seu trabalho no desenvolvimento de radioimunoensaio.'
    }];

    return descobertas[prg]
}

function bancoCientistaFamosas(prg){
    const cientistaFamosas = [
        {
            enunciado: 'Quem foi a primeira mulher afro-americana a viajar para o espaço?',
            alternativas: ['Passeio Sally', 'Mae Jemison', 'Catarina Johnson', 'Valentina Teresh',],
            resposta: 'Mae Jemison',
            info: 'Mae Jemison vai ao espaço em 1992 a bordo do ônibus espacial Endeavour.'
        },
        {
            enunciado: 'Quem descobriu o elemento rádio?',
            alternativas: ['Irène Joliot-Curie', 'Lise Meitner', 'Marie Curie', 'Rosalind Frankin'],
            resposta: 'Maria Curie',
            info: 'Marie Curie, junto com seu marido Pierre Curie, descobriu a rádio e o polônio em 1898.'
        }
    ];

    return cientistaFamosas[prg];
}
