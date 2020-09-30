const getUrl = () => {
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    return "https://localhost:44311/api";
  }
  return "https://localhost:44311/api";
}

export { getUrl };