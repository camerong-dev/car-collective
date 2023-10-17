function getCsrfToken() {
  const cookieValue = document.cookie.match(
    "(^|;)\\s*" + "csrftoken" + "\\s*=\\s*([^;]+)"
  );
  return cookieValue ? cookieValue.pop() : "";
}

export default getCsrfToken;
