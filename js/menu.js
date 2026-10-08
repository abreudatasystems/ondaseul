// Menu do cabeçalho no celular (abre/fecha, Esc fecha).
(function () {
  'use strict';
  var botao = document.querySelector('.menu-botao'), nav = document.getElementById('menu-principal');
  if (!botao || !nav) return;
  function definir(aberto) {
    nav.classList.toggle('aberto', aberto);
    botao.setAttribute('aria-expanded', String(aberto));
    botao.querySelector('.sr-only').textContent = aberto ? 'Fechar menu' : 'Abrir menu';
  }
  botao.addEventListener('click', function () { definir(!nav.classList.contains('aberto')); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('aberto')) { definir(false); botao.focus(); }
  });
})();
