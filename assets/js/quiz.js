$ = (element) => document.querySelector(element);
$('.play').addEventListener('click', inicioGame);

let nPergunta = 0;
let cat;
let score = 0;

let jaAcabou = false;

let prgDescobertas = 0;
let prgCientistasFamosas = 0;
let prgIniciativa = 0;
let prgDesigualdade = 0;

//Variaveis que definem quantas perguntas de cada categoria tem
let nCientistasFamosas = 6;
let nDescobertas = 6;
let nDesigualdade = 4;
let nIniciativas = 6;
let nTodas = nCientistasFamosas + nDescobertas + nDesigualdade + nIniciativas;

function inicioGame(){
    $('.play').remove();
    $('#contButtonsInicial').classList.add('tam0')

    $('.cont-button-inicial').classList.remove('cont-button-inicial');


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
            cat = button.id
        })
    });    
}

function introduction(){
    let i = 0;

    const mensageWelcome = ['Bem vindo ao meu trabalho do Ceara Cientifico'];

    const divCont = createElement('div');
    const buttonAvancar = createElement('button');
    const h2 = createElement('h2');

    buttonAvancar.innerHTML = '<img src="./assets/img/jogos/avancar.svg" class="img-button-avancar"></img>';
    buttonAvancar.classList.add('avancar');
    buttonAvancar.addEventListener('click', () => {
        if(i < mensageWelcome.length-1){
            i++
            
            h2.innerText = mensageWelcome[i]
            divCont.appendChild(h2)
            divCont.appendChild(buttonAvancar)
        } else {
            $('.div-cont-inicio').remove()
            selectCategorias();
            addEvent();
        }
    })
    
    h2.innerText = mensageWelcome[i];
    divCont.appendChild(h2)
    divCont.classList.add('div-cont-inicio');
    divCont.appendChild(buttonAvancar);

    $('.cont-game').appendChild(divCont);

}

function perguntas(categoria, removed = false) {
    const question = bancoDePerguntas(categoria, nPergunta);

    if (question) {
        if (!removed) {
            $('.categoriasSelect').remove();
        } else {
            $('.cont-resu').remove();
        }

        const { enunciado, alternativas, resposta, info } = question;

        const p = createElement('p');
        const divCont = createElement('div');
        const divButton = createElement('div');

        p.innerText = `Pergunta ${nPergunta + 1} - ${enunciado}`;
        divCont.appendChild(p);
        divCont.classList.add('cont-perguntas');

        divButton.classList.add('cont-buttons');

        alternativas.forEach((alternativa, i) => {
            const orde = ['a', 'b', 'c', 'd'];
            const button = createElement('button');
            button.classList.add('button-escolha');
            button.innerText = `${orde[i].toUpperCase()}) ${alternativa}`;
            button.setAttribute('id', orde[i]);
            divButton.appendChild(button);
        });

        divCont.appendChild(divButton);
        $('.cont-game').appendChild(divCont);

        const escolhas = document.querySelectorAll('.button-escolha');
        escolhas.forEach(clicado => {
            clicado.addEventListener('click', () => {
                if (verificarPergunta(clicado.id, resposta, alternativas)) {
                    respostaResultado(true, info);
                } else {
                    respostaResultado(false, info);
                }
            });
        });

    } else {
        if (!jaAcabou) {
            acabouPerguntas();
        } else {
            console.log('Já acabou');
        }
    }
}

function verificarPergunta(resposta, respostaCerta, alternativas){   
    let positionRespostaCerta; // Variavel de controle para a posição da resposta certa;

    let positionRespostaUser; //Variavel de controle para a posição da resposta do usuario

    switch (resposta.toLowerCase()){ //Verfica o botão que foi apertado (String) e o converte para um (Number) para ser verificado
        case 'a':
            positionRespostaUser = 0;
            break
        case 'b':
            positionRespostaUser = 1;
            break;
        case 'c':
            positionRespostaUser = 2;
            break;
        case 'd':
            positionRespostaUser = 3;
            break;
        default:
            alert('Ocorreu um erro desconhecido.');
            location.reload();
    }
  
    for(let i in alternativas){
        if(alternativas[i] == respostaCerta){
            positionRespostaCerta = i; // armazena a posição certa da pergunta na variavel (Number)
        };
    };

    if(positionRespostaCerta == positionRespostaUser){
        return true
    } else {
        return false
    }
}

function respostaResultado(resu, info){
    $('.cont-perguntas').remove();

    const divContResu = createElement('div');
    const p = createElement('p');
    const p2 = createElement('p');

    p2.innerHTML = `<em>Info: ${info}</em>`

    divContResu.classList.add('cont-resu')

    if(resu){
        p.innerHTML = 'Reposta <span class="verde-win">correta</span>'
        p.classList.add('resposta-certa')
        updateScore(1);

    } else {
        p.innerHTML = 'Resposta <span class="vermelho-loser">errada</span>';
        p.classList.add('resposta-errada');    
    }

    divContResu.appendChild(p);

    divContResu.appendChild(p2);
    $('.cont-game').appendChild(divContResu);

    nextQuestion();
}

function nextQuestion(){
    nPergunta++
    const button = createElement('button');
    button.innerText = 'Proxima pergunta';
    $('.cont-resu').appendChild(button);


    if(cat){
        button.addEventListener('click',() => {
             perguntas(cat, true)}) 
    }
}

function updateScore(i){
    const scoreDiv = createElement('div');
    const scoreParagraph = createElement('p');
    scoreDiv.classList.add('score-div');

    if(score) $('.score-div').remove();

    score += i;
    scoreParagraph.innerText = score;
    scoreDiv.appendChild(scoreParagraph);
    $('.cont-game').appendChild(scoreDiv);
}

function acabouPerguntas(){

    $('.cont-resu').remove();

    const p = ['Fim de jogo!', `Parabéns você acertou ${score} de ${nPergunta} perguntas. Tendo uma media de acertos de ${(nPergunta / score).toFixed(2)}!`, 'Obrigado por participar']; // Mensagens a serem criadas quando o jogo acabar 

    const divCont = createElement('div');

    for(let i in p){
        const p1 = createElement('p');
        p1.innerHTML = `${p[i]}<br>`;
        divCont.appendChild(p1);
    }

    divCont.classList.add('cont-resu-final');
    jaAcabou = true;
    $('.cont-game').appendChild(divCont);
}

function bancoDePerguntas(ctg, prg) {
    switch (ctg) {
        case 'buttonDescobertas':
            return bancoDescobertas(prg);
        case 'buttonCientistasFamosas':
            return bancoCientistaFamosas(prg);
        case 'buttonIniciativas':
            return bancoIniciativas(prg);
        case 'buttonDesigualdade':
            return bancoDesigualdade(prg);
        case 'buttonTodas':
            return bancoTodas();
        default:
            alert('Ocorreu um erro desconhecido na destinação das perguntas.');
            window.location.reload();
    }
}

function bancoDescobertas(prg) {
    const descobertas = [
        {
            enunciado: 'Quem é conhecida como a “mãe da programação” por seu trabalho com a máquina analítica de Charles Babbage?',
            alternativas: ['Grace Hopper', 'Ada Lovelace', 'Katherine Johnson', 'Hedy Lamarr'],
            resposta: 'Ada Lovelace',
            info: 'Ada Lovelace escreveu o primeiro algoritmo destinado a ser processado por uma máquina, tornando-se a primeira programadora da história.'
        },
        {
            enunciado: "Qual cientista desenvolveu a teoria da retroalimentação hormonal e contribuiu para o desenvolvimento da pílula anticoncepcional?",
            alternativas: ['Rita Levi-Montalcini', 'Rosalyn Yalow', 'Maria Goeppert Mayer', 'Dorothy Crowfoot Hodgkin'],
            resposta: 'Rosalyn Yalow',
            info: 'Rosalyn Yalow ganhou o Prêmio Nobel de Medicina em 1977 por seu trabalho no desenvolvimento de radioimunoensaio.'
        },
        {
            enunciado: "Quem desenvolveu as técnicas de cristalografia de raios X que levaram à descoberta da estrutura do DNA?",
            alternativas: ["Lise Meitner", "Chien-Shiung Wu", "Rosalind Franklin", "Barbara McClintock"],
            resposta: "Rosalind Franklin",
            info: "Rosalind Franklin fez contribuições cruciais para a descoberta da estrutura do DNA usando cristalografia de raios X."
        },
        {
            enunciado: "Quem descobriu os transposons (genes saltadores) em milho, ganhando o Prêmio Nobel de Fisiologia ou Medicina?",
            alternativas: ["Barbara McClintock", "Gerty Cori", 'Linda Buck', "Carol Greider"],
            resposta: "Barbara McClintock",
            info: "Barbara McClintock recebeu o Nobel em 1983 por suas descobertas sobre os transposons."
        },
        {
            enunciado: "Quem foi a bioquímica que recebeu o Prêmio Nobel por suas pesquisas sobre a glicose e o metabolismo, juntamente com seu marido Carl Cori?",
            alternativas: ["Gertrude B. Elion", "Gerty Cori", "Rita Levi-Montalcini", "Elizabeth Blackburn"],
            resposta: "Gerty Cori",
            info: "Gerty Cori ganhou o Prêmio Nobel de Fisiologia ou Medicina em 1947 por seu trabalho no ciclo de Cori, que descreve a conversão de glicose em energia no corpo."
        },
        {
            enunciado: "Quem foi a física nuclear que trabalhou na separação do isótopo de urânio-235 e participou do Projeto Manhattan?",
            alternativas: ["Lise Meitner", "Chien-Shiung Wu", "Maria Goeppert Mayer", "Leona Woods"],
            resposta: "Chien-Shiung Wu",
            info: "Chien-Shiung Wu fez contribuições importantes para o desenvolvimento da física nuclear e é conhecida por seu trabalho na verificação da teoria da paridade."
        }        
    ];

    if (prg < descobertas.length) {
        prgDescobertas++;
        return descobertas[prg];
    } else {
        return false;
    }
}

function bancoCientistaFamosas(prg) {
    const cientistaFamosas = [
        {
            enunciado: 'Quem foi a primeira mulher afro-americana a viajar para o espaço?',
            alternativas: ['Sally Ride', 'Mae Jemison', 'Katherine Johnson', 'Valentina Tereshkova'],
            resposta: 'Mae Jemison',
            info: 'Mae Jemison foi ao espaço em 1992 a bordo do ônibus espacial Endeavour.'
        },
        {
            enunciado: 'Quem descobriu o elemento rádio?',
            alternativas: ['Irène Joliot-Curie', 'Lise Meitner', 'Marie Curie', 'Rosalind Franklin'],
            resposta: 'Marie Curie',
            info: 'Marie Curie, junto com seu marido Pierre Curie, descobriu o rádio e o polônio em 1898.'
        },
        {
            enunciado: 'Quem foi a primeira mulher a ser eleita para a Academia Nacional de Ciências dos Estados Unidos?',
            alternativas: ['Barbara McClinton', 'Florence Sabin', 'Rachel Carson', 'Maria Goeppert Mayer'],
            resposta: 'Florence Sabin',
            info: 'Florence Sabin foi eleita em 1925, sendo a primeira mulher a entrar na Academia Nacional de Ciências dos EUA.'
        },
        {
            enunciado: 'Qual cientista britânica ganhou o Prêmio Nobel de Química em 1964 por suas descobertas sobre a estrutura da penicilina e da vitamina B12?',
            alternativas: ['Dorothy Crowfoot Hodgkin', 'Rosalind Franklin', 'Ada Yonath', 'Frances Arnold'],
            resposta: 'Dorothy Crowfoot Hodgkin',
            info: 'Dorothy Hodgkin fez contribuições significativas para a cristalografia de raios X, elucidando as estruturas da penicilina e da vitamina B12.'
        },
        {
            enunciado: "Quem foi a primeira mulher a ganhar um Prêmio Nobel?",
            alternativas: ["Rosalind Franklin", "Marie Curie", "Ada Lovelace", "Dorothy Hodgkin"],
            resposta: "Marie Curie",
            info: "Marie Curie ganhou o Prêmio Nobel de Física em 1903 e o de Química em 1911."
        },
        {
            enunciado: "Qual cientista britânica descobriu a estrutura do DNA, mas não recebeu o Nobel?",
            alternativas: ["Dorothy Hodgkin", "Ada Lovelace", "Rosalind Franklin", "Lise Meitner"],
            resposta: "Rosalind Franklin",
            info: "Rosalind Franklin fez descobertas cruciais sobre a estrutura do DNA, mas não foi reconhecida com o Prêmio Nobel que foi concedido a seus colegas Watson e Crick."
        },
        
        
        
    ];

    if (prg < cientistaFamosas.length) {
        prgCientistasFamosas++;
        return cientistaFamosas[prg];
    } else {
        return false;
    }
}

function bancoIniciativas(prg) {
    const iniciativasParaEquidade = [
        {
            enunciado: 'Qual organização internacional lançou a campanha "HeForShe" para promover a igualdade de gênero?',
            alternativas: ['UNESCO', 'ONU Mulheres', 'UNICEF', 'WHO'],
            resposta: 'ONU Mulheres',
            info: 'A campanha "HeForShe" foi lançada pela ONU Mulheres em 2014 para incentivar homens e meninos a se envolverem na promoção da igualdade de gênero.'
        },
        {
            enunciado: 'Qual é a iniciativa global que visa aumentar a participação das mulheres nas áreas de STEM (Ciência, Tecnologia, Engenharia e Matemática)?',
            alternativas: ['Girls Who Code', 'Women in STEM', 'STEM for Her', 'Girls in Tech'],
            resposta: 'Girls Who Code',
            info: 'Girls Who Code é uma organização que busca fechar a lacuna de gênero na tecnologia, ensinando programação para meninas.'
        },
        {
            enunciado: 'Qual programa da União Europeia visa promover a igualdade de gênero e melhorar as condições de trabalho para pesquisadores?',
            alternativas: ['Horizon 2020', 'Erasmus+', 'Marie Skłodowska-Curie Actions', 'Creative Europe'],
            resposta: 'Marie Skłodowska-Curie Actions',
            info: 'O programa Marie Skłodowska-Curie Actions apoia pesquisadores em todas as etapas de suas carreiras e promove a igualdade de gênero.'
        },
        {
            enunciado: "Qual é a meta da ONU Mulheres para alcançar a igualdade de gênero no mundo até?",
            alternativas: ["2025", "2030", "2040", "2050"],
            resposta: "2030",
            info: "A ONU Mulheres visa alcançar a igualdade de gênero e empoderar todas as mulheres e meninas até 2030, como parte dos Objetivos de Desenvolvimento Sustentável (ODS)."
        },
        {
            enunciado: "Qual programa da NASA visa incentivar mais meninas a se interessarem por ciência e tecnologia?",
            alternativas: ["STEM Girls", "Girls in Space", 'NASA GIRLS', "Women in STEM"],
            resposta: "NASA GIRLS",
            info: "O programa NASA GIRLS (e BOYS) conecta meninas e meninos do ensino fundamental com mentores da NASA para promover a educação em STEM."
        },
        {
            enunciado: "Qual organização lançou o programa 'Marie Curie Actions' para apoiar pesquisadores?",
            alternativas: ["NASA", "CERN", "European Commission", "UNESCO"],
            resposta: "European Commission",
            info: "O programa 'Marie Curie Actions' da Comissão Europeia apoia pesquisadores em todas as etapas de suas carreiras, promovendo a mobilidade e a excelência na pesquisa."
        }
    ];

    if (prg < iniciativasParaEquidade.length) {
        prgIniciativa++;
        return iniciativasParaEquidade[prg];
    } else {
        return false;
    }
}

function bancoDesigualdade(prg) {
    const desigualdadeDeGenero = [
        {
            enunciado: 'Qual é o percentual aproximado de mulheres entre os laureados com o Prêmio Nobel em Ciências (Física, Química, Medicina) até 2023?',
            alternativas: ['3%', '10%', '15%', '25%'],
            resposta: '3%',
            info: 'Até 2023, as mulheres representam cerca de 3% dos laureados com o Prêmio Nobel em Ciências.'
        },
        {
            enunciado: 'Em qual década as mulheres começaram a ser admitidas nas principais universidades de ciências nos Estados Unidos, como MIT e Caltech?',
            alternativas: ['1940s', '1950s', '1960s', '1970s'],
            resposta: '1970s',
            info: 'As principais universidades de ciências começaram a admitir mulheres em maior número na década de 1970.'
        },
        {
            enunciado: "Em média, qual é a diferença percentual de salários entre homens e mulheres em cargos de ciência e tecnologia?",
            alternativas: ["10%", "15%", "20%", "25%"],
            resposta: "20%",
            info: "Estudos mostram que, em média, mulheres ganham cerca de 20% a menos que seus colegas homens em cargos similares em ciência e tecnologia."
        },
        {
            enunciado: "Qual é o percentual aproximado de mulheres nas engenharias, segundo dados recentes?",
            alternativas: ["10%", "15%", "20%", "25%"],
            resposta: "15%",
            info: "As mulheres continuam sub-representadas nas engenharias, com cerca de 15% de participação."
        }
        
        
    ];

    if (prg < desigualdadeDeGenero.length) {
        prgDesigualdade++;
        return desigualdadeDeGenero[prg];
    } else {
        return false;
    }
}

function bancoTodas() {
    let nRandom = numberRandom();
    if (nPergunta < nTodas) {
        if (nRandom < 6 && prgDescobertas < nDescobertas) {
            return bancoDescobertas(prgDescobertas);
        } else if (nRandom < 12 && prgCientistasFamosas < nCientistasFamosas) {
            return bancoCientistaFamosas(prgCientistasFamosas);
        } else if (nRandom < 18 && prgIniciativa < nIniciativas) {
            return bancoIniciativas(prgIniciativa);
        } else if (nRandom <= 24 && prgDesigualdade < nDesigualdade) {
            return bancoDesigualdade(prgDesigualdade);
        } else {
            return bancoTodas();
        }
    } else {
        jaAcabou = true;
        acabouPerguntas();
        return false;
    }
}

function numberRandom() {
    return Math.floor(Math.random() * 24);
}
