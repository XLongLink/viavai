/* Informations about the sidebar */
export interface TypeSidebar {
	logo: string;
	title: string;
	subtitle: string;
	sections: TypeSection[];
}

export interface TypeSection {
	name: string;
	items: TypeItem[];
	variant: 'default' | 'plus' | 'collapse';
}

export interface TypeItem {
	name: string;
	icon: string;
	href: string;
	items: TypeSubItem[];
}

export interface TypeSubItem {
	name: string;
	icon: string;
	href: string;
}

/* Informations about the current page */
export interface TypePage {
	logo: string;
	title: string;
	breadcrumb: TypeBreadcrumb[];
	children: TypeComponent[];
}

export interface TypeBreadcrumb {
	name: string;
	href: string;
}

export interface TypeComponent {
	type: string;
	props: unknown;
	children: TypeComponent[] | string;
}
