import { setupDemoSend } from './demo-send.js';
import { setupNavigation } from './navigation.js';
import { setupEntrance } from './entrance.js';
import { categories, references, doctors, clinics } from './data.js';
import { Spring } from './spring.js';


const root = document.documentElement;
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
let reduceMotion = motionQuery.matches;
motionQuery.addEventListener('change', () => { reduceMotion = motionQuery.matches; });

const icon = (name) => `<svg class="i" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, reduceMotion ? 0 : ms));

// Decode offscreen; keep the current asset when a replacement cannot load.
async function readyImage(src) {
  const image = new Image();
  image.src = src;
  try { await image.decode(); } catch { return null; }
  return image;
}

root.classList.add('js');

/* ---------- Entrance ---------- */

function reveal() {
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('is-ready')));
}
const heroImage = $('.hero-media img');
Promise.race([
  Promise.all([document.fonts.ready, heroImage.complete ? Promise.resolve() : new Promise((r) => heroImage.addEventListener('load', r, { once: true }))]),
  new Promise((r) => setTimeout(r, 900)),
]).then(reveal);

/* ---------- Treatment menu ---------- */

const tabs = $$('.tabs .tab');
const tabsWrap = $('.tabs');
const thumb = $('.tab-thumb');
const panel = $('#menu-panel');
const list = $('#menu-list');
const groupsWrap = $('#menu-groups');
const menuMedia = $('.menu-media');
const menuImage = $('#menu-image');
let currentCategory = 'surgery';
let requestedCategory = currentCategory;
let currentGroup = categories.surgery.groups[0];

// The selected segment's thumb glides with two independent springs (position and width).
const thumbX = new Spring(0, { response: 0.36, damping: 0.86, precision: 0.2, onUpdate: (v) => { thumb.style.transform = `translateX(${v}px)`; } });
const thumbW = new Spring(0, { response: 0.36, damping: 0.86, precision: 0.2, onUpdate: (v) => { thumb.style.width = `${v}px`; } });

function placeIndicator({ animate = true } = {}) {
  const tab = tabs.find((t) => t.dataset.category === currentCategory);
  const x = tab.offsetLeft;
  const w = tab.offsetWidth;
  if (!animate || reduceMotion || !thumb.style.width) { thumbX.jump(x); thumbW.jump(w); return; }
  thumbX.to(x);
  thumbW.to(w);
}

function rowMarkup(item, index, category) {
  const n = String(index + 1).padStart(2, '0');
  const id = `row-${item.id}`;
  const isInfo = category === 'wellness';
  const facts = isInfo ? '' : `
      <span class="row-fact">${escapeHTML(item.time)}</span>
      <span class="row-fact">${escapeHTML(item.recovery)}</span>
      <span class="row-fact">${escapeHTML(item.sessions)}</span>`;
  const sessionsNote = category === 'skin' ? ` Sessions: ${escapeHTML(item.sessions)}.` : '';
  const meta = isInfo ? '' : `<span class="row-meta">Time in clinic: ${escapeHTML(item.time)}. Recovery guide: ${escapeHTML(item.recovery)}.${sessionsNote}</span>`;
  const mobileFacts = isInfo ? '' : `
        <dl class="row-facts">
          <dt>Time in clinic</dt><dd>${escapeHTML(item.time)}</dd>
          <dt>Recovery guide</dt><dd>${escapeHTML(item.recovery)}</dd>
          <dt>Sessions</dt><dd>${escapeHTML(item.sessions)}</dd>
        </dl>`;
  const sessions = '';
  const refs = (references[category] || []).map((r) => `<a href="${r.href}" target="_blank" rel="noopener noreferrer">${escapeHTML(r.label)} ${icon('arrow-up-right')}</a>`).join('');
  return `
    <div class="row" data-id="${item.id}">
      <button class="row-trigger" type="button" aria-expanded="false" aria-controls="${id}">
        <span class="row-n">${n}</span>
        <span><span class="row-name">${escapeHTML(item.name)}</span>${meta}</span>${facts}
        <span class="row-icon">${icon('plus')}</span>
      </button>
      <div class="row-body" id="${id}" role="region" aria-label="${escapeHTML(item.name)}" inert>
        <div><div class="row-inner">
          <p>${escapeHTML(item.summary)}</p>${mobileFacts}
          <div class="row-cols">
            <section><h4>${isInfo ? 'Questions to ask' : 'Your consultation'}</h4><p>${escapeHTML(item.consult)}</p></section>
            <section><h4>${isInfo ? 'Before you decide' : 'Planning and aftercare'}</h4><p>${escapeHTML(item.plan)}</p></section>
          </div>
          <div class="row-foot">
            <button class="btn btn-ghost" type="button" data-book data-interest="${escapeHTML(categories[category].interest)}">Request a consultation</button>
            ${sessions}
          </div>
          <div class="row-refs">${refs}</div>
        </div></div>
      </div>
    </div>`;
}

function renderMenuGroup(group, { animate = false } = {}) {
  const cat = categories[currentCategory];
  if (cat.groups.length && !cat.groups.includes(group)) return;
  currentGroup = group;
  $$('[data-group]', groupsWrap).forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.group === group));
  });
  const items = cat.groups.length ? cat.items.filter(item => item.group === group) : cat.items;
  const columns = '<div class="menu-columns" aria-hidden="true"><span>Treatment</span><span>Time in clinic</span><span>Recovery guide</span><span>Sessions</span><span></span></div>';
  list.innerHTML = columns + items.map(item => rowMarkup(item, cat.items.indexOf(item), currentCategory)).join('');
  if (animate && !reduceMotion) {
    list.getAnimations().forEach(animation => animation.cancel());
    list.animate([{ transform: 'translateY(5px)' }, { transform: 'none' }], { duration: 240, easing: 'cubic-bezier(.22,1,.36,1)' });
  }
}

function renderMenu(category) {
  const cat = categories[category];
  $('#menu-category').textContent = cat.title;
  $('#menu-intro').textContent = cat.intro;
  panel.classList.toggle('is-info', category === 'wellness');
  panel.setAttribute('aria-labelledby', 'tab-' + category);
  groupsWrap.hidden = !cat.groups.length;
  groupsWrap.innerHTML = cat.groups.map(group => {
    const count = cat.items.filter(item => item.group === group).length;
    return '<button class="menu-group" type="button" data-group="' + escapeHTML(group) + '" aria-pressed="false" aria-controls="menu-list">' + escapeHTML(group) + '<span>' + count + '</span></button>';
  }).join('');
  renderMenuGroup(cat.groups[0]);
}

groupsWrap.addEventListener('click', event => {
  const button = event.target.closest('[data-group]');
  if (button && button.dataset.group !== currentGroup) renderMenuGroup(button.dataset.group, { animate: true });
});
groupsWrap.addEventListener('keydown', event => {
  const buttons = $$('[data-group]', groupsWrap);
  const index = buttons.indexOf(event.target);
  if (index < 0) return;
  const keys = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: buttons.length - 1 };
  if (!(event.key in keys)) return;
  event.preventDefault();
  const next = buttons[(keys[event.key] + buttons.length) % buttons.length];
  next.focus({ preventScroll: true });
  renderMenuGroup(next.dataset.group, { animate: true });
});

function setRowOpen(row, open) {
  const trigger = $('.row-trigger', row);
  const body = $('.row-body', row);
  row.classList.toggle('is-open', open);
  trigger.setAttribute('aria-expanded', String(open));
  body.inert = !open;
}

list.addEventListener('click', (event) => {
  const trigger = event.target.closest('.row-trigger');
  if (!trigger) return;
  const row = trigger.closest('.row');
  const willOpen = !row.classList.contains('is-open');
  $$('.row.is-open', list).forEach((other) => { if (other !== row) setRowOpen(other, false); });
  setRowOpen(row, willOpen);
});

async function setCategory(category, { focus = false } = {}) {
  if (category === requestedCategory || !categories[category]) return;
  requestedCategory = category;
  const cat = categories[category];
  const next = await readyImage(category === 'surgery' ? '/assets/menu-surgical-tall-887.webp' : `/assets/${cat.image}-1000.webp`);
  if (category !== requestedCategory) return;
  if (!next) { requestedCategory = currentCategory; return; }
  currentCategory = category;
  tabs.forEach((tab) => {
    const active = tab.dataset.category === category;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && focus) tab.focus();
  });
  placeIndicator();
  renderMenu(category);
  menuImage.src = next.src;
  menuImage.alt = cat.alt;
  menuImage.dataset.category = category;
}

tabs.forEach((tab) => tab.addEventListener('click', () => setCategory(tab.dataset.category)));
tabsWrap.addEventListener('keydown', (event) => {
  const index = tabs.findIndex((t) => t.dataset.category === requestedCategory);
  const keys = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: tabs.length - 1 };
  if (!(event.key in keys)) return;
  event.preventDefault();
  const next = tabs[(keys[event.key] + tabs.length) % tabs.length];
  setCategory(next.dataset.category, { focus: true });
});

renderMenu(currentCategory);
placeIndicator({ animate: false });
new ResizeObserver(() => placeIndicator({ animate: false })).observe(tabsWrap);
document.fonts.ready.then(() => placeIndicator({ animate: false }));



/* Size the photo once per available width, from all collapsed treatment groups. */
let measuredMenuWidth = 0;
function sizeMenuImage() {
  const width = Math.round(panel.getBoundingClientRect().width);
  if (!width || width === measuredMenuWidth || getComputedStyle(menuMedia).display === 'none') return;
  measuredMenuWidth = width;
  const probe = document.createElement('div');
  probe.className = 'menu-panel menu-probe';
  probe.inert = true;
  probe.setAttribute('aria-hidden', 'true');
  probe.style.width = width + 'px';
  menuMedia.parentElement.append(probe);
  let height = 0;
  for (const [key, cat] of Object.entries(categories)) {
    probe.classList.toggle('is-info', key === 'wellness');
    const groups = cat.groups.length ? cat.groups : [''];
    for (const group of groups) {
      const items = cat.groups.length ? cat.items.filter(item => item.group === group) : cat.items;
      const groupControls = cat.groups.length ? '<div class="menu-groups">' + cat.groups.map(name => '<button class="menu-group">' + escapeHTML(name) + '<span>' + cat.items.filter(item => item.group === name).length + '</span></button>').join('') + '</div>' : '';
      probe.innerHTML = '<div class="menu-panel-head"><h3>' + escapeHTML(cat.title) + '</h3><p>' + escapeHTML(cat.intro) + '</p></div>' + groupControls + '<div class="menu-list"><div class="menu-columns"><span>Treatment</span><span>Time in clinic</span><span>Recovery guide</span><span>Sessions</span><span></span></div>' + items.map(item => rowMarkup(item, cat.items.indexOf(item), key)).join('') + '</div>';
      probe.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
      height = Math.max(height, probe.getBoundingClientRect().height);
    }
  }
  probe.remove();
  menuMedia.parentElement.style.setProperty('--menu-stack-height', Math.ceil(height) + 'px');
}
new ResizeObserver(() => requestAnimationFrame(sizeMenuImage)).observe(panel);
document.fonts.ready.then(() => { measuredMenuWidth = 0; sizeMenuImage(); });

/* ---------- Consultation walkthrough ---------- */

function selectVisitFormat(format) {
  if (format !== 'clinic' && format !== 'video') return;
  $$('[data-visit-format]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.visitFormat === format)));
  $$('[data-visit-steps]').forEach(steps => { steps.hidden = steps.dataset.visitSteps !== format; });
  const request = $('#visit-request');
  request.dataset.format = format;
  request.textContent = format === 'video' ? 'Request a video consultation' : 'Request a consultation';
}
$$('[data-visit-format]').forEach(button => button.addEventListener('click', () => selectVisitFormat(button.dataset.visitFormat)));

/* ---------- Clinic gallery ---------- */

let requestedClinic = 'makati';
async function showClinic(key) {
  if (!Object.hasOwn(clinics, key) || key === requestedClinic) return;
  requestedClinic = key;
  const image = $(`[data-clinic-panel="${key}"] img`);
  const next = await readyImage(image.currentSrc || image.src);
  if (key !== requestedClinic) return;
  if (!next) {
    requestedClinic = $('[data-clinic-choice][aria-pressed="true"]').dataset.clinicChoice;
    return;
  }
  $$('[data-clinic-panel]').forEach(panel => { panel.hidden = panel.dataset.clinicPanel !== key; });
  $$('[data-clinic-choice]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.clinicChoice === key)));
}
$$('[data-clinic-choice]').forEach(button => button.addEventListener('click', () => showClinic(button.dataset.clinicChoice)));

/* ---------- Doctors ---------- */

const doctorImage = $('#doctor-image');
let currentDoctor = 0;

async function showDoctor(index) {
  const d = doctors[index];
  if (!d || index === currentDoctor) return;
  currentDoctor = index;
  const next = await readyImage(`/assets/${d.image}-800.webp`);
  if (index !== currentDoctor) return;
  if (!next) { currentDoctor = Number($('.doctor-pick[aria-pressed="true"]').dataset.doctor); return; }
  doctorImage.src = next.src;
  doctorImage.alt = `Illustrative portrait for ${d.name}.`;
  $('#doctor-name').textContent = d.name;
  $('#doctor-role').textContent = d.role;
  $('#doctor-bio').textContent = d.bio;
  $('#doctor-focus').innerHTML = d.focus.map((f) => `<li>${escapeHTML(f)}</li>`).join('');
  $$('[data-doctor]').forEach((btn) => btn.setAttribute('aria-pressed', String(Number(btn.dataset.doctor) === index)));
}

$$('[data-doctor]').forEach((btn) => btn.addEventListener('click', () => showDoctor(Number(btn.dataset.doctor))));

/* ---------- Dialog helpers ---------- */

let lastOpener = null;
const isPhone = () => window.matchMedia('(max-width: 760px)').matches;

// Booking sheet: one spring drives its presence from 0 (gone) to 1 (fully in place).
// It enters and leaves along the same path, and can be grabbed or reversed mid-flight.
const sheet = $('#booking');
const sheetProgress = new Spring(0, {
  response: 0.4,
  damping: 0.9,
  precision: 0.002,
  onUpdate: (p) => {
    const clamped = Math.max(0, p);
    sheet.style.setProperty('--p', Math.min(1, clamped).toFixed(4));
    if (isPhone()) {
      const h = sheet.offsetHeight || window.innerHeight;
      sheet.style.transform = `translate3d(0, ${((1 - p) * h).toFixed(2)}px, 0)`;
      sheet.style.opacity = '1';
      sheet.style.filter = '';
    } else {
      sheet.style.transform = `translate3d(0, ${((1 - p) * 28).toFixed(2)}px, 0) scale(${(0.955 + 0.045 * p).toFixed(4)})`;
      sheet.style.opacity = Math.min(1, clamped).toFixed(4);
      sheet.style.filter = p < 0.98 ? `blur(${((1 - Math.min(1, clamped)) * 8).toFixed(2)}px)` : '';
    }
  },
  onRest: (p) => {
    if (p === 0 && sheet.open) { sheet.close(); }
  },
});

function openDialog(dialog, opener) {
  lastOpener = opener || document.activeElement;
  if (!dialog.open) dialog.showModal();
  dialog.classList.remove('is-closing');
  document.body.style.overflow = 'hidden';
  if (dialog === sheet) {
    if (reduceMotion) { sheetProgress.jump(1); return; }
    if (sheetProgress.value <= 0.001) sheetProgress.jump(0);
    sheetProgress.to(1, isPhone() ? { response: 0.42, damping: 0.86 } : { response: 0.4, damping: 0.9 });
  }
}

async function closeDialog(dialog, { velocity } = {}) {
  if (!dialog.open) return;
  if (dialog === sheet) {
    if (reduceMotion) { sheetProgress.jump(0); sheet.close(); return; }
    sheetProgress.to(0, { response: 0.32, damping: 1, velocity });
    return;
  }
  if (dialog.classList.contains('is-closing')) return;
  dialog.classList.add('is-closing');
  await wait(160);
  dialog.classList.remove('is-closing');
  dialog.close();
}

// Drag the booking sheet down to dismiss on phones, tracking the finger 1:1.
const grab = $('.sheet-grab', sheet);
let drag = null;
function startDrag(event) {
  if (!isPhone() || event.button > 0) return;
  if (event.target.closest('input, select, textarea, button, label, a')) return;
  if (event.currentTarget !== grab && sheet.scrollTop > 0) return;
  drag = { y: event.clientY, start: sheetProgress.value, h: sheet.offsetHeight, samples: [[performance.now(), event.clientY]], id: event.pointerId };
  sheetProgress.jump(sheetProgress.value);
  event.currentTarget.setPointerCapture(event.pointerId);
}
function moveDrag(event) {
  if (!drag || event.pointerId !== drag.id) return;
  let dy = event.clientY - drag.y;
  if (dy < 0) dy = -Math.sqrt(-dy) * 4; // rubber-band past the top
  sheetProgress.jump(drag.start - dy / drag.h);
  drag.samples.push([performance.now(), event.clientY]);
  if (drag.samples.length > 6) drag.samples.shift();
}
function endDrag(event) {
  if (!drag || event.pointerId !== drag.id) return;
  const [t0, y0] = drag.samples[0];
  const [t1, y1] = drag.samples[drag.samples.length - 1];
  const velocityPx = t1 > t0 ? ((y1 - y0) / (t1 - t0)) * 1000 : 0;
  const pVelocity = -velocityPx / drag.h;
  const dismiss = velocityPx > 700 || (sheetProgress.value < 0.72 && velocityPx > -300);
  drag = null;
  if (dismiss) closeDialog(sheet, { velocity: pVelocity });
  else sheetProgress.to(1, { response: 0.36, damping: 0.82, velocity: pVelocity });
}
[grab, sheet].forEach((el) => {
  el.addEventListener('pointerdown', startDrag);
  el.addEventListener('pointermove', moveDrag);
  el.addEventListener('pointerup', endDrag);
  el.addEventListener('pointercancel', endDrag);
});

$$('dialog').forEach((dialog) => {
  dialog.addEventListener('cancel', (event) => { event.preventDefault(); closeDialog(dialog); });
  dialog.addEventListener('click', (event) => {
    if (event.target.closest('[data-close]')) closeDialog(dialog);
    else if (event.target === dialog) {
      const r = dialog.getBoundingClientRect();
      const outside = event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom;
      if (outside) closeDialog(dialog);
    }
  });
  dialog.addEventListener('close', () => {
    if ($$('dialog').some((d) => d.open)) return;
    document.body.style.overflow = '';
    if (lastOpener && document.contains(lastOpener) && lastOpener.getClientRects().length) lastOpener.focus({ preventScroll: true });
  });
});

/* ---------- Mobile navigation ---------- */

const navSheet = $('#nav-sheet');
const navToggle = $('.nav-toggle');
navToggle.addEventListener('click', () => {
  navToggle.setAttribute('aria-expanded', 'true');
  openDialog(navSheet, navToggle);
});
navSheet.addEventListener('close', () => navToggle.setAttribute('aria-expanded', 'false'));
/* ---------- Booking ---------- */

const booking = $('#booking');
const form = $('#booking-form');
const progressItems = $$('.booking-progress li');
const dateInput = $('#f-date');
let currentStep = 1;
const resetDemoSend = setupDemoSend({
  dialog: booking, button: $('[data-send]', form), review: $('#send-review'), confirmation: $('#send-confirmation'),
  stage: $('#send-stage'), heading: $('#send-heading-sent'), progress: progressItems[2],
  reducedMotion: () => reduceMotion, close: closeDialog,
});

function localISODate(date) {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function setStep(step) {
  currentStep = step;
  $$('.booking-step', form).forEach((el) => {
    const active = Number(el.dataset.step) === step;
    el.hidden = !active;
    el.classList.toggle('is-entering', active);
  });
  progressItems.forEach((li, i) => {
    li.classList.toggle('is-current', i + 1 === step);
    li.classList.toggle('is-done', i + 1 < step);
    if (i + 1 === step) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
  });
  const heading = $(`#booking-heading-${step}`);
  booking.setAttribute('aria-labelledby', heading.id);
  booking.scrollTop = 0;
  if (booking.open) heading.focus({ preventScroll: true });
}

function clearErrors() {
  $$('.field-error', form).forEach((el) => { el.textContent = ''; });
  $$('[aria-invalid]', form).forEach((el) => el.removeAttribute('aria-invalid'));
}

function updateConsultationFormat() {
  const video = $('input[name="format"]:checked', form).value === 'video';
  const clinic = $('#consultation-clinic');
  clinic.hidden = video;
  clinic.disabled = video;
}

$$('input[name="format"]', form).forEach(input => input.addEventListener('change', updateConsultationFormat));

function openBooking({ interest = '', location = '', format = 'clinic', opener } = {}) {
  resetDemoSend();
  form.reset();
  clearErrors();
  dateInput.min = localISODate(new Date());
  if (interest) {
    const radio = $$('input[name="interest"]', form).find((r) => r.value === interest);
    if (radio) radio.checked = true;
  }
  if (location) {
    const radio = $$('input[name="location"]', form).find((r) => r.value === location);
    if (radio) radio.checked = true;
  }
  $('input[name="format"][value="' + (format === 'video' ? 'video' : 'clinic') + '"]', form).checked = true;
  updateConsultationFormat();
  openDialog(booking, opener);
  setStep(interest ? 2 : 1);
}

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-book]');
  if (!trigger) return;
  const fromSheet = navSheet.open;
  if (fromSheet) navSheet.close();
  openBooking({ interest: trigger.dataset.interest, location: trigger.dataset.location, format: trigger.dataset.format, opener: fromSheet ? navToggle : trigger });
});

$('#starter').addEventListener('submit', (event) => {
  event.preventDefault();
  const picked = $('input[name="start-interest"]:checked');
  openBooking({ interest: picked?.value, opener: event.submitter });
});

$('[data-next]', form).addEventListener('click', () => {
  const error = $('#interest-error');
  if (!$('input[name="interest"]:checked', form)) {
    error.textContent = 'Choose an area of interest to continue.';
    $('input[name="interest"]', form).focus();
    return;
  }
  error.textContent = '';
  setStep(2);
});
$('[data-back]', form).addEventListener('click', () => setStep(1));

function fieldError(input, message) {
  const target = $(`#${input.getAttribute('aria-describedby')?.split(' ').find((id) => id.startsWith('e-'))}`);
  if (message) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
  if (target) target.textContent = message || '';
  return !message;
}

function validateDetails() {
  const name = $('#f-name');
  const email = $('#f-email');
  const time = $('#f-time');
  const consent = $('input[name="consent"]', form);
  const results = [];

  results.push(fieldError(name, name.value.trim() ? '' : 'Enter your full name.'));
  const emailValue = email.value.trim();
  results.push(fieldError(email, !emailValue ? 'Enter your email address.' : email.validity.typeMismatch ? 'Enter a valid email address, such as name@example.com.' : ''));

  let dateMessage = '';
  if (!dateInput.value) dateMessage = 'Choose a preferred day.';
  else {
    const chosen = new Date(`${dateInput.value}T12:00:00`);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (chosen < today) dateMessage = 'Choose today or a later date.';
    else if (chosen.getDay() === 0) dateMessage = 'Choose Monday to Saturday.';
  }
  results.push(fieldError(dateInput, dateMessage));
  results.push(fieldError(time, time.value ? '' : 'Choose a preferred time.'));

  const consentError = $('#e-consent');
  consentError.textContent = consent.checked ? '' : 'Confirm that you understand this is a demo.';
  if (consent.checked) consent.removeAttribute('aria-invalid'); else consent.setAttribute('aria-invalid', 'true');
  results.push(consent.checked);

  const firstInvalid = $('[aria-invalid="true"]', form);
  firstInvalid?.focus();
  return results.every(Boolean);
}

$$('#f-name, #f-email, #f-date, #f-time', form).forEach((input) => {
  input.addEventListener(input.tagName === 'SELECT' || input.type === 'date' ? 'change' : 'input', () => {
    if (input.getAttribute('aria-invalid') === 'true') fieldError(input, '');
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (currentStep !== 2 || !validateDetails()) return;
  const data = new FormData(form);
  const day = new Intl.DateTimeFormat('en-PH', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    .format(new Date(`${data.get('date')}T12:00:00`));
  const rows = [
    ['Name', data.get('name')],
    ['Email', data.get('email')],
    ['Mobile', data.get('phone') || 'Not provided'],
    ['Interest', data.get('interest')],
    ['Format', data.get('format') === 'video' ? 'Video call' : 'In clinic'],
    ...(data.get('format') === 'video' ? [] : [['Clinic', clinics[data.get('location')].venue]]),
    ['Preferred day', day],
    ['Preferred time', data.get('time')],
  ];
  $('#booking-summary').innerHTML = rows.map(([k, v]) => `<dt>${k}</dt><dd>${escapeHTML(v)}</dd>`).join('');
  setStep(3);
});

booking.addEventListener('close', () => { form.reset(); updateConsultationFormat(); clearErrors(); });

/* ---------- Footer year ---------- */

$('#year').textContent = String(new Date().getFullYear());


let finishEntrance;
setupNavigation(() => { lastOpener = null; finishEntrance?.(); });
finishEntrance = setupEntrance();
