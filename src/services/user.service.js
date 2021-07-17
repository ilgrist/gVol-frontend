import { utilService } from './util.service.js';
import { storageService } from './async-storage.service.js';
const usersInit = require('../../usersInit.json');
import axios from 'axios';

const USER_KEY = 'users';
const gUsers = _createUsers();

export const userService = {
  query,
  getById,
};

async function query(filterBy) {
  const users = JSON.parse(JSON.stringify(gUsers));
  return users;
}

function getById(userId) {
  return storageService.getById(USER_KEY, userId);
}

function _createUsers() {
  let users = utilService.loadFromStorage(USER_KEY);
  if (!users || !users.length) {
    users = usersInit;
    utilService.saveToStorage(USER_KEY);
  }
}

// function save(user){
//     if(user._id) {
//         storageService.put(USER_KEY, user)
//     } else {
//         storageService.post(USER_KEY, user)
//     }
// }

// function remove(userId){
//     return storageService.remove(USER_KEY, userId)
// }
