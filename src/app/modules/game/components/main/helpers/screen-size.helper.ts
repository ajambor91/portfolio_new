import { ScreenSize } from "../model/screen-size.model";

export class ScreenSizeHelper {
    
    static readonly factor = .85;
    static readonly maxWidth = 1400;

    static calcDefaultSize(): ScreenSize {

        const innerW = window.innerWidth;
        if (innerW > this.maxWidth) {
            var gameWidth = <number>this.maxWidth;
            var gameHeight = <number>this.maxWidth / this.factor;
        } else {
            var gameWidth = window.innerWidth;
            var gameHeight = window.innerHeight;
        }
        const screenSize: ScreenSize  = {
            height: gameHeight * this.factor,
            width: gameWidth * this.factor
        };
        return screenSize;
    }
}