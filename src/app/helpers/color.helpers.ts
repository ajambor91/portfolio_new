export class Colors{

    static $redTop = '#ed3232';
    static $red = '#ed0000';
    
    static $orangeTop = '#e58d45';
    static $orange = '#ef7919';
    
    static $blueTop = '#4588e3';
    static $blue = '#276fd2';
    
    static $greenTop = '#45cb45';
    static $green = '#27b327'; 
    
    static $darkBlue = '#021733';
    static $white = '#fff';
    static $figureColors = [
        '#00FF00',
        '#00FFFF',
        '#FF1493',
        '#FFFF00',
        '#FF0000'
    ];

    static fitGradientTopColor(color: string): string {
        return this[`${Object.keys(color)[0]}Top`] || null;
    }

    static returnRanomdColor(): string {
        const random = Math.ceil(Math.random() * this.$figureColors.length - 1) + 1;
        return this.$figureColors[random];
    }
 }