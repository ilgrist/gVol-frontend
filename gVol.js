
const user = 
	{
		_id: 'u101',
		fullname: 'User 1',
		username: 'user1',
		password: 'secret',
		imgUrl: '/img/img1.jpg',
		skills: ['teaching', 'web-design'],
		
	},
;

const org = {
	_id: 'o101',
	name: 'Save the Animals',
	desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
	imgUrl: 'http://res.cloudinary.com/dvbqwqxqs/image/upload/v1576345445/k1cioaulnf5thlncx2yr.jpg',
	loc: {
		lat: 11.11,
		lng: 11.11,
		city: 'Nairobi',
		country: 'Kenya',
	},

};

const vol = {
	_id: 'j101',
	title: 'Save cats',
	desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
	imgUrls: ['https://ak1.picdn.net/shutterstock/videos/5898101/thumb/1.jpg'],
	org: {
		_id: 'o101',
		name: 'Save the Animals',
		imgUrl: 'http://res.cloudinary.com/dvbqwqxqs/image/upload/v1576345445/k1cioaulnf5thlncx2yr.jpg',
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
};
