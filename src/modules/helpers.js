export function log(...args) {
    if (process.env.NODE_ENV !== 'development') {
        return;
    }

    console.log(...args);
}