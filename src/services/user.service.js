import { utilService } from './util.service.js';
import { storageService } from './async-storage.service.js';
import { httpService } from './http.service.js';
import axios from 'axios';

const usersInit = require('../../usersInit.json');

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

async function query() {
  return httpService.get(`user/`);
}

async function getById(userId) {
  return httpService.get(`user/${userId}`);
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(LOGGED_USER_KEY) || 'null');
}

async function login(userCred) {
  const user = await httpService.post('auth/login', userCred);
  if (user) return _saveLocalUser(user);
}

async function logout() {
  sessionStorage.clear();
  return await httpService.post('auth/logout');
}

async function signup(userCred) {
  const user = await httpService.post('auth/signup', userCred);
  return _saveLocalUser(user);
}

function _saveLocalUser(user) {
  sessionStorage.setItem(LOGGED_USER_KEY, JSON.stringify(user));
  return user;
}
