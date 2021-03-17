import Query from './query';
import API from './api';
import CurveError from './error';

/**
 * File class
 * @memberof BaaS
 * @public
 */
export default class File extends Query {
  /**
   * Upload single file
   * @param file file object
   * @param useRandomFileName if true, use random file name; else use its own file name
   * @returns file details
   */
  async upload(file: Blob, { useRandomFileName = true } = {}): Promise<void> {
    if (!(file instanceof Object)) {
      throw new CurveError(600);
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('useRandomFileName', useRandomFileName.toString());

    return await API.file.upload({ data: formData });
  }

  /**
   * Get a document of files
   * @returns document details
   */
  async find(fileId: string): Promise<void> {
    return await API.file.find({
      params: { fileId },
      data: { exclude: this.exclude.join() },
    });
  }

  /**
   * Get documents of files
   * @returns documents of files
   */
  async findMany(): Promise<void> {
    const data = {
      pageSize: this.pageSize,
      pageNo: this.pageNo,
      exclude: this.exclude.join(),
      sortOrder: this.order,
      where: JSON.stringify(this.where),
    };

    return await API.file.findMany({ data });
  }

  /**
   * Remove a document from files
   * @param fileId
   */
  async remove(fileId: string): Promise<void> {
    return await API.file.remove({ params: { fileId } });
  }

  /**
   * Count documents of files
   * @returns count
   */
  async count(): Promise<void> {
    const data = {
      where: JSON.stringify(this.where),
    };

    return await API.file.count({ data });
  }
}
