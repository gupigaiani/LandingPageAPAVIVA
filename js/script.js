const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
const mobile = window.matchMedia('(max-width: 1000px)');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menu.hidden = mobile.matches;
}

// Sem JavaScript, a navegação permanece visível em qualquer tamanho de tela.
menuButton.hidden = false;
closeMenu();
mobile.addEventListener('change', closeMenu);
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menu.hidden = expanded;
});
menu.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobile.matches && !menu.hidden) {
    closeMenu();
    menuButton.focus();
  }
});

const form = document.querySelector('form');
const status = document.querySelector('.form-status');
const nameField = document.querySelector('#nome');
const messageField = document.querySelector('#mensagem');
form.querySelector('button').disabled = false;

function validateText(field, minimum, message) {
  field.setCustomValidity(field.value.trim().length < minimum ? message : '');
}

nameField.addEventListener('input', () => validateText(nameField, 2, 'Informe um nome com pelo menos 2 caracteres.'));
messageField.addEventListener('input', () => validateText(messageField, 10, 'Escreva uma mensagem com pelo menos 10 caracteres.'));
form.addEventListener('input', () => { status.textContent = ''; });
form.addEventListener('submit', (event) => {
  event.preventDefault();
  validateText(nameField, 2, 'Informe um nome com pelo menos 2 caracteres.');
  validateText(messageField, 10, 'Escreva uma mensagem com pelo menos 10 caracteres.');
  if (!form.reportValidity()) return;
  // A demonstração termina no navegador: não há requisição ou armazenamento.
  status.textContent = 'Tudo certo! Sua mensagem foi validada nesta demonstração. Nenhum dado foi enviado ou armazenado.';
  form.reset();
});

document.querySelectorAll('[data-subject]').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelector('#assunto').value = link.dataset.subject;
    status.textContent = '';
  });
});
document.querySelectorAll('[data-social]').forEach((link) => {
  link.addEventListener('click', () => document.querySelector('#social-note').focus({ preventScroll: true }));
});
