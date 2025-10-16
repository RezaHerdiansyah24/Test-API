const apiKey = "c07d254507d74604b84f3ea9c03cae7a"; // API key NewsAPI.org milik kamu
const newsContainer = document.getElementById("newsContainer");

async function getNews(category = "general") {
  newsContainer.innerHTML = "<p>Loading berita...</p>";

  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&apiKey=de1eab907c7748f18b22bb50ac948327`
    );
    const data = await res.json();

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
    newsContainer.innerHTML = `<p>Terjadi kesalahan saat mengambil berita: ${err.message}</p>`;
  }
}

// Tampilkan berita umum saat halaman pertama dibuka
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
