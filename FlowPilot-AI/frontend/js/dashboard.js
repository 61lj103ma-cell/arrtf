const token = localStorage.getItem("flowpilot_token");
if (!token) location.href = "/login.html";
const headers = { "Content-Type":"application/json", Authorization:`Bearer ${token}` };

async function api(path, options={}) {
  const res = await fetch("/api" + path, { ...options, headers:{...headers, ...(options.headers||{})} });
  const data = await res.json();
  if (res.status === 401) { localStorage.removeItem("flowpilot_token"); location.href="/login.html"; }
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

async function load() {
  try {
    const me = await api("/auth/me");
    document.getElementById("userName").textContent = me.user.name;
    const data = await api("/projects");
    document.getElementById("projectCount").textContent = data.projects.length;
    renderProjects(data.projects);
  } catch (e) { console.error(e); }
}
function renderProjects(projects) {
  const el = document.getElementById("projects");
  if (!projects.length) {
    el.innerHTML = `<div class="project"><h3>No projects yet</h3><p>Create your first project to start building.</p></div>`;
    return;
  }
  el.innerHTML = projects.map(p => `
    <div class="project">
      <div class="project-top"><h3>${escapeHtml(p.name)}</h3><button class="delete" onclick="deleteProject('${p._id}')">Delete</button></div>
      <p>${escapeHtml(p.description || "No description.")}</p>
      <small style="color:#67e8f9">${escapeHtml(p.status)}</small>
    </div>`).join("");
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}
async function deleteProject(id){ await api("/projects/"+id,{method:"DELETE"}); load(); }

document.getElementById("logoutBtn").onclick = () => { localStorage.removeItem("flowpilot_token"); location.href="/"; };
const modal = document.getElementById("modal");
document.getElementById("newProjectBtn").onclick = () => modal.classList.remove("hidden");
document.getElementById("closeModal").onclick = () => modal.classList.add("hidden");

document.getElementById("projectForm").addEventListener("submit", async e => {
  e.preventDefault();
  try {
    await api("/projects",{method:"POST",body:JSON.stringify({name:projectName.value,description:projectDescription.value})});
    projectName.value=""; projectDescription.value=""; modal.classList.add("hidden"); load();
  } catch(e) { alert(e.message); }
});

let sessions = 0;
document.getElementById("aiForm").addEventListener("submit", async e => {
  e.preventDefault();
  const input = document.getElementById("prompt");
  const prompt = input.value.trim(); if(!prompt) return;
  addBubble(prompt,"user"); input.value="";
  try {
    const data = await api("/ai/chat",{method:"POST",body:JSON.stringify({prompt})});
    addBubble(data.response,"ai"); sessions++; document.getElementById("sessionCount").textContent=sessions;
  } catch(e) { addBubble(e.message,"ai"); }
});
function addBubble(text,type){ const chat=document.getElementById("chat"); const b=document.createElement("div"); b.className=`bubble ${type}`; b.textContent=text; chat.appendChild(b); chat.scrollTop=chat.scrollHeight; }
load();
