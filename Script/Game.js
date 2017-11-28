cc.Class({
    extends: cc.Component,

    properties: {
        ts: {
            default: null,
            type: cc.Node,
            displayName: "唐僧节点"
        },
        jifen: {
            default: null,
            type: cc.Node
        },
        m_stateSpriteFrame: cc.SpriteAtlas,
        mState: {
            default: null,
            type: cc.Node,
            displayName: "生命状态节点"
        },
        QA: [cc.Node],
    },

    onLoad() {
        let anim = this.ts.getComponent(cc.Animation);
        anim.play("ts1");
        anim.on("finished", this.tsReady, this);
        this.setMstate();
    },
    //唐僧准备完成
    tsReady() {
        this.jifen._parent.active = true;
        this.QA[0].active = this;
    },
    //设置悟空生命状态
    setMstate() {
        let sp = this.mState.getComponent(cc.Sprite);
        let sf = this.m_stateSpriteFrame.getSpriteFrame("0");
        sp.spriteFrame = sf;
    },
});