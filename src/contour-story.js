const smooth = value => { const x = Math.max(0, Math.min(1, value)); return x * x * (3 - 2 * x); };
const mix = (a, b, t) => a + (b - a) * t;
const amount = (time, start, end) => smooth((time - start) / (end - start));

export function storyPose(time, phone = false) {
  const inspect = amount(time, 900, 1900);
  const face = amount(time, 2200, 3900);
  const body = amount(time, 4200, 5900);
  const settle = amount(time, 5900, 7200);
  const shots = [
    [0, 1.05, 710, 470], [1100, 1.05, 710, 470],
    [2200, 1.05, 710, 510], [2900, phone ? 1.35 : 1.7, 675, 255],
    [3950, phone ? 1.35 : 1.7, 675, 255], [4700, 1.22, 715, 640],
    [5800, 1.22, 715, 640], [7200, 1, 725, 551],
  ];
  let shot = shots.at(-1).slice(1);
  for (let i = 1; i < shots.length; i++) {
    if (time <= shots[i][0]) {
      const t = amount(time, shots[i-1][0], shots[i][0]);
      shot = shots[i].slice(1).map((value, j) => mix(shots[i-1][j+1], value, t));
      break;
    }
  }
  return { inspect, face, body, settle, shot };
}

export function prepareStory(svg, phone) {
  const paths = [...svg.querySelectorAll('[data-from]')].map(element => {
    const tokenize = text => text.match(/[a-zA-Z]|[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/g);
    const end = tokenize(element.getAttribute('d'));
    const from = tokenize(element.dataset.from);
    const check = tokenize(element.dataset.check || element.dataset.from);
    if (from.length !== end.length || check.length !== end.length) throw new Error('Incompatible contour poses');
    return { element, end, from, check, part: element.dataset.part };
  });
  const camera = svg.querySelector('[data-camera]');
  const head = svg.querySelector('[data-head]');
  const hand = svg.querySelector('[data-hand]');
  const smile = svg.querySelector('[data-smile]');
  return time => {
    const pose = storyPose(time, phone);
    for (const path of paths) {
      const gesture = path.part === 'gesture-arm';
      const progress = path.part === 'face' ? pose.face : gesture ? pose.settle : pose.body;
      const start = gesture ? path.from.map((value, i) => isNaN(Number(value)) ? value : mix(Number(value), Number(path.check[i]), pose.inspect)) : path.from;
      path.element.setAttribute('d', path.end.map((value, i) => isNaN(Number(value)) ? value : mix(Number(start[i]), Number(value), progress).toFixed(2)).join(' '));
    }
    const [zoom, x, y] = pose.shot;
    camera.setAttribute('transform', `translate(725 551) scale(${zoom}) translate(${-x} ${-y})`);
    head.setAttribute('transform', `rotate(${mix(4, 0, pose.face)} 885 230)`);
    const wristX = mix(mix(950, 818, pose.inspect), 850, pose.settle);
    const wristY = mix(mix(285, 634, pose.inspect), 678, pose.settle);
    const angle = mix(mix(-98, -20, pose.inspect), 0, pose.settle);
    hand.setAttribute('transform', `translate(${wristX} ${wristY}) rotate(${angle})`);
    smile.style.opacity = pose.face;
  };
}
