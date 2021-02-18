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

    static fitGradientTopColor(color: string): string {
        return this[`${Object.keys(color)[0]}Top`] || null;
    }
 }