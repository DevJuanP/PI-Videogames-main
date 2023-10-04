/*const game =  {
    "id": 28172,
    "slug": "kingdom-come-deliverance",
    "name": "Kingdom Come: Deliverance",
    "released": "2018-02-13",
    "tba": false,
    "background_image": "https://media.rawg.io/media/games/d8f/d8f3b28fc747ed6f92943cdd33fb91b5.jpeg",
    "rating": 4.03,
    "rating_top": 4,
    "ratings": [],
    "ratings_count": 1293,
    "reviews_text_count": 10,
    "added": 6451,
    "added_by_status": {},
    "metacritic": 71,
    "playtime": 10,
    "suggestions_count": 636,
    "updated": "2023-09-26T19:41:17",
    "user_game": null,
    "reviews_count": 1312,
    "saturated_color": "0f0f0f",
    "dominant_color": "0f0f0f",
    "platforms": [],
    "parent_platforms": [
    {
    "platform": {
    "id": 1,
    "name": "PC",
    "slug": "pc"
    }
    },
    {
    "platform": {
    "id": 2,
    "name": "PlayStation",
    "slug": "playstation"
    }
    },
    {
    "platform": {
    "id": 3,
    "name": "Xbox",
    "slug": "xbox"
    }
    }
    ],
    "genres": [
    {
    "id": 4,
    "name": "Action",
    "slug": "action",
    "games_count": 174507,
    "image_background": "https://media.rawg.io/media/games/b7d/b7d3f1715fa8381a4e780173a197a615.jpg"
    }
    ],
    "stores": [
    {
    "id": 399612,
    "store": {
    "id": 11,
    "name": "Epic Games",
    "slug": "epic-games",
    "domain": "epicgames.com",
    "games_count": 1269,
    "image_background": "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg"
    }
    },
    {
    "id": 33100,
    "store": {
    "id": 1,
    "name": "Steam",
    "slug": "steam",
    "domain": "store.steampowered.com",
    "games_count": 79741,
    "image_background": "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg"
    }
    },
    {
    "id": 42694,
    "store": {
    "id": 3,
    "name": "PlayStation Store",
    "slug": "playstation-store",
    "domain": "store.playstation.com",
    "games_count": 7842,
    "image_background": "https://media.rawg.io/media/games/310/3106b0e012271c5ffb16497b070be739.jpg"
    }
    },
    {
    "id": 46211,
    "store": {
    "id": 5,
    "name": "GOG",
    "slug": "gog",
    "domain": "gog.com",
    "games_count": 5503,
    "image_background": "https://media.rawg.io/media/games/253/2534a46f3da7fa7c315f1387515ca393.jpg"
    }
    },
    {
    "id": 46218,
    "store": {
    "id": 2,
    "name": "Xbox Store",
    "slug": "xbox-store",
    "domain": "microsoft.com",
    "games_count": 4770,
    "image_background": "https://media.rawg.io/media/games/8d6/8d69eb6c32ed6acfd75f82d532144993.jpg"
    }
    }
    ],
    "clip": null,
    "tags": [],
    "esrb_rating": {},
    "short_screenshots": []
    }

*/

const description = (game) => {
    let stores = 'no store', genres = 'no genres', plataforms = 'no plataforms'
    const name = game.name
    if(game.genres){
        let genres = game.genres.map(g => g.name)//.join(', ')
        const genresLast = genres.pop()
        genres = genres.length>0? genres.join(', ') +' and '+ genresLast: genresLast
    }

    if(game.plataforms){
        let plataforms = game.parent_platforms.map( p => p.platform.name)//.join(', ')
        const plataformsLast = plataforms.pop()
        plataforms = plataforms.length>0? plataforms.join(', ') +' and '+ plataformsLast: plataformsLast
    }

    if(game.stores){
        let stores = game.stores.map( s => s.store.name)//.join(', ')
        const storesLast = stores.pop()
        stores = stores.length>0? stores.join(', ') +' and '+ storesLast: storesLast
    }

    return `The videogame "${name}" is a game of the ${genres} genres. Is available for ${plataforms}. also you can get it in stores like ${stores}.`
}

//console.log(description(game));
module.exports = description