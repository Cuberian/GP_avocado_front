import {$authHost, $host} from "./index";

export const createGame = async (title, releaseDate, platforms, genres, studios, publishers, image=null) => {
    const { data: createdGameData } = await $authHost.post('/games',
        {title, releaseDate, platforms, genres, studios, publishers})

    if(image) {
        const formData = new FormData()
        formData.append('gameId', String(createdGameData.id))
        formData.append('file', image)
        const {data: updatedGameData} = await $authHost.post('games/covers/upload',
            formData, {headers: {'Content-Type': 'multipart/form-data'}})
        return updatedGameData
    }
    return createdGameData
}

export const updateGame = async (id, title, releaseDate, platforms, genres, studios, publishers, coverAction, image) => {
    const { data: updatedGameData } = await $authHost.put('/games',
        {id, title, releaseDate, platforms, genres, studios, publishers})

    if(image && coverAction === 'update') {
        const formData = new FormData()
        formData.append('gameId', String(updatedGameData.id))
        formData.append('file', image)
        const {data: updatedGameDataWithImage} = await $authHost.post('games/covers/upload',
            formData, {headers: {'Content-Type': 'multipart/form-data'}})
        return updatedGameDataWithImage
    }
    else if(coverAction === 'delete')
    {
         await $authHost.post('games/covers/delete', { gameId: id })
    }
    return updatedGameData
}

export const getAllGames = async () => {
    const { data } = await $authHost.get('/games')
    return data
}

export const getById = async (id) => {
    const { data } = await $authHost.get('/games/' + id)
    return data
}

export const deleteById = async (id) => {
    const { data } = await $authHost.delete('/games/' + id)
    return data
}

export const getCover = async (coverName) => {
    const { data } = await $host.get('games/covers/'+ coverName)
    return data
}
