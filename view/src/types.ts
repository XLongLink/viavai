export interface TypeApp {
	logo: string;
	title: string;
	subtitle: string;
}

export interface TypePage {
	logo: string;
	title: string;
}

export interface TypeMain {
	title: string;
	breadcrumb: TypeBreadcrumb[];
}

export interface TypeBreadcrumb {
	name: string;
	href: string;
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

export interface TypeState {
	app: TypeApp;
	page: TypePage;
	nav: TypeSection[];
	main: TypeMain;
}
