let id = 0;

const defaultOptions = {
  // put toast options here
};

export default function createToast(options) {
  return {
    ...defaultOptions,
    ...options,
    id: id++,
  };
}
