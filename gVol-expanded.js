//TBD - whether to (A) create a user that can be an org or a vol, or (B) create two types of users (userVol, userOrg)

export const volsData = {
	volsInit,
	orgsInit,
	volOpsInit,
};

const volsInit = [
	{
		_id: 'u101',
		fullname: 'User 1',
		username: 'user1',
		password: 'secret',
		imgUrl: '/img/1.jpg',
		skills: ['Teaching', 'Web-Design'],
		registeredVolOps: ['v101', 'v102'],
	},
	{
		_id: 'u102',
		fullname: 'User 2',
		username: 'user2',
		password: 'secret',
		imgUrl: '/img/2.jpg',
		skills: ['Translation', 'Law'],
		registeredVolOps: ['v101'],
	},
	{
		_id: 'u103',
		fullname: 'User 3',
		username: 'user3',
		password: 'secret',
		imgUrl: '/img/3.jpg',
		skills: ['Building', 'Teaching'],
		registeredVolOps: ['v101', 'v103'],
	},
];

const orgsInit = [
	{
		_id: 'o101',
		name: 'Save the Animals',
		desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
		imgUrl:
			'http://res.cloudinary.com/dvbqwqxqs/image/upload/v1576345445/k1cioaulnf5thlncx2yr.jpg',
		loc: {
			lat: 11.11,
			lng: 11.11,
			city: 'Nairobi',
			country: 'Kenya',
		},
		volOps: ['W101'], //Option A - aggregation
		volOps: [
			{
				_id: 'j101',
				title: 'Save cats',
				desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
				imgUrl:
					'https://ak1.picdn.net/shutterstock/videos/5898101/thumb/1.jpg',
				loc: {
					lat: 11.11,
					lng: 22.22,
					city: 'Mombasa',
					country: 'Kenya',
				},
				registeredVols: ['u101'], // agregation vs duplication
			},
		], // Option B
		//TBD - agregation vs duplication
	},
	{
		_id: 'o102',
		name: 'Save the Children',
		desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
		imgUrl:
			'http://res.cloudinary.com/dvbqwqxqs/image/upload/v1576345445/k1cioaulnf5thlncx2yr.jpg',
		loc: {
			lat: 11.11,
			lng: 22.22,
			city: 'Tel Aviv',
			country: 'Israel',
		},
		volOps: ['W102', 'W103'], //Option A - aggregation
		volOps: [
			{
				_id: 'j102',
				title: 'Save dogs',
				desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
				imgUrl:
					'https://ak1.picdn.net/shutterstock/videos/5898101/thumb/1.jpg',
				loc: {
					lat: 'NA',
					lng: 'NA',
					city: 'online',
					country: 'online',
				},
				registeredVols: ['u101', 'u102'], // agregation vs duplication
			},
			{
				_id: 'j103',
				title: 'Save  elephants',
				desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
				imgUrl:
					'https://ak1.picdn.net/shutterstock/videos/5898101/thumb/1.jpg',
				loc: {
					lat: 'NA',
					lng: 'NA',
					city: 'online',
					country: 'online',
				},
				registeredVols: ['u101', 'u102'], // agregation vs duplication
			},
		], // Option B
		//TBD - agregation vs duplication
	},
];

const volOpsInit = [
	{
		_id: 'j101',
		title: 'Save cats',
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
		category: ['animals', 'child-friendly'],
		reviews: [
			{
				id_: 'r101',
				txt: 'So awesome!',
				createdBy: 'Shooki',
				createdAt: '543543534543535',
			},
		],
		registeredVols: ['u101', 'u102'], // TBD - agregation vs duplication
	},
	{
		_id: 'j102',
		title: 'Save dogs',
		desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
		imgUrls: [
			'https://ak1.picdn.net/shutterstock/videos/5898101/thumb/1.jpg',
		],
		org: {
			_id: 'o102',
			name: 'Save the Children',
			imgUrl:
				'http://res.cloudinary.com/dvbqwqxqs/image/upload/v1576345445/k1cioaulnf5thlncx2yr.jpg',
		},
		reqSkills: ['teaching', 'translation', 'typing'],
		loc: {
			lat: 11.11,
			lng: 22.22,
			city: 'NA',
			country: 'NA',
			isOnsite: true,
		},
		category: ['animals', 'child-friendly'],
		reviews: [
			{
				id_: 'r101',
				txt: 'So awesome!',
				createdBy: 'Shooki',
				createdAt: '543543534543535',
			},
		],
		registeredVols: ['u101', 'u102'], // TBD - agregation vs duplication
	},
	{
		_id: 'j103',
		title: 'Save elephants',
		desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
		imgUrls: [
			'https://ak1.picdn.net/shutterstock/videos/5898101/thumb/1.jpg',
		],
		org: {
			_id: 'o102',
			name: 'Save the Children',
			imgUrl:
				'http://res.cloudinary.com/dvbqwqxqs/image/upload/v1576345445/k1cioaulnf5thlncx2yr.jpg',
		},
		reqSkills: ['building', 'dreaming'],
		loc: {
			lat: 11.11,
			lng: 22.22,
			city: 'NA',
			country: 'NA',
			isOnsite: true,
		},
		category: ['puppets', 'adult-friendly'],
		reviews: [
			{
				id_: 'r101',
				txt: 'So awesome!',
				createdBy: 'Cookie',
				createdAt: '543543534543535',
			},
		],
		registeredVols: ['u101', 'u102'], // TBD - agregation vs duplication
	},
];
