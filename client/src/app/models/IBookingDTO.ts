export interface IBookingDTO{
    bookingId: number;
    dateTime: string;
    isLocked: number;
    golfClubId: number;
    playerIds: number[];
    playerNames: string[];
}