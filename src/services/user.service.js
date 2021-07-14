import { utilService } from './util.service.js';
import { storageService } from './async-storage.service.js';
import { usersInit } from '../../gVol.js';
import axios from 'axios';
import { util } from 'vue/types/umd';

const USER_KEY = 'users';
const gUsers = _createUsers();

export const userService = {
  getUsers,
  getById,
};

async function getUsers(filterBy) {
  return storageService.query(USER_KEY);
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
