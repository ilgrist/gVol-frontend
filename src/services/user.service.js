import { utilService } from './util.service.js';
import { storageService } from './async-storage.service.js';
const usersInit = require('../../usersInit.json');
import axios from 'axios';

const USER_KEY = 'users';
const gUsers = query();

export const userService = {
  query,
  getById,
  getLoggedinUser,
  login,
  logout,
};

async function query(filterBy) {
  let users = await storageService.get(USER_KEY);
  if (!users || !users.length) {
    users = usersInit;
    storageService.post(USER_KEY, users);
  }
  return users;
}

async function getById(userId) {
  return await storageService.getById(USER_KEY, userId);
}

function getLoggedinUser() {
  return gUsers[0];
}

async function login(userCred) {
  const users = await query();
  let user = users.find((user) => {
    return user.username === userCred.username + '' && user.password === userCred.password + '';
  });
  if (user) {
    user = { ...user };
    delete user.password;
    return user;
  } else {
    // throw err;
  }
}

function logout() {
  utilService.clearStorage();
  // return await httpService.post('auth/logout');
}
