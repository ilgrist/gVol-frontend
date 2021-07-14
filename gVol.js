
//TBD - whether to (A) create a user that can be an org or a vol, or (B) create two types of users (userVol, userOrg)

const vol= {
    "_id": "u101",
    "fullname": "User 1",
    "username": "user1",
    "password": "secret",
    "imgUrl": "/img/img1.jpg",
    "skills" : ["Teaching","Web-Design"],
    "registeredVolOps": ["v101", "v102"]
}


const org = {
    "_id": "o101",
    "name": "Save the Animals",
    "desc": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    "imgUrl": "http://res.cloudinary.com/dvbqwqxqs/image/upload/v1576345445/k1cioaulnf5thlncx2yr.jpg",
    "loc":{
        "lat": 11.11,
        "lng": 11.11,
        "city": 'Nairobi',
        "country": 'Kenya'
    },
    "volOps": ["W101", 'W102'], //Option A - aggregation
    "volOps": [{
        "_id": "j101",
        "title": "Save cats",
        "desc": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        "imgUrl": "https://ak1.picdn.net/shutterstock/videos/5898101/thumb/1.jpg",
        "loc": {
            "lat": 11.11,
            "lng": 22.22,
            "city": 'Mombasa',
            "country": 'Kenya'
        },
        "registeredVols": ["u101", "u102"] // agregation vs duplication

    }
], // Option B
//TBD - agregation vs duplication
}


const volOp = {
    "_id": "j101",
    "title": "Save cats",
    "desc": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    "imgUrls": ["https://ak1.picdn.net/shutterstock/videos/5898101/thumb/1.jpg"],
    "org": {
        "_id": "o101",
        "name": "Save the Animals",
        "imgUrl": "http://res.cloudinary.com/dvbqwqxqs/image/upload/v1576345445/k1cioaulnf5thlncx2yr.jpg"
    },
    "reqSkills": [
        "teaching",
        "translation",
        "design"
    ],
    "loc": {
        "lat": 11.11,
        "lng": 22.22,
        "city": 'Mombasa',
        "country": 'Kenya',
        "isOnsite": false,
    },
    "category": ["animals","child-friendly"],
    "reviews": [{"id_":"r101", "txt": "So awesome!", "createdBy": "Shooki", "createdAt": "543543534543535"}],
    "registeredVols": ["u101", "u102"] // TBD - agregation vs duplication
}



