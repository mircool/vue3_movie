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

// 登录账号
export const login = (data) => {
    return instance.post('/api/jwt/create/', data);
};

// 激活账号
export const activate = (data) => {
    return instance.post('/api/users/activation/', data);
};

// 刷新token
export const refreshToken = (data) => {
    return instance.post('/api/jwt/refresh/', data);
};

// 验证token
export const verifyToken = (data) => {
    return instance.post('/api/jwt/verify/', data);
};

// 重置密码
export const resetPassword = (data) => {
    return instance.post('/api/users/reset_password/', data);
};

// 重置密码确认
export const resetPasswordConfirm = (data) => {
    return instance.post('/api/users/reset_password_confirm/', data);
};

// 设置密码
export const setPassword = (data) => {
    return instance.post('/api/users/set_password/', data);
};


// 获取用户信息
export const getUser = () => {
    return instance.get('/api/users/me/');
};

// 获取电影收藏状态
export const getMovieFavorStatus = (id) => {
    return instance.get(`/api/collects/${id}/is_collected/`);
};
