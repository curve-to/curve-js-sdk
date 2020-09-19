import API from './api';

/**
 * Collection class
 * @memberof BaaS
 * @public
 */
class Collection {
  constructor(collection) {
    this.collection = collection;
    this.initDocument();
  }

  initDocument() {
    this.document = {};
  }

  /**
   * Set data to document
   * @param {Object} data
   * @return {this}
   */
  set(data = {}) {
    if (Object.prototype.toString.call(data) !== '[object Object]') {
      throw new Error('Invalid data type. Please provide an object');
    }

    this.document = {
      ...this.document,
      ...data,
    };

    return this;
  }

  /**
   * Create a new document in a collection
   * @return {Promise} document info from server side
   */
  async create() {
    return await API.create({ collection: this.collection }, this.document);
  }

  /**
   * Get documents of a collection
   * @param {Integer} pageSize
   * @param {Integer} pageNo
   * @param {string[]} exclude array of fields to be excluded
   * @param {Integer} sortOrder order. 1: ascending, -1: descending
   * @return {Promise} documents of a collection
   */
  async get({ pageSize = 20, pageNo = 1, exclude = [], sortOrder = -1 } = {}) {
    const data = { pageSize, pageNo, exclude: exclude.join(), sortOrder };
    return await API.getCollection({ collection: this.collection }, data);
  }

  /**
   * Get a document of a collection
   * @param {String} documentId
   * @param {string[]} exclude array of fields to be excluded
   * @return {Promise} document details
   */
  async getDocument(documentId, { exclude = [] } = {}) {
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
   * Update a document of a collection
   * @param {String} documentId
   * @return {Promise}
   */
  async update(documentId, data) {
    if (!documentId) {
      throw new Error('Document id is required');
    }

    return await API.update(
      {
        collection: this.collection,
        documentId,
      },
      data
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

    return await API.remove({
      collection: this.collection,
      documentId,
    });
  }

  async count() {
    return await API.count({
      collection: this.collection,
    });
  }
}

export default Collection;
