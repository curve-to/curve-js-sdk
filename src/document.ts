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
  private query: genericObject;

  constructor(collection: string, documentId?: string, query?: genericObject) {
    this.collection = collection;
    this.documentId = documentId;
    this.query = query;
    this.init();
  }

  private init(): void {
    this.document = {
      $set: {},
      $unset: [],
    };
  }

  /**
   * Set document data
   * @param data
   * @returns this
   */
  set(data: genericObject = {}): Document {
    this.document.$set = Object.assign(this.document.$set, data);
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

    this.document.$unset = data;
    return this;
  }

  /**
   * Create a new document in a collection
   * @returns document info from server side
   */
  async save(): Promise<void> {
    return await API.collection.create(
      { collection: this.collection },
      this.document.$set
    );
  }

  /**
   * Update a document of a collection
   * @returns a promise
   */
  async update(): Promise<void> {
    if (!this.documentId) {
      throw new Error('Document id is required');
    }

    return await API.collection.update(
      {
        collection: this.collection,
        documentId: this.documentId,
      },
      {
        data: this.document,
      }
    );
  }

  /**
   * Update multiple documents of a collection
   * @returns a promise
   */
  async updateMany(): Promise<void> {
    return await API.collection.updateMany(
      {
        collection: this.collection,
      },
      {
        query: this.query,
        data: this.document,
      }
    );
  }
}

export default Document;
