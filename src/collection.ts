import Document from './document';
import Query from './query';
import API from './api';

/**
 * Collection class
 * @memberof BaaS
 * @public
 */
export default class Collection extends Query {
  private collection: string;

  constructor(collection: string) {
    super();
    this.collection = collection;
  }

  /**
   * Get a document without data
   * @param documentId
   * @returns an empty document with collection id and document id
   */
  getWithoutData(documentId?: string): Document {
    if (documentId) {
      return new Document(this.collection, documentId);
    } else {
      return new Document(this.collection, null, this.where);
    }
  }

  /**
   * Create an empty document
   * @returns a new document with collection id
   */
  create(): Document {
    return new Document(this.collection);
  }

  /**
   * Create multiple documents
   * @returns a number of documents created
   */
  async createMany(data: genericObject[]): Promise<void> {
    if (!Array.isArray(data)) {
      throw new Error('Data must be Array type.');
    }

    return await API.collection.createMany({
      params: { collection: this.collection },
      data,
    });
  }

  /**
   * Get a document of a collection
   * @param documentId
   * @returns document details
   */
  async find(documentId: string): Promise<void> {
    return await API.collection.find({
      params: {
        collection: this.collection,
        documentId,
      },
      data: {
        exclude: this.exclude.join(),
        populate: JSON.stringify(this.populate),
      },
    });
  }

  /**
   * Get documents of a collection
   * @returns documents of a collection
   */
  async findMany(): Promise<void> {
    const data = {
      pageSize: this.pageSize,
      pageNo: this.pageNo,
      exclude: this.exclude.join(),
      sortOrder: this.order,
      where: JSON.stringify(this.where),
      populate: JSON.stringify(this.populate),
    };

    return await API.collection.findMany({
      params: { collection: this.collection },
      data,
    });
  }

  /**
   * Get distinct of a field from a collection
   * @returns documents of a collection
   */
  async findDistinct(): Promise<void> {
    const data = {
      distinct: this.distinct,
      where: JSON.stringify(this.where),
    };

    return await API.collection.findDistinct({
      params: { collection: this.collection },
      data,
    });
  }

  /**
   * Remove a document from a collection
   * @param documentId
   * @returns ok
   */
  async remove(documentId: string): Promise<void> {
    return await API.collection.remove({
      params: { collection: this.collection, documentId },
    });
  }

  /**
   * Remove multiple documents from a collection
   * @returns ok
   */
  async removeMany(): Promise<void> {
    return await API.collection.removeMany({
      params: { collection: this.collection },
      data: {
        where: this.where,
      },
    });
  }

  /**
   * Count documents of a collection
   * @returns count
   */
  async count(): Promise<void> {
    const data = {
      where: JSON.stringify(this.where),
    };

    return await API.collection.count({
      params: { collection: this.collection },
      data,
    });
  }

  /**
   * Get sum total of a specific field from date range
   * @param field target field to sum
   */
  async sum(field: string): Promise<void> {
    if (!field) {
      throw new Error('Field is required');
    }

    return await API.collection.sum({
      params: { collection: this.collection },
      data: {
        where: this.where,
        field,
      },
    });
  }
}
