import { userService } from '../services/user.service';
// import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from '../services/socket.service';

// var localLoggedinUser = null;
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user || null);

export default {
  state: {
    loggedinUser: userService.getLoggedinUser(),
    users: [],
  },
  getters: {
    users({ users }) {
      return users;
    },
    loggedinUser({ loggedinUser }) {
      return loggedinUser;
    },
    watchedUser({ watchedUser }) {
      return watchedUser;
    },
  },
  mutations: {
    setLoggedinUser(state, { user }) {
      state.loggedinUser = user;
    },
    setWatchedUser(state, { user }) {
      state.watchedUser = user;
    },
    setUsers(state, { users }) {
      state.users = users;
    },
    removeUser(state, { userId }) {
      state.users = state.users.filter((user) => user._id !== userId);
    },
  },
  actions: {
    async login({ commit }, { userCred }) {
      try {
        const user = await userService.login(userCred);
        commit({ type: 'setLoggedinUser', user });
        return user;
      } catch (err) {
        console.log('userStore: Error in login', err);
        throw err;
      }
    },
    async signup({ commit }, { newUser }) {
      console.log('newUser:', newUser);
      try {
        const user = await userService.signup(newUser);
        commit({ type: 'setLoggedinUser', user });
        return user;
      } catch (err) {
        console.log('userStore: Error in signup', err);
        throw err;
      }
    },
    async logout({ commit }) {
      try {
        await userService.logout();
        commit({ type: 'setLoggedinUser', user: null });
      } catch (err) {
        console.log('userStore: Error in logout', err);
        throw err;
      }
    },
    async loadUsers({ commit }) {
      // TODO: loading
      console.log('Loading users');
      try {
        const users = await userService.getUsers();
        commit({ type: 'setUsers', users });
      } catch (err) {
        console.log('userStore: Error in loadUsers', err);
        throw err;
      }
    },
    async loadAndWatchUser({ commit }, { userId }) {
      try {
        const user = await userService.getById(userId);
        commit({ type: 'setWatchedUser', user });
        // socketService.emit(SOCKET_EMIT_USER_WATCH, userId);
        // socketService.off(SOCKET_EVENT_USER_UPDATED);
        // socketService.on(SOCKET_EVENT_USER_UPDATED, (user) => {
        //   commit({ type: 'setWatchedUser', user });
        // });
      } catch (err) {
        console.log('userStore: Error in loadAndWatchUser', err);
        throw err;
      }
    },
    async removeUser({ commit }, { userId }) {
      try {
        await userService.remove(userId);
        commit({ type: 'removeUser', userId });
      } catch (err) {
        console.log('userStore: Error in removeUser', err);
        throw err;
      }
    },
    async updateUser({ commit }, { user }) {
      try {
        user = await userService.update(user);
        commit({ type: 'setUser', user });
      } catch (err) {
        console.log('userStore: Error in updateUser', err);
        throw err;
      }
    },
  },
};
