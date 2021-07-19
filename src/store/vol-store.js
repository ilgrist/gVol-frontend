import { utilService } from '../services/util.service.js';
import { volService } from '../services/vol.service.js';
import { userService } from '../services/user.service.js';

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
		volToUpdate: null,
	},
	mutations: {
		setFilter(state, { filterBy }) {
			state.filterBy = filterBy;
		},
		addVol(state, { savedVol }) {
			state.vols.push(savedVol);
		},
		updateVol(state, { vol }) {
			const idx = state.vols.findIndex((td) => td._id === vol._id);
			state.vols.splice(idx, 1, vol);
		},
		removeVol(state, { volId }) {
			console.log('sanity from commit');
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

		setVolToUpdate(state, { vol }) {
			state.volToUpdate = vol;
		},

		joinVol(state, { volToUpdate }) {
			const idx = state.vols.findIndex(
				(vol) => vol._id === volToUpdate._id
			);
			state.vols.splice(idx, 1, volToUpdate);
		},
	},

<<<<<<< HEAD
  getters: {
    volToUpdate(state) {
      console.log(state.volToUpdate);
      return state.volToUpdate;
    },
    volsToShow(state) {
      // there is filter process in the backend
      //TODO: remove the filter logic from this getter and
      // change the func to loadVols after setFilter
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
=======
	getters: {
		volToUpdate(state) {
			console.log(state.volToUpdate);
			return state.volToUpdate;
		},
		volsToShow(state) {
			// there is filter process in the backend
			//TODO: remove the filter logic from this getter and
			// change the func to loadVols after setFilter
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
					return skills.some(
						(skill) => skill === state.filterBy.skills
					);
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
				filteredVols = state.vols.filter((vol) =>
					regex.test(vol.title)
				);
			}
			return filteredVols;
		},
		filterBy(state) {
			return state.filterBy;
		},
		shortListRandVols(state) {
			let randomVols = [];
			for (var i = 0; i < 4; i++) {
				var item =
					state.vols[Math.floor(Math.random() * state.vols.length)];
				randomVols.push(item);
			}
			return randomVols;
		},
	},
>>>>>>> bf5d1e4ce7c520a863d681eb6c033f76c68a38d8

	actions: {
		async joinVol({ commit }, { memberId }, { vol }) {
			const user = userService.getById(memberId);
			const member = { _id: user._id, imgUrl: user.imgUrl };
			const volToUpdate = JSON.parse(JSON.stringify(vol));
			volToUpdate.members.push(member);
			try {
				await this.saveVol(volToUpdate);
				commit(volToUpdate);
			} catch (err) {
				console.log('Failed to add Member', err);
			}
		},

		async saveVol({ commit }, { vol }) {
			const type = vol._id ? 'updateVol' : 'addVol';
			try {
				commit({ type, vol });
				volService.save(vol);
			} catch (err) {
				console.log("Couldn't save Vol", vol, err);
			}
		},
		async removeVol({ commit }, payload) {
			try {
				// await volService.remove(payload.volId);
				await volService.remove(payload.volId);
				console.log('sanity action');
				commit(payload);
				console.log('sanity');
			} catch (err) {
				console.log("STORE: Couldn't remove Vol", err);
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
