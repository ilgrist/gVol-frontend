import { utilService } from './util.service.js';
import { storageService } from './async-storage.service.js';
const volsInit = require('../../volsInit.json');
import axios from 'axios';

const VOL_KEY = 'vols';
const gVols = _createVols();

export const volService = {
	query,
	getById,
	getEmptyVol,
	remove,
	save,
};

async function query(filterBy) {
	return storageService.query(VOL_KEY);
}

function getById(volId) {
	return storageService.get(VOL_KEY, volId);
}

function _createVols() {
	let vols = utilService.loadFromStorage(VOL_KEY);
	if (!vols || !vols.length) {
		vols = volsInit;
		utilService.saveToStorage(VOL_KEY, vols);
	}
}

function save(vol) {
	if (vol._id) {
		storageService.put(VOL_KEY, vol);
	} else {
		vol._id = utilService.makeId();
		vol.imgUrls = [
			'https://res.cloudinary.com/dzuqvua7k/image/upload/v1626281304/volApp/volImgs/dragon_tra1ec.jpg',
		];
		vol.org.name = 'Duckies United';
		storageService.post(VOL_KEY, vol);
	}
}

function remove(volId) {
	return storageService.remove(VOL_KEY, volId);
}

function getEmptyVol() {
	return {
		title: '',
		desc: '',
		reqSkills: '',
		tags: '',
		org: '',
	};
}
