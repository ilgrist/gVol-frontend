import { utilService } from './util.service.js';
import { httpService } from './http.service.js';
const volsInit = require('../../volsInit.json');
// import { storageService } from './async-storage.service.js';
// import axios from 'axios';

// const VOL_KEY = 'vols';
// const gVols = _createVols();
// const API = 'http://localhost:3030/api/volApp';

export const volService = {
	query,
	getById,
	getEmptyVol,
	remove,
	save,
};

async function query(filterBy) {
	// return storageService.query(VOL_KEY);
	return httpService.get('vol/', filterBy);
}

function getById(volId) {
	// return storageService.get(VOL_KEY, volId);
	return httpService.get(`vol/${volId}`);
}

async function save(vol) {
	if (vol._id) return httpService.put('vol/', vol);
	else {
		vol.org.name = 'Duckies United';
		vol.imgUrls = [
			'https://res.cloudinary.com/dzuqvua7k/image/upload/v1626281304/volApp/volImgs/dragon_tra1ec.jpg',
		];
		return await httpService.post('vol', vol);
	}
}

function remove(volId) {
	return httpService.delete(`vol/${volId}`);
	// return storageService.remove(VOL_KEY, volId);
}

function getEmptyVol() {
	return {
		title: '',
		desc: '',
		reqSkills: [],
		tags: [],
		org: {},
		loc: {},
	};
}

// function _createVols() {
// 	let vols = utilService.loadFromStorage(VOL_KEY);
// 	if (!vols || !vols.length) {
// 		vols = volsInit;
// 		utilService.saveToStorage(VOL_KEY, vols);
// 	}
// }

// function save(vol){
// if (vol._id) {
// 	storageService.put(VOL_KEY, vol);
// 	return vol;
// } else {
// 	vol._id = utilService.makeId();
// 	vol.imgUrls = [
// 		'https://res.cloudinary.com/dzuqvua7k/image/upload/v1626281304/volApp/volImgs/dragon_tra1ec.jpg',
// 	];
// 	vol.org.name = 'Duckies United';
// 	storageService.post(VOL_KEY, vol);
// }
// }
