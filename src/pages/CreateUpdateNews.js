import React, {useContext, useEffect, useRef, useState} from 'react';
import {useHistory, useLocation, useParams} from "react-router-dom";
import {Context} from "../index";


import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import {formats, modules} from "../utils/editor-tools";
import Tag from "../components/Tag";
import {useForm} from "react-hook-form";
import {createNews, getById, getCover, updateNews} from "../http/newsAPI";

const CreateUpdateNews = () => {
    let { id } = useParams();
    const {user} = useContext(Context);
    const location = useLocation();
    const history = useHistory();
    const isUpdate = location.pathname.split('/').includes('update')
    const [newsText, setNewsText] = useState('')
    const [newsTags, setNewsTags] = useState([])
    const [coverAction, setCoverAction] = useState()
    const [coverImage, setCoverImage] = useState()


    const tagRef = useRef(null)

    useEffect(() => {
        if(isUpdate) {
            getById(id).then(news => {
                setValue('newsTitle', news.header)
                setNewsText(news.text)
                setNewsTags(news.tags.map(item => item.value))
                if(news.coverImage)
                {
                    setCoverImage(process.env.REACT_APP_API_URL + 'news/covers/' + news.coverImage)
                }
            })
        }
    }, [])

    const removeTagHandler = (tagName) => {
        setNewsTags(newsTags.filter(el => el !== tagName))
    }
    const addTagHandler = () => {
        const tagName = tagRef.current.value
        if(tagName && tagName.trim() !== '')
        {
            const tags = tagName.split(',').map(item => item.trim())
            setNewsTags([...new Set([...newsTags, ...tags])])
        }

        tagRef.current.value = ''
    }

    const {register, handleSubmit, formState: { errors }, setValue} = useForm();

    const changeText = text => {
        setNewsText(text)
        setValue('text', text)
    }

    const removeImage = () => {
        setCoverImage(null)
        setCoverAction('delete')
        console.log('delete')
        setValue('image', undefined)
    }

    const uploadImage = async (e) => {
        const image = e.target.files[0]
        if(image) {
            setValue('image', image)
            setCoverAction('update')
            setCoverImage(URL.createObjectURL(image))
        }
    }

    const publishNews = async ({newsTitle, text, image}) => {
        if(isUpdate)
        {
            const updatedNews = await updateNews(id, newsTitle,text, newsTags, image, coverAction)
            history.push('/news')
        } else {
            const news = await createNews(newsTitle, text, user.user.id, newsTags, image)
            history.push('/news')
        }
    }


    return (
        <div className="w-full flex-grow py-10">
            <form onSubmit={handleSubmit(publishNews)} className="mx-auto max-w-5xl flex flex-col px-5 py-10 bg-white rounded-md space-y-5">
                <p className="font-pressStart text-lg text-center">{isUpdate ? 'Обновить' : 'Создать'} новость</p>
                <input className="py-3 font-pressStart focus:outline-none" placeholder="Название новости"
                       { ...register("newsTitle", {required: 'Обязательное поле для заполнения'})}/>
                <ReactQuill onChange={(value) => changeText(value)} modules={modules} formats={formats} value={newsText}/>
                <hr/>
                <div className="flex justify-between">
                    <input
                        ref={tagRef}
                        type="text"
                        className="appearance-none block w-5/6 bg-white text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Введите тег или теги чериз запятую"/>
                    <button
                        type="button"
                        className="py-2 px-3 bg-avocado-400 text-avocado-800 rounded-md focus:outline-none"
                        onClick={addTagHandler}>
                        Добавить
                    </button>
                </div>
                <div>
                    {newsTags && newsTags.map((item, index) => {
                        return <Tag key={'tag_'+index} tagName={item} removeHandler={removeTagHandler}/>
                    })}
                </div>
                <hr/>
                {coverImage &&
                <div className="flex flex-col space-y-4 justify-center items-center">
                    <div className="bg-gray-400 aspect-w-16 aspect-h-8 w-1/2 rounded-md flex justify-center items-center">
                        <img src={coverImage} alt="" className="rounded-md object-cover"/>
                    </div>
                    <button type="button" className="p-2 bg-red-400 rounded-md w-1/6 flex justify-center" onClick={() => removeImage()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                }
                <label
                    className="group flex justify-start items-center space-x-2 px-4 py-2 rounded-lg tracking-wide uppercase cursor-pointer w-64">
                    <svg className="w-8 h-8 text-gray-400 group-hover:text-avocado-400" fill="currentColor"
                         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-base leading-normal text-gray-400 group-hover:text-avocado-400">Выберите обложку</span>
                    <input type='file' className="hidden" onChange={(e) => uploadImage(e)}/>
                </label>
                <button type="submit" className="font-pressStart px-3 py-2 bg-avocado-400 rounded-md">
                    {isUpdate ? 'Обновить' : 'Опубликовать'}
                </button>
            </form>
        </div>
    );
};

export default CreateUpdateNews;
