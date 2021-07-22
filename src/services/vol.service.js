import { httpService } from './http.service.js';

export const volService = {
	query,
	getById,
	getEmptyVol,
	remove,
	save,
};

async function query(filterBy) {
	return httpService.get('vol/', filterBy);
}

function getById(volId) {
	return httpService.get(`vol/${volId}`);
}

async function save(vol) {
	if (vol._id) return httpService.put('vol/', vol);
	else {
		vol.org.name = 'Duckies United';
		vol.reviews = [];
		if (!vol.imgUrls.length)
			vol.imgUrls = [
				'https://res.cloudinary.com/dzuqvua7k/image/upload/v1626281304/volApp/volImgs/dragon_tra1ec.jpg',
			];
		return await httpService.post('vol', vol);
	}
}

function remove(volId) {
	return httpService.delete(`vol/${volId}`);
}

function getEmptyVol() {
	return {
		title: '',
		desc: '',
		reqSkills: [],
		org: {},
		loc: {},
		tags: [],
		imgUrls: [],
		reviews: [],
		members: [],
		createdBy: '',
	};
}
