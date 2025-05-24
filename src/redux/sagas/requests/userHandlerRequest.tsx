import { api } from "@/api-config/api";
import { IGetUsers, IUserDetail, IUserLogin } from "@/types/userInterface";

export const userLoginApi = async (data: IUserLogin) => {
    return await api.post(`auth/admin-login`, data);
};

export const getUserApi = async (data: IGetUsers) => {
    return await api.get(`admin/users?page=${data?.current_page}&search=${data?.search}`);
};

export const getChefApi = async (data: IGetUsers) => {
    return await api.get(`admin/chef?page=${data?.current_page}&search=${data?.search}`);
};

export const uploadExcelApi = async (data: IUserDetail) => {
    return await api.post(`admin/chef/import`, data);
};

export const getUserDetailApi = async (id: Number) => {
    return await api.get(`admin/users-detail/${id}`);
};

export const getPaymentDataApi = async (data: IGetUsers) => {
    return await api.get(`payments/?page=${data?.current_page}&search=${data?.search}`);
};

export const userLogoutApi = async () => {
    return await api.post(`auth/logout`);
};


