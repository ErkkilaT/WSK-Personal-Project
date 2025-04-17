export const createUserDiv = (username) => {
  const div = document.createElement('div');

  const name = document.createElement('p');
  name.append(document.createTextNode(username));

  const profileButton = document.createElement('button');
  profileButton.append(document.createTextNode('Profile'));
  profileButton.addEventListener('click', () => {
    location.href = './account/profile.html';
  });

  const logOutButton = document.createElement('button');
  logOutButton.append(document.createTextNode('Logout'));
  //logOutButton.setAttribute('id', 'logout-button');
  logOutButton.addEventListener('click', () => {
    localStorage.removeItem('token');
    location.reload();
  });

  div.append(name, profileButton, logOutButton);
  return div;
};
