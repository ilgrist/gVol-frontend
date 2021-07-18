import { utilService } from './util.service.js';
import { storageService } from './async-storage.service.js';
const usersInit = require('../../usersInit.json');
import axios from 'axios';

const USER_KEY = 'users';
const LOGGED_USER_KEY = 'loggedUser';
const gUsers = query();

export const userService = {
  query,
  getById,
  getLoggedinUser,
  login,
  logout,
  signup,
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
  return utilService.loadFromStorage(LOGGED_USER_KEY);
}

async function login(userCred) {
  try {
    const users = await query();
    let user = users.find((user) => {
      return user.username === userCred.username && user.password === userCred.password;
    });
    if (user) {
      user = { ...user };
      delete user.password;
      utilService.saveToStorage(LOGGED_USER_KEY, user);
      return user;
    } else {
      throw 'No such user';
    }
  } catch (err) {
    console.log('user.service: error in login', err);
    throw err;
  }
}

async function logout() {
  const loggedInUser = await getLoggedinUser();
  utilService.removeFromStorage(LOGGED_USER_KEY);
}

async function signup(user) {
  try {
    const users = await query();
    users.find((user) => {
      return user.username === userCred.username;
    });
    if (user) {
      throw 'User already exists';
    } else {
      user.id = utilService._makeId();
      storageService.post(USER_KEY, user);
      delete user.password;
      storageService.post(LOGGED_USER_KEY, user);
      return user;
    }
  } catch (err) {
    console.log('user.service: error in signup', err);
    throw err;
  }
}
