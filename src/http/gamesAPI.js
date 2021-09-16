import {$authHost, $host} from "./index";

export const createGame = async (label, release_date, platforms, genres, developer, publisher, image) => {
    const { data: createdGameData } = await $authHost.post('/games',
        {label, release_date, platforms, genres, developer, publisher})

    if(image) {
        const formData = new FormData()
        formData.append('newsId', String(createdGameData.id))
        formData.append('file', image)
        const {data: updatedGameData} = await $authHost.post('games/covers/upload',
            formData, {headers: {'Content-Type': 'multipart/form-data'}})
        return updatedGameData
    }
    return createdGameData
}

export const updateGame = async (gameId, label, release_date, platforms, genres, developer, publisher, coverAction, image) => {
    const { data: updatedGameData } = await $authHost.put('/news',
        {label, release_date, platforms, genres, developer, publisher})

    if(image && coverAction === 'update') {
        const formData = new FormData()
        formData.append('newsId', String(updatedGameData.id))
        formData.append('file', image)
        const {data: updatedGameData} = await $authHost.post('games/covers/upload',
            formData, {headers: {'Content-Type': 'multipart/form-data'}})
        return updatedGameData
    }
    else if(coverAction === 'delete')
    {
         await $authHost.post('games/covers/delete', { gameId })
    }
    return updatedGameData
}

export const getAll = async () => {
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
