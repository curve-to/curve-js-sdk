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
  private fieldsToUnset: string[];
  private query: genericObject;

  constructor(collection: string, documentId?: string, query?: genericObject) {
    this.collection = collection;
    this.documentId = documentId;
    this.query = query;
    this.init();
  }

  private init(): void {
    this.document = {};
    this.fieldsToUnset = [];
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
   * Remove fields of a document
   * @param data fields to remove
   */
  unset(data: string | string[]): Document {
    if (typeof data === 'string') {
      data = [data];
    }

    this.fieldsToUnset = data;
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
      {
        data: { $set: this.document, $unset: this.fieldsToUnset },
      }
    );
  }

  /**
   * Update multiple documents of a collection
   * @returns a promise
   */
  async updateMany(): Promise<void> {
    return await API.updateMany(
      {
        collection: this.collection,
      },
      {
        query: this.query,
        data: { $set: this.document, $unset: this.fieldsToUnset },
      }
    );
  }
}

export default Document;
