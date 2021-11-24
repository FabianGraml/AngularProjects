import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'irrelevantRequests'
})
export class IrrelevantRequestsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
