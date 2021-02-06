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
  static and(whereArray: Where[]): genericObject {
    if (!whereArray || !whereArray.length) {
      throw new Error('whereArray must not be empty');
    }

    const orWhere = { where: { $and: [] } };
    orWhere.where.$and.push(...whereArray.map(where => where.where));

    return orWhere;
  }

  /**
   * or where
   * @param whereArray
   */
  static or(whereArray: Where[]): genericObject {
    if (!whereArray || !whereArray.length) {
      throw new Error('whereArray must not be empty');
    }

    const orWhere = { where: { $or: [] } };
    orWhere.where.$or.push(...whereArray.map(where => where.where));

    return orWhere;
  }
}
