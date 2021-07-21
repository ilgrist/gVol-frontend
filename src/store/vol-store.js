import { utilService } from '../services/util.service.js';
import { volService } from '../services/vol.service.js';
import { userService } from '../services/user.service.js';
import { Store } from 'vuex';

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

	getters: {
		getMembers(state) {
			return state.volToUpdate.members;
		},

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

	actions: {
		async joinVol({ commit, dispatch }, { memberId, vol }) {
			const user = await userService.getById(memberId);
			console.log('file: vol-store.js ~ line 99 ~ user', user);

			const member = { _id: user._id, imgUrl: user.imgUrl };

			console.log('file: vol-store.js ~ line 100 ~ member', member);
			const volToUpdate = JSON.parse(JSON.stringify(vol));
			volToUpdate.members.push(member);
			try {
				dispatch({ type: 'saveVol', vol: volToUpdate });
				commit({ type: 'joinVol', volToUpdate: volToUpdate });
			} catch (err) {
				console.log('Failed to add Member', err);
			}
		},
		async saveVol({ commit, dispatch }, { vol }) {
			console.log('file: vol-store.js ~ line 107 ~ vol', vol);
			console.log('sanity from savevol');
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
				await volService.remove(payload.volId);
				commit(payload);
			} catch (err) {
				console.log("Couldn't remove Vol", err);
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
		async addReview({ dispatch }, { newReview }) {
			const updatedVol = newReview.updatedVol;
			// TBD - DISCUSS APPROACH, SEND ENTIRE VOL VS VOLID
			// const volId = newReview.volId;
			const review = {
				id: utilService.makeId(),
				txt: newReview.txt,
				createdBy: newReview.createdBy,
				createdAt: Date.now(),
				rating: newReview.rating,
			};

			updatedVol.reviews.push(review);

			try {
				dispatch({ type: 'saveVol', vol: updatedVol });
			} catch {
				console.log('Failed to add Member', err);
			}
		},

		async removeReview({ dispatch }, { removedReview }) {
			// const updatedVol = JSON.parse(
			// 	JSON.stringify(removedReview.updatedVol)
			// );
			// TBD: SHOULD PROBABLY MAKE A COPY OF THE VOL OBJECT???? THIS ACTS FUNNY
			const updatedVol = removedReview.updatedVol;
			const revIdx = removedReview.revIdx;

			updatedVol.reviews.splice(revIdx, 1);

			try {
				dispatch({ type: 'saveVol', vol: updatedVol });
			} catch {
				console.log('Failed to add Member', err);
			}
		},

		// tbd: rewrite - we're currently getting all of the vols from the service, we ,maybe shouldnt?

		async getVol(context, { _id }) {
			await context.dispatch({ type: 'loadVols' });
			const vol = context.state.vols.find((vol) => vol._id === _id);
			context.state.volToUpdate = vol;
			if (!vol) return 'cannot find vol';
			return vol;
		},
	},
};
