import {$authHost, $host} from "./index";

export const getGameRatings = async (game_id) => {
    const { data } = await $host.get('/ratings/game/' + game_id)
    return data
}

export const getUserGameRating = async (game_id, user_id) => {
    const { data } = await $authHost.get('/ratings/user/' + user_id + '/game/' + game_id)
    return data
}

export const createRating = async (rating, game_id, user_id) => {
    const { data } = await $authHost.post('/ratings', { rating, game_id, user_id })
    return data
}

export const updateRating = async (rating, game_id, user_id) => {
    const { data } = await $authHost.put('/ratings', { rating, game_id, user_id })
    return data
}
