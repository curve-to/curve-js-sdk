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
  protected populated: genericObject;

  constructor(
    pageSize = 20,
    pageNo = 1,
    excluded = [],
    order = -1,
    where = {},
    populated = []
  ) {
    this.pageSize = pageSize;
    this.pageNo = pageNo;
    this.excluded = excluded;
    this.order = order;
    this.where = where;
    this.populated = populated;
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

  /**
   * Set where query
   * @param where
   */
  setWhere(where: Where): Query {
    this.where = where.where;
    return this;
  }

  /**
   * Populate(extend) a field in another collection
   * @param field
   * @param collection
   */
  populate(populated: populatedObject | populatedObject[]): Query {
    console.log(Object.prototype.toString.call(populated) !== '[object Object]');
    if (
      Object.prototype.toString.call(populated) !== '[object Object]' &&
      !Array.isArray(populated)
    ) {
      throw new Error('Param populated must be object type or array type.');
    }

    if (!Array.isArray(populated)) {
      populated = [populated];
    }

    this.populated = populated.map(item => {
      if (
        typeof item.field !== 'string' ||
        typeof item.collection !== 'string'
      ) {
        throw new Error('Both field and collection must be string type.');
      }

      return { path: item.field, model: item.collection };
    });

    return this;
  }
}
