import instance from "./axios";

// 获取电影列表
export const getMovies = (page) => {
    return instance.get(`api/movies/?page=${page}`);
};
