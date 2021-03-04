import { Constructor } from './constructor';
export type ClassDecorator<T extends Function> = (Target: Constructor<T>) => T | void;