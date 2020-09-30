import API from './api';
import { genericObject } from './index';

/**
 * Document class
 * @memberof BaaS
 * @public
 */
class Document {
  private collection: string;
  private documentId: string;
  private document: genericObject;

  constructor(collection: string, documentId?: string) {
    this.collection = collection;
    this.documentId = documentId;
    this.init();
  }

  init(): void {
    this.document = {};
  }

  /**
   * Set data to document
   * @param data
   * @returns this
   */
  set(data = {}): Document {
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
   * @returns document info from server side
   */
  async save(): Promise<void> {
    return await API.create({ collection: this.collection }, this.document);
  }

  /**
   * Update a document of a collection
   * @param {String} documentId
   * @return {Promise}
   */
  async update(): Promise<void> {
    if (!this.documentId) {
      throw new Error('Document id is required');
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
