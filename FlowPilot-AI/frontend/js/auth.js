const API = "/api";
function message(text, ok=false) {
  const el = document.getElementById("formMessage");
  el.textContent = text;
  el.style.color = ok ? "#67e8f9" : "#fda4af";
}
async function send(path, body) {
  const res = await fetch(API + path, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}
const login = document.getElementById("loginForm");
if (login) login.addEventListener("submit", async e => {
  e.preventDefault();
  try {
    const data = await send("/auth/login", { email: email.value, password: password.value });
    localStorage.setItem("flowpilot_token", data.token);
    location.href = "/dashboard.html";
  } catch (err) { message(err.message); }
});
const signup = document.getElementById("signupForm");
if (signup) signup.addEventListener("submit", async e => {
  e.preventDefault();
  try {
    const data = await send("/auth/signup", { name: name.value, email: email.value, password: password.value });
    localStorage.setItem("flowpilot_token", data.token);
    location.href = "/dashboard.html";
  } catch (err) { message(err.message); }
});
