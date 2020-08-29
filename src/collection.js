import API from './api';

/**
 * Collection class
 */
class Collection {
  constructor(collectionName) {
    this._collectionName = collectionName;
    this._initDocument();
  }

  _initDocument() {
    this._document = {};
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

    this._document = {
      ...this._document,
      ...data,
    };

    return this;
  }

  /**
   * Create a new document in a collection
   * @return {Promise} document info from server side
   */
  async create() {
    return await API.create(
      { collection: this._collectionName },
      this._document
    );
  }

  /**
   * Get documents of a collection
   * @return {Promise} documents of a collection
   */
  async get() {
    return await API.getCollection({ collection: this._collectionName });
  }

  /**
   * Get a document of a collection
   * @param {String} documentId
   * @return {Promise} document details
   */
  async getDocument(documentId) {
    if (!documentId) {
      throw new Error('Document id is required');
    }
    return await API.getDocument({
      collection: this._collectionName,
      documentId,
    });
  }

  /**
   * Update a document from a collection
   * @param {String} documentId
   * @return {Promise}
   */
  async update(documentId, data) {
    if (!documentId) {
      throw new Error('Document id is required');
    }

    return await API.update(
      {
        collection: this._collectionName,
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
      collection: this._collectionName,
      documentId,
    });
  }
}

export default Collection;
