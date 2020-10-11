import API from './api';
import Document from './document';
import Query from './query';

/**
 * Collection class
 * @memberof BaaS
 * @public
 */
class Collection extends Query {
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
   * Get a document without data
   * @param documentId
   * @returns an empty document with collection id and document id
   */
  getWithoutData(documentId: string): Document {
    return new Document(this.collection, documentId);
  }

  /**
   * Get documents of a collection
   * @returns documents of a collection
   */
  async find(): Promise<void> {
    console.log(this.query);
    const data = {
      pageSize: this.pageSize,
      pageNo: this.pageNo,
      exclude: this.excluded.join(),
      sortOrder: this.order,
      query: JSON.stringify(this.query),
    };
    return await API.getCollection({ collection: this.collection }, data);
  }

  /**
   * Get a document of a collection
   * @param documentId
   * @returns document details
   */
  async findOne(documentId: string): Promise<void> {
    return await API.getDocument(
      {
        collection: this.collection,
        documentId,
      },
      { exclude: this.excluded.join() }
    );
  }

  /**
   * Remove a document from a collection
   * @param documentId
   * @returns ok
   */
  async remove(documentId: string): Promise<void> {
    return await API.remove({
      collection: this.collection,
      documentId,
    });
  }

  /**
   * Count documents of a collection
   */
  async count(): Promise<void> {
    return await API.count({
      collection: this.collection,
    });
  }
}

export default Collection;
