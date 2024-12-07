import './index.css';

const backButton = document.getElementById("back-button");
const forwardButton = document.getElementById("forward-button");
const reloadButton = document.getElementById("reload-button");
const searchButton = document.getElementById("search-button");
const newWindowButton = document.getElementById("new-window-button");
const newTabButton = document.getElementById("new-tab-button");
const goButton = document.getElementById("go");
const urlInputField = document.getElementById("url-input");
const webview = document.getElementById("webview");
const tabsContainer = document.getElementById("tabs-container");
//Color piacker 
const colorPicker = document.getElementById("color-picker");

colorPicker.addEventListener("input", (event) => {
  const selectedColor = event.target.value;
  document.body.style.backgroundColor = selectedColor;

  document.querySelector("#browser-tools").style.backgroundColor = selectedColor;
  document.querySelector("#tabs-container").style.backgroundColor = selectedColor;
});

let tabs = [];
let currentTabIndex = 0;

function handleUrl() {
  let url = "";
  const inputUrl = urlInputField.value;
  if (inputUrl.startsWith("http://") || inputUrl.startsWith("https://")) {
    url = inputUrl;
  } else {
    url = "http://" + inputUrl;
  }
  webview.src = url;
  tabs[currentTabIndex].url = url;
}

// Event Listeners
urlInputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleUrl();
  }
});

goButton.addEventListener("click", (event) => {
  event.preventDefault();
  handleUrl();
});

searchButton.addEventListener("click", () => {
  const url = "https://www.google.com";
  urlInputField.value = url;
  webview.src = url;
  tabs[currentTabIndex].url = url;
});

backButton.addEventListener("click", () => {
  webview.goBack();
});

forwardButton.addEventListener("click", () => {
  webview.goForward();
});

reloadButton.addEventListener("click", () => {
  webview.reload();
});

webview.addEventListener("did-navigate", (event) => {
  const url = event.url;
  urlInputField.value = url;
  tabs[currentTabIndex].url = url;
});

// New Tab Functionality
newTabButton.addEventListener("click", () => {
  const tab = {
    title: `Tab ${tabs.length + 1}`,
    url: "about:blank",
  };
  tabs.push(tab);
  renderTabs();
  switchToTab(tabs.length - 1);
});
newWindowButton.addEventListener("click",()=>{
    api.newWindow();
    
})
// Render Tabs
function renderTabs() {
  tabsContainer.innerHTML = "";
  tabs.forEach((tab, index) => {
    const tabElement = document.createElement("div");
    tabElement.textContent = tab.title;
    tabElement.className = `tab ${index === currentTabIndex ? "active" : ""}`;
    tabElement.addEventListener("click", () => switchToTab(index));
    tabsContainer.appendChild(tabElement);
  });
}

// Switch Tabs
function switchToTab(index) {
  currentTabIndex = index;
  const tab = tabs[index];
  urlInputField.value = tab.url;
  webview.src = tab.url;
  renderTabs();
}

// Initialize with the first tab
tabs.push({ title: "Tab 1", url: "about:blank" });
renderTabs();

