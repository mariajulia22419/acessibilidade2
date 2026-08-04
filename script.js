// Variáveis do Estado do Jogo
let tamanhoFonteAtual = 16;
let missaoFonteConcluida = false;
let missaoTemaConcluida = false;

// Seleção das Telas
const telaInicial = document.getElementById('tela-inicial');
const telaJogo = document.getElementById('tela-jogo');

// Botões de Navegação
const btnIniciar = document.getElementById('btn-iniciar');
const btnReiniciar = document.getElementById('btn-reiniciar');

// Elementos de Acessibilidade
const body = document.body;
const btnAumentar = document.getElementById('btn-aumentar');
const btnDiminuir = document.getElementById('btn-diminuir');
const btnTema = document.getElementById('btn-tema');

// Missões e Telas do Desafio
const missaoFonte = document.getElementById('missao-fonte');
const missaoTema = document.getElementById('missao-tema');
const desafioGame = document.getElementById('desafio-game');
const mensagemVitoria = document.getElementById('mensagem-vitoria');
const botoesResposta = document.querySelectorAll('.btn-resposta');

// --- TROCA DE TELAS ---
btnIniciar.addEventListener('click', () => {
    telaInicial.classList.remove('ativo');
    telaJogo.classList.add('ativo');
});

btnReiniciar.addEventListener('click', () => {
    window.location.reload();
});

// --- CONTROLES DE ACESSIBILIDADE ---
function alterarFonte(delta) {
    tamanhoFonteAtual += delta;
    if (tamanhoFonteAtual < 12) tamanhoFonteAtual = 12;
    if (tamanhoFonteAtual > 24) tamanhoFonteAtual = 24;

    document.documentElement.style.setProperty('--font-size-base', `${tamanhoFonteAtual}px`);

    if (!missaoFonteConcluida) {
        missaoFonteConcluida = true;
        missaoFonte.textContent = "✅ Alterar o tamanho da fonte";
        missaoFonte.classList.add('concluido');
        verificarAcessibilidadePronta();
    }
}

btnAumentar.addEventListener('click', () => alterarFonte(2));
btnDiminuir.addEventListener('click', () => alterarFonte(-2));

btnTema.addEventListener('click', () => {
    body.classList.toggle('modo-escuro');

    if (body.classList.contains('modo-escuro')) {
        btnTema.textContent = "Ativar Modo Claro ☀️";
    } else {
        btnTema.textContent = "Ativar Modo Escuro 🌙";
    }

    if (!missaoTemaConcluida) {
        missaoTemaConcluida = true;
        missaoTema.textContent = "✅ Alternar para o Modo Escuro";
        missaoTema.classList.add('concluido');
        verificarAcessibilidadePronta();
    }
});

// --- LÓGICA DO JOGO ---
function verificarAcessibilidadePronta() {
    // Quando ajustar a fonte e o tema, libera o desafio do jogo
    if (missaoFonteConcluida && missaoTemaConcluida) {
        desafioGame.classList.remove('oculto');
    }
}

// Resposta das perguntas do jogo
botoesResposta.forEach(botao => {
    botao.addEventListener('click', (e) => {
        const respostaCorreta = e.target.getAttribute('data-correta') === 'true';

        if (respostaCorreta) {
            desafioGame.classList.add('oculto');
            mensagemVitoria.classList.remove('oculto');
        } else {
            alert('Resposta incorreta! Tente novamente.');
        }
    });
});
