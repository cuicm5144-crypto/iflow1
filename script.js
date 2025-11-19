// 获取canvas元素和上下文
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 游戏状态变量
let gameRunning = false;
let score = 0;
let lives = 3;
let animationId;

// 游戏对象数组
let player;
let enemies = [];
let playerBullets = [];
let particles = [];
let stars = [];

// 初始化星空背景
function initStars() {
  stars = [];
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speed: Math.random() * 0.5 + 0.1,
      brightness: Math.random()
    });
  }
}

// 游戏主循环
function gameLoop() {
  // 清除画布
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // 绘制星空背景
  drawStars();
  
  if (gameRunning) {
    // 更新和绘制游戏对象
    updatePlayer();
    updateEnemies();
    updateBullets();
    updateParticles();
    
    // 绘制游戏对象
    drawPlayer();
    drawEnemies();
    drawBullets();
    drawParticles();
    
    // 检查碰撞
    checkCollisions();
    
    // 生成敌人
    spawnEnemies();
  }
  
  // 继续循环
  animationId = requestAnimationFrame(gameLoop);
}

// 绘制星空背景
function drawStars() {
  stars.forEach(star => {
    ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
    
    // 移动星星
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
}

// 玩家控制变量
const keys = {};

// 键盘事件监听
window.addEventListener('keydown', (e) => {
  keys[e.key] = true;
  
  // 空格键射击
  if (e.key === ' ' && gameRunning) {
    shoot();
  }
});

window.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

// 更新玩家
function updatePlayer() {
  if (!player) return;
  
  // 移动控制
  if (keys['ArrowLeft'] && player.x > 10) {
    player.x -= 5;
  }
  if (keys['ArrowRight'] && player.x < canvas.width - 10) {
    player.x += 5;
  }
  if (keys['ArrowUp'] && player.y > 10) {
    player.y -= 5;
  }
  if (keys['ArrowDown'] && player.y < canvas.height - 10) {
    player.y += 5;
  }
}

// 更新敌人
function updateEnemies() {
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].y += enemies[i].speed;
    
    // 移除超出屏幕的敌人
    if (enemies[i].y > canvas.height) {
      enemies.splice(i, 1);
    }
  }
}

// 射击函数
function shoot() {
  if (player) {
    // 创建子弹
    playerBullets.push({
      x: player.x,
      y: player.y - 15,
      size: 3,
      speed: -7
    });
    
    // 创建射击粒子效果
    for (let i = 0; i < 5; i++) {
      particles.push({
        x: player.x,
        y: player.y - 10,
        size: Math.random() * 2 + 1,
        color: '#ff0',
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * -3 - 1,
        life: 50
      });
    }
  }
}

// 更新子弹
function updateBullets() {
  for (let i = playerBullets.length - 1; i >= 0; i--) {
    playerBullets[i].y += playerBullets[i].speed;
    
    // 移除超出屏幕的子弹
    if (playerBullets[i].y < 0) {
      playerBullets.splice(i, 1);
    }
  }
}

// 更新粒子
function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].x += particles[i].vx;
    particles[i].y += particles[i].vy;
    particles[i].life -= 1;
    
    // 移除生命周期结束的粒子
    if (particles[i].life <= 0) {
      particles.splice(i, 1);
    }
  }
}

// 绘制玩家
function drawPlayer() {
  if (player) {
    // 绘制玩家飞机（带霓虹光效）
    ctx.save();
    ctx.translate(player.x, player.y);
    
    // 飞机主体
    ctx.fillStyle = '#0ff';
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.lineTo(-8, 10);
    ctx.lineTo(8, 10);
    ctx.closePath();
    ctx.fill();
    
    // 霓虹光效
    ctx.shadowColor = '#0ff';
    ctx.shadowBlur = 20;
    ctx.fill();
    
    // 添加额外的霓虹光晕
    ctx.shadowBlur = 30;
    ctx.globalAlpha = 0.5;
    ctx.fill();
    
    ctx.restore();
  }
}

// 绘制敌人
function drawEnemies() {
  enemies.forEach(enemy => {
    ctx.save();
    ctx.translate(enemy.x, enemy.y);
    
    // 敌人飞机
    ctx.fillStyle = '#f0f';
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.lineTo(-8, -10);
    ctx.lineTo(8, -10);
    ctx.closePath();
    ctx.fill();
    
    // 霓虹光效
    ctx.shadowColor = '#f0f';
    ctx.shadowBlur = 20;
    ctx.fill();
    
    // 添加额外的霓虹光晕
    ctx.shadowBlur = 30;
    ctx.globalAlpha = 0.5;
    ctx.fill();
    
    ctx.restore();
  });
}

// 绘制子弹
function drawBullets() {
  playerBullets.forEach(bullet => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.size, 0, Math.PI * 2);
    
    // 子弹霓虹效果
    ctx.fillStyle = '#ff0';
    ctx.shadowColor = '#ff0';
    ctx.shadowBlur = 15;
    ctx.fill();
    
    // 添加额外的光晕
    ctx.shadowBlur = 25;
    ctx.globalAlpha = 0.7;
    ctx.fill();
    
    ctx.restore();
  });
}

// 绘制粒子
function drawParticles() {
  particles.forEach(particle => {
    ctx.save();
    ctx.globalAlpha = particle.life / 100; // 根据生命值调整透明度
    
    // 粒子霓虹效果
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.shadowColor = particle.color;
    ctx.shadowBlur = 15;
    ctx.fill();
    
    // 添加额外的光晕
    ctx.shadowBlur = 25;
    ctx.globalAlpha = (particle.life / 100) * 0.7;
    ctx.fill();
    
    ctx.restore();
  });
}

// 检查碰撞
function checkCollisions() {
  // 子弹与敌人的碰撞
  for (let i = playerBullets.length - 1; i >= 0; i--) {
    for (let j = enemies.length - 1; j >= 0; j--) {
      const dx = playerBullets[i].x - enemies[j].x;
      const dy = playerBullets[i].y - enemies[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 15) { // 碰撞阈值
        // 创建爆炸粒子效果
        createExplosion(enemies[j].x, enemies[j].y, '#f0f');
        
        // 移除子弹和敌人
        playerBullets.splice(i, 1);
        enemies.splice(j, 1);
        
        // 增加分数
        score += 10;
        document.getElementById('score').textContent = `得分: ${score}`;
        
        // 随机掉落道具
        if (Math.random() < 0.1) { // 10% 概率掉落道具
          // 这里可以添加道具逻辑
        }
        
        break; // 退出内层循环
      }
    }
  }
  
  // 敌人与玩家的碰撞
  if (player) {
    for (let i = enemies.length - 1; i >= 0; i--) {
      const dx = player.x - enemies[i].x;
      const dy = player.y - enemies[i].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 20) { // 碰撞阈值
        // 创建爆炸粒子效果
        createExplosion(enemies[i].x, enemies[i].y, '#f0f');
        createExplosion(player.x, player.y, '#0ff');
        
        // 移除敌人
        enemies.splice(i, 1);
        
        // 减少生命值
        lives--;
        document.getElementById('lives').textContent = `生命: ${lives}`;
        
        if (lives <= 0) {
          gameOver();
        }
      }
    }
  }
}

// 创建爆炸粒子效果
function createExplosion(x, y, color) {
  for (let i = 0; i < 15; i++) {
    particles.push({
      x: x,
      y: y,
      size: Math.random() * 3 + 1,
      color: color,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      life: 100
    });
  }
}

// 生成敌人
function spawnEnemies() {
  if (Math.random() < 0.03) { // 3% 概率生成敌人
    enemies.push({
      x: Math.random() * (canvas.width - 20) + 10,
      y: -20,
      speed: Math.random() * 2 + 1
    });
  }
}

// 开始游戏
function startGame() {
  gameRunning = true;
  score = 0;
  lives = 3;
  
  // 重置游戏对象
  player = { x: canvas.width / 2, y: canvas.height - 50 };
  enemies = [];
  playerBullets = [];
  particles = [];
  
  // 更新UI
  document.getElementById('score').textContent = `得分: ${score}`;
  document.getElementById('lives').textContent = `生命: ${lives}`;
  document.getElementById('startScreen').classList.add('hidden');
  document.getElementById('gameOver').classList.add('hidden');
  
  // 开始游戏循环
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  gameLoop();
}

// 游戏结束
function gameOver() {
  gameRunning = false;
  document.getElementById('gameOver').classList.remove('hidden');
  document.getElementById('startScreen').classList.add('hidden');
}

// 初始化游戏
initStars();
document.getElementById('startButton').addEventListener('click', startGame);

// 启动游戏循环
gameLoop();