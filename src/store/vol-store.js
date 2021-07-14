import { volService } from '../services/vol.service.js';

export default {
	state: {
		vols: [],
		currerntFilterBy: { txt: '' },
	},
	mutations: {
		setFilter(state, { filterBy }) {
			state.currentFilterBy = filterBy;
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
	},
	getters: {
		async getVols() {
			try {
				const vols = await volService.getVols();
				return vols;
			} catch (err) {
				console.log(err);
			}
		},
		volsToShow(state) {
			return state.vols;
		},
	},
	actions: {
		async saveVol({ commit }, { vol }) {
			try {
				const type = vol._id ? 'updateVol' : 'addVol';
				const vol = await volService.save(vol);
				commit({ type, savedVol });
			} catch (err) {
				console.log("Could't save the vol", vol, err);
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
				const vols = await volService.query(
					context.state.currentFilterBy
				);
				context.commit({ type: 'setVols', vols });
			} catch (err) {
				console.log("Can't load vols", err);
			}
		},
	},
};
