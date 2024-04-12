/**
 * @class
 * Представляет кнопку как датчик
 */
class ClassButton extends ClassSensor {
    constructor(opts) {
        ClassSensor.call(this, opts, opts);
        this._Debounce = (opts.debounce > 0) ? opts.debounce : 50;
        this._LastState = 1;
        this._Time0;

        this.Configure({ holdTime: opts.holdTime || 0.3, 
                         clickTime: opts.clickTime || 0.02 });
    }
    /**
     * @method
     * Обработчик прерывания на пине. Вызывает события "press", "release", "click", "hold"
     */
    OnSetWatch() {
        let timeDelta = getTime() - this._Time0;
        let curr_state = digitalRead(this._Pins[0]);

        if (curr_state !== this._LastState) this._Channels[0].emit('changeState');

        if (curr_state == 1 && this._LastState == 0) {  //кнопка отпущена
            if (timeDelta >= this._HoldTime)                        //кнопка удерживалась дольше 300мс
                this._Channels[0].emit('hold');         
            if (timeDelta >= this._ClickTime && timeDelta < this._HoldTime)     //кнопка была нажата хотя бы 20 мс
                this._Channels[0].emit('click');
            
            this._Channels[0].emit('release');
        } 
        else {
            this._Channels[0].emit('press');
        }

        this._Time0 = getTime();
        this._LastState = curr_state;
        this.Ch0_Value = curr_state;
    }

    Start() {
        if (this._SetWatch) return false;
        this._ChStatus[0] = 1;

        this._SetWatch = setWatch(this.OnSetWatch.bind(this), 
        this._Pins[0], {
            repeat: true,
            edge: 'both',
            debounce: this._Debounce
        });
    }
    Stop() {
        clearWatch(this._SetWatch);
        this._ChStatus[0] = 0;
    }
    Configure(opts) {
        if (opts) {
            let click_time = opts.clickTime;
            let holdTime = opts.holdTime;

            if ((!this._HoldTime || this._HoldTime > click_time) && click_time > 0) {
                this._ClickTime = click_time;
            }

            if (holdTime > this._ClickTime) this._HoldTime = holdTime;
        }
    }
}

exports = ClassButton;