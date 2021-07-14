import { utilService } from './util.service.js';
import { storageService } from './async-storage.service.js';
import { orgsInit } from '../../gVol.js';
import axios from 'axios';
import { util } from 'vue/types/umd';

const ORG_KEY = 'orgs';
const gOrgs = _createOrgs();

export const orgService = {
  getOrgs,
  getById,
};

async function getOrgs(filterBy) {
  return storageService.query(ORG_KEY);
}

function getById(orgId) {
  return storageService.getById(ORG_KEY, orgId);
}

function _createOrgs() {
  let orgs = utilService.loadFromStorage(ORG_KEY);
  if (!orgs || !orgs.length) {
    orgs = orgsInit;
    utilService.saveToStorage(ORG_KEY);
  }
}

// function save(org){
//     if(org._id) {
//         storageService.put(ORG_KEY, org)
//     } else {
//         storageService.post(ORG_KEY, org)
//     }
// }

// function remove(orgId){
//     return storageService.remove(ORG_KEY, orgId)
// }
