export interface TransactionDto {
    username: string;
    shareName: string;
    amount: number;
    price: number;
    unitsInStockNow: number;
    isUserBuy: boolean;
}