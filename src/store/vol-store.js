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
		currVol: null,
	},

	getters: {
		getMembers(state) {
			return state.currVol.members;
		},

		currVol(state) {
			return state.currVol;
		},
		volsToShow(state) {
			return state.vols;
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

	mutations: {
		setFilter(state, { filterBy }) {
			state.filterBy = filterBy;
		},
		addVol(state, { vol }) {
			state.currVol = vol;
			state.vols.push(vol);
		},
		updateVol(state, { vol }) {
			state.currVol = vol;

			const idx = state.vols.findIndex((td) => td._id === vol._id);
			state.vols.splice(idx, 1, vol);
		},
		removeVol(state, { volId }) {
			const idx = state.vols.findIndex((td) => td._id === volId);
			state.vols.splice(idx, 1);
		},
		setVols(state, { vols }) {
			state.vols = vols;
		},

		// TBD - DISCUSS APPROACH, IF WE ARE SAVING ENTIRE VOL EACH TIME, WE CAN SIMPLY USE UPDATE MUTATIONS FOR EVERYTHING

		// addReview(state, { payload }) {
		// 	const volId = payload.volId;
		// 	const review = payload.review;
		// 	const idx = state.vols.findIndex((vol) => vol._id === volId);
		// 	if (idx) {
		// 		state.vols[idx].reviews.unshift(review);
		// 	}
		// 	console.log('addreview,', state.vols[idx]);
		// 	console.log('addreview', state.vols);
		// },

		// removeReview(state, { payload }) {
		// 	const volId = payload.volId;
		// 	const revIdx = payload.revIdx;

		// 	state.vols[volId].reviews.splice(revIdx, 1);
		// },

		// setVolToUpdate(state, { vol }) {
		// 	state.volToUpdate = vol;
		// },
		setCurrVol(state, { vol }) {
			state.currVol = vol;
		},

		joinVol(state, { volToUpdate }) {
			const idx = state.vols.findIndex(
				(vol) => vol._id === volToUpdate._id
			);
			state.vols.splice(idx, 1, volToUpdate);
		},
	},

	actions: {
		async saveVol({ commit, dispatch }, { vol }) {
			const type = vol._id ? 'updateVol' : 'addVol';
			try {
				vol = await volService.save(vol);
				commit({ type, vol });
			} catch (err) {
				console.log("Couldn't save Vol", vol, err);
				throw err; // catch it in the cmps ans msg to the user
			}
		},
		async removeVol({ commit }, payload) {
			try {
				await volService.remove(payload.volId);
				commit(payload);
			} catch (err) {
				console.log("Couldn't remove Vol", err);
				throw err; // catch it in the cmps ans msg to the user
			}
		},
		async loadVols(context) {
			try {
				const vols = await volService.query(context.state.filterBy);
				context.commit({ type: 'setVols', vols });
			} catch (err) {
				console.log("Can't load vols", err);
				throw err; // catch it in the cmps ans msg to the user
			}
		},
		async addReview(context, { reviewToSave }) {
			const vol = context.state.currVol;
			vol.reviews.push(reviewToSave);

			try {
				context.dispatch({ type: 'saveVol', vol });
			} catch {
				console.log('Failed to add Member', err);
				throw err; // catch it in the cmps ans msg to the user
			}
		},

		async removeReview(context, { revIdx }) {
			const vol = context.state.currVol;
			vol.reviews.splice(revIdx, 1);

			try {
				context.dispatch({ type: 'saveVol', vol });
			} catch {
				console.log('Failed to add Member', err);
				throw err;
			}
		},

		async getVol(context, { _id }) {
			// context.state.currVol = await volService.getById(_id);
			// return context.state.currVol;

			return await volService.getById(_id);
		},
	},
};
