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

const Dashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const Restaurant = lazy(() => import("@/pages/dashboard/Restaurant"));
const Menu = lazy(() => import('@/pages/dashboard/Menu'));
const Login = lazy(() => import("@/pages/auth/Login"));

const pages: Page[] = [
    { path: "/", exact: true, component: Dashboard },
    { path: "/restaurants", exact: true, component: Restaurant },
    { path: "/login", exact: true, component: Login },
    { path: "/menus", exact: true, component: Menu },
]

const MyRoutes = () => {
    const [authState, ] = useRecoilState(AuthState);
    const isAuthenticated = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) !== null ? true : false && authState.isAuthenticated;
    return (
        <BrowserRouter>
            <Routes>
                {pages.map(({ component, path }) => {
                    const Component = component;
                    return (
                        <Route
                            key={path}
                            path={path}
                            element={
                                <Suspense fallback={<PageLoader />}>
                                    {path === '/login' ? (
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