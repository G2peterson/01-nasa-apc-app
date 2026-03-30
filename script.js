const API_KEY = "Du7m3pp6Ug1ALq0zVdceqGcNTRgt2RcZ5zEnDf0R";

async function getSpaceImages() {
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;

  if (!startDate || !endDate) {
    alert("Please select both dates");
    return;
  }

  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    // HANDLE single object OR array
    const items = Array.isArray(data) ? data : [data];

    items.forEach(item => {
      const div = document.createElement("div");
      div.className = "gallery-item";

      // HANDLE image vs video
      if (item.media_type === "image") {
        div.innerHTML = `
          <img src="${item.url}" style="width:100%">
          <h3>${item.title}</h3>
          <p>${item.date}</p>
        `;
      } else {
        div.innerHTML = `
          <p><strong>Video:</strong></p>
          <a href="${item.url}" target="_blank">Watch Video</a>
        `;
      }

      div.onclick = () => openModal(item);
      gallery.appendChild(div);
    });

  } catch (error) {
    alert("Error loading images");
    console.error(error);
  }
}

function openModal(item) {
  const modal = document.getElementById("modal");

  modal.innerHTML = `
    <div style="background:white; padding:20px; margin:50px;">
      <span onclick="closeModal()" style="cursor:pointer; font-size:20px;">X</span>
      <h2>${item.title}</h2>
      ${item.media_type === "image" 
        ? `<img src="${item.url}" style="width:100%">` 
        : `<a href="${item.url}" target="_blank">Watch Video</a>`}
      <p>${item.explanation}</p>
    </div>
  `;

  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}
