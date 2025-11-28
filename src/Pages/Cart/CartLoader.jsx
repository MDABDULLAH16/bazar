const url = import.meta.env.VITE_BACKEND_URL;
export const cartLoader = async ({ params }) => {
  const email = params.email;

  const res = await fetch(`${url}/cart/${email}`);
  return res.json();
};
