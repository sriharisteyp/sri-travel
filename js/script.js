$(document).ready(function () {
    $.ajax({
        url: "https://traveller.talrop.works/api/v1/places/categories/",
        success: function (response) {
            let categories = response.data;
            let categories_html = "";
            categories.forEach((category) => {
                categories_html += `<li>
                <a href="#">
                    <img
                        class="rest"
                        src="${category.image}"
                        alt="${category.name}"
                    />
                    <span>${category.name}</span>
                </a>
            </li>`;
            });

            $("div.head ul").append(categories_html);
        },
    });


})
var askPrompt;

var button = document.getElementById("install-button");

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").then(function () {
        console.log("Service worker registered!");
    });
}

const installApp = () => {
    if (askPrompt) {
        askPrompt.prompt();
        askPrompt.userChoice.then((result) => {
            console.log(result.outcome);
            if (result.outcome === "dismissed") {
                console.log("User dismissed");
            } else {
                console.log("installed");
            }

            askPrompt = null;
        });
    }
};

button.addEventListener("click", installApp);

window.addEventListener("beforeinstallprompt", (event) => {
    console.log("before install prompt triggered");
    askPrompt = event;
    event.preventDefault();
    button.style.display = "block";
});
