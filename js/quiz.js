// Quiz "Monte sua rotina" do site de conteúdo: 3 perguntas -> tipo de pele provável e rotina manhã/noite
// com os links das lojas parceiras. Dados em data/produtos.js (gerado); regras em js/rotina.js.
(function () {
  'use strict';
  var R = window.ONDA_ROTINA, PRODUTOS = window.ONDA_PRODUTOS || [];
  var CHAVE = 'onda_quiz';

  var PERGUNTAS = [
    { id: 'fimDoDia', titulo: 'Como sua pele fica no fim do dia, sem nada aplicado?', opcoes: [
      { v: 'oleosa', t: 'Brilhante no rosto todo', d: 'Sinto oleosidade na testa, nariz, queixo e bochechas.' },
      { v: 'mista', t: 'Brilho só na zona T', d: 'Testa e nariz oleosos; bochechas normais ou secas.' },
      { v: 'seca', t: 'Repuxando ou áspera', d: 'Sinto a pele apertada, às vezes descamando.' },
      { v: 'normal', t: 'Confortável', d: 'Nem oleosa, nem seca na maior parte do tempo.' }
    ] },
    { id: 'sensibilidade', titulo: 'Sua pele fica vermelha, arde ou coça com produtos novos?', opcoes: [
      { v: 'muito', t: 'Sim, com frequência' },
      { v: 'as-vezes', t: 'Às vezes, com produtos mais fortes' },
      { v: 'nao', t: 'Quase nunca' }
    ] },
    { id: 'objetivo', titulo: 'O que você mais quer melhorar agora?', opcoes: [
      { v: 'oleosidade', t: 'Oleosidade e poros aparentes' },
      { v: 'hidratacao', t: 'Hidratação e viço' },
      { v: 'calmante', t: 'Vermelhidão e sensibilidade' },
      { v: 'uniformidade', t: 'Manchinhas e tom irregular' },
      { v: 'idade', t: 'Primeiros sinais de idade' }
    ] }
  ];

  var respostas = {}, atual = 0;
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function produto(id) { return PRODUTOS.filter(function (p) { return p.id === id; })[0]; }
  function gravar(v) { try { localStorage.setItem(CHAVE, JSON.stringify(v)); } catch (e) { /* modo privado */ } }
  function ler() { try { return JSON.parse(localStorage.getItem(CHAVE)); } catch (e) { return null; } }
  function apagar() { try { localStorage.removeItem(CHAVE); } catch (e) { /* ignora */ } }

  function render() {
    var area = document.getElementById('quiz'), q = PERGUNTAS[atual], n = PERGUNTAS.length;
    area.innerHTML =
      '<h1>Monte sua rotina</h1>' +
      '<div class="quiz__progresso"><p class="texto-suave" id="progresso-texto">Pergunta ' + (atual + 1) + ' de ' + n + '</p>' +
      '<progress max="' + n + '" value="' + (atual + 1) + '" aria-labelledby="progresso-texto"></progress></div>' +
      '<form id="form-quiz" novalidate><fieldset class="quiz__pergunta"><legend tabindex="-1" id="pergunta-atual">' + esc(q.titulo) + '</legend>' +
      '<div class="quiz__opcoes">' + q.opcoes.map(function (o) {
        return '<label class="quiz__opcao"><input type="radio" name="' + q.id + '" value="' + o.v + '"' +
          (respostas[q.id] === o.v ? ' checked' : '') + ' required>' +
          '<span><strong>' + esc(o.t) + '</strong>' + (o.d ? '<small>' + esc(o.d) + '</small>' : '') + '</span></label>';
      }).join('') + '</div></fieldset>' +
      '<p class="erro" id="erro-quiz" role="alert"></p>' +
      '<div class="quiz__navegacao">' +
      (atual > 0 ? '<button class="botao botao--claro" type="button" id="voltar">Voltar</button>' : '<span></span>') +
      '<button class="botao" type="submit">' + (atual === n - 1 ? 'Ver minha rotina' : 'Próxima') + '</button>' +
      '</div></form>';
    var form = document.getElementById('form-quiz');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var marcado = form.querySelector('input:checked');
      if (!marcado) {
        document.getElementById('erro-quiz').textContent = 'Escolha uma opção para continuar.';
        form.querySelector('input').focus();
        return;
      }
      respostas[q.id] = marcado.value;
      if (atual < n - 1) { atual++; render(); focar('pergunta-atual'); }
      else { gravar(respostas); mostrarResultado(respostas); }
    });
    var voltar = document.getElementById('voltar');
    if (voltar) voltar.addEventListener('click', function () { atual--; render(); focar('pergunta-atual'); });
  }

  function focar(id) { var el = document.getElementById(id); if (el) el.focus(); }

  function passos(ids) {
    return '<ol class="passos">' + ids.map(function (id) {
      var p = produto(id);
      if (!p) return '';
      return '<li><a href="' + esc(p.pagina) + '">' + esc(p.marca + ' ' + p.nome) + '</a> <span class="texto-suave">(' +
        esc(R.CATEGORIAS[p.categoria] || p.categoria) + ')</span> · ' +
        '<a class="link-afiliado" href="' + esc(p.link) + '" target="_blank" rel="sponsored nofollow noopener">' + esc(p.rotuloLink) +
        '<span class="sr-only"> (abre em nova aba)</span></a></li>';
    }).join('') + '</ol>';
  }

  function mostrarResultado(r) {
    var tipo = R.tipoDePele(r);
    var rot = R.montarRotina(PRODUTOS, tipo, r.objetivo, r.sensibilidade);
    var area = document.getElementById('quiz');
    area.innerHTML =
      '<h1 tabindex="-1" id="titulo-resultado">Sua pele provável: ' + esc(R.TIPOS_PELE[tipo].toLowerCase()) + '</h1>' +
      '<p>' + esc(R.DESCRICAO_TIPO[tipo]) + '</p>' +
      '<p class="texto-suave">Resultado orientativo, não substitui avaliação dermatológica. Teste cada produto novo numa pequena área antes.</p>' +
      '<div class="rotinas rotinas--duas">' +
      '<section class="rotina" aria-labelledby="t-manha"><h2 id="t-manha">☀ Manhã</h2>' + passos(rot.manha) + '</section>' +
      '<section class="rotina" aria-labelledby="t-noite"><h2 id="t-noite">☾ Noite</h2>' + passos(rot.noite) +
      (rot.duplaLimpeza ? '<p>Dupla limpeza: primeiro o bálsamo/óleo, que tira protetor e maquiagem; depois a limpeza com água.</p>' : '') +
      '</section></div>' +
      '<p class="aviso-afiliado">Links de afiliado: se você comprar por eles, a Ondaseul pode receber uma comissão, sem custo extra para você. <a href="transparencia.html">Saiba mais</a>.</p>' +
      '<p class="acoes"><a class="botao" href="rotinas/' + tipo + '.html">Ver o guia completo para pele ' + esc(R.TIPOS_PELE[tipo].toLowerCase()) + '</a> ' +
      '<button class="botao botao--claro" type="button" id="refazer">Refazer o quiz</button></p>';
    focar('titulo-resultado');
    document.getElementById('refazer').addEventListener('click', function () {
      respostas = {}; atual = 0; apagar(); render(); focar('pergunta-atual');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var salvo = ler();
    if (salvo && salvo.fimDoDia && salvo.sensibilidade && salvo.objetivo) { respostas = salvo; mostrarResultado(salvo); }
    else render();
  });
})();
