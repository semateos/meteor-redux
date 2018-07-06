
import Auth from './auth';

export const run = (store) => {
    const initializers = [
        Auth,
    ];
    initializers.forEach((init) => init(store));
};
