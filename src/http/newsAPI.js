import {$authHost, $host} from "./index";

export const createNews = async (header, text, author_id, tags, image) => {
    const { data: newsData } = await $authHost.post('/news',
        {header,text,author_id, views: 0, record_type: 'news', tags})

    if(image) {
        const formData = new FormData()
        formData.append('newsId', String(newsData.id))
        formData.append('file', image)
        const {data: updatedNewsData} = await $authHost.post('news/covers/upload',
            formData, {headers: {'Content-Type': 'multipart/form-data'}})
        return updatedNewsData
    }
    return newsData
}

export const updateNews = async (newsId, header, text, tags, image, coverAction) => {
    const { data: newsData } = await $authHost.put('/news',
        {newsId, header, text, tags})

    if(image && coverAction === 'update') {
        const formData = new FormData()
        formData.append('newsId', String(newsData.id))
        formData.append('file', image)
        const {data: updatedNewsData} = await $authHost.post('news/covers/upload',
            formData, {headers: {'Content-Type': 'multipart/form-data'}})
        return updatedNewsData
    }
    else if(coverAction === 'delete')
    {
        const {data} = await $authHost.post('news/covers/delete', {newsId})
    }
    return newsData
}

export const getAll = async () => {
    const { data } = await $authHost.get('/news')
    return data
}

export const getById = async (id) => {
    const { data } = await $authHost.get('/news/' + id)
    return data
}

export const deleteById = async (id) => {
    const { data } = await $authHost.delete('/news/' + id)
    return data
}

export const getCover = async (coverName) => {
    const { data } = await $host.get('news/covers/'+ coverName)
    return data
}
