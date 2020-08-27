import { Request } from 'express';

export class FilterOptions {
  page: number;
  limit: number;
  offset: number;
  search: string;
  filters: Filter[];

  constructor(request: Request) {
    // Set the page number
    this.page = request.query['page'] ? Number.parseInt(request.query['page'].toString()) : 1;
    this.page = this.page < 1 ? 1 : this.page;

    // Set the limit
    this.limit = request.query['limit'] ? Number.parseInt(request.query['limit'].toString()) : 25;
    this.limit = this.limit < 1 ? 1 : 25;

    // Set the offset
    this.offset = (this.page - 1) * this.limit;

    // Set the search
    this.search = request.query['search'] ? request.query['search'].toString() : '';

    // Set the filters
  }

  setMaxResults(maxResults: number): FilterOptions {
    this.limit = this.limit < maxResults ? this.limit : maxResults;
    return this;
  }
}

class Filter {
  key: string;
  value: string | FilterRange;
}

class FilterRange {
  from: string | number | Date;
  to: string | number | Date;
}
