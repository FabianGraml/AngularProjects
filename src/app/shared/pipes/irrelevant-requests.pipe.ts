import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'irrelevantRequests'
})
export class IrrelevantRequestsPipe implements PipeTransform {

  transform(request: string): string {
     if(request.startsWith('PUT')){
        return request;
     } else {
       return '** not relevant **';
     }
  }

}
