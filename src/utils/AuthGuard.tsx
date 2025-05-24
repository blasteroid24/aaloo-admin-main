import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { AppState } from '@/redux/types';

const AuthGuard = ({ children }: any) => {
    const router = useRouter();
    const auth = useSelector((state: AppState) => state?.userData.userProfile.isAuth);
     
    useEffect(() => {
        const unAuthorize = ["/", "", "/meal-logs", "/meal-log-token" ];

        // Check if the current path is an unauthorized path
        const isUnAuthorizedPath = unAuthorize.includes(router.pathname);

        // If the user is not authenticated and trying to access an authorized path
        if (!localStorage.getItem("access_token") && !auth && !isUnAuthorizedPath) {
            router.push("/");
        }

        // If the user is authenticated and trying to access an unauthorized path, redirect to home
        if (localStorage.getItem("access_token") && auth && isUnAuthorizedPath) {
            router.push("/");
        }
          // If the user is authenticated and trying to access the login page, redirect to dashboard
          if (localStorage.getItem("access_token") && auth && router.pathname === "/") {
            router.push("/survey-management");
        }
    }, [router, auth]);

    return <>{children}</>;
}

export default AuthGuard;
