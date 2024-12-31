declare global {
	export interface Window {
		iPict: import('pict');
		tui: {
			Grid: typeof import('tui-grid').default;
		}
	}
}

export {}
