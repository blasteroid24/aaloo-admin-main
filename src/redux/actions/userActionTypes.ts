import { IFormErrors, IGetChef, IGetUsers, ISetChefData, IUserDetail,  IUserLogin, IUserProfile, IUsersData, User} from "@/types/userInterface";
import { UserActionTypes, UserActions } from "../action-types/userActionTypes";
 
export const setFormErrors = (payload:IFormErrors[]): UserActionTypes => ({
    type: UserActions.SET_FORM_ERRORS,
    payload
})
export const setFormLoader = (payload: boolean): UserActionTypes => ({
    type: UserActions.SET_LOADER_FORM,
    payload
})
 
export const getProfileData = (): UserActionTypes => ({
    type: UserActions.GET_PROFILE_DATA,
})
 
export const userLoginLoading = (payload:boolean): UserActionTypes => ({
    type: UserActions.USER_LOGIN_LODING,
    payload
})
 
export const userLogin = (payload:IUserLogin): UserActionTypes => ({
    type: UserActions.USER_LOGIN,
    payload
})

export const setUserProfile = (payload:IUserProfile): UserActionTypes => ({
    type: UserActions.SET_USER_PROFILE_DATA,
    payload
})
 
export const userLogout = (): UserActionTypes => ({
    type: UserActions.LOGOUT,
})
  
export const getUsers = (payload:IGetUsers): UserActionTypes => ({
    type: UserActions.GET_USERS,
    payload
})

export const setUsers = (payload:IUsersData): UserActionTypes => ({
    type: UserActions.SET_USERS,
    payload
})
export const setUserLoader = (payload:boolean): UserActionTypes => ({
    type: UserActions.SET_USER_LOADER,
    payload
})
 
export const setUpdateUserStatus = (payload:User): UserActionTypes => ({
    type: UserActions.SET_UPDATE_USER_STATUS,
    payload
})

export const setUpdateLaunchTimeLoader = (payload: boolean): UserActionTypes => ({
    type: UserActions.UPDATE_LAUNCH_TIME_LOADER,
    payload
})

export const uploadExcel = (payload:IUserDetail): UserActionTypes => ({
    type: UserActions.UPLOAD_EXCEL,
    payload
})

export const uploadExcelStatus = (payload:boolean): UserActionTypes => ({
    type: UserActions.UPLOAD_EXCEL_STATUS,
    payload
})

export const getChefData = (payload:IGetChef): UserActionTypes => ({
    type: UserActions.GET_CHEF,
    payload
})

export const setChefData = (payload:ISetChefData): UserActionTypes => ({
    type: UserActions.SET_CHEF,
    payload
})
