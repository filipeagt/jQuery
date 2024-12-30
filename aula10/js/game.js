// VARÁVEIS DE CONTROLE DO JOGO
let perguntasFeitas = [];

// PERGUNTAS DO JOGO
const perguntas = [
    // PERGUNTA 0
    {
        pergunta: 'Qual dessas linguagens não é considerada uma linguagem de programação?',
        respostas: ['PHP', 'JavaScript', 'C++', 'HTML'],
        correta: 'resp3'
    },
    // PERGUNTA 1
    {
        pergunta: 'Em que ano o Brasil foi descoberto?',
        respostas: ['1498', '1500', '1375', '1828'],
        correta: 'resp1'
    },
    // PERGUNTA 2
    {
        pergunta: 'O que significa a sigla HTML?',
        respostas: ['Hyper Tonto Maluco Legal', 'Hyper Text Markup Language', 'Hey Trade More Language', 'Hyper Text Mark Lang'],
        correta: 'resp1'
    },
    // PERGUNTA 3
    {
        pergunta: 'Quais destas linguagens é considerada uma linguagem de marcação?',
        respostas: ['HTML', 'PHP', 'C++', 'JavaScript'],
        correta: 'resp0'
    },
    // PERGUNTA 4
    {
        pergunta: 'Quantas vezes o Brasil não foi para a copa?',
        respostas: ['Sempre foi', '2', '3', '1'],
        correta: 'resp0'
    }
]

var qtdPerguntas = perguntas.length - 1;
gerarPergunta(qtdPerguntas);

function gerarPergunta(maxPerguntas) {
    // GERAR UM NÚMERO ALEATÓRIO
    let aleatorio = Math.round(Math.random() * maxPerguntas);
    // MOSTRAR NO CONSOLE QUAL FOI A PERGUNTA SORTEADA
    console.log(`A pergunta sorteada foi a ${aleatorio}`);

    // VERIFICAR SE APERGUNTA SORTEADA JÁ FOI FEITA
    if(!perguntasFeitas.includes(aleatorio)) {
        // COLOCAR COMO PERGUNTA FEITA
        perguntasFeitas.push(aleatorio);

        // PREENCHER O HTML COM OS DADOS DA QUESTÃO SORTEADA
        var pSelecionada = perguntas[aleatorio].pergunta;
        console.log(pSelecionada);

        // ALIMENTAR A PERGUNTA VINDA DO SORTEIO
        $('#pergunta').html(pSelecionada);
        $('#pergunta').attr('data-indice', aleatorio);

        // COLOCAR AS RESPOSTAS
        for(let i = 0 ; i <= qtdPerguntas ; i++) {
            $('#resp' + i).html(perguntas[aleatorio].respostas[i]);
        }

        //EMBARALHAR AS RESPOSTAS
        var pai = $('#respostas');
        var botoes = pai.children();

        for(let i = 1 ; i < botoes.length ; i++) {
            pai.append(botoes.eq(Math.floor(Math.random() * botoes.length)));
        }
    } else {
        // SE APERGUNTA JÁ FOI FEITA
        console.log('Apergunta já foi feita. Sorteando novamente...')
        if(perguntasFeitas.length <= qtdPerguntas) {
            return gerarPergunta(maxPerguntas);
        } else {
            console.log('Acabaram as perguntas');
            $('#quiz').addClass('oculto');
            $('#mensagem').html('Prabéns você venceu!')
            $('#status').removeClass('oculto');
        }
    }
}

$('.resposta').click(function() {
    if($('#quiz').attr('data-status') !== 'travado') {
        resetaBotoes();

        // ADICIONAR A CLASSE SELECIONADA
        $(this).addClass('selecionada');
    }    
});

$('#confirm').click(function() {
    // PEGAR O ÍNDICE DA PERGUNTA
    var indice = $('#pergunta').attr('data-indice');
    
    // QULA É A RESPOSTA CERTA
    var respCerta = perguntas[indice].correta;


    //RESPOSTA SELECIONADA PELO USUÁRIO
    $('.resposta').each(function() {
        if($(this).hasClass('selecionada')) {
            var respostaEscolhida = $(this).attr('id');

            if(respCerta == respostaEscolhida) {
                console.log('Acertou mizeravi!');
                proximaPergunta();
            } else {
                console.log('Erroooooou!');
                $('#quiz').attr('data-status', 'travado');
                $('#confirm').addClass('oculto');
                $('#' + respCerta).addClass('correta');
                $('#' + respostaEscolhida).removeClass('selecionada');
                $('#' + respostaEscolhida).addClass('errada');
                // 4 segundos para dar game over
                setTimeout(function(){
                    gameOver();
                }, 4000);
            }
        }
    });
});

function newGame() {
    $('#confirm').removeClass('oculto');
    $('#quiz').attr('data-status', 'ok');
    perguntasFeitas = []
    resetaBotoes();
    gerarPergunta(qtdPerguntas);
    $('#status').addClass('oculto');
    $('#quiz').removeClass('oculto');
}

function proximaPergunta() {
    resetaBotoes();
    gerarPergunta(qtdPerguntas);
}

function resetaBotoes() {
    // PERCORRE TODAS AS RESPOSTAS E DESMARCA CLASSE SELCIONADA
    $('.resposta').each(function() {
        if($(this).hasClass('selecionada')) {
            $(this).removeClass('selecionada');
        }
        if($(this).hasClass('correta')) {
            $(this).removeClass('correta');
        }
        if($(this).hasClass('errada')) {
            $(this).removeClass('errada');
        }
    });
}

function gameOver() {
    $('#quiz').addClass('oculto');
    $('#mensagem').html('Game Over!')
    $('#status').removeClass('oculto');
}

$('#novoJogo').click(function() {
    newGame();
});