import { ThesisTableItemResource } from "./thesisTableItemResource.interface";

export  interface Pageable {
    totalItems: number;
    page: number;
    pageSize: number;
    totalPages: number;
    items: ThesisTableItemResource[];
}