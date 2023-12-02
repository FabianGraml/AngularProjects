import { DepotDto } from "./depotDTO";

export interface UserDto {
    id: number;
    name: string;
    cash: number;
    depots: DepotDto[];
}