const { ipcRenderer } = require("electron");

function startCrawl() {
  //const url = prompt("Enter the URL to crawl:");
  let url = "https://www.shutterstock.com/search/iranian";
  url = "https://www.google.com/";
  url = "https://www.shutterstock.com/search/iranian";
  url = "https://unsplash.com/s/photos/iran";
  url = "https://www.varzesh3.com/";
  if (url) {
    ipcRenderer
      .invoke("start-crawl", url)
      .then((links) => {
        console.log("links", links);

        const outputDiv = document.getElementById("output");
        outputDiv.innerHTML = "<h3>Links Found:</h3>";
        const ul = document.createElement("ul");
        links.forEach((link) => {
          const li = document.createElement("li");
          li.textContent = link;

          ul.appendChild(li);
          const imx = document.createElement("img");
          imx.src = link;
          ul.appendChild(imx);
        });
        outputDiv.appendChild(ul);
      })
      .catch((error) => {
        console.error("Crawl failed");
      });
  }
}
