import API from './api';
import Document from './document';

/**
 * Collection class
 * @memberof BaaS
 * @public
 */
class Collection {
  private collection: string;

  constructor(collection: string) {
    this.collection = collection;
  }

  /**
   * Create an empty document
   */
  create(): Document {
    return new Document(this.collection);
  }

  /**
   * Get a document without data
   * @param documentId
   */
  getWithoutData(documentId: string): Document {
    return new Document(this.collection, documentId);
  }

  /**
   * Get documents of a collection
   * @param pageSize
   * @param pageNo
   * @param exclude array of fields to be excluded
   * @param sortOrder order. 1: ascending, -1: descending
   * @return documents of a collection
   */
  async find({
    pageSize = 20,
    pageNo = 1,
    exclude = [],
    sortOrder = -1,
  } = {}): Promise<void> {
    const data = { pageSize, pageNo, exclude: exclude.join(), sortOrder };
    return await API.getCollection({ collection: this.collection }, data);
  }

  /**
   * Get a document of a collection
   * @param documentId
   * @param exclude array of fields to be excluded
   * @return document details
   */
  async findOne(documentId: string, { exclude = [] } = {}): Promise<void> {
    return await API.getDocument(
      {
        collection: this.collection,
        documentId,
      },
      { exclude: exclude.join() }
    );
  }

  /**
   * Remove a document from a collection
   * @param documentId
   * @return ok
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
