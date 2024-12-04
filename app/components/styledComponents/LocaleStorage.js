const LocalStorage = {
  get: (key) => {
    try {
      if (typeof window !== "undefined" && localStorage) {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
      }
    } catch (error) {
      console.error("Error getting item from localStorage", error);
      return null;
    }
  },
  set: (key, value) => {
    try {
      if (typeof window !== "undefined" && localStorage) {
        const valueToStore = typeof value === "string" ? value : JSON.stringify(value);
        localStorage.setItem(key, valueToStore);
      }
    } catch (error) {
      console.error("Error setting item in localStorage", error);
    }
  },
};

export default LocalStorage;
