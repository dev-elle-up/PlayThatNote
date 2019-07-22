export function devLogger(...args) {
    if (process.env.NODE_ENV !== 'development') {
        return;
    } else {
      console.log(...args);
    }
}

// only execute console.log in development, not in deployed code
