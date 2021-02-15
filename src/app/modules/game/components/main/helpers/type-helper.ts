export class TypeHelper{
    static isNotUndefined(item: any): boolean {
        if (typeof item === 'undefined'){
            return false;
        }
        return true;
    }
}