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
		addVol(state, { vol }) {
			state.volToUpdate = vol;
			state.vols.push(vol);
		},
		updateVol(state, { vol }) {
			state.volToUpdate = vol;

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

		removeReview(state, { payload }) {
			const volId = payload.volId;
			const revIdx = payload.revIdx;

			state.vols[volId].reviews.splice(revIdx, 1);
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

	getters: {
		volToUpdate(state) {
			return state.volToUpdate;
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

	actions: {
		async joinVol({ commit, dispatch }, { memberId, vol }) {
			const user = await userService.getById(memberId);
			const member = { _id: user._id, imgURL: user.imgURL };

			const volToUpdate = JSON.parse(JSON.stringify(vol));
			volToUpdate.members.push(member);
			try {
				dispatch({ type: 'saveVol', vol: volToUpdate });
				commit({ type: 'joinVol', volToUpdate: volToUpdate });
			} catch (err) {
				console.log('Failed to add Member', err);
			}
		},

		async saveVol({ commit }, { vol }) {
			const type = vol._id ? 'updateVol' : 'addVol';
			try {
				vol = await volService.save(vol);
				commit({ type, vol });
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

		async removeReview({ commit }, { revRemove }) {
			const volId = revRemove.volId;
			const revIdx = revRemove.revIdx;
			commit({ type: 'removeReview', payload: { volId, revIdx } });
		},

		async getVol(context, { _id }) {
			await context.dispatch({ type: 'loadVols' });
			const vol = context.state.vols.find((vol) => vol._id === _id);
			if (!vol) return 'cannot find vol';
			return vol;
		},
	},
};
