class ClassDigitalLed extends ClassActuator {
    constructor(opts) {
        ClassActuator.call(this, opts, opts);
    }
    On(_chNum, _val, _opts) {
        let val = E.clip(Math.round(_val), 0, 1);
        if (val === 1) {
            this._IsChOn[0] = 1;
            digitalWrite(this._Pins[0], val);
        }
        else this.Off();
    }
    Off() {
        this._IsChOn[0] = 0;
        digitalWrite(this._Pins[0], 0);
    }
}
exports = ClassDigitalLed;