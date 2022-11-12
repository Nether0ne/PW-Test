interface ISearchVolumeClient {
  /**
   * For each keyword in `keywords` array calculates it's search volume.
   * Returns an array of objects with keyword text and it's calculated search volume.
   * Order of returned keywords is same as in provided `keywords` array.
   *
   * @param keywords Should be an array of keywords with max 100 elements. If not array or has more than 100 elements - throws an error
   */
  getSearchVolume(keywords: string[]): Promise<Map<string, number>>;
}

export class SearchVolumeClient implements ISearchVolumeClient {
  public async getSearchVolume(
    keywords: string[],
  ): Promise<Map<string, number>> {
    const keywordMap = new Map<string, number>();

    if (!Array.isArray(keywords) || keywords.length > 100) {
      throw new Error(
        `Not valid 'keywords' parameter. Should be an array of strings with max 100 elements`,
      );
    }

    for (const k of keywords) {
      keywordMap.set(k, (keywordMap.get(k) || 0) + 1);
    }

    return keywordMap;
  }
}
