# Отчет по практике

## Найденные баги

### Баг № 1

**Описание**: Спрайт Гатса из Берсерка вместо Соника

**Шаги воспроизведения**:  
1. Запустить игру
2. Увидеть, что тут не Соник

**Ожидаемое поведение**: Увидеть Соника

**Фактическое поведение**: Видишь Гатса

**Серьёзность**: Высокая - хочу Соника



### Баг № 2

**Описание**: На фоне не ЧТОТиБ(или хотя бы город, а не хогвардс)

**Шаги воспроизведения**:  
1. Запустить игру  
2. Увидеть, что не ЧТОТиБ на фоне


**Ожидаемое поведение**: Увидеть на фоне ЧТОТиБ(или город)

**Фактическое поведение**: Видим Хогвардс

**Серьёзность**: Низкая



### Баг № 3

**Описание**: Лучший рекорд и текущий рекорд инвертированы

**Шаги воспроизведения**:  
1. Запустить игру
2. Проиграть

**Ожидаемое поведение**: Увидеть слева текущий рекорд при проигрыше, а справа лучший рекорд

**Фактическое поведение**: Видим слева лучший рекорд, а справа текущий

**Серьёзность**: Низкая



### Баг № 4

**Описание**: Текст выходит за рамки при проигрыше

**Шаги воспроизведения**:  
1. Запустить игру  
2. Проиграть  

**Ожидаемое поведение**: Текст не должен выходить за рамки

**Фактическое поведение**: Текст выходит за рамки

**Серьёзность**: Низкая



### Баг № 5

**Описание**: Слишком низкий прыжок

**Шаги воспроизведения**:  
1. Запустить игру  
2. Прыгнуть

**Ожидаемое поведение**: Высокий прыжок

**Фактическое поведение**: Низкий прыжок

**Серьёзность**: Cредняя



### Баг № 6

**Описание**: Энеми умирают по факту прыжка, а не потому что Соник падает им на голову

**Шаги воспроизведения**:  
1. Запустить игру  
2. Прыгнуть
3. Упасть на Энеми

**Ожидаемое поведение**: Убийство Энеми по факту прыжка им на голову

**Фактическое поведение**: Энеми умирают просто из-за прыжка 

**Серьёзность**: Cредняя



## Unit-тесты

### Unit-тест: Проверка сбора монет

**Описание теста**: Увеличение счёта при сборе монеты.  

**Шаги**:  
1. Запустить игру.  
2. Двигаться к монете.  
3. Проверить получаем ли мы очки.

**Результат до исправления**: Прошёл. Счёт меняется. Ничего изменять не нужно.



### Unit-тест: Убийство Энеми

**Описание теста**: Убивает ли Соник Энеми падая им на голову

**Шаги**:  
1. Запустить игру
2. Двигаться к врагу
3. Упасть ему на голову, если умер то -> пункт 4
4. Прыгнуть перед врагом и при этом задеть его, проверить умер или нет

**Результат до исправления**: Соник убивает Энеми и прыгая в последний момент перед ним и прыгая ему на голову

**Код до исправления**:  
```js
  sonic.onCollide("enemy", (enemy) => {
    if (!sonic.isGrounded()) {
      // If Sonic is in the air and collides with an enemy
      k.play("destroy", { volume: 0.5 });
      k.play("hyper-ring", { volume: 0.5 });
      k.destroy(enemy); // Destroy the enemy
      sonic.play("jump"); // Play Sonic's jump animation
      sonic.jump(); // Make Sonic jump
      scoreMultiplier += 1; // Increase score multiplier
      score += 10 * scoreMultiplier; // Update the score with the multiplier
      scoreText.text = `SCORE : ${score}`; // Update the score display
      // Display the score multiplier UI
      if (scoreMultiplier === 1)
        sonic.ringCollectUI.text = `+${10 * scoreMultiplier}`;
      if (scoreMultiplier > 1) sonic.ringCollectUI.text = `x${scoreMultiplier}`;
      k.wait(1, () => {
        sonic.ringCollectUI.text = ""; // Clear multiplier UI after 1 second
      });
      return;
    }

    // If Sonic is on the ground and collides with an enemy, it’s a game over
    k.play("hurt", { volume: 0.5 });
    k.setData("current-score", score); // Store the current score
    k.go("gameover", citySfx); // Transition to the game over scene
  })
```

**Код после исправления:
```js
  sonic.onCollide("enemy", (enemy) => {
    const isJumpingOnHead = sonic.pos.y + sonic.height / 2 < enemy.pos.y + enemy.height / 3;

    if (!sonic.isGrounded() && isJumpingOnHead) {
      // If Sonic is in the air and collides with an enemy
      k.play("destroy", { volume: 0.5 });
      k.play("hyper-ring", { volume: 0.5 });
      k.destroy(enemy); // Destroy the enemy
      sonic.play("jump"); // Play Sonic's jump animation
      sonic.jump(); // Make Sonic jump
      scoreMultiplier += 1; // Increase score multiplier
      score += 10 * scoreMultiplier; // Update the score with the multiplier
      scoreText.text = `SCORE : ${score}`; // Update the score display
      // Display the score multiplier UI
      if (scoreMultiplier === 1)
        sonic.ringCollectUI.text = `+${10 * scoreMultiplier}`;
      if (scoreMultiplier > 1) sonic.ringCollectUI.text = `x${scoreMultiplier}`;
      k.wait(1, () => {
        sonic.ringCollectUI.text = ""; // Clear multiplier UI after 1 second
      });
      return;
    }

    // If Sonic is on the ground and collides with an enemy, it’s a game over
    k.play("hurt", { volume: 0.5 });
    k.setData("current-score", score); // Store the current score
    k.go("gameover", citySfx); // Transition to the game over scene
  });
```
(если честно, то и так и так ничего не работает, я не знаю как это исправлять xddd)



### Unit-тест: Прыгает ли Соник

**Описание теста**: Прыгает ли Соник по нажатию клавиши "space"

**Шаги**:  
1. Запустить игру
2. Нажать на space
3. Прыгнул?

**Результат до исправления**: Прошел. Соник прыгает. Исправлять не нужно, все работает.



### Unit-тест: Соник или Гатс???

**Описание теста**: Проверить, играем ли мы за Соника?

**Шаги**:  
1. Запустить игру
2. Увидеть спрайт персонажа
3. Соник ли это?

**Результат до исправления**: Не прошел. Это Гатс.

**Код до исправления**:  
```js
k.loadSprite("sonic2", "graphics/sonic2.png",
```

**Код после исправления**:
```js
k.loadSprite("sonic", "graphics/sonic.png",
```


### Unit-тест: Столкновение

**Описание теста**: Открывается ли экран геймовера, если мы сталкиваемся с препятствием

**Шаги**:  
1. Запустить игру
2. Бежать
3. Столкнуться с препятствием
4. Открывается ли экран геймовера?

**Результат до исправления**: Прошел. Поражение засчитывается.



## Процесс исправления

### Менял файлы:

**sonic.js** - изменил силу прыжка
**game.js** - попытался сделать так, чтобы соник убивал Энеми при падении им на голову, поменял гравитацию, а так же поменял бэкграунд на город
**gameover.js** - поменял местами текущий рекорд и лучший рекорд, чтобы было удобно
**main.js** - поменял спрайты соника и города

### Как использовал подсказки:

Когда видел комментарий написанный капсом, то сразу понимал, что с этим местом связан какой-то баг, находил и менял(если мог конечно)
