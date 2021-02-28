import { ScreenOrientationEnum } from "../enums/screen-orientation.enum";

export class GenericHelper {

    private static readonly screenWidth = 1366;
    private static readonly regex = /^landscape-[a-z]*$/;

    static checkIsMobile(): boolean {
        if (window.screen.width >= this.screenWidth) {
            return false;
        } else {
            return true;
        }
    }

    static detectScreenOrientation(): ScreenOrientationEnum {
        const orientation = window.screen.orientation.type;

        if(this.regex.test(orientation)){
            return ScreenOrientationEnum.Landscape
        }else{
            return ScreenOrientationEnum.Portrait
        }
    }
}