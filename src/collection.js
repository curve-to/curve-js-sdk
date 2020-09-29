import API from './api';
import Document from './document';

/**
 * Collection class
 * @memberof BaaS
 * @public
 */
class Collection {
  constructor(collection) {
    this.collection = collection;
  }

  /**
   * Create an empty document
   */
  create() {
    return new Document(this.collection);
  }

  /**
   * Get a document without data
   * @param {String} documentId
   */
  getWithoutData(documentId) {
    if (!documentId) {
      throw new Error('Document id is required');
    }

    if (typeof documentId !== 'string') {
      throw new Error('Document id must be string');
    }

    return new Document(this.collection, documentId);
  }

  /**
   * Get documents of a collection
   * @param {Integer} pageSize
   * @param {Integer} pageNo
   * @param {String[]} exclude array of fields to be excluded
   * @param {Integer} sortOrder order. 1: ascending, -1: descending
   * @return {Promise} documents of a collection
   */
  async find({ pageSize = 20, pageNo = 1, exclude = [], sortOrder = -1 } = {}) {
    const data = { pageSize, pageNo, exclude: exclude.join(), sortOrder };
    return await API.getCollection({ collection: this.collection }, data);
  }

  /**
   * Get a document of a collection
   * @param {String} documentId
   * @param {string[]} exclude array of fields to be excluded
   * @return {Promise} document details
   */
  async findOne(documentId, { exclude = [] } = {}) {
    if (!documentId) {
      throw new Error('Document id is required');
    }

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
   * @param {String} documentId
   * @return {Promise}
   */
  async remove(documentId) {
    if (!documentId) {
      throw new Error('Document id is required');
    }

    if (typeof documentId !== 'string') {
      throw new Error('Document id must be string');
    }

    return await API.remove({
      collection: this.collection,
      documentId,
    });
  }

  /**
   * Count documents of a collection
   */
  async count() {
    return await API.count({
      collection: this.collection,
    });
  }
}

export default Collection;
