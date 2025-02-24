document.addEventListener('DOMContentLoaded', () => {
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <div class="container">
      <img src="/public/assets/images/LOGO BSN STRATEGY.png" alt="Footer Logo" />
      <div class="footer-info">
        <p>&copy; 2025 Sua Empresa. Todos os direitos reservados.</p>
        <p>Email: contato@empresa.com | Tel: (11) 1234-5678</p>
        <div class="social-links">
          <a href="#"><img src="/public/assets/images/linkedin-icon.png" alt="LinkedIn" /></a>
          <a href="#"><img src="/public/assets/images/instagram-icon.png" alt="Instagram" /></a>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(footer);
});
