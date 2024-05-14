let btn = SensorManager.CreateDevice('10')[0];
// Опциональная настройка времени (в сек.) за которое срабатывает удержание
btn.Configure({ holdTime: 0.3 });
btn.Start();

btn.on('click', () => { print('clicked'); });
btn.on('hold',  () => { print('hold'); });
//Теперь 1 раз зажмем кнопку и 2 раза просто кликнем по ней