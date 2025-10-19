const getFromDb = () => {
  const getStored = localStorage.getItem("cart");
  if (getStored) {
    const parseCart = JSON.parse(getStored);
    return parseCart || [];
  }
};
const addToLocalDB = (id) => {
  const getOldItem = getFromDb() || []; // get the current cart array
  if (getOldItem.includes(id)) {
    return;
  } else {
    getOldItem.push(id); // push to the array
    localStorage.setItem("cart", JSON.stringify(getOldItem)); // save updated array
  }
};

export { addToLocalDB, getFromDb };
