export class GenericHelper {

    private static readonly screenWidth = 1366;
   
    static checkIsMobile(): boolean {
        if (window.screen.width >= this.screenWidth) {
            return false;
        } else {
            return true;
        }
    }
}