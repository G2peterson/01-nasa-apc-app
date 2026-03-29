const API_KEY = "Du7m3pp6Ug1ALq0zVdceqGcNTRgt2RcZ5zEnDf0R";

async function getSpaceImages() {
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;

  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;

  const response = await fetch(url);
  const data = await response.json();

  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  data.forEach(item => {
    const div = document.createElement("div");
    div.className = "gallery-item";

    if (item.media_type === "image") {
      div.innerHTML = `
        <img src="${item.url}">
        <h3>${item.title}</h3>
        <p>${item.date}</p>
      `;
    }

    div.onclick = () => openModal(item);
    gallery.appendChild(div);
  });
}

function openModal(item) {
  const modal = document.getElementById("modal");

  modal.innerHTML = `
    <div style="background:white; padding:20px;">
      <span onclick="closeModal()">X</span>
      <h2>${item.title}</h2>
      <img src="${item.url}" style="width:100%">
      <p>${item.explanation}</p>
    </div>
  `;

  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}
