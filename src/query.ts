import Where from './where';

/**
 * Query class
 * @memberof BaaS
 * @public
 */
export default class Query {
  protected pageSize: number;
  protected pageNo: number;
  protected exclude: string[];
  protected order: number;
  protected where: genericObject;
  protected populate: genericObject;
  protected distinct: string;

  constructor(
    pageSize = 20,
    pageNo = 1,
    exclude = [],
    order = -1,
    where = {},
    populate = [],
    distinct = ''
  ) {
    this.pageSize = pageSize;
    this.pageNo = pageNo;
    this.exclude = exclude;
    this.order = order;
    this.where = where;
    this.populate = populate;
    this.distinct = distinct;
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
   * @param exclude array of fields to be exclude
   * @returns this
   */
  setExclude(exclude: string | string[]): Query {
    if (typeof exclude === 'string') {
      exclude = [exclude];
    }

    this.exclude = exclude;
    return this;
  }

  /**
   * Sort order
   * @param order 1: ascending, -1: descending
   * @returns this
   */
  setOrder(order: number): Query {
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
  setPopulate(populate: populateObject | populateObject[]): Query {
    if (
      Object.prototype.toString.call(populate) !== '[object Object]' &&
      !Array.isArray(populate)
    ) {
      throw new Error('Param populate must be object type or array type.');
    }

    if (!Array.isArray(populate)) {
      populate = [populate];
    }

    this.populate = populate.map(item => {
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

  /**
   * Set distinct field name that outputs unique values
   * @param field field name
   */
  setDistinct(field: string): Query {
    if (typeof field !== 'string') {
      throw new Error('Parameter field must be string type.');
    }

    this.distinct = field;
    return this;
  }
}
