import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Page } from "./types";
import NotFound from "@/pages/404";
import { lazy, Suspense } from "react";
import PageLoader from "@/components/shared/PageLoader";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import { useRecoilState } from "recoil";
import { AuthState } from "@/store";
import { LOCAL_STORAGE_TOKEN_KEY } from "@/utils/constants";

const Book = lazy(() => import("@/pages/dashboard/Book"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));

const pages: Page[] = [
    { path: "/", exact: true, component: Book },
    { path: "/login", component: Login },
    { path: "/register", component: Register }
]

const MyRoutes = () => {
    /* 
        Handling the authentication status, checking the current state of the user authorization.
    */
    const [authState,] = useRecoilState(AuthState);
    const isAuthenticated = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) !== null ? true : false && authState.isAuthenticated;

    return (
        <BrowserRouter>
            <Routes>
                {pages.map(({ component, path }) => {
                    const Component = component;
                    /* 
                        Checking if the route is public or protected, if the route is public then the user can access it without authentication.
                    */
                    const isPublicRoute = path === '/login' || path === '/register';
                    return (
                        <Route
                            key={path}
                            path={path}
                            element={
                                <Suspense fallback={<PageLoader />}>
                                    {isPublicRoute ? (
                                        <PublicRoute isAuthenticated={isAuthenticated}>
                                            <Component />
                                        </PublicRoute>
                                    ) : (
                                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                                            <Component />
                                        </ProtectedRoute>
                                    )}
                                </Suspense>
                            }
                        />
                    );
                })}
                <Route
                    path="*"
                    element={
                        /* 
                            Lazy loading, if the route is not found then the user will be redirected to the 404 page.
                        */
                        <Suspense fallback={<PageLoader />}>
                            <NotFound />
                        </Suspense>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default MyRoutes;