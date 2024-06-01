import instance from "./axios";

// 获取电影列表
export const getMovies = (params) => {
    return instance.get('/api/movies?' + params.toString());
};

// 获取电影详情
export const getMovie = (id) => {
    return instance.get(`/api/movies/${id}`);
};

// 获取分类列表
export const getCategories = () => {
    return instance.get('/api/categories');
};

// 注册账号
export const register = (data) => {
    return instance.post('/api/users/', data);
};

// 激活账号
export const activate = (data) => {
    return instance.post('/api/users/activation/', data);
};
