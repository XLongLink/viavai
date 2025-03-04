/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

export interface Header {
  logo: string;
  title: string;
  subtitle: string;
}
export interface Item {
  logo: string;
  name: string;
}
export interface Object {
  header: Header;
  body: Section[];
  footer: string;
}
export interface Section {
  name: string;
  type: "default" | "plus";
  items: Item[];
}
