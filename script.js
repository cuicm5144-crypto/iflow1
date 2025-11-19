// 游戏变量
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');

// 游戏状态
let score = 0;
let lives = 3;
let gameRunning = true;
let level = 1;
let enemyCount = 0;
let levelThreshold = 50; // 每50分升一级

// 创建霓虹效果函数
function drawNeonGlow(x, y, width, height, color, blur) {
  ctx.shadowColor = color;
  ctx.shadowBlur = blur;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
  
  // 添加额外的霓虹光效
  ctx.shadowBlur = blur * 2;
  ctx.globalAlpha = 0.5;
  ctx.fillRect(x, y, width, height);
  ctx.globalAlpha = 1.0;
  ctx.shadowBlur = 0;
}

// 玩家飞机
const player = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 60,
  width: 50,
  height: 40,
  speed: 5,
  color: '#00ffff',
  lastShot: 0,
  shootCooldown: 200, // 射击冷却时间（毫秒）
  draw: function() {
    // 绘制玩家飞机（带有霓虹效果）
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 15;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2, this.y);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.lineTo(this.x, this.y + this.height);
    ctx.closePath();
    ctx.fill();
    
    // 添加额外的霓虹光效
    ctx.shadowBlur = 30;
    ctx.globalAlpha = 0.5;
    ctx.fill();
    ctx.globalAlpha = 1.0;
    ctx.shadowBlur = 0;
    
    // 绘制飞机细节
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 5;
    ctx.beginPath();
    ctx.arc(this.x + this.width / 2, this.y + 10, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // 绘制玩家飞机的霓虹尾焰
    ctx.shadowColor = '#00ffff';
    ctx.shadowBlur = 10;
    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2 - 10, this.y + this.height);
    ctx.lineTo(this.x + this.width / 2, this.y + this.height + 15);
    ctx.lineTo(this.x + this.width / 2 + 10, this.y + this.height);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
  }
};

// 子弹数组
let bullets = [];

// 敌人数组
let enemies = [];

// 爆炸效果数组
let explosions = [];

// 动力装置效果数组（玩家尾焰）
let thrusters = [];

// 键盘状态
const keys = {};

// 创建子弹
function shoot() {
  const now = Date.now();
  if (now - player.lastShot < player.shootCooldown) return; // 冷却时间控制
  
  player.lastShot = now;
  
  bullets.push({
    x: player.x + player.width / 2 - 2.5,
    y: player.y,
    width: 5,
    height: 15,
    speed: 7,
    color: '#ffff00',
    draw: function() {
      // 绘制子弹（带有霓虹效果）
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      
      // 添加额外的光效
      ctx.shadowBlur = 20;
      ctx.globalAlpha = 0.7;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;
    },
    update: function() {
      this.y -= this.speed;
    }
  });
  
  // 添加射击光效
  for (let i = 0; i < 5; i++) {
    thrusters.push({
      x: player.x + player.width / 2,
      y: player.y + player.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: Math.random() * 2 + 1,
      color: '#ffff00',
      life: 20
    });
  }
}

// 创建敌人
function createEnemy() {
  if (!gameRunning) return;
  
  const size = Math.random() * 30 + 20 - (level * 1.5); // 随等级增大敌人
  const speed = Math.random() * 2 + 1 + (level * 0.2); // 随等级提升速度
  
  enemies.push({
    x: Math.random() * (canvas.width - size),
    y: -size,
    width: Math.max(size, 15), // 最小尺寸限制
    height: Math.max(size, 15),
    speed: speed,
    color: `hsl(${Math.random() * 60 + 330}, 100%, 50%)`, // 紫红色系
    draw: function() {
      // 绘制敌人飞机（带有霓虹效果）
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 15;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(this.x + this.width / 2, this.y + this.height);
      ctx.lineTo(this.x, this.y);
      ctx.lineTo(this.x + this.width, this.y);
      ctx.closePath();
      ctx.fill();
      
      // 添加额外的霓虹光效
      ctx.shadowBlur = 30;
      ctx.globalAlpha = 0.5;
      ctx.fill();
      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;
      
      // 绘制敌人细节
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 5;
      ctx.beginPath();
      ctx.arc(this.x + this.width / 2, this.y + this.height - 5, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    },
    update: function() {
      this.y += this.speed;
    }
  });
  
  enemyCount++;
  
  // 随着等级提升，敌人生成间隔缩短
  const spawnInterval = Math.max(300, 1000 - (level * 50));
  setTimeout(createEnemy, Math.random() * spawnInterval + 300);
}

// 创建爆炸效果
function createExplosion(x, y) {
  for (let i = 0; i < 20; i++) {
    explosions.push({
      x: x,
      y: y,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 6,
      speedY: (Math.random() - 0.5) * 6,
      color: `hsl(${Math.random() * 60}, 100%, 50%)`, // 黄色到红色范围
      life: Math.random() * 30 + 20
    });
  }
}

// 碰撞检测
function checkCollision(rect1, rect2) {
  return rect1.x < rect2.x + rect2.width &&
         rect1.x + rect1.width > rect2.x &&
         rect1.y < rect2.y + rect2.height &&
         rect1.y + rect1.height > rect2.y;
}

// 升级处理
function checkLevelUp() {
  const newLevel = Math.floor(score / levelThreshold) + 1;
  if (newLevel > level) {
    level = newLevel;
    // 可以在这里添加升级特效
    console.log(`升级到第 ${level} 级!`);
  }
}

// 初始化游戏
function initGame() {
  score = 0;
  lives = 3;
  level = 1;
  enemyCount = 0;
  bullets = [];
  enemies = [];
  explosions = [];
  thrusters = [];
  gameRunning = true;
  
  player.x = canvas.width / 2 - 25;
  player.y = canvas.height - 60;
  
  scoreElement.textContent = '得分: ' + score;
  livesElement.textContent = '生命: ' + lives;
  document.getElementById('level').textContent = '等级: ' + level;
  gameOverElement.classList.add('hidden');
}

// 游戏结束
function endGame() {
  gameRunning = false;
  finalScoreElement.textContent = score;
  gameOverElement.classList.remove('hidden');
}

// 键盘事件
document.addEventListener('keydown', function(e) {
  keys[e.key] = true;
  
  // 空格键射击
  if (e.key === ' ' && gameRunning) {
    e.preventDefault();
    shoot();
  }
});

document.addEventListener('keyup', function(e) {
  keys[e.key] = false;
});

// 鼠标移动控制
canvas.addEventListener('mousemove', function(e) {
  if (!gameRunning) return;
  
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  
  // 限制飞机在画布范围内
  player.x = Math.max(0, Math.min(mouseX - player.width / 2, canvas.width - player.width));
});

// 重启游戏
restartBtn.addEventListener('click', initGame);

// 游戏循环
function gameLoop() {
  // 清空画布
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // 绘制动态霓虹背景
  drawAnimatedBackground();
  
  if (gameRunning) {
    // 移动玩家
    if (keys['ArrowLeft'] || keys['a']) {
      player.x = Math.max(0, player.x - player.speed);
    }
    if (keys['ArrowRight'] || keys['d']) {
      player.x = Math.min(canvas.width - player.width, player.x + player.speed);
    }
    
    // 绘制和更新玩家
    player.draw();
    
    // 更新和绘制子弹
    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].update();
      bullets[i].draw();
      
      // 移除超出屏幕的子弹
      if (bullets[i].y + bullets[i].height < 0) {
        bullets.splice(i, 1);
      }
    }
    
    // 更新和绘制敌人
    for (let i = enemies.length - 1; i >= 0; i--) {
      enemies[i].update();
      enemies[i].draw();
      
      // 检查敌人是否超出屏幕底部
      if (enemies[i].y > canvas.height) {
        enemies.splice(i, 1);
        lives--;
        livesElement.textContent = '生命: ' + lives;
        
        if (lives <= 0) {
          endGame();
        }
      }
      
      // 检查子弹与敌人的碰撞
      for (let j = bullets.length - 1; j >= 0; j--) {
        if (checkCollision(bullets[j], enemies[i])) {
          // 创建爆炸效果
          createExplosion(enemies[i].x + enemies[i].width/2, enemies[i].y + enemies[i].height/2);
          
          // 移除子弹和敌人
          bullets.splice(j, 1);
          enemies.splice(i, 1);
          
          // 增加分数（根据敌人大小调整分数）
          const points = Math.floor(10 + (30 - enemies[i].width) * 0.5);
          score += points;
          scoreElement.textContent = '得分: ' + score;
          
          // 检查是否升级
          checkLevelUp();
          
          break;
        }
      }
      
      // 检查玩家与敌人的碰撞
      if (checkCollision(player, enemies[i])) {
        // 创建爆炸效果
        createExplosion(enemies[i].x + enemies[i].width/2, enemies[i].y + enemies[i].height/2);
        
        enemies.splice(i, 1);
        lives--;
        livesElement.textContent = '生命: ' + lives;
        
        if (lives <= 0) {
          endGame();
        }
      }
    }
    
    // 更新和绘制爆炸效果
    for (let i = explosions.length - 1; i >= 0; i--) {
      const explosion = explosions[i];
      
      ctx.fillStyle = explosion.color;
      ctx.shadowColor = explosion.color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(explosion.x, explosion.y, explosion.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // 更新爆炸位置和生命
      explosion.x += explosion.speedX;
      explosion.y += explosion.speedY;
      explosion.life--;
      
      if (explosion.life <= 0) {
        explosions.splice(i, 1);
      }
    }
    
    // 更新和绘制玩家尾焰效果
    for (let i = thrusters.length - 1; i >= 0; i--) {
      const thruster = thrusters[i];
      
      ctx.fillStyle = thruster.color;
      ctx.shadowColor = thruster.color;
      ctx.shadowBlur = 5;
      ctx.beginPath();
      ctx.arc(thruster.x + thruster.speedX * (20 - thruster.life), 
             thruster.y + thruster.speedY * (20 - thruster.life), 
             thruster.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      
      thruster.life--;
      
      if (thruster.life <= 0) {
        thrusters.splice(i, 1);
      }
    }
  }
  
  requestAnimationFrame(gameLoop);
}

// 绘制动态霓虹背景
function drawAnimatedBackground() {
  // 创建渐变背景
  const gradient = ctx.createRadialGradient(
    canvas.width/2, canvas.height/2, 0,
    canvas.width/2, canvas.height/2, Math.max(canvas.width, canvas.height)/2
  );
  gradient.addColorStop(0, 'rgba(10, 10, 30, 0.1)');
  gradient.addColorStop(1, 'rgba(5, 5, 15, 0.8)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // 绘制闪烁的霓虹粒子效果
  for (let i = 0; i < 50; i++) {
    const x = (i * 73) % canvas.width;
    const y = (i * 57) % canvas.height;
    const size = Math.sin(Date.now() / 500 + i) * 1.5 + 1.5;
    
    // 随机霓虹色
    const hue = (Date.now() / 20 + i * 20) % 360;
    const color = `hsl(${hue}, 100%, 60%)`;
    
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
  
  // 添加扫描线效果
  for (let y = 0; y < canvas.height; y += 3) {
    const alpha = 0.05 + Math.sin(Date.now() / 1000 + y / 20) * 0.05;
    ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

// 启动游戏
initGame();
createEnemy(); // 开始生成敌人
gameLoop();