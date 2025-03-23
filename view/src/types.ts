/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

export interface ModelPage {
  title: string;
  breadcrumb: ModelBreadcrumb[];
}
export interface ModelBreadcrumb {
  name: string;
  href: string;
}
export interface ModelSection {
  name: string;
  items?: ModelItem[];
  variant?: "default" | "plus" | "collapse";
}
export interface ModelItem {
  name: string;
  icon?: string | null;
  href?: string | null;
  items?: ModelSubItem[];
}
export interface ModelSubItem {
  name: string;
  icon?: string | null;
  href?: string | null;
}
/**
 * Is the object that is sent to the user to render the page
 * This object has to be in sync from the backend to the frontend
 */
export interface ModelState {
  logo: string;
  title: string;
  subtitle: string;
  nav: ModelSection[];
  main: ModelPage;
}
