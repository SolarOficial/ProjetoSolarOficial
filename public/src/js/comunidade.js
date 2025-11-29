const STORAGE_KEY = "solar_comunidade_posts_v1";

/* --- DOM --- */
const btnOpenModal = document.getElementById("btn-open-modal");
const modal = document.getElementById("modal");
const btnCancel = document.getElementById("btn-cancel");
const btnPost = document.getElementById("btn-post");
const postOptions = document.querySelectorAll(".post-option");
const textPost = document.getElementById("text-post");
const imagePost = document.getElementById("image-post");
const postContent = document.getElementById("post-content");
const postImage = document.getElementById("post-image");
const imagePreview = document.getElementById("image-preview");
const previewImg = document.getElementById("preview-img");
const removeImage = document.getElementById("remove-image");
const imageCaption = document.getElementById("image-caption");

const postsContainer = document.getElementById("posts");
const feedView = document.getElementById("feedView");
const postView = document.getElementById("postView");
const btnBack = document.getElementById("btn-back");
const singlePostContainer = document.getElementById("single-post-container");
const singleCommentsList = document.getElementById("single-comments-list");
const commentInput = document.getElementById("comment-input");
const commentAddBtn = document.getElementById("comment-add");

/* --- Estado --- */
let posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let currentPostId = null;

/* --- Helpers --- */
function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function formatDate(d = new Date()) {
  return d.toLocaleDateString("pt-BR");
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}


/* --- Renderizar feed --- */
function renderFeed() {
  postView.classList.add("hidden"); 
feedView.classList.remove("hidden");

  postsContainer.innerHTML = "";
  posts.forEach((post) => {
    const likeClass = post.liked ? "active" : "";
    const saveClass = post.saved ? "active" : "";

    const el = document.createElement("div");
    el.className = "post";
    el.dataset.id = post.id;

    el.innerHTML = `
      <div class="post-header">
        <div class="post-avatar">${post.author ? post.author.charAt(0) : "U"}</div>
        <div>
          <div class="post-author">${post.author}</div>
          <div class="post-date">${post.date}</div>
        </div>
      </div>
      <div class="post-content">
        <p>${escapeHtml(post.content)}</p>
        ${post.image ? `<img class="post-image" src="${post.image}" alt="">` : ""}
      </div>
      <div class="post-actions">
        <div class="post-action like-action ${likeClass}" data-action="like" data-id="${post.id}">
          <i class="fa-solid fa-heart"></i><span>${post.likes}</span>
        </div>
        <div class="post-action save-action ${saveClass}" data-action="save" data-id="${post.id}">
          <i class="fa-solid fa-bookmark"></i><span>${post.saved ? "Salvo" : "Salvar"}</span>
        </div>
        <div class="post-action comment-action" data-action="comment" data-id="${post.id}">
          <i class="fa-solid fa-comment"></i><span>${post.comments.length}</span>
        </div>
      </div>
    `;

    postsContainer.appendChild(el);
  });
}

/* --- Ações no feed --- */
postsContainer.addEventListener("click", (e) => {
  const actionEl = e.target.closest(".post-action");
  if (!actionEl) return;
  const id = Number(actionEl.dataset.id);
  const action = actionEl.dataset.action;

  if (action === "like") toggleLike(id);
  else if (action === "save") toggleSave(id);
  else if (action === "comment") openPostView(id);

});

/* --- Ações dentro do post único --- */
singlePostContainer.addEventListener("click", (e) => {
  const actionEl = e.target.closest(".post-action");
  if (!actionEl) return;
  const id = Number(actionEl.dataset.id);
  const action = actionEl.dataset.action;

  if (action === "like") toggleLike(id);
  else if (action === "save") toggleSave(id);
});


/* --- Curtir / Salvar --- */
function toggleLike(id) {
  const post = posts.find((p) => p.id === id);
  if (!post) return;

  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  if (post.likes < 0) post.likes = 0;

  saveToStorage();

  if (currentPostId === id) {
    renderSinglePost(id);
  } else {
    renderFeed();
  }
}

function toggleSave(id) {
  const post = posts.find((p) => p.id === id);
  if (!post) return;

  post.saved = !post.saved;
  saveToStorage();

  // atualização do post único
  if (currentPostId === id) {
    renderSinglePost(id);
  } else {
    renderFeed();
  }
}


/* --- Modal Criar Post --- */
btnOpenModal.addEventListener("click", () => {
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
});

btnCancel.addEventListener("click", resetModal);

function resetModal() {
  modal.classList.add("hidden");
  document.body.style.overflow = "auto";
  postContent.value = "";
  postImage.value = "";
  imageCaption.value = "";
  previewImg.src = "";
  imagePreview.classList.add("hidden");
  postOptions.forEach((o) => o.classList.remove("active"));
  postOptions[0].classList.add("active");
  textPost.classList.remove("hidden");
  imagePost.classList.add("hidden");
}

/* Alternar tipo */
postOptions.forEach((opt) => {
  opt.addEventListener("click", () => {
    postOptions.forEach((o) => o.classList.remove("active"));
    opt.classList.add("active");
    const type = opt.dataset.type;
    textPost.classList.toggle("hidden", type !== "text");
    imagePost.classList.toggle("hidden", type !== "image");
  });
});

/* Preview imagem */
postImage.addEventListener("change", () => {
  const file = postImage.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImg.src = e.target.result;
    imagePreview.classList.remove("hidden");
  };
  reader.readAsDataURL(file);
});
removeImage.addEventListener("click", () => {
  previewImg.src = "";
  imagePreview.classList.add("hidden");
  postImage.value = "";
});

/* Criar post */
btnPost.addEventListener("click", () => {
  const type = document.querySelector(".post-option.active").dataset.type;
  if (type === "text") {
    const content = postContent.value.trim();
    if (!content) return alert("Escreva algo antes de postar!");
    createPost(content, null);
  } else {
    const file = postImage.files[0];
    if (!file) return alert("Selecione uma imagem!");
    const caption = imageCaption.value.trim();
    const reader = new FileReader();
    reader.onload = (e) => createPost(caption, e.target.result);
    reader.readAsDataURL(file);
  }
  resetModal();
  renderFeed();
});

function createPost(content, image) {
  const post = {
    id: Date.now(),
    author: "Você",
    date: formatDate(),
    content,
    image,
    likes: 0,
    liked: false,
    saved: false,
    comments: []
  };
  posts.unshift(post);
  saveToStorage();
}

/* --- Visualizar Post --- */
function openPostView(id) {
  feedView.classList.add("hidden"); // esconder feed
postView.classList.remove("hidden"); // exibir tela do post com comentários

  currentPostId = id;
  feedView.classList.add("hidden");
  postView.classList.remove("hidden");
  renderSinglePost(id);
}

btnBack.addEventListener("click", () => {
  currentPostId = null;
  postView.classList.add("hidden");
  feedView.classList.remove("hidden");
  renderFeed();
});

function renderSinglePost(id) {
  const post = posts.find((p) => p.id === id);
  if (!post) return;

  const likeClass = post.liked ? "active" : "";
  const saveClass = post.saved ? "active" : "";

  singlePostContainer.innerHTML = `
    <div class="post" data-id="${post.id}">
      <div class="post-header">
        <div class="post-avatar">${post.author.charAt(0)}</div>
        <div>
          <div class="post-author">${post.author}</div>
          <div class="post-date">${post.date}</div>
        </div>
      </div>
      <div class="post-content">
        <p>${escapeHtml(post.content)}</p>
        ${post.image ? `<img class="post-image" src="${post.image}" alt="">` : ""}
      </div>
      <div class="post-actions">
        <div class="post-action like-action ${likeClass}" data-action="like" data-id="${post.id}">
          <i class="fa-solid fa-heart"></i><span>${post.likes}</span>
        </div>
        <div class="post-action save-action ${saveClass}" data-action="save" data-id="${post.id}">
          <i class="fa-solid fa-bookmark"></i><span>${post.saved ? "Salvo" : "Salvar"}</span>
        </div>
      </div>
    </div>
  `;

  renderCommentsFor(post.id);
}

/* --- Comentários --- */
commentAddBtn.addEventListener("click", () => {
  const text = commentInput.value.trim();
  if (!text || currentPostId === null) return;
  const post = posts.find((p) => p.id === currentPostId);
  post.comments.push({
    author: "Você",
    text,
    date: formatDate()
  });
  saveToStorage();
  commentInput.value = "";
  renderCommentsFor(post.id);
});

function renderCommentsFor(postId) {
  const post = posts.find((p) => p.id === postId);
  singleCommentsList.innerHTML = "";

  if (!post || !post.comments.length) {
    singleCommentsList.innerHTML = `<div style="color:#777;">Seja o primeiro a comentar 💬</div>`;
    return;
  }

  post.comments.forEach((c) => {
    const div = document.createElement("div");
    div.className = "comment"; 

    const initial = (c.author && c.author.charAt(0)) || "U";

    div.innerHTML = `
      <div class="comment-header">
        <div class="comment-avatar">${escapeHtml(initial)}</div>
        <div class="comment-meta">
          <div class="comment-author">${escapeHtml(c.author || "Usuário")}</div>
          <div class="comment-date">${escapeHtml(c.date || "")}</div>
        </div>
      </div>
      <div class="comment-text">${escapeHtml(c.text)}</div>
    `;
    singleCommentsList.appendChild(div);
  });
}

/* --- Inicialização --- */
renderFeed();
