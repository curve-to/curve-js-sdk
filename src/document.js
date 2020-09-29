import API from './api';

/**
 * Document class
 * @memberof BaaS
 * @public
 */
class Document {
  constructor(collection, documentId) {
    this.collection = collection;
    this.documentId = documentId;
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
  async save() {
    return await API.create({ collection: this.collection }, this.document);
  }

  /**
   * Update a document of a collection
   * @param {String} documentId
   * @return {Promise}
   */
  async update() {
    if (!this.documentId) {
      throw new Error('Document id is required');
    }

    if (typeof this.documentId !== 'string') {
      throw new Error('Document id must be string');
    }

    return await API.update(
      {
        collection: this.collection,
        documentId: this.documentId,
      },
      this.document
    );
  }
}

export default Document;
