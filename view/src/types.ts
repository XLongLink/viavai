/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

export interface Item {
  icon: string;
  name: string;
}
export interface Section {
  name: string;
  items: Item[];
  variant: "default" | "plus";
}
/**
 * Is the object that is sent to the user to render the page
 * This object has to be in sync from the backend to the frontend
 */
export interface State {
  logo: string;
  title: string;
  subtitle: string;
  nav: Section[];
}
