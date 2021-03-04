import 'reflect-metadata';

export const CustomInjector =  new class {
    resolve<T>(Target: any): T {
        const requiredParams = Reflect.getMetadata('design:paramtypes', Target) || [];
        const resolvedParams = requiredParams.map((param: any) => CustomInjector.resolve(param));
        const instance = new Target(...resolvedParams);
        return instance;
    }
}();

export const CustomInjectable = (): any => (target: any) => {};


