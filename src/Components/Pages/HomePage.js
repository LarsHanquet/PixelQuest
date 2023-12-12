import { clearPage } from '../../utils/render';
import backgroundImage from '../../img/valley-background.jpg';
import Navigate from '../Router/Navigate';

function createRow(className, backgroundSize, content) {
    const row = document.createElement('div');
    row.className = `row ${className}`;

    const col = document.createElement('div');
    col.className = `${backgroundSize}`;
    col.appendChild(content);

    row.appendChild(col);
    return row;
}

function createPlayDiv(buttonClassName, buttonSize, tableLines) {
    const playDiv = document.createElement('div');
    playDiv.className = 'game-play p-4';

    const h2 = document.createElement('h2');
    h2.textContent = 'Join our adventure';
    h2.className = 'mb-4';

    const button = document.createElement('button');
    button.className = `btn btn-light btn-lg ${buttonClassName} mb-3`;
    button.textContent = 'PLAY';
    button.style.fontFamily = 'Press Start 2P';

    button.addEventListener('click', () => {
        Navigate('/game');
    });

    playDiv.appendChild(h2);
    playDiv.appendChild(button);

    const tableResponsive = document.createElement('div');
    tableResponsive.className = `table-responsive pt-5 ${buttonSize}`;

    const table = document.createElement('table');
    table.id = 'table-scores';
    table.className = 'table table-bordered table-hover';

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th scope="col">Players</th>
            <th scope="col">Highscores</th>
        </tr>
    `;

    const tbody = document.createElement('tbody');
    tbody.innerHTML = tableLines;

    table.appendChild(thead);
    table.appendChild(tbody);
    tableResponsive.appendChild(table);

    playDiv.appendChild(tableResponsive);

    return playDiv;
}

const renderPlayAndScores = (scores) => {
    const tableLinesAsString = getAllTableLinesAsString(scores);
    const main = document.querySelector('main');

    main.className = 'flex-grow-1 text-center';
    main.style.backgroundImage = `url('${backgroundImage}')`;
    main.style.backgroundRepeat = 'no-repeat';
    main.style.backgroundSize = 'cover';
    main.style.width = '100%';
    main.style.minHeight = '83vh';

    const row = createRow('bg-image', 'fill', getLayoutForScreens(tableLinesAsString));

    main.appendChild(row);
};

function getLayoutForScreens(tableLines) {
    return createPlayDiv('btn-play', 'col-lg-4', tableLines);
}

function getAllTableLinesAsString(scores) {
    return (scores || [])
        .map((score) => `<tr><td>${score.player}</td><td>${score.highscore}</td></tr>`)
        .join('');
}

const HomePage = () => {
    clearPage();

    fetch(`${process.env.API_BASE_URL}/scores`)
        .then((response) => {
            if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
            return response.json();
        })
        .then((scores) => {
            // eslint-disable-next-line no-console
            console.log('Scores:', scores);
            renderPlayAndScores(scores);
        })
        .catch((err) => {
            // eslint-disable-next-line no-console
            console.error('HomePage::error: ', err);
        });
};

export default HomePage;
