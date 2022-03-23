const elMain = document.body;
let fr = 60;
let width = elMain.offsetWidth || 640;
let height = elMain.offsetHeight || 640;
let x = int(width / 2) / 2;
let y = int(height / 2) / 2;

let fz = int(min(width, height) / 2);

let worm = new Worm({
  x, y,
  width: int(width / 2),
  height: int(height / 2),
});

let scene = new Scene({
  x, y,
  width: int(width / 2),
  height: int(height / 2),
});

let ll = new Line();

function setup() {
  createCanvas(width, height);
  frameRate(fr);
  textAlign(CENTER, CENTER);
}

let slowDown = (fc, fr, fn) => {
  if(fc >= fr) {
    fn();
    return true;
  }
  return false;
};

let current = 0;
let maxF = int(fr);



const wait = (fn, cond, timer) => {
  if(cond()) {
    clearTimeout(timer);
    return fn();
  } else {
    timer = setTimeout(_=> wait(fn, cond, timer), 1000);
  }
};
const waitAgain = (fn, cond, timer) => {
  if(cond()) fn();
  timer = setTimeout(_=> waitAgain(fn, cond, timer), 1000);
};

const sfadeWordsTimerMax = 20;
let sfadeWordsTimer = 0;
let tfadeWordsTimer = null;
let isShowWords = false;

const sColorTimerMax = 40;
let sColorTimer = 0;
let tColorTimer = null;
let colorText = `rgba(255, 255, 255, 0.01)`;

const sPTimerMax = 6;
let sPTimer = 0;
let tPTimer = null;
let actionPs = rndCoinBool();

wait(
  _ => isShowWords = true,
  _ => ++sfadeWordsTimer > sfadeWordsTimerMax ? true: false,
  tfadeWordsTimer
);

wait(
  _ => colorText = `rgba(255, 255, 255, 0.1)`,
  _ => ++sColorTimer > sColorTimerMax ? true: false,
  tColorTimer
);
waitAgain(
  _ => actionPs = rndCoinBool(),
  _ => ++sPTimer > sPTimerMax ? true: false,
  tPTimer
);


function draw() {
  let flag = slowDown(++current, maxF, _ => {
    background('rgba(255, 255, 255, 0.011)');
    // ll.render();
  });
  // scene.render();
  worm.step();
  worm.render();
  if(flag) current = 0;
  if(isShowWords && actionPs) {
    textSize(fz/1.9);
    fill(colorText);
    text('☮', x+(fz/10), y - (fz/5), int(width / 2), int(height / 2) );
    textSize(fz/2.3);
    text('STOP', x+(fz/10), y+(fz/6), int(width / 2), int(height / 2) );
    textSize(fz/2);
    text('WAR', x+(fz/10), y+(fz/2), int(width / 2), int(height / 2) );
  }

}
