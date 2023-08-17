const documentHeader = require('./components/head.11ty');
const pageHeader = require('./components/page-header.11ty');
const pageFooter = require('./components/page-footer.11ty');

exports.render = function (data) {
  const documentHead = documentHeader.getHeader(this, data);
  const pageHead = pageHeader.getPageHeader(this, data);
  const pageFoot = pageFooter.getPageFooter(this, data);

  return `<!doctype html>
  <html lang="de">
    ${documentHead}
    <body class="poi">
      ${pageHead}
      <main>
        <figure class="core-info">
          <img src="../images/${data.image}" alt="${data.title}">
          <figcaption>${this.markdown(data.info)}</figcaption>
        </figure>
      </main>
      ${pageFoot}
    </body>
  </html>`;
};
