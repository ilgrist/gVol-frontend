import { utilService } from './util.service.js';
import { storageService } from './async-storage.service.js';
const volsInit = require('../../volsInit.json');
import axios from 'axios';

const VOL_KEY = 'vols';
const gVols = _createVols();

export const volService = {
  query,
  getById,
};

async function query(filterBy) {
  return storageService.query(VOL_KEY);
}

function getById(volId) {
	return storageService.getById(VOL_KEY, volId);
}

function _createVols() {
  let vols = utilService.loadFromStorage(VOL_KEY);
  if (!vols || !vols.length) {
    vols = volsInit;
    utilService.saveToStorage(VOL_KEY, vols);
  }
}

// function save(vol){
//     if(vol._id) {
//         storageService.put(VOL_KEY, vol)
//     } else {
//         storageService.post(VOL_KEY, vol)
//     }
// }

// function remove(volId){
//     return storageService.remove(VOL_KEY, volId)
// }
