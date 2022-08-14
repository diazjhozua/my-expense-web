import axios from "axios";
import store from "../../store";

export const api = async (method, url, body) => {
  let response;

  store.commit("global/setIsLoading", true);

  try {
    switch (method) {
      case "GET":
        response = await axios.get(url, body);
        break;
      case "POST":
        response = await axios.post(url, body);
        break;
      case "PUT":
        response = await axios.put(url, body);
        break;
      case "DELETE":
        response = await axios.delete(url, body);
        break;
    }

    response = response.data;
    if (response.message) {
      store.commit("global/setAlert", {
        visible: true,
        type: "success",
        text: response.message,
      });
    }
  } catch (error) {
    let cleanMessage;
    let errorMessage = error.response.data.message;
    let statusCode = error.response.status;

    if (!errorMessage) {
      switch (statusCode) {
        case 400:
          cleanMessage = error.response.data.title
            ? error.response.data.title
            : "One or more validation errors occurred.";
          break;
        default:
          cleanMessage = "There is something wrong with the request";
      }
    } else {
      cleanMessage = errorMessage;
    }

    if (cleanMessage) {
      store.commit("global/setAlert", {
        visible: true,
        type: "error",
        text: cleanMessage,
      });
    }

    switch (statusCode) {
      case 401:
        store.dispatch("auth/logoutAction");
        break;
    }
  } finally {
    store.commit("global/setIsLoading", false);
  }

  return response;
};
