export function setupDemoSend({ dialog, button, review, confirmation, stage, heading, progress, reducedMotion, close }) {
  let state = 'ready';
  let generation = 0;
  let animations = [];

  function reset() {
    generation++;
    animations.forEach(animation => animation.cancel());
    animations = [];
    state = 'ready';
    review.hidden = false;
    review.inert = false;
    confirmation.hidden = true;
    stage.style.minHeight = '';
    button.disabled = false;
    button.textContent = 'Send';
    progress.textContent = 'Review';
  }

  async function move(element, frames, duration) {
    if (reducedMotion()) return;
    const animation = element.animate(frames, { duration, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' });
    animations.push(animation);
    await animation.finished;
  }

  button.addEventListener('click', async () => {
    if (state === 'sent') { close(dialog); return; }
    if (state !== 'ready') return;
    const ticket = ++generation;
    state = 'sending';
    button.disabled = true;
    button.textContent = 'Sending…';
    review.inert = true;
    stage.style.minHeight = review.offsetHeight + 'px';
    try {
      await move(review, [{ transform: 'translateX(0)', opacity: 1 }, { transform: 'translateX(110%)', opacity: 0 }], 360);
      if (ticket !== generation || !dialog.open) return;
      review.hidden = true;
      confirmation.hidden = false;
      await move(confirmation, [{ transform: 'translateX(-24px)', opacity: 0 }, { transform: 'none', opacity: 1 }], 280);
      if (ticket !== generation || !dialog.open) return;
      state = 'sent';
      progress.textContent = 'Done';
      button.textContent = 'Done';
      button.disabled = false;
      dialog.setAttribute('aria-labelledby', heading.id);
      heading.focus({ preventScroll: true });
    } catch (error) {
      if (ticket === generation && dialog.open) { reset(); console.error(error); }
    }
  });
  dialog.addEventListener('close', reset);
  reset();
  return reset;
}
