import API from './api';

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

  private init(): void {
    this.document = {};
  }

  /**
   * Set data to document
   * @param data
   * @returns this
   */
  set(data: genericObject = {}): Document {
    this.document = Object.assign(this.document, data);
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
   * @returns a promise
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
