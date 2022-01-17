import { PaginationResultInterface } from "./pagination.result.interface";

export class Pagination<PaginationEntity> {
    public results: PaginationEntity[];
    public items_total: number;
    public total: number;

    constructor(paginationResults: PaginationResultInterface<PaginationEntity>) {
        this.results = paginationResults.results;
        this.items_total = paginationResults.results.length;
        this.total = paginationResults.total;
    }
}