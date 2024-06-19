import { ComponentType, LazyExoticComponent } from "react";

export interface ILocationPathname {
    "/"?: object
    "/login"?: object;
    "/restaurants"?: object;
    "/menus"?: object;
}
export type ILocation = keyof ILocationPathname;

export interface Page {
    path: ILocation;
    exact?: boolean;
    component: LazyExoticComponent<ComponentType>;
}