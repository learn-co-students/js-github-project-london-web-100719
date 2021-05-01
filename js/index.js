document.addEventListener("DOMContentLoaded", function() {
    
    formListener()

  
});

// API
const get = url => fetch(url, {
    method: "GET",
    headers: headers
}).then(resp => resp.json())
const headers = {
                "Content-Type": "application/json",
                Accept: "application/vnd.github.v3+json"
              }
// const
const URL_USERS = "https://api.github.com/search/users?q="
const URL_REPOS = "https://api.github.com/users/"


// functions

function formListener(){
    const searchForm = document.getElementById("github-form")
    searchForm.addEventListener('submit', renderUserList )
}

function renderUserList(){
    const searchInfo = document.getElementById("search")
    event.preventDefault()
    const searchValue = searchInfo.value
    get(URL_USERS + `${searchValue}`)
    .then(users => users.items.forEach( addUser ))
    .catch(error => console.log(error))
}

function addUser(user){
    const ulList = document.getElementById("user-list")
    const li = createElementWith("li")
    const h5 = createElementWith("h3", "innerText", user.login )
    const avatar = createElementWith("img", "src", user.avatar_url)
    avatar.style.height = "50px"
    const p = createElementWith("p", "innerText", user.html_url)
    li.addEventListener(`click`, () => showRepos(user.login))
    li.append(h5, avatar, p)
    ulList.appendChild(li)
}

function showRepos(username){
    const repoUL = document.getElementById("repos-list")
    const header = createElementWith("h2", "innerText", `${username}'s Repos`)
    removeChildren(repoUL)
    repoUL.append(header)
    
    get(`${URL_REPOS + username}/repos`)
    .then(repos => repos.forEach(addRepo, repoUL))
    .catch(console.log)
}

function addRepo(repo, ulEL){
    const repoUL = document.getElementById("repos-list")
    const li = createElementWith("li", "innerText", repo.name)
    repoUL.append(li)
}
// helper methods

function createElementWith(element, type, value, type1, value1){
        const newEl = document.createElement(element)
        newEl[type] = value
        newEl[type1] = value1
        return newEl
}
    
function removeChildren(element){
    element.querySelectorAll("*").forEach( (n) => n.remove()) 
}