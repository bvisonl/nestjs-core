export class Response {
  statusCode: number;
  message: string;
  errors: string[];
  data: any;
  pagination?: ResponseDataPagination;

  constructor(statusCode = 200, data = {}, message = 'The request completed successfully') {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  setData(data: any): Response {
    this.data = data;
    return this;
  }

  setPagination(pagination: any): Response {
    this.pagination = new ResponseDataPagination(pagination.page, pagination.more, pagination.totalResults);
    return this;
  }
}

class ResponseDataPagination {
  totalResults: number;
  more: boolean;
  page: number;

  constructor(page: number, more: boolean, totalResults: number) {
    this.page = page;
    this.more = more;
    this.totalResults = totalResults;
  }
}
