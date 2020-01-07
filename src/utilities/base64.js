/**
 * ASCII to Unicode (decode Base64 to original data)
 * @param {string} b64
 * @return {string}
 */
const atou = (b64) => {
    return decodeURIComponent(escape(atob(b64)));
};

/**
* Unicode to ASCII (encode data to Base64)
* @param {string} data
* @return {string}
*/
const utoa = (data) => {
    return btoa(unescape(encodeURIComponent(data)));
};

module.exports.atou = atou;
module.exports.utoa = utoa;