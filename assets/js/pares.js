// Variaveis Globais:

let dificuldade; // Variavel que armazena a dificuldade selecionada;
let numeroDePerguntasTentadas = 0; // Armazena o número total de perguntas mostradas até o momento;
let idTentados = []; // Array que  armazena os id das perguntas tentadadas;


$ = (element) => document.querySelector(element);

$('#play').addEventListener('click', () => {
    removendoButtons();
});

function createElement(element){
    return document.createElement(element);
}

function removendoButtons(){
    $('.play').remove();
    $('#contButtonsInicial').classList.add('tam0')
    $('.cont-button-inicial').classList.remove('cont-button-inicial');
    $('.return').classList.add('novaPosicao');

    apresentacaoGame();
}

function apresentacaoGame(){
    let i = 0;

    const msg = ['Seja bem vindo ao jogo Combine os Pares', 'O intuito do jogo é ver se você está ou não por dentro das diversas descobertas das mulheres no mundo da ciência', 'O jogo tem 3 dificuldades. Sendo elas: Facíl, médio e difícil.', 'Boa sorte'];


    const divCont = createElement('div');
    const buttonAvancar = createElement('button');
    const h2 = createElement('h2');

    buttonAvancar.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
    buttonAvancar.classList.add('avancar');
    buttonAvancar.addEventListener('click', () => {
        if(i < msg.length-1){
            i++
            
            h2.innerText = msg[i]
            divCont.appendChild(h2)
            divCont.appendChild(buttonAvancar)
        } else {
            $('.div-cont-inicio').remove()
            escolhaCategoria();
            addEvent();
        }
    })
    
    h2.innerText = msg[i];
    divCont.appendChild(h2)
    divCont.classList.add('div-cont-inicio');
    divCont.appendChild(buttonAvancar);


    $('.cont-game').appendChild(divCont);
}

function escolhaCategoria(){

    const buttonDificuldade = [
        {id: 'facil', text: 'Fácil'},
        {id: 'medio', text: 'Médio'},
        {id: 'dificil', text: 'Difícil'}
    ]

    const divCont = createElement('div');
    divCont.classList.add('selecionar-dificuldade')


    const h2 = createElement('h2');
    h2.innerText = 'Escolha a dificuldade desejada:'

    buttonDificuldade.forEach(buttonInfo => {
        const button = createElement('button');
        button.setAttribute('id', buttonInfo.id);
        button.classList.add('buttons-dificuldade');
        button.innerText = buttonInfo.text;
        divCont.appendChild(button);
    });

    $('.cont-game').appendChild(divCont);
}

function addEvent (){
    const buttons = document.querySelectorAll('.buttons-dificuldade');
    buttons.forEach(button => {
        button.addEventListener('click',() => {
            perguntas(button.id)
            dificuldade = button.id;
        })
    });    
}

function perguntas(dif) {
    if(dif){

        $('.selecionar-dificuldade').remove()
        const arrayCont = redirecionamentoBanco(dif);

        const divCont = createElement('div');
        divCont.classList.add('cont-rodada');

        const divDescobertaCont = createElement('div');
        divDescobertaCont.classList.add('cont-descobertas');

        const divCientistas = createElement('div');
        divCientistas.classList.add('cont-cientistas');

        const olDescobertas = createElement('ol');


        for(let i in arrayCont){

            const objInd = arrayCont[i];
            const {descoberta, resposta, id} = objInd; // Definindo os objetos;

            // Criando elementos

            const divContCientista = createElement('div');
            divContCientista.classList.add('cont-cientista')

            const input = createElement('input');
            input.setAttribute('type', 'number');
            input.setAttribute('required', 'true')
            input.classList.add('input-answer');

            const pDescoberta = createElement('p');
            pDescoberta.innerText = descoberta;

            const li = createElement('li');
            li.appendChild(pDescoberta);

            const pResposta = createElement('p');
            pResposta.innerText = resposta;

            olDescobertas.appendChild(li);
            divContCientista.appendChild(input);
            divContCientista.appendChild(pResposta);

            divCientistas.appendChild(divContCientista);
        }

        divDescobertaCont.appendChild(olDescobertas);

        divCont.appendChild(divDescobertaCont);
        divCont.appendChild(divCientistas);

        $('.cont-game').appendChild(divCont);
    }
}

function redirecionamentoBanco(dif){
    switch (dif){
        case 'facil':
            return bancoPerguntasFacil();
        case 'medio':
            return bancoPerguntasMedio();
        case 'dificil':
            return bancoPerguntasDificil();
        default:
            alert('Ocorreu um erro desconhecido');
            location.reload();
    };
}


function numberRandom(){
    return Math.floor(Math.random() * 100);
}

function bancoPerguntasFacil(){
    const perguntas = [
        {descoberta: 'Quem foi a primeira cientista a ganhar o Prêmio Nobel?', resposta: 'Marie Curie', id: 1},
        {descoberta: 'Qual foi a primeira mulher a viajar para o espaço?', resposta: 'Valentina Tereshkova', id: 2},
        {descoberta: 'Quem é a cientista conhecida por sua pesquisa pioneira sobre radiação e elementos radioativos?', resposta: 'Marie Curie', id: 3},
        {descoberta: 'Quem foi a cientista conhecida por suas contribuições à descoberta da estrutura do DNA?', resposta: 'Rosalind Franklin', id: 4},
        {descoberta: 'Qual matemática e cientista de computação escreveu o primeiro algoritmo destinado a ser processado por uma máquina?', resposta: 'Ada Lovelace', id: 5},
        {descoberta: 'Qual bióloga e ambientalista americana escreveu "Primavera Silenciosa", um livro que destacou os perigos dos pesticidas?', resposta: 'Rachel Carson', id: 6},
        {descoberta: 'Quem foi a primeira mulher a receber o Prêmio Nobel de Fisiologia ou Medicina?', resposta: 'Gerty Cori', id: 7},
        {descoberta: 'Qual física e matemática alemã fez importantes contribuições para a teoria dos anéis, teoria dos corpos e álgebra?', resposta: 'Emmy Noether', id: 8},
        {descoberta: 'Qual química britânica é conhecida por suas pesquisas sobre a estrutura do DNA?', resposta: 'Rosalind Franklin', id: 9},
        {descoberta: 'Quem foi a primeira mulher a ganhar o Prêmio Nobel de Química?', resposta: 'Marie Curie', id: 10},
        {descoberta: 'Qual bióloga americana é conhecida como a "mãe do movimento ambiental moderno"?', resposta: 'Rachel Carson', id: 11},
        {descoberta: 'Quem é a cientista americana conhecida por suas pesquisas sobre a fusão termonuclear?', resposta: 'Lina Stern', id: 12},
        {descoberta: 'Quem foi a primeira mulher a ganhar o Prêmio Nobel de Fisiologia ou Medicina?', resposta: 'Gerty Cori', id: 13},
        {descoberta: 'Qual física e química polonesa-francesa foi a primeira pessoa a ganhar dois Prêmios Nobel?', resposta: 'Marie Curie', id: 14},
        {descoberta: 'Qual química britânica é conhecida por suas pesquisas sobre a estrutura do DNA?', resposta: 'Rosalind Franklin', id: 15},
        {descoberta: 'Quem foi a primeira mulher a ganhar o Prêmio Nobel de Química?', resposta: 'Marie Curie', id: 16},
        {descoberta: 'Qual astrônoma americana descobriu o primeiro pulsar?', resposta: 'Jocelyn Bell Burnell', id: 17},
        {descoberta: 'Quem foi a primeira mulher a se tornar membro da Royal Society?', resposta: 'Kathleen Lonsdale', id: 18},
    ]

    const obj = [];

    if(!numeroDePerguntasTentadas){
        for(let i = 0; i < 9; i++){
            if(i < perguntas.length){
                obj.push(perguntas[i]);
            } else {
                break;
            };
        };

        return obj;
    } else {
        for(let i = 9; i < perguntas.length; i++){
            if(i < perguntas.length){
                obj.push(perguntas[i]);
            } else {
                break;
            };
        };

        return obj;
    };
}

function bancoPerguntasMedio(){
    const perguntas = [
        {descoberta: 'Quem é a cientista britânica famosa por suas contribuições ao estudo dos primatas, especialmente os chimpanzés?', resposta: 'Jane Goodall', id: 19},
        {descoberta: 'Qual química italiana ganhou o Prêmio Nobel de Química em 1938 por suas pesquisas em radioatividade?', resposta: 'Irène Joliot-Curie', id: 20},
        {descoberta: 'Qual bióloga canadense recebeu o Prêmio Nobel de Medicina em 1983 por suas descobertas sobre o controle genético do desenvolvimento embrionário?', resposta: 'Barbara McClintock', id: 21},
        {descoberta: 'Quem foi a primeira mulher a ganhar dois Prêmios Nobel, em diferentes áreas científicas?', resposta: 'Marie Curie', id: 22},
        {descoberta: 'Qual física e química chinesa recebeu o Prêmio Nobel de Fisiologia ou Medicina em 2015 por sua descoberta de um novo tratamento para a malária?', resposta: 'Tu Youyou', id: 23},
        {descoberta: 'Qual astrônoma americana fez descobertas fundamentais sobre a estrutura e a evolução das estrelas?', resposta: 'Cecilia Payne-Gaposchkin', id: 24},
        {descoberta: 'Qual cientista italiana é conhecida por suas descobertas sobre os fatores de crescimento nervosos?', resposta: 'Rita Levi-Montalcini', id: 25},
        {descoberta: 'Quem foi a primeira mulher a ganhar o Prêmio Nobel de Física?', resposta: 'Marie Curie', id: 26},
        {descoberta: 'Qual geneticista americana desenvolveu a técnica de mapeamento genético de ligação?', resposta: 'Barbara McClintock', id: 27},
        {descoberta: 'Quem foi a primeira mulher a receber um Prêmio Nobel em Ciências Econômicas?', resposta: 'Elinor Ostrom', id: 28},
        {descoberta: 'Qual cientista britânica é conhecida por suas descobertas sobre a radioatividade e os elementos químicos rádio e polônio?', resposta: 'Marie Curie', id: 29},
        {descoberta: 'Qual física austríaca colaborou na descoberta do elemento protactínio?', resposta: 'Lise Meitner', id: 30},
        {descoberta: 'Quem foi a primeira mulher a receber o Prêmio Nobel de Química sozinha?', resposta: 'Dorothy Crowfoot Hodgkin', id: 31},
        {descoberta: 'Qual cientista americana ganhou o Prêmio Nobel de Química em 2009 por suas pesquisas sobre a estrutura e função dos ribossomos?', resposta: 'Ada Yonath', id: 32},
        {descoberta: 'Quem é a matemática iraniana que ganhou a Medalha Fields em 2014?', resposta: 'Maryam Mirzakhani', id: 33},
        {descoberta: 'Qual bióloga americana é conhecida por suas pesquisas sobre o ciclo celular e o câncer?', resposta: 'Elizabeth Blackburn', id: 34},
        {descoberta: 'Quem foi a primeira mulher a ser eleita presidente da Associação Americana para o Avanço da Ciência?', resposta: 'Margaret Mead', id: 35},
        {descoberta: 'Qual cientista brasileira é conhecida por suas pesquisas sobre a biodiversidade da Amazônia?', resposta: 'Bertha Lutz', id: 36}
    ]

    const obj = [];

    if(!numeroDePerguntasTentadas){
        for(let i = 0; i < 9; i++){
            if(i < perguntas.length){
                obj.push(perguntas[i]);
            } else {
                break;
            };
        };

        return obj;
    } else {
        for(let i = 9; i < perguntas.length; i++){
            if(i < perguntas.length){
                obj.push(perguntas[i]);
            } else {
                break;
            };
        };

        return obj;
    };
}

function bancoPerguntasDificil(){
    const perguntas = [
        {descoberta: 'Quem foi a cientista que descobriu o elemento químico protactínio e colaborou com Otto Hahn no trabalho que levou à descoberta da fissão nuclear?', resposta: 'Lise Meitner', id: 37},
        {descoberta: 'Qual bioquímica britânica foi premiada com o Nobel de Química em 1964 por suas análises estruturais de importantes substâncias bioquímicas usando cristalografia de raios X?', resposta: 'Dorothy Crowfoot Hodgkin', id: 38},
        {descoberta: 'Quem é a astrofísica que descobriu o primeiro pulsar e ajudou a estabelecer a nova área da astronomia dos pulsares?', resposta: 'Jocelyn Bell Burnell', id: 39},
        {descoberta: 'Quem é a cientista que desenvolveu a técnica de mapeamento genético de ligação e ganhou o Prêmio Nobel de Fisiologia ou Medicina em 1980?', resposta: 'Barbara McClintock', id: 40},
        {descoberta: 'Qual física nuclear italiana foi a primeira mulher a dirigir o laboratório de física de partículas CERN?', resposta: 'Fabiola Gianotti', id: 41},
        {descoberta: 'Qual cientista pioneira no campo da cristalografia ajudou a determinar a estrutura do colágeno e do DNA?', resposta: 'Rosalind Franklin', id: 42},
        {descoberta: 'Qual química americana é conhecida por suas pesquisas sobre os elementos transurânicos?', resposta: 'Glenn T. Seaborg', id: 43},
        {descoberta: 'Quem foi a primeira mulher a ganhar o Prêmio Nobel de Fisiologia ou Medicina?', resposta: 'Gerty Cori', id: 44},
        {descoberta: 'Qual física e química polonesa-francesa foi a primeira pessoa a ganhar dois Prêmios Nobel?', resposta: 'Marie Curie', id: 45},
        {descoberta: 'Quem foi a primeira mulher a se formar em medicina nos Estados Unidos?', resposta: 'Elizabeth Blackwell', id: 46},
        {descoberta: 'Qual cientista americana descobriu a sequência do genoma do HIV?', resposta: 'Flossie Wong-Staal', id: 47},
        {descoberta: 'Quem foi a primeira mulher a se tornar presidente da Academia Brasileira de Ciências?', resposta: 'Alice de Faria', id: 48},
        {descoberta: 'Qual cientista americana é conhecida por suas pesquisas sobre o efeito estufa e mudanças climáticas?', resposta: 'Susan Solomon', id: 49},
        {descoberta: 'Quem foi a primeira mulher a ganhar o Prêmio Nobel de Física sozinha?', resposta: 'Maria Goeppert-Mayer', id: 50},
        {descoberta: 'Qual química francesa é conhecida por suas pesquisas sobre os fulerenos?', resposta: 'Marie-Anne Lavoisier', id: 51},
        {descoberta: 'Quem foi a primeira mulher a ser eleita para a Academia Nacional de Ciências dos Estados Unidos?', resposta: 'Florence Sabin', id: 52},
        {descoberta: 'Qual cientista americana é conhecida por suas pesquisas sobre a terapia genética?', resposta: 'W. French Anderson', id: 53},
        {descoberta: 'Quem foi a primeira mulher a ganhar o Prêmio Nobel de Química duas vezes?', resposta: 'Marie Curie', id: 54}
    ]

    const obj = [];

    if(!numeroDePerguntasTentadas){
        for(let i = 0; i < 9; i++){
            if(i < perguntas.length){
                obj.push(perguntas[i]);
            } else {
                break;
            };
        };

        return obj;
    } else {
        for(let i = 9; i < perguntas.length; i++){
            if(i < perguntas.length){
                obj.push(perguntas[i]);
            } else {
                break;
            };
        };

        return obj;
    };
}