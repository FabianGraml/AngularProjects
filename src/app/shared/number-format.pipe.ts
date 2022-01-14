import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(input:number): string {
     if(input < 10){
       return '0' + input;
     } else{
        return input.toString();
     }
  }
}
