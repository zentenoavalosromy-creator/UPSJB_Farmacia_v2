function initSidebarToggle() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);

  const isDesktop = () => window.innerWidth >= 992;

  const closeMobile = () => {
    sidebar.classList.remove('sidebar-open');
    overlay.classList.remove('show');
  };

  document.querySelectorAll('[data-sidebar-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (isDesktop()) {
        sidebar.classList.toggle('sidebar-collapsed');
      } else {
        if (sidebar.classList.contains('sidebar-open')) {
          closeMobile();
        } else {
          sidebar.classList.add('sidebar-open');
          overlay.classList.add('show');
        }
      }
    });
  });

  document.getElementById('sidebarClose')?.addEventListener('click', closeMobile);
  overlay.addEventListener('click', closeMobile);
}

function initUserDropdown() {
  const toggle = document.getElementById('userMenuToggle');
  if (!toggle) return;

  new bootstrap.Dropdown(toggle, {
    popperConfig(defaultConfig) {
      return { ...defaultConfig, strategy: 'fixed' };
    }
  });

  const chevron = toggle.querySelector('.user-menu-chevron');
  if (chevron) {
    toggle.addEventListener('show.bs.dropdown', () => chevron.classList.add('rotated'));
    toggle.addEventListener('hide.bs.dropdown', () => chevron.classList.remove('rotated'));
  }
}

function initLogoutConfirm() {
  document.getElementById('confirmLogoutBtn')?.addEventListener('click', () => {
    window.location.href = '#';
  });
}

function initTooltips() {
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
    new bootstrap.Tooltip(el);
  });
}

function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  const password = document.getElementById('loginPassword');
  const toggle = document.getElementById('togglePassword');
  toggle?.addEventListener('click', () => {
    const visible = password.type === 'text';
    password.type = visible ? 'password' : 'text';
    toggle.setAttribute('aria-label', visible ? 'Mostrar contraseña' : 'Ocultar contraseña');
    toggle.querySelector('i').className = `bi ${visible ? 'bi-eye' : 'bi-eye-slash'} text-secondary`;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('loginAlert')?.classList.add('d-none');

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    const submit = document.getElementById('loginSubmit');
    submit.disabled = true;
    submit.querySelector('.spinner-border').classList.remove('d-none');
    submit.querySelector('.btn-label').textContent = 'Ingresando...';

    // Prototipo: simula la autenticación y redirige al dashboard
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 800);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSidebarToggle();
  initUserDropdown();
  initLogoutConfirm();
  initTooltips();
  initLoginForm();
});
