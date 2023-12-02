import GameboardDTO from "./gameboardDTO";

export class GameComponentDTO {
    id: number = 0;
    gameboardDto: GameboardDTO = new GameboardDTO();
    guess: number = 0;
    attemptLeft: number = 0;
}