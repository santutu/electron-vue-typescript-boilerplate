export const IS_DEV: boolean = process.env.NODE_ENV === 'development';

export const IS_TEST = typeof (global as any).it === 'function';

export const IS_PROD: boolean = !IS_DEV && !IS_TEST;
