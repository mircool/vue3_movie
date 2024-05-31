import instance from "./axios";

// 获取电影列表
export const getMovies = (page) => {
    return instance.get(`/api/movies/?page=${page}`);
};

// 获取电影详情
export const getMovie = (id) => {
    return instance.get(`/api/movies/${id}`);
};
