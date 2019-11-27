// API
const API_ENDPOINT = "https://api.github.com"

const handleHTTPRequest = (url, callback, configObj = {}) => {
  return fetch(url, configObj)
    .then(resp => resp.json())
    .then(json => callback(json))
    .catch(error => console.error(error))
}

const generateConfig = (method, body) => {
  return configObj = {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.github.v3+json"
    },
    body: JSON.stringify(body)
  }
}

// Page Elements
const githubForm = document.querySelector("#github-form")
const searchText = document.querySelector("#search")
const userList = document.querySelector("#user-list")
const reposList = document.querySelector("#repos-list")

// Event Functions
githubForm.addEventListener("submit", () => { handleSubmit() })

// Render Functions
const handleSubmit = () => {
  event.preventDefault()
  const searchUrl = API_ENDPOINT + `/search/users?q=${searchText.value}`
  return handleHTTPRequest(searchUrl, renderUsers, generateConfig("GET"))
}

const renderUsers = (users) => {
  return users.items.forEach(user => {
    const li = document.createElement("li")
    li.innerText = user.login
    li.addEventListener("click", () => handleSelectUser(user))
    userList.append(li)
  })
}

const handleSelectUser = (user) => {
  const userRepoUrl = API_ENDPOINT + `/users/${user.login}/repos`
  return handleHTTPRequest(userRepoUrl, renderRepos, generateConfig("GET"))
}

const renderRepos = (repos) => {
  reposList.innerHTML = ''
  return repos.forEach(repo => {
    const li = document.createElement("li")
    const a = document.createElement("a")
    a.innerText = repo.full_name
    a.href = repo.html_url
    a.target = "_blank"
    li.append(a)
    reposList.append(li)
  })
}

// Helper Functions