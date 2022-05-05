import { get, post } from "../api/services"


export const getArticleList = (params) => {
    return get("/api/article", params)
}

export const saveArticle = (data) => {
    return post("/api/article", data)
}


export const saveOriginArticle = (data) => {
    return post("/api/originArticle", data)
}