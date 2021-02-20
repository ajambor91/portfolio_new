export class Condition{
    
    private _operatorX: string;
    private _operatorY: string

    set operatorX(opX: string){
        this._operatorX = opX;
    }

    set operatorY(opY: string){
        this._operatorY = opY;
    }

    compareX(startPoint: number, targetPoint: number): boolean {
        return eval(startPoint + this._operatorX + targetPoint);
    }

    compareY(startPoint: number, targetPoint: number): boolean {
        return eval(startPoint + this._operatorY + targetPoint);
    }

}