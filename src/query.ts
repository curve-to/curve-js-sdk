import Where from './where';

/**
 * Query class
 * @memberof BaaS
 * @public
 */
export default class Query {
  protected pageSize: number;
  protected pageNo: number;
  protected excluded: string[];
  protected order: number;
  protected where: genericObject;

  constructor(
    pageSize = 20,
    pageNo = 1,
    excluded = [],
    order = -1,
    where = {}
  ) {
    this.pageSize = pageSize;
    this.pageNo = pageNo;
    this.excluded = excluded;
    this.order = order;
    this.where = where;
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
  exclude(excluded: string | string[]): Query {
    if (typeof excluded === 'string') {
      excluded = [excluded];
    }

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

  setWhere(where: Where): Query {
    this.where = where.where;
    return this;
  }
}
