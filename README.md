<div style = "font-family: 'Open Sans', sans-serif; font-size: 16px">

# ModuleButton

<div style = "color: #555">
    <p align="center">
    <img src="./res/logo.png" width="400" title="hover text">
    </p>
</div>

## Лицензия

<div style = "color: #555">
В разработке
</div>

## Описание
<div style = "color: #555">

Модуль предназначен для работы с цифровыми кнопками в рамках фреймворка EcoLight. Обеспечивает мониторинг состояния кнопки и её основные события. Модуль разработан в соответствии с нотацией архитектуры датчиков и является потомком класса [ClassSensor](https://github.com/Konkery/ModuleSensorArchitecture/blob/main/README.md). Взаимодействие осуществляется через 0-й канал. 

</div>

### Поля
<div style = "color: #555">

- <mark style="background-color: lightblue">_Debounce</mark> - время в мс, которое программа ждет утихания дребезга на пине;
- <mark style="background-color: lightblue">_ClickTime</mark> - время в секундах, необходимое для срабатывания события 'click';
- <mark style="background-color: lightblue">_HoldTime</mark> - время в секундах, необходимое для срабатывания события 'hold';
- <mark style="background-color: lightblue">_LastState</mark> - текущее состояние кнопки;
- <mark style="background-color: lightblue">_Time0</mark> - время последнего события на кнопке;
- <mark style="background-color: lightblue">_Interval</mark> - функция SetInterval для опроса кнопки.
</div>

### Методы
<div style = "color: #555">

- <mark style="background-color: lightblue">Start(_num_channel)</mark> - запускает мониторинг состояния кнопки;
- <mark style="background-color: lightblue">Stop(_num_channel)</mark> - прекращает запускает мониторинг состояния кнопки;
- <mark style="background-color: lightblue">OnSetWatch(_num_channel)</mark> - обработчик прерываний;
</div>

### События
<div style = "color: #555">

- <mark style="background-color: lightblue">press</mark> - нажатие кнопки;
- <mark style="background-color: lightblue">release</mark> - кнопка отпущена;
- <mark style="background-color: lightblue">click</mark> - собственно клик;
- <mark style="background-color: lightblue">hold</mark> - удержание;
</div>

### Возвращаемые данные
<div style = "color: #555">
Как датчик модуль предоставляет данные о состоянии кнопки: 0-вкл, 1-выкл.
</div>

### Примеры
#### События press и release
<div style = "color: #555">

```js
let btn = SensorManager.CreateDevice('10')[0];
btn.Start();

let t1;
btn.on('press', () => {
  print('pressed');
  t1 = getTime();
});

btn.on('release', () => {
  let t2 = getTime();
  print(`released after ${(t2-t1).toFixed(2)}`);
  t1 = t2;
});
// Теперь несколько раз зажмем кнопку на какое то время
```

Результат выполнения:
<div align='left'>
    <img src='./example-1-btn.png'>
</div>

#### События click и hold 
```js
let btn = SensorManager.CreateDevice('10')[0];
// Опциональная настройка времени (в сек.) за которое срабатывают клик и удержание
btn.Configure({ clickTime: 0.015, holdTime: 0.3 });
btn.Start();

btn.on('click', () => { print('clicked'); });
btn.on('hold',  () => { print('hold'); });
//Теперь 1 раз зажмем кнопку и 2 раза просто кликнем по ней
```

Результат выполнения:
<div align='left'>
    <img src='./example-2-btn.png'>
</div>

</div>

### Зависимости
<div style = "color: #555">

</div>

</div>
