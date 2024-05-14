class ClassBistableButton extends ClassSensor {
    constructor(opts) {
        ClassSensor.call(this, opts); 
        this._Debounce = this._Debounce = (opts.debounce > 0) ? opts.debounce : 50;                                           
        this._Led = this._SubDevice[0][0];      
        this._Led.Off();                        
        this._DefaultState = +Boolean(opts.defaultState);    // 0: вкл, 1: выкл.
    }

    Start() {
        if (this._SetWatch) return false;
        this.Ch0_Value = this._DefaultState;

        this._ChStatus[0] = 1;

        this._SetWatch = setWatch(() => {
            let isEnabled = !this._Channels[0].Value;
            this.Ch0_Value = +(isEnabled);
            this._Channels[0].emit(isEnabled ? 'enable' : 'disable');
            this._Channels[0].emit('changeState');
        }, 
        this._Pins[0], {
            repeat: true,
            edge: 'falling',
            debounce: this._Debounce
        });
    }

    Stop() {
        if (this._SetWatch) clearWatch(this._SetWatch);
        this._Led.Off();
        this._SetWatch = null;
        this._ChStatus[0] = 0;
    }
    Configure(_opts) {
        this._Debounce = (typeof _opts.debounce === 'number') ? _opts.debounce : this._Debounce;
    }
}

exports = ClassBistableButton;