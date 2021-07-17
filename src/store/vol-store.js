import { volService } from '../services/vol.service.js';

export default {
	state: {
		vols: [],
		filterBy: { txt: '', category: 'all', skills: 'all' },
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
			console.log(vols);
			state.vols = vols;
		},
	},
	getters: {
		volsToShow(state) {
			return state.vols;
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
		async saveVol({ commit }, { vol }) {
			const type = vol._id ? 'updateVol' : 'addVol';
			try {
				console.log('file: vol-store.js ~ line 47 ~ type', type);
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
	},
};
