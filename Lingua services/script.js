document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.primary-nav');

  if (menuToggle && navigation) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      menuToggle.setAttribute('aria-label', isExpanded ? 'فتح قائمة التنقل' : 'إغلاق قائمة التنقل');
      navigation.classList.toggle('is-open', !isExpanded);
    });

    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'فتح قائمة التنقل');
        navigation.classList.remove('is-open');
      }
    });
  }

  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const form = document.querySelector('#contact-form');
  if (!form) return;

  const status = document.querySelector('#form-status');
  const serviceSelect = form.querySelector('#service');
  const serviceFromUrl = new URLSearchParams(window.location.search).get('service');
  const availableServices = new Set(
    Array.from(serviceSelect.options, (option) => option.value).filter(Boolean)
  );
  if (serviceFromUrl && availableServices.has(serviceFromUrl)) {
    serviceSelect.value = serviceFromUrl;
  }

  form.addEventListener('input', () => {
    status.textContent = '';
    status.className = 'form-status';
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = '';
    status.className = 'form-status';

    if (!form.reportValidity()) return;

    const name = form.elements.name.value.trim();
    if (!name || !form.elements.details.value.trim()) {
      status.textContent = 'يرجى تعبئة الحقول المطلوبة قبل الإرسال.';
      status.classList.add('error');
      return;
    }

    status.textContent = `شكرًا ${name}، تم استلام طلبك بنجاح. سنتواصل معك عبر البريد الإلكتروني.`;
    status.classList.add('success');
    form.reset();
  });
});
