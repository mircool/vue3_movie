import instance from "./axios";

// 获取电影列表
export const getMovies = () => {
    return instance.get("api/movies/");
};
