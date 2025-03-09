/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

/**
 * Is the object that is sent to the user to render the page
 * This object has to be in sync from the backend to the frontend
 */
export interface AppState {
  logo: string;
  title: string;
  subtitle: string;
  header: Section[];
}
export interface Section {
  name: string;
  type: "default" | "plus";
  items: Item[];
}
export interface Item {
  icon: string;
  name: string;
}
