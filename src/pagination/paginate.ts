import { PaginationResultInterface } from "./pagination-result-interface";

export class Pagination<PaginationEntity> {
    public results: PaginationEntity[];
    public itemsTotal: number;
    public total: number;

    constructor(paginationResults: PaginationResultInterface<PaginationEntity>) {
        this.results = paginationResults.results;
        this.itemsTotal = paginationResults.results.length;
        this.total = paginationResults.total;
    }
}