import { clearPage } from '../../utils/render';
import backgroundImage from '../../img/valley-background.jpg';
import Navigate from '../Router/Navigate';
import Navbar from '../Navbar/Navbar';
import { setAuthenticatedUser } from '../../utils/auths';

const Register = () => {
  clearPage();
  renderGoBackHomeButton();
  setupRegisterForm();
};

function renderGoBackHomeButton() {
  const main = document.querySelector('main');
  const registerForm = `
  <div class="container">
    <div class="row justify-content-center p-5">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            Register
          </div>
          <div class="card-body" id="card-id">
            <p> Already part of the adventure ? <a id="loginLink" href="/login" data-uri="/login">Login</a>.</p>
            <form>
              <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" placeholder="Username" required>
              </div>
              <div class="form-group">
                <label for="password">Mot de passe</label>
                <input type="password" class="form-control" id="password" placeholder="Password" required>
              </div>
              <button type="submit" class="btn btn-dark">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center p-5">
      <div class="col-md-6">
        <button type="button" class="btn btn-outline-light mt-3" id="goBackBtn href="/" data-uri="/"">
          Go Back Home
        </button>
      </div>
    </div>
  </div>`;

  main.innerHTML += registerForm;
  main.className = 'flex-grow-1 text-center';
  main.style.backgroundImage = `url('${backgroundImage}')`;
  main.style.backgroundRepeat = 'no-repeat';
  main.style.backgroundSize = 'cover';
  main.style.width = '100%';
  main.style.minHeight = '85vh';
}

function setupRegisterForm() {
  const registerForm = document.querySelector('form');
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get data from form fields
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Construct the data object
    const formData = {
      username,
      password,
    };

    try {
      // Send a POST request to your API endpoint
      const response = await fetch('http://localhost:3000/auths/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      // Handle the response from the server
      const authenticatedUser = await response.json();
      // eslint-disable-next-line no-console
      console.log('Newly registered user :', authenticatedUser);

      setAuthenticatedUser(authenticatedUser);
      Navbar();

      // Redirect to the home page
      Navigate('/');

    } catch (error) {
      // Handle errors
      // eslint-disable-next-line no-console
      console.error('Error:', error);
      alert(error)
    }
  });
}

function alert(error) {
  const main = document.getElementById('card-id')
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-danger alert-dismissible" role="alert">`,
    `   <div>${error}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  main.append(wrapper)  
}

export default Register;
