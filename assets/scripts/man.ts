// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // 两张背景图轮播
    @property(cc.Node)
    bg1: cc.Node = null;
    @property(cc.Node)
    bg2: cc.Node = null;

    // 定义girl节点
    @property(cc.Node)
    ajun: cc.Node = null;
    @property(cc.Node)
    ajun1: cc.Node = null;
    @property(cc.Node)
    ajun2: cc.Node = null;
    @property(cc.Node)
    ajun3: cc.Node = null;
    @property(cc.Node)
    ajun4: cc.Node = null;
    @property(cc.Node)
    ajun5: cc.Node = null;
    @property(cc.Node)
    ajun6: cc.Node = null;

    // 走路频率计数器
    flapWingsCounter = 0;

    // 重力计数器--小女孩掉下来
    dropCounter = 0;

    // 定义6个银币
    @property(cc.Node)
    coin1: cc.Node = null;
    @property(cc.Node)
    coin2: cc.Node = null;
    @property(cc.Node)
    coin3: cc.Node = null;

    // 得分
    @property(cc.Label)
    scoreLabel: cc.Label = null;
    scoreCounter:number = 0;

    // 阿俊是否能吃到硬币
    catCatchCoin:boolean = true;

    // 游戏是否开始
    isGameStart: boolean = false;
    // 开始按钮
    @property(cc.Node)
    startGameBtn: cc.Node = null;

    // 开始游戏提示
    @property(cc.Node)
    tips: cc.Node = null;

    // 创建城堡
    @property (cc.Node)
    castle: cc.Node = null;

    // 城堡是否出现
    isCastleComing:boolean = false;

    // girl停止走路，场景停止轮播
    stopWalking:boolean = false;

    // 去商店按钮
    @property(cc.Node)
    goToShopBtn:cc.Node = null;

    // 商店
    @property(cc.Node)
    shop:cc.Node = null;
    // 礼物
    @property(cc.Node)
    gift1:cc.Node = null;
    @property(cc.Node)
    gift2:cc.Node = null;
    @property(cc.Node)
    gift3:cc.Node = null;
    // 提示
    @property(cc.Node)
    tip1:cc.Node = null;
    @property(cc.Node)
    tip2:cc.Node = null;
    @property(cc.Node)
    tip31:cc.Node = null;
    @property(cc.Node)
    tip32:cc.Node = null;
    @property(cc.Node)
    tip33:cc.Node = null;
    // 买它
    @property(cc.Node)
    buy1:cc.Node = null;
    @property(cc.Node)
    buy2:cc.Node = null;
    @property(cc.Node)
    buy3:cc.Node = null;
    // 信
    @property(cc.Node)
    letter:cc.Node = null;
    // 信展示的时间
    letterCounter = 0;

    

    onLoad () {
        // 添加键盘keyDown事件
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        // 初始化商店
        this.goToShopBtn.active = false;
        this.shop.active = false;
        this.gift1.active = false;
        this.gift2.active = false;
        this.gift3.active = false;
        this.tip1.active = false;
        this.tip2.active = false;
        this.tip31.active = false;
        this.tip32.active = false;
        this.tip33.active = false;
        this.buy1.active = false;
        this.buy2.active = false;
        this.buy3.active = false;
        this.letter.active = false;
    }

    // dt = 1s/60 = 1帧
    update (dt) {
        // 若停止走路，则背景不轮播，女孩不走路
        if (!this.stopWalking) {
            // 背景移动效果
            this.bg1.x -=4;
            if (this.bg1.x <= -1500) {
                this.bg1.x = 1500;
            }
            this.bg2.x -=4;
            if (this.bg2.x <= -1500) {
                this.bg2.x = 1500;
            }
    
            this.flapWingsCounter += dt;
            if (this.flapWingsCounter>=0.15) { // 0.15秒动一次
                // 女孩走路频率的逻辑
                if (this.ajun1.active) {
                    this.ajun1.active = false;
                    this.ajun2.active = true;
                } else if (this.ajun2.active) {
                    this.ajun2.active = false;
                    this.ajun3.active = true;
                } else if (this.ajun3.active) {
                    this.ajun3.active = false;
                    this.ajun4.active = true;
                } else if (this.ajun4.active) {
                    this.ajun4.active = false;
                    this.ajun1.active = true;
                } else if (this.ajun5.active) {
                    this.ajun5.active = false;
                    this.ajun6.active = true;
                } else if (this.ajun6.active) {
                    this.ajun6.active = false;
                    this.ajun1.active = true;
                }
                this.flapWingsCounter = 0;
            }
        }


        if (this.isGameStart) {
            // 下坠的逻辑
            this.dropCounter += 0.5;
            if (this.ajun.y - this.dropCounter >-450) {
                this.ajun.y -= this.dropCounter;
            } else {
                this.dropCounter = 0;
            }
    
            // 硬币移动
            this.moveCoin(this.coin1);
            this.moveCoin(this.coin2);
            this.moveCoin(this.coin3);
    
            // 吃硬币
            this.judgeCatchCoin(this.coin1);
            this.judgeCatchCoin(this.coin2);
            this.judgeCatchCoin(this.coin3);
        }

        // 判断小游戏是否结束
        // if (this.ajun.y<=-793) {
        //     this.isGameStart = false;
        //     this.startGameBtn.active = true;
        // }

        if (this.isCastleComing) {
            // 让城堡和背景一起移动如屏幕
            if (this.castle.x >=338) {
                this.castle.x-=4;
            } else {
                this.goToShopBtn.active = true;
                this.stopWalking = true;
            }
        }

        // 信展示的时间
        if (this.letter.active) {
            this.letterCounter +=dt;
            if (this.letterCounter>=5) {
                this.letter.active=false;
                this.letterCounter = 0;
            }
        }


    }

    onDestroy () {
        
    }

    // 点击屏幕
    clickBtn() {
        this.dropCounter = -10;
    }

    // 按下空格键
    onKeyDown (e) {
        if (e.keyCode === 32) {
            this.dropCounter = -10;
        }
    }

    // 吃到硬币的逻辑
    judgeCatchCoin (coin: cc.Node) {
        // let jx1 = this.ajun.x-180;
        // let jy1 = this.ajun.y-300;
        // let jx2 = this.ajun.x+180;
        // let jy2 = this.ajun.y+300;
        let jx1 = this.ajun.x-90;
        let jy1 = this.ajun.y-150;
        let jx2 = this.ajun.x+90;
        let jy2 = this.ajun.y+150;

        let cx1 = coin.x-85;
        let cy1 = coin.y-93;
        let cx2 = coin.x+85;
        let cy2 = coin.y+93;

        if (!(jy1>cy2 || jx1>cx2 || jy2<cy1 || jx2<cx1) && this.catCatchCoin) {
            this.scoreCounter += 1;
            this.scoreLabel.string = this.scoreCounter.toString();
            this.catCatchCoin = false;
            coin.active = false;
            // 吃到10个币游戏结束
            if (this.scoreCounter >=10) {
                this.isGameStart = false;
                // 女孩归位，隐藏所有硬币
                this.ajun.y = -450;
                this.coin1.active = false;
                this.coin2.active = false;
                this.coin3.active = false;
                this.isCastleComing = true;
            }
        }
    }

    // 硬币移动的逻辑
    moveCoin(coin:cc.Node) {
        coin.x -= 4;
        if (coin.x <= -835) {
            coin.x = 1500; 
            coin.active = true;
            this.catCatchCoin = true;
            coin.y = 657 - 1314*Math.random();
        }
    }

    // 点击开始游戏的方法
    startGame() {
        this.tips.active = false;
        this.isGameStart = true;
        this.startGameBtn.active = false;
        this.ajun.y = -450;
        this.dropCounter = 0;
        this.scoreCounter = 0;
        this.scoreLabel.string = this.scoreCounter.toString();

    }

    // 去商店
    goToShop() {
        this.goToShopBtn.active = false;
        this.shop.active = true;
        this.gift1.active = true;
        this.gift2.active = true;
        this.gift3.active = true;
        this.tip1.active = false;
        this.tip2.active = false;
        this.tip31.active = false;
        this.tip32.active = false;
        this.tip33.active = false;
        this.buy1.active = true;
        this.buy2.active = true;
        this.buy3.active = true;
        
    }

    // 买东西
    buyFun1() {
        if (this.scoreCounter >= 4) {
            this.tip1.active = true;
            this.buy1.active = false;
            this.gift1.active = false;
            this.scoreCounter -= 4;
        } else {
            this.tip31.active = true;
        }
    }
    buyFun2() {
        if (this.scoreCounter >= 3) {
            this.tip2.active = true;
            this.buy2.active = false;
            this.gift2.active = false;
            this.scoreCounter -= 3;
        } else {
            this.tip32.active = true;
        }
    }
    buyFun3() {
        if (this.scoreCounter >= 10) {
            this.letter.active = true;
            this.buy3.active = false;
            this.gift3.active = false;
            this.scoreCounter -= 10;
        } else {
            this.tip33.active = true;
        }
    }
}
