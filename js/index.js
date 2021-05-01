const searchForm = document.getElementById("github-form");
const searchInput = document.getElementById("search");

searchForm.addEventListener("submit", (event) => {
event.preventDefault();
fetch(`https://api.github.com/search/users?q=${searchInput.value}`)
.then(function(response) {
return response.json();
}).then(function(result){
    renderPage(result);
})
})
function renderPage(user){
    user.items.forEach(element => {
    const ulUserList = document.getElementById("user-list");
    const imageUserList = document.createElement("img");
    const headerUserList = document.createElement("h1");
    const profileLink = document.createElement("a");
    profileLink.href = element.url;
    profileLink.textContent = element.url;
    headerUserList.innerText = element.login;
    imageUserList.src = element.avatar_url;
    ulUserList.appendChild(headerUserList);
    ulUserList.appendChild(imageUserList);
    ulUserList.appendChild(profileLink);
    const repoButton = document.createElement("button");
    repoButton.innerText = "Show Repositories";
    ulUserList.appendChild(repoButton);

    repoButton.addEventListener("click", (event)=>{
        event.preventDefault();
        fetch(`https://api.github.com/users/${element.login}/repos`)
        .then(function(response) {
        return response.json();
        }).then(function(result) {
        renderRepos(result);
        })
    })

    function renderRepos(repos){
        const ulRepoList = document.getElementById("repos-list");
        repos.forEach(element => {
        const liRepoList = document.createElement("li");
        const repoLink = document.createElement("a");
        repoLink.href = element.html_url;
        repoLink.innerText = element.html_url;
        liRepoList.appendChild(repoLink);
        ulRepoList.appendChild(liRepoList);
        })
    }


    })}
