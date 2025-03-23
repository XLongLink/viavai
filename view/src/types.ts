export interface TypePage {
	title: string;
	breadcrumb: TypeBreadcrumb[];
}

export interface TypeBreadcrumb {
	name: string;
	href: string;
}

export interface TypeSection {
	name: string;
	items?: TypeItem[];
	variant?: 'default' | 'plus' | 'collapse';
}

export interface TypeItem {
	name: string;
	icon?: string;
	href?: string;
	items?: TypeSubItem[];
}

export interface TypeSubItem {
	name: string;
	icon?: string | null;
	href?: string | null;
}

export interface TypeState {
	logo: string;
	title: string;
	subtitle: string;
	nav: TypeSection[];
	main: TypePage;
}
