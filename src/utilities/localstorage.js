// Utility module to manage HTML5 localStorage

/**
 * Check whether localStorage is available.
 * It sets a dummy key.
 * Validates the dummy key.
 * Then deletes the dummy key.
 */
const isLocalStorage = () => {
  try {
    localStorage.setItem('test', 'x');
    // console.log(localStorage.getItem('text'));
    if (localStorage.getItem('test') === 'x') {
      localStorage.removeItem('test');
      return true;
    } else {
      throw new Error('localStorage unavailable');
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

/**
 * Get data from local storage
 * @param {string} identifier Local storage identifier
 * @param {string} sortBy Field to sort by. null means unsorted
 */
const getLocalStorage = (identifier, sortBy) => {
  let response = {
    statusOK: false,
    data: []
  }
  try {
    let storedData = JSON.parse(localStorage.getItem(identifier));
    // console.log(storedData);
    if (storedData) {
      if (sortBy) storedData.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1);
      response = {
        statusOK: true,
        data: storedData
      };
    } else {
      // console.warn('No favorites found in local storage');
      throw new Error('No items found in localStorage with identifier: ' + identifier);
    }
  } catch (err) {
    // console.log(err);
    // Life goes on ...
  }
  // console.log(response);
  return response;
}

/**
 * Get mock data sample data
 * @param {string} identifier Dummy local storage identifier
 * @param {string} sortBy Dummy sort field
 */
const getMockStorage = (identifier, sortBy) => {
  // https://github.com/kelektiv/node-uuid
  const response = {
    statusOK: true,
    // statusOK: false,
    data: [
      {
        noteId: '347cf222-887b-11e9-bc42-526af7764f64',
        noteTitle: 'Google',
        note: 'VGhpcyBpcyBzb21lIG5vdGUgY3JlYXRlZCBieSB5b3UKCiAgICAgICAgICAgICAgICB3aXRoIGEgbmV3IGxpbmUu',
        noteDate: '2019-12-20 08:55'
      },
      {
        noteId: '347cf4ca-887b-11e9-bc42-526af7764f64',
        noteTitle: 'Standard Bank',
        note: 'VGhpcyBpcyBzb21lIG5vdGUgY3JlYXRlZCBieSB5b3UKCiAgICAgICAgICAgICAgICB3aXRoIGEgbmV3IGxpbmUu',
        noteDate: '2019-12-20 08:55'
      },
      {
        noteId: '347cf632-887b-11e9-bc42-526af7764f64',
        noteTitle: 'Banana Tree',
        note: 'VGhpcyBpcyBzb21lIG5vdGUgY3JlYXRlZCBieSB5b3UKCiAgICAgICAgICAgICAgICB3aXRoIGEgbmV3IGxpbmUu',
        noteDate: '2019-12-20 08:55'
      },
      {
        noteId: '347cf786-887b-11e9-bc42-526af7764f64',
        noteTitle: 'First National Bank',
        note: 'VGhpcyBpcyBzb21lIG5vdGUgY3JlYXRlZCBieSB5b3UKCiAgICAgICAgICAgICAgICB3aXRoIGEgbmV3IGxpbmUu',
        noteDate: '2019-12-20 08:55'
      },
      {
        noteId: '347cf9ac-887b-11e9-bc42-526af7764f64',
        noteTitle: 'Apple Trees',
        note: 'VGhpcyBpcyBzb21lIG5vdGUgY3JlYXRlZCBieSB5b3UKCiAgICAgICAgICAgICAgICB3aXRoIGEgbmV3IGxpbmUu',
        noteDate: '2019-12-20 08:55'
      },
      {
        noteId: '347cfb0a-887b-11e9-bc42-526af7764f64',
        noteTitle: 'Hello World',
        note: 'VGhpcyBpcyBzb21lIG5vdGUgY3JlYXRlZCBieSB5b3UKCiAgICAgICAgICAgICAgICB3aXRoIGEgbmV3IGxpbmUu',
        noteDate: '2019-12-20 08:55'
      },
      {
        noteId: '347cfc54-887b-11e9-bc42-526af7764f64',
        noteTitle: 'Batman',
        note: 'VGhpcyBpcyBzb21lIG5vdGUgY3JlYXRlZCBieSB5b3UKCiAgICAgICAgICAgICAgICB3aXRoIGEgbmV3IGxpbmUu',
        noteDate: '2019-12-20 08:55'
      }
    ]
  };
  return response;
}

/**
 * Overwrite item to local storage
 * @param {string} identifier Local storage identifier
 * @param {any} data Data object to store
 */
const saveLocalStorage = (identifier, data) => {
  localStorage.setItem(identifier, JSON.stringify(data));
  return true;
}

// Export module methods
module.exports.isLocalStorage = isLocalStorage;
module.exports.getLocalStorage = getLocalStorage;
module.exports.getMockStorage = getMockStorage;
module.exports.saveLocalStorage = saveLocalStorage;