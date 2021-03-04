import { TranslateService } from "@ngx-translate/core";
import { CustomInjector } from "../di/custom.injector";
import { ResultService } from "../services/result.service";
import { Scene } from "./scene";
import { map, retry, catchError } from 'rxjs/operators';
import { Result } from "../model/result.model";

export class ResultScene extends Scene {

    data;

    private readonly resultService;
    private results: Result[];
    private mask: Phaser.Display.Masks.GeometryMask;
    private texts: { names: Phaser.GameObjects.BitmapText, points: Phaser.GameObjects.BitmapText };
    constructor() {
        super({ key: 'result' });
        this.resultService = CustomInjector.resolve(ResultService);
    }

    init(data) {
        this.data = data;
    }
    create() {
        let graphics = this.add.graphics();
        graphics.fillRect(100, 100, 1000, 500);
        this.mask = new Phaser.Display.Masks.GeometryMask(this, graphics);
        this.getResults();
    }

    private getResults(): void {
        this.resultService.getResults().subscribe(res => {
            this.results = res;
            this.setTexts();
        });
    }

    private setTexts(): void {
        this.texts = {
            names: this.add.bitmapText(160, 50, 'font', this.results.map(item => item.name)).setOrigin(0),
            points: this.add.bitmapText(560, 50, 'font', this.results.map(item => `${item.points}`)).setOrigin(0)
        };
        this.texts.names.setMask(this.mask);
        this.texts.points.setMask(this.mask);
        this.addScroll();

    }

    private scrollDown(): void {
        this.texts.names.y -= 100;
        this.texts.points.y -= 100;
    }

    private scrollUp(): void {
        this.texts.names.y += 100;
        this.texts.points.y += 100;
    }

    private addScroll(): void {
        const up = this.add.image(900, 100, 'scroll_up').setInteractive({ useHandCursor: true });
        const down = this.add.image(900, 600, 'scroll_down').setInteractive({ useHandCursor: true });
        down.on('pointerdown', () => {this.scrollDown()});
        up.on('pointerdown', () => {this.scrollUp()});
    }
}