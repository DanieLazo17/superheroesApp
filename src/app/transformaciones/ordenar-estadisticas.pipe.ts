import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenarEstadisticas'
})
export class OrdenarEstadisticasPipe implements PipeTransform {

  transform(value: Array<any>, ...args: unknown[]): Array<any> {
    return value.sort(function (a, b) { return Number(b[1]) - Number(a[1]) });
  }

}
