import { utilService } from '../services/util.service.js';
import { volService } from '../services/vol.service.js';

export default {
  state: {
    vols: [],
    filterBy: {
      txt: '',
      category: 'all',
      skills: 'all',
      isOnSite: false,
      isOnLine: false,
    },
  },
  mutations: {
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy;
    },
    addVol(state, { savedVol }) {
      state.vols.push(savedVol);
    },
    updateVol(state, { savedVol }) {
      const idx = state.vols.findIndex((td) => td._id === savedVol._id);
      state.vols.splice(idx, 1, savedVol);
    },
    removeVol(state, { volId }) {
      const idx = state.vols.findIndex((td) => td._id === volId);
      state.vols.splice(idx, 1);
    },
    setVols(state, { vols }) {
      state.vols = vols;
    },
    addReview(state, { payload }) {
      const volId = payload.volId;
      const review = payload.review;
      const idx = state.vols.findIndex((vol) => vol._id === volId);
      if (idx) {
        state.vols[idx].reviews.unshift(review);
      }
    },
  },
  getters: {
    volsToShow(state) {
      let filteredVols = JSON.parse(JSON.stringify(state.vols));
      if (state.filterBy.category === 'all') filteredVols = filteredVols;
      if (state.filterBy.category !== 'all') {
        filteredVols = filteredVols.filter((vol) => {
          const tags = vol.tags;
          return tags.some((tag) => tag === state.filterBy.category);
        });
      }
      if (state.filterBy.skills === 'all') filteredVols = filteredVols;
      if (state.filterBy.skills !== 'all') {
        filteredVols = filteredVols.filter((vol) => {
          const skills = vol.reqSkills;
          return skills.some((skill) => skill === state.filterBy.skills);
        });
      }
      if (state.filterBy.isOnLine) {
        filteredVols = filteredVols.filter((vol) => !vol.loc.isOnsite);
      }
      if (state.filterBy.isOnSite) {
        filteredVols = filteredVols.filter((vol) => vol.loc.isOnsite);
      }
      if (state.filterBy.txt) {
        const regex = new RegExp(state.filterBy.txt, 'i');
        filteredVols = state.vols.filter((vol) => regex.test(vol.title));
      }
      return filteredVols;
    },
    filterBy(state) {
      return state.filterBy;
    },
    shortListRandVols(state) {
      let randomVols = [];
      for (var i = 0; i < 4; i++) {
        var item = state.vols[Math.floor(Math.random() * state.vols.length)];
        randomVols.push(item);
      }
      return randomVols;
    },
  },

  actions: {
    async saveVol({ commit }, { vol }) {
      const type = vol._id ? 'updateVol' : 'addVol';
      try {
        const savedVol = await volService.save(vol);
        commit({ type, savedVol });
        return savedVol;
      } catch (err) {
        console.log("Couldn't save the vol", vol, err);
      }
    },
    async removeVol({ commit }, { payload }) {
      try {
        await volService.remove(payload.volId);
        commit(payload);
      } catch (err) {
        console.log("Couldn't remove vol", vol, err);
      }
    },
    async loadVols(context) {
      try {
        const vols = await volService.query(context.state.filterBy);
        context.commit({ type: 'setVols', vols });
      } catch (err) {
        console.log("Can't load vols", err);
      }
    },
    async addReview({ commit }, { newReview }) {
      const volId = newReview.volId;
      const review = {
        id: utilService.makeId(),
        txt: newReview.txt,
        createdBy: newReview.createdBy,
        createdAt: Date.now(),
        rating: newReview.rating,
      };
      commit({ type: 'addReview', payload: { review, volId } });
    },
    async getVol(context, { _id }) {
      await context.dispatch({ type: 'loadVols' });
      const vol = context.state.vols.find((vol) => vol._id === _id);
      if (!vol) return 'cannot find vol';
      return vol;
    },
  },
};
