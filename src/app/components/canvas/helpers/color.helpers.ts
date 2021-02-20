export class ColorHelper{
    static $figureColors = [
        '#00FF00',
        '#00FFFF',
        '#FF1493',
        '#FFFF00',
        '#FF0000',
        '#2400ff',
        '#ed5400'
    ];
    static returnRanomdColor(): string {
        const random = Math.ceil(Math.random() * this.$figureColors.length - 1);
        return this.$figureColors[random];
    }
}