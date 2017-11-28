cc.Class({
    extends: cc.Component,

    properties: {
        text: {
            default: null,
            type: cc.Node
        },
        btnStart: {
            default: null,
            type: cc.Node
        }
    },
    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.btnStart.on("touchstart", this.showText, this);
    },
    showText() {
        if (!this.text.active) {
            this.text.active = true;
            cc.director.preloadScene("Game");
        } else {
            cc.director.loadScene("Game");
        }

    },
    start() {

    },

    // update (dt) {},
});