let loader = {};

//window.top.loader = loader;

loader.show = async function (color, speed, text) {
  if (!color) {
    color = `#000000`;
  } else {
    const regexRule = /(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\)/gi;
    let match = color.match(regexRule);
    if (!match) {
      color = `#000000`;
    } else {
      color = match[0];
    }
  }

  if (!speed) {
    speed = 2;
  }

  /* Set the style */
  let css = "";
  css += `.centered{
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -6.25em;
    margin-left: -6.25em;
    z-index: 20;
  }`;
  css += `.loader{
    border:10px solid #f3f3f3;
    border-top:10px solid ${color};
    margin: auto;
    animation: spin ${speed}s linear infinite;
    width:100px;
    height:100px;
    border-radius:50%;
    opacity: 1.0;
  }`;
  css += `.textDiv{
  text-align: center;
  margin-top: 0.5em;
  padding: 0.5em;
  border-radius:0.25em;
  /*border: solid 1px black;*/
  background-color: #71836b;
  color: white;
  }`;
  css += `.background{
    background-color: #414141;
    opacity: 0.5;
    width:100%;
    height:100%;
    left: 0;
    top: 0;
    position: fixed;
    z-index: 10;
  }`;
  css += `@keyframes spin{
    0% { transform: rotate(0deg); }
    100% {transform: rotate(360deg);}
  }`;

  // take the css style from crm webresource
  //let loaderCssWebResource =await axios.get(`https://luxtest.luxshare-ict.com//WebResources/lux_loader.css`);
  let style = document.createElement("style");
  //style.innerHTML = loaderCssWebResource.data;
  style.innerHTML = css;
  style.id = "loaderStyleId";
  document.head.appendChild(style);
  //========================
  // recommend to add window.top
  let topBody = document.body;
  let bodyContent = topBody.innerHTML;

  let backgroundDiv = document.createElement("div");
  backgroundDiv.setAttribute("id", "backgroundDiv");
  backgroundDiv.classList.add("background");
  topBody.appendChild(backgroundDiv);

  let loaderDiv = document.createElement("div");
  loaderDiv.setAttribute("id", "loaderDiv");
  loaderDiv.classList.add("centered");

  let spinner = document.createElement("div");
  spinner.classList.add("loader");
  loaderDiv.appendChild(spinner);

  if (text) {
    let textDiv = document.createElement("div");
    textDiv.innerText = text;
    textDiv.classList.add("textDiv");
    loaderDiv.appendChild(textDiv);
  }

  topBody.appendChild(loaderDiv);
};

loader.close = function () {
  let doc = document;
  let removeDiv = doc.getElementById("loaderDiv");
  removeDiv.remove();
  let backgroundDiv = doc.getElementById("backgroundDiv");
  backgroundDiv.remove();
  let loaderStyleId = doc.getElementById("loaderStyleId");
  loaderStyleId.remove();
};

export default loader;