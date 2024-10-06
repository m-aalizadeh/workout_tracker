const BASE_URL = "http://localhost:8080/app/v1/";

export const commonFetch = async (
  method,
  queryParams,
  queryString,
  payload
) => {
  try {
    let finalEndPoint = BASE_URL;
    if (queryParams) {
      finalEndPoint += queryParams;
    }
    if (queryString) {
      finalEndPoint += "?" + queryString;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    let headers = {
      "Content-Type": "application/json",
      pragma: "no-cache",
      "cache-control": "no-cache",
    };
    if (user?.accessToken) {
      headers = { ...headers, Authorization: `Bearer ${user.accessToken}` };
    }
    let content;
    switch (method) {
      case "POST":
      case "PATCH":
        content = {
          method,
          headers,
          body: JSON.stringify(payload),
        };
        break;
      case "GET":
      case "DELETE":
        content = {
          method,
          headers,
        };
        break;
      default:
    }
    const response = await fetch(finalEndPoint, content);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
};
