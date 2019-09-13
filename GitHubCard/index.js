const cards = document.querySelector('.cards');

function displayUserAndFollowers (username) {
  axios.get(`https://api.github.com/users/${username}`).then(function (res) {
    const userObj = res.data;
    console.log(res);
    cards.appendChild(cardFactory(userObj));

    axios.get(`https://api.github.com/users/${username}/followers`).then(function (res) {
      console.log(res.data);
      res.data.forEach((follower) => {
        axios.get(`https://api.github.com/users/${follower.login}`).then(function (res) {
          cards.appendChild(cardFactory(res.data));
        });
      });

    });

  }).catch(function (err) {
    console.log(err);
  });
}
displayUserAndFollowers('bvneilson');

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function cardFactory (data) {
  const card = document.createElement('div');
  const userImg = document.createElement('img');
  const cardInfo = document.createElement('div');
  const name = document.createElement('h3');
  const username = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const link = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');

  userImg.src = data.avatar_url;
  name.textContent = data.name;
  username.textContent = data.login;
  location.textContent = `Location: ${data.location}`;
  profile.textContent = 'Profile: ';
  link.href = data.html_url;
  link.textContent = data.html_url;
  link.target = '_blank';
  followers.textContent = `Followers: ${data.followers}`;
  following.textContent = `Following: ${data.following}`;
  bio.textContent = `Bio: ${data.bio}`;

  card.appendChild(userImg);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(username);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  profile.appendChild(link);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);

  card.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  username.classList.add('username');

  return card;
}
