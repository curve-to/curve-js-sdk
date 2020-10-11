/**
 * Query class
 * @memberof BaaS
 * @public
 */
class Query {
  protected pageSize: number;
  protected pageNo: number;
  protected excluded: string[];
  protected order: number;
  protected query: genericObject;

  constructor(
    pageSize = 20,
    pageNo = 1,
    excluded = [],
    order = -1,
    query = {}
  ) {
    this.pageSize = pageSize;
    this.pageNo = pageNo;
    this.excluded = excluded;
    this.order = order;
    this.query = query;
  }

  /**
   * Set page size
   * @param pageSize
   * @returns this
   */
  setPageSize(pageSize: number): Query {
    this.pageSize = pageSize;
    return this;
  }

  /**
   * Set page number
   * @param pageNo
   * @returns this
   */
  setPageNo(pageNo: number): Query {
    this.pageNo = pageNo;
    return this;
  }

  /**
   * Hide specific fields in server response
   * @param excluded array of fields to be excluded
   * @returns this
   */
  exclude(excluded: string[]): Query {
    this.excluded = excluded;
    return this;
  }

  /**
   * Sort order
   * @param order 1: ascending, -1: descending
   * @returns this
   */
  sortOrder(order: number): Query {
    this.order = order;
    return this;
  }

  compare(key: string, operator: string, value: any): Query {
    let op = 'eq';
    switch (operator) {
      case '=':
        op = 'eq';
        break;
      case '!=':
        op = 'ne';
        break;
      case '<':
        op = 'lt';
        break;
      case '<=':
        op = 'lte';
        break;
      case '>':
        op = 'gt';
        break;
      case '>=':
        op = 'gte';
        break;
      default:
        throw new Error('Wrong operator. Please provide the correct one.');
    }

    const { query } = this;
    query[key] = Object.assign(query[key] || {}, { [`$${op}`]: value });
    this.query = query;
    return this;
  }
}

export default Query;
