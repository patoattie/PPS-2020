import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nvl'
})
export class NvlPipe implements PipeTransform {

  transform(value: number): number {
    return value ? value : 0;
  }

}
