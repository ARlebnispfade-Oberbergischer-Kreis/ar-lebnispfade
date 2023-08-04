const fs = require('fs');
const documentHeader = require('./components/head.11ty');
const pageHeader = require('./components/page-header.11ty');

const getData = (collections, pattern) => collections.filter((item) => {
  const {url} = item;
  const extendedPattern = `${pattern}/.*[a-zA-Z0-9]/`;
  return url.match(extendedPattern);
});

const createPathItems = (pathData) => {

  /*const overviewItems = collection.map((item) => {
    const contentUrl = this.getContentUrl(item.url);
    const imageUrl = `${contentUrl}images/${item.data.image}`;
    return `<li style="background-image: url(${imageUrl})"><a href="${contentUrl}">${item.data.title}</a></li>`;
  });*/

  const POIs = pathData.map((poi) => {
    const {data} = poi;
    if(data.status === 'hidden') return '';
    if(data.status === 'hidden') return '';

    console.log(data.type, poi.url);

    const contentUrl = this.getContentUrl(poi.url);
    const imageUrl =  poi.url.replace(/\/$/, '.jpg'); //`${contentUrl.replace(/(.*)\//, RegExp.$1)}.jpg`;

    return `<li style="background-image: url(${imageUrl})"><a href="${contentUrl}">${poi.data.title}</a></li>`;
  });

  return `
    <ul class="item-list">
      ${POIs.join("\n")}
    </ul>`;
}

exports.render = function (data) {
  const pathData = getData(data.collections.sorted, data.page.fileSlug);
  const documentHead = documentHeader.getHeader(this, data);
  const pageHead = pageHeader.getPageHeader(this, data);
  const pathItems = createPathItems(pathData);

  return `<!doctype html>
  <html lang="de">
    ${documentHead}
    <body>
      ${pageHead}
      <main>
        ${pathItems}
      </main>
    </body>
  </html>`;
};
