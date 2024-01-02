const frontMatterData = {
    title: "ARlebnispfade Oberberg",
    layout: "overview",
};

class Overview {

    data() {
      return frontMatterData;
    }

    createOverview(collection) {
      const overviewItems = collection.map((item) => {
        const contentUrl = this.getContentUrl(item.url);
        const imageUrl = `${contentUrl}images/${item.data.image}`;
        return `<li style="background-image: url(${imageUrl})"><a data-js-action-on-touch="fade" href="${contentUrl}"><p class="title">${item.data.title}</p></a></li>`;
      });

      return `
        <ul class="item-list">
          ${overviewItems.join("\n")}
        </ul>`;
    }
  
    render(data) {
      const pathOverview = this.createOverview(data.collections.pathes);
      return `
        ${pathOverview}
      `;
    }
  }
  
module.exports = Overview;