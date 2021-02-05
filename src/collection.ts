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
    return await API.collection.createMany({
      params: { collection: this.collection },
      data,
    });
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
      return new Document(this.collection, null, this.query);
    }
  }

  /**
   * Get documents of a collection
   * @returns documents of a collection
   */
  async find(): Promise<void> {
    const data = {
      pageSize: this.pageSize,
      pageNo: this.pageNo,
      exclude: this.excluded.join(),
      sortOrder: this.order,
      query: JSON.stringify(this.query),
    };

    return await API.collection.getCollection({
      params: { collection: this.collection },
      data,
    });
  }

  /**
   * Get a document of a collection
   * @param documentId
   * @returns document details
   */
  async findOne(documentId: string): Promise<void> {
    return await API.collection.getDocument({
      params: {
        collection: this.collection,
        documentId,
      },
      data: { exclude: this.excluded.join() },
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
   * Count documents of a collection
   * @returns count
   */
  async count(): Promise<void> {
    return await API.collection.count({
      params: { collection: this.collection },
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
        query: this.query,
        field,
      },
    });
  }
}
