export interface IUser {
  usersData: IUsersData;
  usersLoader: boolean;
  isFormLoader: boolean;
  userProfile: IUserProfile;
  userSignUpLoading: boolean;
  formEroors: IFormErrors[];
  uploadFileLoader: boolean;
  uploadStatusFile: boolean;
  // userDetails: IUserDetail;
  chefData: ISetChefData;
}

export enum Roles {
  CONSUMER = "consumer",
  COMPANY = "company",
}

export interface IUserLogin {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface IOtpData {
  email: string;
  otpToken: string;
  expiresAt: string;
  rememberMe: boolean;
}


export interface IFormErrors {
  path: string;
  msg: string;
}
export interface IUserProfile {
  isAuth?: boolean;
  email?: string;
  id?: number | null;
  name?: string;
}

// new interface

export interface User {
  id: number | null;
  name: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  signupMethod: string;
  ageConsentInfo: string | null;
  isActive: boolean;
  isEmailVerified: boolean;
  lastLogin: string | null;
  createdAt: string;
}

export interface Pagination {
  total_count: number;
  current_page: number;
  next_page: number | null;
  previous_page: number | null;
  total_pages: number | null;
  per_page: number | null;
}

export interface IUsersData {
  users: User[];
  pagination: Pagination;
}

export interface IGetUsers {
  current_page: number;
  search: string;
}

interface UserStats {
  totalLabel: string;
  total: number | null;
  last24HrLabel: string;
  last24Hr: number | null;
  last7DaysLabel: string;
  last7Days: number | null;
  lastMonthLabel: string;
  lastMonth: number | null;
}

interface RevenueStats {
  totalLabel: string;
  total: string;
  last24HrLabel: string;
  last24Hr: string;
  last7DaysLabel: string;
  last7Days: string;
  lastMonthLabel: string;
  lastMonth: string;
}

export interface IgameAnalytics {
  user: UserStats;
  revenue: RevenueStats;
}


export interface IUserDetail {
  chef: string;
}

export interface chef {
  id: number | null;
  username: string | null; // Since `username` can be null
  role: string;
  firstName: string;
  lastName: string;
  email: string | null; // email is a string, not a number, can be null
  gender: string;
  dateOfBirth: string | null; // dateOfBirth can be null
  age: string | null; // age can be null
  phoneNumber: string | null; // phoneNumber can be null
  countryCode: string;
  isActive: boolean; // isActive should be a boolean, not a string
  profilePermission: string;
  aboutMe: string;
  profilePic: string | null; // profilePic can be null
  homeLocation: string;
  hashTags: string;
  partnerRestaurant: string;
  socialMediaLinks: socialMediaLinks[] | null; // socialMediaLinks is an array and can be null
  award: awards[] | null; // awards is an array, and can be null
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null; // deletedAt can be null
}

interface awards {
  id: number;
  year: string;
  name: string;
  image: string | null;
}

interface socialMediaLinks {
  id: number;
  socialMediaType: string;
  url: string;
}

export interface IGetChef {
  current_page: number,
  search: string;
}

export interface ISetChefData {
  chefs: chef[];
  pagination: Pagination;
}
