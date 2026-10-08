// Lógica de rotina por tipo de pele, compartilhada pelo gerador (Node) e pelo quiz (navegador).
// Mesmas regras do quiz da loja (site/js/quiz.js), sem carrinho nem preço.
(function (raiz) {
  'use strict';

  var CATEGORIAS = {
    limpeza: 'Limpeza', tonico: 'Tônico', essencia: 'Essência', serum: 'Sérum', olhos: 'Olhos',
    hidratante: 'Hidratante', protetor: 'Protetor solar', mascara: 'Máscara'
  };
  var TIPOS_PELE = { oleosa: 'Oleosa', mista: 'Mista', seca: 'Seca', normal: 'Normal', sensivel: 'Sensível' };

  // Palavras-chave de ativos que pesam a favor de cada objetivo.
  var ATIVOS_OBJETIVO = {
    oleosidade: ['niacinamida', 'bha', 'zinco', 'argila', 'melaleuca', 'chá verde', 'houttuynia'],
    hidratacao: ['hialurônico', 'ceramida', 'caracol', 'pantenol', 'água', 'karité', 'arroz'],
    calmante: ['centella', 'madecass', 'houttuynia', 'heartleaf', 'pantenol', 'probiótico'],
    uniformidade: ['niacinamida', 'vitamina c', 'arroz', 'aha'],
    idade: ['retin', 'ginseng', 'caracol', 'peptídeo', 'ceramida']
  };

  var DESCRICAO_TIPO = {
    oleosa: 'Sua pele produz bastante oleosidade. O foco é limpar bem sem agredir e hidratar com texturas leves.',
    seca: 'Sua pele precisa de mais hidratação e de uma barreira protegida. Prefira texturas nutritivas e limpeza suave.',
    mista: 'Sua pele tem zona T mais oleosa e bochechas mais secas. Equilíbrio é a palavra: hidratação leve e controle do brilho.',
    sensivel: 'Sua pele reage com facilidade. Priorize fórmulas calmantes, poucos passos e introduza um produto novo de cada vez.',
    normal: 'Sua pele está equilibrada. O objetivo é manter: limpeza gentil, hidratação e protetor solar todos os dias.'
  };

  function tipoDePele(r) {
    if (r.sensibilidade === 'muito') return 'sensivel';
    return r.fimDoDia || 'normal';
  }

  // produtos: [{ id, nome, categoria, tipoPele[], ativos[], descricao }]; objetivo e sensibilidade opcionais.
  function montarRotina(produtos, tipo, objetivo, sensibilidade) {
    var palavras = ATIVOS_OBJETIVO[objetivo] || [];
    function pontuar(p) {
      var texto = ((p.ativos || []).join(' ') + ' ' + (p.descricao || '') + ' ' + (p.nome || '')).toLowerCase();
      var pts = palavras.filter(function (w) { return texto.indexOf(w) !== -1; }).length * 2;
      if (sensibilidade && sensibilidade !== 'nao' && /retin|bha|aha/.test(texto)) pts -= 3; // evita ativos fortes em pele reativa
      if (tipo === 'sensivel' && /retin|aha/.test(texto)) pts -= 3;
      if (objetivo !== 'oleosidade' && /\bbha\b|\baha\b|blackhead|peeling|\bpads?\b/.test(texto)) pts -= 1; // esfoliante não é passo diário padrão
      return pts;
    }
    function escolher(cat, excluir) {
      var candidatos = produtos.filter(function (p) {
        return p.categoria === cat && (p.tipoPele || []).indexOf(tipo) !== -1 && (!excluir || excluir.indexOf(p.id) === -1);
      });
      if (!candidatos.length) return null;
      return candidatos.map(function (p) { return { p: p, pts: pontuar(p) - (p.tipoPele || []).length * 0.1 }; })
        .sort(function (a, b) { return b.pts - a.pts; })[0].p; // mais específico vence o empate
    }
    var ehOleo = function (p) { return /óleo|oleo|\boil\b|balm|clean it zero/i.test(p.nome); };
    var oleos = produtos.filter(function (p) { return p.categoria === 'limpeza' && ehOleo(p); });
    var oleo = oleos.filter(function (p) { return (p.tipoPele || []).indexOf(tipo) !== -1; })[0] || null;
    var limpeza = escolher('limpeza', oleos.map(function (p) { return p.id; })) || escolher('limpeza');
    if (oleo && limpeza && oleo.id === limpeza.id) oleo = null;
    var tonico = escolher('tonico'), essencia = escolher('essencia'), serum = escolher('serum');
    var olhos = objetivo === 'idade' ? escolher('olhos') : null;
    var hidratante = escolher('hidratante'), protetor = escolher('protetor');
    var id = function (p) { return p.id; };
    return {
      tipo: tipo,
      manha: [limpeza, tonico, serum, hidratante, protetor].filter(Boolean).map(id),
      noite: [oleo, limpeza, tonico, essencia, serum, olhos, hidratante].filter(Boolean).map(id),
      duplaLimpeza: !!oleo
    };
  }

  var api = {
    CATEGORIAS: CATEGORIAS, TIPOS_PELE: TIPOS_PELE, DESCRICAO_TIPO: DESCRICAO_TIPO,
    tipoDePele: tipoDePele, montarRotina: montarRotina
  };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else raiz.ONDA_ROTINA = api;
})(this);
