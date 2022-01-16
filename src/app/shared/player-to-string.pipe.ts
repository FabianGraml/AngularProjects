import { Pipe, PipeTransform } from '@angular/core';
import { IPlayerDTO } from '../models/IPlayerDTO';

@Pipe({
  name: 'playerToString'
})
export class PlayerToStringPipe implements PipeTransform {

  transform(playerDTO: IPlayerDTO): string {
    return `${playerDTO.firstName} ${playerDTO.lastName} (${playerDTO.golfClubName}) - ${playerDTO.handicap}`
  }

}
