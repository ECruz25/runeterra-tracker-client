const getUrl = () => {
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    return "localhost:44311/api";
  }
  return "localhost:44311/api";
}

export { getUrl };