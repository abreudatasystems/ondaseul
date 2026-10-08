// LINKS DE AFILIADO da Ondaseul — único lugar para colar os links (um por produto e loja).
// Cole a URL entre as aspas e salve. Link vazio = o botão leva à busca pública da loja (sem comissão).
// Funciona direto no GitHub (editar este arquivo em publico/js/afiliados.js) ou rodando o gerador
// (node site-afiliado/ferramentas/construir.mjs), que lê site-afiliado/js/afiliados.js e acrescenta produtos novos.
window.ONDA_AFILIADOS = {
  "cosrx-low-ph-good-morning-gel-cleanser": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "round-lab-1025-dokdo-cleanser": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "banila-co-clean-it-zero-original": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "anua-heartleaf-pore-control-cleansing-oil": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "skin1004-centella-light-cleansing-oil": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "anua-heartleaf-77-soothing-toner": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "round-lab-1025-dokdo-toner": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "round-lab-birch-juice-moisturizing-toner": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "medicube-zero-pore-pad-2": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "cosrx-advanced-snail-96-mucin-power-essence": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "beauty-of-joseon-glow-serum-propolis-niacinamide": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "skin1004-madagascar-centella-ampoule": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "purito-wonder-releaf-centella-serum": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "anua-niacinamide-10-txa-serum": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "celimax-noni-energy-ampoule": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "cosrx-bha-blackhead-power-liquid": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "beauty-of-joseon-revive-eye-serum": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "cosrx-oil-free-ultra-moisturizing-lotion": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "illiyoon-ceramide-ato-concentrate-cream": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "cosrx-advanced-snail-92-all-in-one-cream": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "beauty-of-joseon-dynasty-cream": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "dr-althea-345-relief-cream": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "laneige-water-sleeping-mask": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "mediheal-tea-tree-essential-mask-10un": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "laneige-lip-sleeping-mask": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "beauty-of-joseon-relief-sun-rice-probiotics": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "round-lab-birch-juice-moisturizing-sunscreen": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "skin1004-hyalu-cica-water-fit-sun-serum": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "tocobo-bio-watery-sun-cream": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  },
  "tocobo-cotton-soft-sun-stick": {
    "amazon": "",
    "shopee": "",
    "mercadolivre": ""
  }
};

// Não editar abaixo: aplica os links acima aos botões (a[data-produto][data-loja]) e ao quiz.
(function () {
  var mapa = window.ONDA_AFILIADOS || {};
  function link(id, loja) { var u = (mapa[id] || {})[loja]; return /^https?:[/][/]/.test(u || '') ? u : ''; }
  (window.ONDA_PRODUTOS || []).forEach(function (p) { var u = link(p.id, p.loja); if (u) p.link = u; });
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[data-produto][data-loja]').forEach(function (a) {
      var u = link(a.getAttribute('data-produto'), a.getAttribute('data-loja'));
      if (u) { a.href = u; a.removeAttribute('data-afiliado'); }
    });
  });
})();
