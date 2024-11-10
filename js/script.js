window.addEventListener("load", () => {
  const isDarkMode = JSON.parse(localStorage.getItem("isDarkMode")) || false;
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
  }
  loadStoredMedia();
});

const darkModeToggle = document.getElementById("darkModeToggle");

if (localStorage.getItem('dark-mode') === 'enabled') {
  document.body.classList.add('dark-mode');
  darkModeToggle.checked = true;
}

darkModeToggle.addEventListener('change', () => {
  if (darkModeToggle.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('dark-mode', 'enabled');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('dark-mode', 'disabled');
  }
});

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
});

function loadStoredMedia() {
  const storedMedia = JSON.parse(localStorage.getItem("galleryMedia")) || [];
  storedMedia.forEach((media) => displayMedia(media.src, media.type));
}

function uploadMedia() {
  const uploadInput = document.getElementById("uploadInput");
  if (uploadInput.files && uploadInput.files[0]) {
    const file = uploadInput.files[0];
    const type = file.type.startsWith("image") ? "image" : "video";

    const reader = new FileReader();
    reader.onload = (e) => {
      const mediaSrc = e.target.result;
      displayMedia(mediaSrc, type);
      saveMediaToLocalStorage();
    };
    reader.readAsDataURL(file);
  }
}

function displayMedia(src, type) {
  const gallery = document.getElementById("gallery");
  const mediaElement = document.createElement("div");
  mediaElement.className = "gallery-item";
  mediaElement.innerHTML = `
                ${
                  type === "image"
                    ? `<img src="${src}" alt="Uploaded Image" onclick="openModal('${src}', 'image')">`
                    : `<video src="${src}" controls onclick="openModal('${src}', 'video')"></video>`
                }
                <button class="delete-button" onclick="deleteMedia('${src}')">Hapus</button>
            `;
  gallery.appendChild(mediaElement);
}

function saveMediaToLocalStorage() {
  const galleryItems = Array.from(
    document.querySelectorAll(".gallery-item img, .gallery-item video")
  ).map((el) => ({
    src: el.src,
    type: el.tagName.toLowerCase() === "img" ? "image" : "video",
  }));
  localStorage.setItem("galleryMedia", JSON.stringify(galleryItems));
}

function deleteMedia(src) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  const updatedMedia = JSON.parse(localStorage.getItem("galleryMedia")).filter(
    (media) => media.src !== src
  );
  localStorage.setItem("galleryMedia", JSON.stringify(updatedMedia));
  updatedMedia.forEach((media) => displayMedia(media.src, media.type));
}

function openModal(src, type) {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalContent");
  modalContent.innerHTML =
    type === "image"
      ? `<img src="${src}" style="width: 100%; height: 100%; object-fit: contain;">`
      : `<video src="${src}" style="width: 100%; height: 100%;" controls autoplay></video>`;
  modal.classList.add("show");
}

document.getElementById("modal").addEventListener("click", (e) => {
  if (e.target.id === "modal") {
    document.getElementById("modal").classList.remove("show");
  }
});

document.querySelector(".dropdown-btn").addEventListener("click", function () {
  const dropdownContent = document.querySelector(".dropdown-content");

  if (
    dropdownContent.style.display === "none" ||
    dropdownContent.style.display === ""
  ) {
    dropdownContent.style.display = "block";
    setTimeout(() => {
      dropdownContent.style.opacity = "1";
      dropdownContent.style.transform = "translateX(-50%) translateY(0)";
    }, 10); // Trigger transition
  } else {
    dropdownContent.style.opacity = "0";
    dropdownContent.style.transform = "translateX(-50%) translateY(-10px)";
    setTimeout(() => {
      dropdownContent.style.display = "none";
    }, 300); // Wait for transition to end
  }
});
