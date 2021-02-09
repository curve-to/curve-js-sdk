export default class Where {
  public where: genericObject;

  constructor() {
    this.where = {};
  }

  /**
   * Compare
   * @param key document field
   * @param operator
   * @param value value to compare
   */
  compare(key: string, operator: string, value: unknown): Where {
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
        throw new Error('Invalid operator. Please provide the correct one.');
    }

    const { where } = this;
    where[key] = Object.assign(where[key] || {}, { [`$${op}`]: value });
    this.where = where;

    return this;
  }

  /**
   * and where
   * @param whereArray
   */
  and(whereArray: Where[]): Where {
    const $and = '$and';
    return getOrWhere($and, whereArray, this);
  }

  /**
   * or where
   * @param whereArray
   */
  or(whereArray: Where[]): Where {
    const $or = '$or';
    return getOrWhere($or, whereArray, this);
  }
}

/**
 * get or || where
 * @param operator
 * @param whereArray
 * @param whereClass this
 */
const getOrWhere = (
  operator: string,
  whereArray: Where[],
  whereClass: Where
) => {
  if (!whereArray || !whereArray.length) {
    throw new Error('whereArray must not be empty');
  }

  const filter = whereArray.map(where => where.where);
  const { where } = whereClass;
  where[operator] = where[operator] ? [...where[operator], ...filter] : filter;
  whereClass.where = where;

  return whereClass;
};
