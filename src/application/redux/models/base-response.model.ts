export interface BaseResponseModel {
    readonly total: number;
    readonly limit?: number;
    readonly skip?: number;
}
