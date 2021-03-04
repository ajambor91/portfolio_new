import { TranslateService } from "@ngx-translate/core";
import { CustomInjector } from "../di/custom.injector";
import { ResultService } from "../services/result.service";
import { Scene } from "./scene";
import { map, retry, catchError } from 'rxjs/operators';

export class SummaryScene extends Scene {

    data;

    private readonly delayText = 1000;
    private reward: Phaser.GameObjects.BitmapText;
    private textName: Phaser.GameObjects.BitmapText;
    private points: Phaser.GameObjects.BitmapText;

    constructor() {
        super({ key: 'summary' });
    }

    init(data) {
        this.data = data;
    }
    create() {
        this.reward = this.add.bitmapText(420, 50, 'font', 'Gratulacje! Wygrana!');
        this.summary().then(()=> {
            this.time.delayedCall(this.delayText, () => {
                this.add.bitmapText(400, 600, 'font', 'Punkty: ');
                this.points = this.add.bitmapText(750, 600, 'font', '0');
                const pointEvent = this.time.addEvent({
                    callback: () => {
                        this.points.text = `${+this.points.text + 1}`;
                        if(+this.points.text >= this.data.points){
                            this.time.removeEvent(pointEvent);
                            this.time.delayedCall(this.delayText, () => {
                                this.scene.start('final', {points: this.data.points})
                            })
                        }
                    },
                    delay: 50,
                    loop: true
                });
            })
        });
    }

    private summary(): Promise<boolean> {
        return new Promise(res => {
            const keys = Object.keys(this.data.killed);
            let i = 0;
            (function showKills(i, context) {
                const ratio = i + 1;
                context.add.bitmapText(620, 100 * ratio + 50, 'font', keys[i])
                    .setOrigin(.5);
                context.add.sprite(500, 100 * ratio + 50, keys[i]).setScale(.7)
                    .setOrigin(1, .5);
                context.add.bitmapText(750, 100 * ratio + 50, 'font', context.data.killed[keys[i]])
                    .setOrigin(.5);
                i++;
                if (i < keys.length) {
                    context.time.delayedCall(context.delayText, () => {
                        showKills(i, context);
                    });
                } else {
                    res(true);
                }
            })(i, this)
        })
    }
}