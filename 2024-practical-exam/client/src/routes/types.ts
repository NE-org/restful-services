import { ComponentType, LazyExoticComponent } from "react";

export interface ILocationPathname {
    "/"?: object
    "/login"?: object;
    "/register"?: object;
}
export type ILocation = keyof ILocationPathname;

export interface Page {
    path: ILocation;
    exact?: boolean;
    component: LazyExoticComponent<ComponentType>;
}