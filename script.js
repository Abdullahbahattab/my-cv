// jQuery click event and slide effect, with a plain JavaScript fallback.
function setDetailsButton(isOpen) {
  const button = document.querySelector('#detailsButton');
  button.setAttribute('aria-expanded', isOpen);
  button.textContent = isOpen ? 'Show less' : 'Show a little more';
}

if (window.jQuery) {
  $(function () {
    const details = $('#extraDetails');
    const detailsButton = $('#detailsButton');
    details.hide();

    detailsButton.on('click', function () {
      details.stop(true, true).slideToggle(220, function () {
        setDetailsButton(details.is(':visible'));
      });
    });
  });
} else {
  const details = document.querySelector('#extraDetails');
  const detailsButton = document.querySelector('#detailsButton');
  detailsButton.addEventListener('click', function () {
    const isOpen = details.classList.toggle('is-open');
    setDetailsButton(isOpen);
  });
}

// Use Bootstrap's mobile menu when available, with a small fallback for offline use.
const menuButton = document.querySelector('.navbar-toggler');
const menu = document.querySelector('#mainNavigation');
if (menuButton && menu && !window.bootstrap) {
  menuButton.addEventListener('click', function () {
    const isOpen = menu.classList.toggle('show');
    menuButton.setAttribute('aria-expanded', isOpen);
  });
}

// Prepare the contact email from the form values.
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.querySelector('#full-name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const subject = document.querySelector('#subject').value.trim();
    const message = document.querySelector('#message').value.trim();
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const params = new URLSearchParams({ subject: subject, body: body });
    const query = params.toString().replace(/\+/g, '%20');
    document.querySelector('#formStatus').textContent = 'Opening your email app...';
    window.location.href = `mailto:abo.ahmed.m.bahattab@gmail.com?${query}`;
  });
}
