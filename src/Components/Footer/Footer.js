import { clearPage } from '../../utils/render';

const Footer = () => {
    clearPage();
    renderFooter();
    renderFooterAboutUs();
};

function renderFooter() {
    const footer = document.querySelector('footer');
    footer.className = 'bg-secondary py-2 text-center';

    // Create card elements
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';

    const toggleButtonCard = createCardButton('About', 'toggle-button', 'btn-secondary');
    const aboutCardBody = createCardText('', 'pAbout');

    cardContainer.appendChild(toggleButtonCard);
    cardContainer.appendChild(aboutCardBody);

    footer.appendChild(cardContainer);
}

function createCardButton(text, id, className) {
    const button = document.createElement('button');
    button.textContent = text;
    button.id = id;
    button.className = `btn ${className}`;
    return button;
}

function createCardText(text, id) {
    const cardBody = document.createElement('div');
    cardBody.className = `card-body`;

    const p = document.createElement('p');
    p.id = id;
    p.textContent = text;

    cardBody.appendChild(p);
    return cardBody;
}

function renderFooterAboutUs() {
    const toggleButton = document.getElementById('toggle-button');
    const pAbout = document.getElementById('pAbout');

    toggleButton.addEventListener('click', () => {
        if (toggleButton.textContent === 'About') {
            toggleButton.textContent = 'Back';
            pAbout.textContent = 'Welcome to the epic world of PixelQuest! Embark on a thrilling adventure, explore magical lands, defeat powerful foes, and uncover the secrets of a rich and immersive storyline.'
        } else {
            toggleButton.textContent = 'About';
            pAbout.textContent = '';
        }
    });
}



export default Footer;
