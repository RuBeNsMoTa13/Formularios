document.addEventListener('DOMContentLoaded', () => {
  const header = document.createElement('header');
  header.innerHTML = `
    <div class="container">
      <img src="/assets/images/LOGO BSN STRATEGY.png" alt="Logo" class="logo-header" />
      <nav>
        <ul>
          <li><a href="/index.html">Home</a></li>
          <li><a href="#about">Sobre</a></li>
          <li><a href="#contact">Contato</a></li>
        </ul>
      </nav>
    </div>
  `;
  document.body.insertBefore(header, document.body.firstChild);
});
