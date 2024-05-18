export const getAccessToken = () => {
  return sessionStorage.getItem("accessToken");
};

export const addElipsis = (str, limit) => {
  return str.length > limit ? str.substring(0, limit) + "..." : str;
};

// below function is used to get the data based on query where i am trying to get post based on category
export const getType = (value, body) => {
  if (value.params) {
    return { params: body };
  } else if (value.query) {
    if (typeof body === "object") {
      return { query: body._id };
    } else {
      return { query: body };
    }
  }
  return {};
};
