exports.getPageFooter = (eleventy, data) => {

  const date_ob = new Date();
  const date = ("0" + date_ob.getDate()).slice(-2);
  const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  const year = date_ob.getFullYear();
  const hours = date_ob.getHours();
  const minutes = date_ob.getMinutes();
  const seconds = date_ob.getSeconds();
  
  return `
    <footer class="main-footer">
    <a href="https://www.vhs-oberberg.de"><img src="/assets/images/sat_40_OBK_vhs_SW.png" alt="Logo VHS Oberberg"></a>
      <ul class="footer-links">
        <li><a href="/ueber-das-projekt/">Über das Projekt</a></li>
        <li><a href="/impressum">Impressum</a></li>
        <li><a href="/datenschutzerklaerung">Datenschutzerklärung</a></li>
      </ul>
      <br>
      <a href="javascript:UC_UI.showSecondLayer();">Cookie-Einstellungen</a>
    </footer>
  `;
};
 /* hinter </ul> einfügen
 <small>${date}.${month}.${year} // ${hours}:${minutes}:${seconds}</small>*/