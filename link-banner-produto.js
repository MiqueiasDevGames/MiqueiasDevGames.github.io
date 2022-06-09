
function tirarEscapeXml(unsafe) {
    return unsafe
         .replace(/&amp;/g, " ")
         .replace(/&lt;/g, " ")
         .replace(/&gt;/g, " ")
         .replace(/&quot;/g, " ")
         .replace(/&#039;/g, " ");
 }       
       
var mytxturls = tirarEscapeXml(txtfims);
          
 document.getElementById('socialsoul-link-id').setAttribute('href','https://www.economizaplay.com.br/produto?produto=barato&page=0&buscando=true&busca=' + mytxturls);