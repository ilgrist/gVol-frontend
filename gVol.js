export const volsData = {
	usersInit,
	orgsInit,
	volsInit,
};

const usersInit = [
	{
		_id: 'u101',
		fullname: 'User 1',
		username: 'user1',
		password: 'secret',
		imgUrl: '/img/img1.jpg',
		skills: ['teaching', 'web-design'],
	},
	{
		_id: 'u102',
		fullname: 'User 2',
		username: 'user2',
		password: 'secret',
		imgUrl: '/img/2.jpg',
		skills: ['translation', 'law'],
	},
	{
		_id: 'u103',
		fullname: 'User 3',
		username: 'user3',
		password: 'secret',
		imgUrl: '/img/3.jpg',
		skills: ['building', 'teaching'],
	},
];
const orgsInit = [
	{
		_id: 'o101',
		name: 'Org1',
		desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
		imgUrl:
			'http://res.cloudinary.com/dvbqwqxqs/image/upload/v1576345445/k1cioaulnf5thlncx2yr.jpg',
		loc: {
			lat: 11.11,
			lng: 11.11,
			city: 'Nairobi',
			country: 'Kenya',
		},
	},
	{
		_id: 'o101',
		name: 'Org2',
		desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
		imgUrl:
			'http://res.cloudinary.com/dvbqwqxqs/image/upload/v1576345445/k1cioaulnf5thlncx2yr.jpg',
		loc: {
			lat: 11.11,
			lng: 11.11,
			city: 'Tel Aviv',
			country: 'Israel',
		},
	},
];

const volsInit = [
	{
		_id: 'v101',
		title: 'Save Prince Charming',
		desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
		imgUrls: [
			'https://ak1.picdn.net/shutterstock/videos/5898101/thumb/1.jpg',
		],
		org: {
			_id: 'o101',
			name: 'Save the Animals',
			imgUrl:
				'http://res.cloudinary.com/dvbqwqxqs/image/upload/v1576345445/k1cioaulnf5thlncx2yr.jpg',
		},
		reqSkills: ['teaching', 'translation', 'design'],
		loc: {
			lat: 11.11,
			lng: 22.22,
			city: 'Mombasa',
			country: 'Kenya',
			isOnsite: false,
		},
		// tags: ['animals', 'child-friendly'],
		reviews: [
			{
				id_: 'r101',
				txt: 'So awesome!',
				createdBy: 'Shooki',
				createdAt: '543543534543535',
			},
		],
		members: ['u101', 'u102'],
	},
	{
		_id: 'v102',
		title: 'Save Poo the Bear',
		desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
		imgUrls: [
			'https://ak1.picdn.net/shutterstock/videos/5898101/thumb/1.jpg',
		],
		org: {
			_id: 'o101',
			name: 'Org1',
			imgUrl:
				'http://res.cloudinary.com/dvbqwqxqs/image/upload/v1576345445/k1cioaulnf5thlncx2yr.jpg',
		},
		reqSkills: ['teaching', 'translation', 'design'],
		loc: {
			lat: 11.11,
			lng: 22.22,
			city: 'Mombasa',
			country: 'Kenya',
			isOnsite: true,
		},
		// tags: ['animals', 'child-friendly'],
		reviews: [
			{
				id_: 'r101',
				txt: 'So very awesome!',
				createdBy: 'Shooki',
				createdAt: '543543534543535',
			},
		],
		members: ['u103'],
	},
	{
		_id: 'v103',
		title: 'Save Dragons',
		desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
		imgUrls: [
			'https://ak1.picdn.net/shutterstock/videos/5898101/thumb/1.jpg',
		],
		org: {
			_id: 'o101',
			name: 'Org2',
			imgUrl:
				'http://res.cloudinary.com/dvbqwqxqs/image/upload/v1576345445/k1cioaulnf5thlncx2yr.jpg',
		},
		reqSkills: ['teaching', 'translation', 'design'],
		loc: {
			lat: 11.11,
			lng: 22.22,
			city: 'Tel Aviv',
			country: 'Israel',
			isOnsite: true,
		},
		// tags: ['animals', 'child-friendly'],
		reviews: [
			{
				id_: 'r101',
				txt: 'So very awesome!',
				createdBy: 'Shooki',
				createdAt: '543543534543535',
			},
		],
		members: ['u101, u103'],
	},
];
