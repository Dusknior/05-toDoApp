import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroCompletado'
})
export class FiltroCompletadoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
