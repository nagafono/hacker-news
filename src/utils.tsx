/**
 * Get Hacker news item
 * @param {number} id Item id
 * @returns {Promise<any | Array>} Promise, which resolves Hacker news item data
 */
export async function getItem(id:number) {
  return await getJson('//hacker-news.firebaseio.com/v0/item/' + id + '.json?print=pretty');
}

/**
 * Get JSON through HTTP request
 * @param {string} url Requested url
 * @returns {Promise<any>} Promise, which resolves JSON data
 */
export async function getJson(url:string) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (err) {
        // can be also done with throw new Error() but without UI representation of the error
    console.error(`ERROR: getJson() - ${err}`);
    return [];
  }
}
