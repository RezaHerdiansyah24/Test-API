const apiKey1 = "de1eab907c7748f18b22bb50ac948327"; // API key NewsAPI.org milik kamu
const apiKey = "c07d254507d74604b84f3ea9c03cae7a";
const newsContainer = document.getElementById("newsContainer");

// Deteksi apakah dijalankan dari file://
const isLocalFile = window.location.protocol === "file:";

// Jika bukan localhost, pakai proxy (hanya untuk testing)
const proxy = isLocalFile ? "https://cors-anywhere.herokuapp.com/" : "";

async function getNews(category = "general") {
  newsContainer.innerHTML = "<p>Loading berita...</p>";
  const url = `${proxy}https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&apiKey=de1eab907c7748f18b22bb50ac948327`;

  try {
    const res = await fetch(url);

    const data = await res.json();
    console.log(data);
    if (data.status !== "ok") {
      throw new Error(data.message || "Gagal mengambil berita");
    }

    if (!data.articles || data.articles.length === 0) {
      newsContainer.innerHTML = "<p>Tidak ada berita ditemukan.</p>";
      return;
    }

    newsContainer.innerHTML = data.articles
      .map(
        (article) => `
      <div class="news-card">
        <img src="${
          article.urlToImage ||
          "https://via.placeholder.com/300x180?text=No+Image"
        }" alt="news image">
        <div class="content">
          <h3>${article.title || "Tanpa Judul"}</h3>
          <p>${article.description || "Tidak ada deskripsi."}</p>
          <a href="${article.url}" target="_blank">Baca Selengkapnya</a>
        </div>
      </div>
    `
      )
      .join("");
  } catch (err) {
    console.error(err);
    newsContainer.innerHTML = `<p>Terjadi kesalahan: ${err.message}</p>`;
  }
}

// Tampilkan berita umum saat pertama
getNews();

// Navbar event listeners
document
  .getElementById("homeLink")
  .addEventListener("click", () => getNews("general"));
document
  .getElementById("techLink")
  .addEventListener("click", () => getNews("technology"));
document
  .getElementById("sportLink")
  .addEventListener("click", () => getNews("sports"));
document
  .getElementById("businessLink")
  .addEventListener("click", () => getNews("business"));
