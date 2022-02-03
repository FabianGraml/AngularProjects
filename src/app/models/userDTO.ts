import { IDepotDTO } from "./depotDTO";

export interface IUserDTO {
    id: number;
    name: string;
    cash: number;
    depots: IDepotDTO[];
}