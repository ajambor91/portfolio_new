import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class ObjectTransformPipe implements PipeTransform {

  transform(value: any, args: any[]): any {
    return Object.keys(value).map(key => value[key]);
  }

}
