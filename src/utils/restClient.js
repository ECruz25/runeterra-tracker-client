const getUrl = () => {
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    return "localhost:44311/api";
  }
  return "localhost:44311/api";
}

export { getUrl };