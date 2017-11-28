cc.Class({
    extends: cc.Component,

    properties: {
        btnReStart: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.btnReStart.on("touchstart", this.reStart, this);
    },
    reStart() {
        cc.director.loadScene("Game");
    },
    start() {

    },

    // update (dt) {},
});