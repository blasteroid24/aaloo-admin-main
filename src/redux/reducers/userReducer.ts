import { IUser } from "@/types/userInterface";
import { UserActionTypes, UserActions } from "../action-types/userActionTypes";

const initialState: IUser = {
  uploadStatusFile: false,
  usersLoader: false,
  uploadFileLoader:false,
  isFormLoader: false,
  usersData: {
    users: [
      {
        id: null,
        name: "",
        email: "",
        phoneNumber: "",
        countryCode: "",
        signupMethod: "",
        ageConsentInfo: "",
        isActive: false,
        isEmailVerified: false,
        lastLogin: "",
        createdAt: "",
      },
    ],
    pagination: {
      total_count: 0,
      current_page: 0,
      next_page: null,
      previous_page: null,
      total_pages: null,
      per_page: null,
    },
  },
  chefData: {
    chefs: [
      {
        id: null,
        username: "",
        role: "",
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        dateOfBirth: "",
        age: "",
        phoneNumber: "",
        countryCode: "",
        isActive: false,
        profilePermission: "",
        aboutMe: "",
        profilePic: "",
        homeLocation: "",
        hashTags: "",
        partnerRestaurant: "",
        socialMediaLinks: [],
        award: [],
        createdAt: "",
        updatedAt: "",
        deletedAt: null,
      },
    ],
    pagination: {
      total_count: 0,
      current_page: 0,
      next_page: null,
      previous_page: null,
      total_pages: null,
      per_page: null,
    },
  },
  
  userProfile: {
    isAuth: false,
    id: null,
    name: "",
    email: "",
  },
  formEroors: [],
  userSignUpLoading: false,
  
  
};

export default function userReducer(
  state = initialState,
  action: UserActionTypes
): IUser {
  switch (action.type) {
    case UserActions.SET_LOADER_FORM: {
      return {
        ...state,
        isFormLoader: action.payload,
      };
    }
    case UserActions.SET_USERS: {
      return {
        ...state,
        usersData: action.payload,
      };
    }
    
    case UserActions.SET_FORM_ERRORS: {
      return {
        ...state,
        formEroors: action.payload,
      };
    }
    case UserActions.USER_LOGIN_LODING: {
      return {
        ...state,
        userSignUpLoading: action.payload,
      };
    }

    case UserActions.SET_USER_LOADER: {
      return {
        ...state,
        usersLoader: action.payload,
      };
    }
    // SET_CHEF //////
    case UserActions.UPLOAD_EXCEL_STATUS: {
      return {
        ...state,
        uploadStatusFile: action.payload,
      };
    }
    case UserActions.SET_CHEF: {
      return {
        ...state,
        chefData: action.payload,
      };
    }
    case UserActions.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
}
