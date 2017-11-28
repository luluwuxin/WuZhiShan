cc.Class({
    extends: cc.Component,
    properties: {
        jifen: {
            default: null,
            type: cc.Node,
            displayName: "分数"
        },
        m_stateSpriteFrame: cc.SpriteAtlas,
        mState: {
            default: null,
            type: cc.Sprite,
            displayName: "生命状态节点"
        },
        QA: [cc.Node],
        mkAnim: {
            default: null,
            type: cc.Node,
            displayName: "悟空动画"
        },
        ts: {
            default: null,
            type: cc.Node,
            displayName: "唐僧"
        },
        shandian: {
            default: null,
            type: cc.Node,
            displayName: "闪电"
        },
        audio_shandian: cc.AudioClip,
        audio_dianliu: cc.AudioClip,
        audio_up: cc.AudioClip,
        audio_wukong: cc.AudioClip,
        audio_shanBeng: cc.AudioClip,
        audio_out: cc.AudioClip,
        shanfeng: {
            default: null,
            type: cc.Node,
            displayName: "山峰"
        },
        lingfu: {
            default: null,
            type: cc.Node,
            displayName: "灵符"
        },
        isRun: false,
        animObj: null,

    },
    start() {
        this.node.on("touchstart", this.selectDaAn, this);
    },
    onLoad() {
        cc.director.preloadScene("GameEnd");
        cc.director.preloadScene("GameOk");
    },
    //正确答案
    selectDaAn(event) {
        if (this.isRun) return false;
        this.isRun = true;
        switch (event.target.name) {
            case "Q1_Pass":
                this.jifen.getComponent(cc.Label).string = "20";
                this.okCallback(0, 1);
                break;
            case "Q2_Pass":
                this.jifen.getComponent(cc.Label).string = "40";
                this.okCallback(1, 2);
                break;
            case "Q3_Pass":
                this.jifen.getComponent(cc.Label).string = "60";
                this.okCallback(2, 3);
                break;
            case "Q4_Pass":
                this.jifen.getComponent(cc.Label).string = "80";
                this.okCallback(3, 4);
                break;
            case "Q5_Pass":
                this.jifen.getComponent(cc.Label).string = "100";
                this.okCallback(4, 5);
                break;
            default:
                this.errorCallback();
                break;
        }
    },
    //回答错误
    errorCallback() {
        cc.audioEngine.stopAll();
        cc.audioEngine.play(this.audio_shandian, false, 1);
        cc.audioEngine.play(this.audio_dianliu, false, 1);
        let nCurrent = parseInt(this.mState.spriteFrame.name) + 1;
        if (nCurrent < 3) {
            this.errorAnim(nCurrent, function() {});
        } else {
            this.errorAnim(nCurrent, function() {
                cc.director.loadScene("GameEnd");
            });

        }

    }, //回答正确
    okCallback(currentQA, nextQA) {
        cc.audioEngine.stopAll();
        cc.audioEngine.play(this.audio_up, false, 1);
        let anim = this.mkAnim.getComponent(cc.Animation);
        anim.play("wukong1");
        this.animObj = this.ts.getComponent(cc.Animation);
        let tsAnimUpState = this.animObj.play("ts_up");
        tsAnimUpState.repeatCount = 3;
        let tsUpAction = cc.moveBy(1, cc.p(0, 80));
        this.ts.runAction(cc.sequence(tsUpAction, cc.callFunc(function() {
            if (currentQA == 4) {
                this.lingfu.active = false;
                let ts_lingfu = this.ts.getComponent(cc.Animation);
                ts_lingfu.play("ts_lingfu");

                ts_lingfu.on("finished", function() {
                    cc.audioEngine.stopAll();
                    cc.audioEngine.play(this.audio_shanBeng, false, 1);
                    this.shanbengCallback();
                }, this)
            }
        }, this)));
        this.animObj.on("finished", function() {
            if (currentQA != 4) {
                this.QA[currentQA].active = false;
                this.QA[nextQA].active = true;
                // this.isRun = false;
            }
        }, this)
    },
    //山崩
    shanbengCallback() {
        let shanbeng = this.shanfeng.getComponent(cc.Animation);
        shanbeng.play("shan_beng");
        shanbeng.on("finished", function() {
            cc.audioEngine.stopAll();
            cc.audioEngine.play(this.audio_wukong, false, 1);
            let anim_mkout = this.mkAnim.getComponent(cc.Animation);
            anim_mkout.play("mk_out");
            anim_mkout.on("finished", function() {
                cc.director.loadScene("GameOk");
            }, this)
        }, this)
    }, //播放错误动画
    errorAnim(nCurrent, callback) {
        let sf = this.m_stateSpriteFrame.getSpriteFrame(nCurrent);
        this.mState.spriteFrame = sf;
        this.shandian.active = true;
        let anim_shandian = this.shandian.getComponent(cc.Animation);
        let anim_shandianState = anim_shandian.play("shandian");
        anim_shandianState.repeatCount = 2;
        let anim = this.mkAnim.getComponent(cc.Animation);
        anim.play("wukong1");

        anim_shandian.on("finished", function() {
            //唐僧闪电
            let tsAnim = this.ts.getComponent(cc.Animation);
            let tsAnimState = tsAnim.play("tsLost");
            tsAnimState.repeatCount = 2;
            this.shandian.active = false;
            this.isRun = false;
            callback();
        }, this);
    }
});