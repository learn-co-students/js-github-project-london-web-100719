const ENDPOINT = 'https://api.github.com/';
const SEARCH_ENDPOINT = ENDPOINT + 'search/';
const SEARCH_USERS = SEARCH_ENDPOINT + 'users?q=';
const USER_REPOS = (username) => {

	return `${ENDPOINT}users/${username}/repos`

};

const searchSubmitButton = document.querySelector('input[type="submit"]');
const searchInput = document.querySelector('input[type="text"]');
const userList = document.querySelector('#user-list');
const reposList = document.querySelector('#repos-list');

const headers = {

	"Content-Type": "application/json",
	"Accept": "application/vnd.github.v3+json"

};

searchSubmitButton.addEventListener('click', (event) => sendSearchRequest(event));

const sendSearchRequest = (event) => {

	event.preventDefault();
	console.log(searchInput.value);

	fetch(SEARCH_USERS + searchInput.value)
	.then(res => res.json())
	.then(res => res.items.forEach(createUserCard))
	.then(searchInput.value = '')
	.catch(error => console.log(error))

}

const createUserCard = (userData) => {

	const div = document.createElement('li');
	const checkbox = document.createElement('input')
	const name = document.createElement('label');
	const avatar = document.createElement('img');
	const repos = document.createElement('div');

	checkbox.type = 'checkbox';
	// checkbox.style.display = 'none';
	checkbox.id = `collapsible${userData.id}`;
	checkbox.className = 'toggle';
	name.className = 'lbl-toggle';
	div.className = 'user-card';
	repos.className = 'collapsible-content';

	name.htmlFor = `collapsible${userData.id}`;

	avatar.src = userData.avatar_url;

	name.textContent = userData.login;

	checkbox.addEventListener('change', function() {

		if (this.checked) {

			fetchUserRepos(userData, repos);

		}

	});

	div.append(checkbox, name, repos, avatar)
	userList.append(div)

	// 1. avatar_url
	// 2. html_url
	// 3. login
	// 4. repos_url



}

const fetchUserRepos = (userData, repos) => {

	// console.log(userData.repos_url);
	const ul = document.createElement('ul')

	fetch(userData.repos_url)
	.then(res => res.json())
	.then(res => res.forEach( (element, index) => {

		if (index < 11) {

			const li = document.createElement('li');
			const a = document.createElement('a');
	
			a.textContent = element.name;
			a.href = element.html_url;
			a.target = '_blank';
			li.append(a);
			ul.append(li);

		};

	}))

	// const li1 = document.createElement('li')
	// const li2 = document.createElement('li')
	// const li3 = document.createElement('li')
	// const li4 = document.createElement('li')

	// li1.textContent = 'placeholder'
	// li2.textContent = 'placeholder'
	// li3.textContent = 'placeholder'
	// li4.textContent = 'placeholder'

	// ul.append(li1, li2, li3, li4)

	repos.append(ul);

}

// AFTER THAT I WANT TO DO A GET REQUEST TO SEARCH_USERS WITHT THE FORM DATA

// IF ITS A VALID RESPONSE I WANT TO BUILD MY USERS' CARDS AS LIs IN userList

// I WANT TO ADD AN EVENT LISTENER TO EACH USER CARD THAT WHEN CLICKED
// RETURNS THE USER'S REPOS

// DISPLAY THOSE REPOS IN THE CARD AS LINKS IN A UL

