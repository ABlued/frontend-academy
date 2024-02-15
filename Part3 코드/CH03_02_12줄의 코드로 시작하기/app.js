const container = document.getElementById('root');
let ajax = new XMLHttpRequest();
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

function getData(url) {
  ajax.open('GET', url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

function newsFeed() {
  const newsList = [];
  const newsFeed = getData(NEWS_URL);

  newsList.push('<ul>');
  for (let i = 0; i < 10; i++) {
    newsList.push(`
    <li>
      <a href="#${newsFeed[i].id}">${newsFeed[i].title} (${newsFeed[i].comments_count})</a>
    </li>
  `);
  }
  newsList.push('</ul>');

  container.innerHTML = newsList.join('');
  container.appendChild(content);
}

function newsDetail() {
  const id = location.hash.substring(1);

  const newsContent = getData(CONTENT_URL.replace('@id', id));
  container.innerHTML = '';
  container.innerHTML = `
    <h1>${newsContent.title}</h1>
    <div>
      <a href="#">목록으로</a>
    </div>
  `;
}

function router() {
  const routePath = location.hash;
  if (routePath === '') {
    newsFeed();
  } else {
    newsDetail();
  }
}

window.addEventListener('hashchange', router);
router();
