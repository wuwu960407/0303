let shapes = [];
let song;
let amplitude;
let points = [[-3, 5], [3, 7], [1, 5], [2, 4], [4, 3], [5, 2], [6, 2], [8, 4], [8, -1], [6, 0], [0, -3], [2, -6], [-2, -3], [-4, -2], [-5, -1], [-6, 1], [-6, 2]];

function preload() {
 song = loadSound('midnight-quirk-255361.mp3', 
  () => console.log('音樂加載成功！'),
  (err) => console.error('音樂加載失敗，請檢查檔案路徑、副檔名或是否啟用了 Live Server。詳細錯誤：', err)
 );
}

function setup() {
 createCanvas(windowWidth, windowHeight);
 amplitude = new p5.Amplitude();

// 播放音樂
// 移除自動播放，改由滑鼠點擊觸發以符合瀏覽器政策

for (let i = 0; i < 10; i++) {
// 產生一個統一的縮放比例，保持魚的形狀
 let shapeScale = random(10, 20);
 let currentPoints = points.map(p => {
 return [p[0] * shapeScale, p[1] * shapeScale];
  });

shapes.push({
 x: random(0, windowWidth),
 y: random(0, windowHeight),
 dx: random(-3, 3),
 dy: random(-3, 3),
 scale: random(1, 10),
 color: color(204, 158, 72), // 將顏色改為土黃色
 points: currentPoints
 });
 }
}

function draw() {
 background('red');
 strokeWeight(2);

let level = 0;
if (song.isLoaded()) {
 level = amplitude.getLevel();
}
let sizeFactor = map(level, 0, 1, 0.5, 2);

for (let shape of shapes) {
 shape.x += shape.dx;
 shape.y += shape.dy;

if (shape.x < 0 || shape.x > windowWidth) shape.dx *= -1;
if (shape.y < 0 || shape.y > windowHeight) shape.dy *= -1;

fill(shape.color);
stroke(shape.color);

push();
translate(shape.x, shape.y);

// 根據移動方向翻轉魚的朝向 (原始座標朝左，若往右游則翻轉)
if (shape.dx > 0) {
  scale(-sizeFactor,sizeFactor);
} else {
  scale(sizeFactor);
}

beginShape();
for (let p of shape.points) {
 vertex(p[0], p[1]);
 }
endShape(CLOSE);
pop();
}

// 狀態提示文字
if (song.isLoaded() && !song.isPlaying()) {
 fill(50);
 noStroke();
 textAlign(CENTER, CENTER);
 textSize(30);
 text('Click to Play', width / 2, height / 2);
 }
}

function mousePressed() {
if (song.isLoaded()) {
 if (song.isPlaying()) {
 song.pause();
 } else {
 song.loop();
  }
 }
}