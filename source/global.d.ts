declare global {
	export interface Window {
		Pict: typeof import('pict');
		tui: {
			Grid: typeof import('tui-grid').default;
		}
	}
	var _Pict: import('pict');
}

export {}
