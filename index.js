//Para teste 35809558 m
var IdSource = "";

//sourceId salva para usar
var query = location.search.slice(1);
var partes = query.split("&");
var data = {};
partes.forEach(function (parte) {
    var chaveValor = parte.split("=");
    var chave = chaveValor[0];
    var valor = chaveValor[1];
    data[chave] = valor;
});

if(data.sourceId != undefined){
 localStorage.setItem("sourceIDEcoPlay0001238", data.sourceId);
}
if(data.sourceid != undefined){
 localStorage.setItem("sourceIDEcoPlay0001238", data.sourceid);
}

if(data.id != undefined){
 localStorage.setItem("sourceIDEcoPlay0001238", data.id);
}
if(data.Id != undefined){
 localStorage.setItem("sourceIDEcoPlay0001238", data.Id);
}

if(localStorage.getItem("sourceIDEcoPlay0001238") == "undefined" ||
 localStorage.getItem("sourceIDEcoPlay0001238") == undefined){
 localStorage.setItem("sourceIDEcoPlay0001238", 37546834);
}
//Fim sourceID salva para usar



//FUNÇÕES UTEIS
//SEO URL
function ToSeoUrl(url) {
        
  // make the url lowercase         
  var encodedUrl = url.toString().toLowerCase(); 

  // replace & with and           
  encodedUrl = encodedUrl.split(/\&+/).join("-and-")

  // remove invalid characters 
  encodedUrl = encodedUrl.split(/[^a-z0-9]/).join("-");       

  // remove duplicates 
  encodedUrl = encodedUrl.split(/-+/).join("-");

  // trim leading & trailing characters 
  encodedUrl = encodedUrl.trim('-'); 

  return encodedUrl; 
}


// moeda brasileira
function moedaBRL(valor){
	return valor.toLocaleString('pt-br', {minimumFractionDigits: 2});
}

//FUNÇÕES UTEIS


if (data.produto != undefined) {
	

document.getElementById("Page-Produto").style.display = "block";


		setTimeout(function(){
    
				//Scroll até o Shopping
				//window.scrollTo(0, 300);			
				const element = document.querySelector('#ShoppingEconomizaPlay');
				const topPos = element.getBoundingClientRect().top + window.pageYOffset;

				window.scrollTo({
 					 top: topPos, // scroll so that the element is at the top of the view
					  behavior: 'smooth' // smooth scroll
				});
				
				},3000);


var offer_id = data.offerid;
var store_id = data.storeid;


//Paginas certas
var numero_salvo = data.page;
page_number = parseInt(numero_salvo, 10);	
page_number = page_number + 1;


//Busca Sitemap
var busca = "smartphone";
if (data.busca != undefined){
	busca = String(decodeURIComponent(data.busca));
}
//Busca Sitemap


//Api lomadee inicialize
var lomadee_api_setup;
//fim api lomadee inicialize

//Valor pagina para setar pagina
var valorDePage = page_number ;
//Total de pagina
var totalPage = 0;

//Para permitir buscar ou simplismente apresentar produto
var buscando = false;
if (data.buscando != undefined) {
buscando = true
}

//inicio
//Usando o sourceId armazenado
if(localStorage.getItem("sourceIDEcoPlay0001238") != undefined){
	IdSource = localStorage.getItem("sourceIDEcoPlay0001238");	
	
	lomadee_api_setup = {
		enviromnent : 'production', //sandbox ou production
		appToken : '1637850452838f7948983',
		sourceId : IdSource
	}
	
	
	//buscando true permite buscar por palavra
	if (buscando == false) {
		//Inicio
		CarregarProdutoID(false);
	}
	else {
		CarregarProdutoID(true);
		}
	
	}
	
	
	
	
	
	
	
	
//Para pré carregar imagem e impedir que a pagina
//fique lenta esperando
async function preLoadImg(imgURL, id) {
	
	for (i = 0; i < imgURL.length; i++){
	
		var myCategImgPre = new Image(48, 48);
		myCategImgPre.src = imgURL[i].thumbnail;
		myCategImgPre.setAttribute('class','imgErrorCateg'+i);
		myCategImgPre.setAttribute('itemprop','image');
		myCategImgPre.setAttribute('data-pin-description', imgURL[i].name );
		myCategImgPre.setAttribute('alt', imgURL[i].name );
		
		
		//envia a imagem
		document.getElementById(id + i).appendChild(myCategImgPre);
		
		document.querySelector('.imgErrorCateg'+i).addEventListener('error', function () {

			var div = document.createElement('div');
					div.classList.add('imgCategError');
					//div.innerText = '';
					this.replaceWith(div);
			});
   }
	
}






function CarregarProdutoID(buscando){
var query = '';
if (buscando == false) {
	query = '/offer/_id/'+offer_id+'?storeId='+store_id+'&sourceId=' + IdSource;
	
}
else {
	query = '/offer/_search?size=12&page=' + valorDePage + '&keyword='+busca+'&minPrice=300';
	
	}
	
	//Onde vai adicionar no DOM HTMl	
	var oferta_principal = document.getElementById("oferta_principal");
	var product_name = document.getElementById("product-name");
	


	lomadeeAPIv3.search(query, function (response) {
	
		var meuObject = response.offers;
		
		oferta_principal.innerHTML = '<div id="preCarregaImg'+0+'" class="img-product"></div>'
		
		//Alguns produtos não tem installment
		var prestacao = "";
		var installment = "";
		
		try {
		if (meuObject[0].installment.value != undefined) {
			installment = meuObject[0].installment.value;
		}
		var quantity = ""
		if (meuObject[0].installment.quantity != undefined) {
			quantity = meuObject[0].installment.quantity;			
			
			prestacao = 'Ou <b>'+quantity+'x de R$'+moedaBRL(installment);
		}
	}catch (errorRecurso) {
		prestacao = ""
		installment = "";
	}		
	
		
		product_name.innerHTML = '<br /><br /><span itemprop="description" class="name">'+meuObject[0].name+'</span><br /><br /><p class="store">'+meuObject[0].store.name+'</p><br /><!--Grid dentro de grid--><div class="my-grid-container x"><div class="my-grid-item alinhar-left"><p class="price"><span class="offer-label"> a partir de </span><strong itemprop="price" >R$ '+moedaBRL(meuObject[0].price)+'</strong></p><p class="prestacao">'+prestacao+'</b></p></div><div class="my-grid-item y"><a title="'+meuObject[0].name+'" target="_blank" href="'+meuObject[0].link+'"><div class="ofertaIrLoja">IR Á LOJA</div></a></div></div>'
		
	
		//Para carregar as imagem
		preLoadImg(meuObject, 'preCarregaImg');
		
		


		});	
		
		//Compare Preços
		ComparePrecos(busca);
			
		
		
}

//FIM PRINCIPAL OFERTAS



//Compare Preços
function ComparePrecos(busca) {
	
	//Spiner carregando
	var spiner = document.getElementById("carregaOfertasShowCupons2").style;
	spiner.display = 'block';	

	
	var query = '/offer/_search?size=12&page=' + valorDePage + '&keyword='+busca+'&minPrice=300';
	
	//Onde vai adicionar no DOM HTMl	
	var mydivconteudo = document.getElementById("listCompareProduct");
	
	lomadeeAPIv3.search(query, function (response) {
		
		var meuObject = response.offers;
	
		//Para o Smartphones baratos grid
		//Para deifinir qual pagina carregar
		//Caso clique em uma das ofertas da lista
		var my_page = valorDePage;
		totalPage = parseInt(response.pagination.totalPage, 10);
		if (totalPage >= valorDePage + 1) {
			my_page = valorDePage;
		}
		else {
				my_page = valorDePage - 1;
			}
			
	
	//Para carregar as informações dos produtos
	for (i = 0; i < meuObject.length; i++){
	
			var url_amigavel = ToSeoUrl(meuObject[i].name)	
	
	
			var mydiv = document.createElement('div');			
			mydiv.setAttribute('class','produtos item-center');
			
			
			var my_URL = 'https://www.economizaplay.com.br/produto?produto='+url_amigavel+'&offerid='+meuObject[i].id+'&storeid='+meuObject[i].store.id+'&sourceid='+IdSource+'&page='+my_page+'&busca=' + busca;
			
			
			mydiv.innerHTML = '<div id="preCarregaImgComp'+i+'" class="img-product"></div><div class="juntos-div"> <div class="loja">Na loja '+meuObject[i].store.name+'</div> <div class="descript-product"><p class="title-product">R$ '+moedaBRL(meuObject[i].price)+'</p><p class="descri-product">'+meuObject[i].name+'</p><p></p><p class="category-product"> <span></span></p></div><a class="btt-product" href="'+my_URL+'"><div class="faixa-product item-center">+ Detalhes</div></a></div>';
			
			
			
			mydivconteudo.appendChild(mydiv);
			}
			
		

				//Termina spiner carregamento
				spiner.display = 'none';	

			
				//Para carregar as imagem
				preLoadImg(meuObject, 'preCarregaImgComp');
				
			
		
	}, function(error){
				
				if(error.status != 404){
					//Problema no cliente, sem internet
				}
				else{
					//Problema no servidor
					
					spiner.display = "none";
					
					var link_amazon = 'https://www.amazon.com.br/gp/search?_encoding=UTF8&tag=economizaplay-20&linkCode=ur2&linkId=2cb135290c9a3a90333d7533f6acd4c2&camp=1789&creative=9325&keywords=' + busca;
					
					mydivconteudo.innerHTML = "<div class='amazon-txt item-center'><p><b>CONFIRA O PREÇO NA AMAZON</b></p></div><a  href='"+link_amazon+"' id='amazon-link-id' target='_blank'><div class='amazon-product'><div><img src=''/></div><div><p>"+busca+"</p></div><div><img height='110' src='https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhg-V7SR7dlGyXJktZ3dw1fSbtoic6nNOtD0Kq-Po58yd-OWaHfSAjuE5mCAfRbUzFtw6xIAs1z52SxcoI06n6gFTaAYw63X03CidTBzWXpxcy0ne87W8IWf6_7ON2xp3-lCjY3Qc2_apN1rV5hj-tVwv61HuMWl3LtY3GAjNUKPM1RL3w85WQaE9puLg/s16000/images.png'/></div></div>";
				
				}
			
		});	
	

}



}//data.produto != undefined Começa o Inicio
else {
	
document.getElementById("Page-Inicio").style.display = "block";



//Busca Sitemap
var busca = "smartphone";
if (data.busca != undefined){
	
	busca = String(decodeURIComponent(data.busca));
	
	
		setTimeout(function(){
				//Scroll até o Shopping
				//window.scrollTo(0, 300);			
				const element2 = document.querySelector('#shopping-ecoplay');
				const topPos2 = element2.getBoundingClientRect().top + window.pageYOffset;

				window.scrollTo({
 					 top: topPos2, // scroll so that the element is at the top of the view
					  behavior: 'smooth' // smooth scroll
				});
				
				},3000);
}
//Busca Sitemap


//Api lomadee inicialize
var lomadee_api_setup;
//fim api lomadee inicialize


//filtros para pagina
var filtro = 'rating';
//Valor pagina para setar pagina
var valorDePage = 1;
//Total de pagina
var totalPage = 0;


//inicio
//Usando o sourceId armazenado
if(localStorage.getItem("sourceIDEcoPlay0001238") != undefined){
	IdSource = localStorage.getItem("sourceIDEcoPlay0001238");	
	
	lomadee_api_setup = {
		enviromnent : 'production', //sandbox ou production
		appToken : '1637850452838f7948983',
		sourceId : IdSource
	}
	
	
//inicia o inicio
inicio();
//Fim, validado e usando sourceID ou não.


//setas
SetasPage();

}


//Para pré carregar imagem e impedir que a pagina
//fique lenta esperando
async function preLoadImg(imgURL) {
	
	for (i = 0; i < imgURL.length; i++){
	
		var myCategImgPre = new Image(48, 48);
		myCategImgPre.src = imgURL[i].thumbnail;
		myCategImgPre.setAttribute('class','imgErrorCateg'+i);
		
		//envia a imagem
		document.getElementById("preCarregaImg"+i).appendChild(myCategImgPre);
		
		document.querySelector('.imgErrorCateg'+i).addEventListener('error', function () {

			var div = document.createElement('div');
					div.classList.add('imgCategError');
					//div.innerText = '';
					this.replaceWith(div);
			});
   }
	
}


//Tecla Enter
//Para pegar a tecla enter, para o Buscar
const inputBuscasKey = document.getElementById("searchInicio");
inputBuscasKey.addEventListener('keyup', function(e){
var key = e.which || e.keyCode;
if(key == 13){
    inicio();

inputBuscasKey.blur();

}
});



//Para iniciar a pagina inicial
function inicio() {
	
	//Busca do input
if (document.getElementById("searchInicio").value != "") {
busca =  document.getElementById("searchInicio").value;
}
	
//Spiner carregando
var spiner = document.getElementById("carregaOfertasShowCupons").style;
spiner.display = 'block';	


//Fazer busca tradicional
var query = '/offer/_search?size=12&page=' + valorDePage + '&keyword='+busca+'&minPrice=300';

//Onde vai adicionar no DOM HTMl	
var mydivconteudo = document.getElementById("ofertas12");
removerConteudoDiv("mydivconteudo");

mydivconteudo.innerHTML = '<div style="width:90%;" align="left" id="ErrorBuscas"> <h4 style="color:steelblue;">Infelizmente não encontramos mais nenhum resultado.</h4> <br> <p>Sugestões:</p> <br> <ul> <li style="margin-bottom:5px;">Certifique-se de que nenhuma palavra contém erros ortográficos;</li> <li>Tente utilizar outras palavras chave.</li> </ul> </div>';
document.getElementById("ErrorBuscas").style.display = 'none';


		
	
lomadeeAPIv3.search(query, function (response) {
	
	var meuObject = response.offers;
	
	totalPage = response.pagination.totalPage;
	
	//Para carregar as informações dos produtos
	for (i = 0; i < meuObject.length; i++){
	
			var url_amigavel = ToSeoUrl(meuObject[i].name)	
	
	
			var mydiv = document.createElement('div');			
			mydiv.setAttribute('class','produtos item-center');
			
			var my_URL = 'https://www.economizaplay.com.br/produto?produto='+url_amigavel+'&offerid='+meuObject[i].id+'&storeid='+meuObject[i].store.id+'&sourceid='+IdSource+'&page=0&busca=' + busca;
			
			mydiv.innerHTML = '<div id="preCarregaImg'+i+'" class="img-product"></div><div class="juntos-div"><div class="descript-product"><p class="title-product">R$ '+moedaBRL(meuObject[i].price)+'</p><p class="descri-product">'+meuObject[i].name+'</p><p></p><p class="category-product"> <span></span></p></div><a class="btt-product" href="'+my_URL+'" ><div class="faixa-product item-center">+ Detalhes</div></a></div>';
			
			
			
			mydivconteudo.appendChild(mydiv);
			
		
	}
	
	
	//Termina spiner carregamento
	spiner.display = 'none';	
	
	
	//Para carregar as imagem
	preLoadImg(meuObject);
	
	

	

}, function(error){
				
				if(error.status != 404){
					//Problema no cliente, sem internet
				}
				else{
					//Problema no servidor
					
					spiner.display = "none";
					document.getElementById("ErrorBuscas").style.display = 'block';
				
				}
			
		});	
	
}



//Toda a configuração das setas de avançar e voltar pagina
var avancar = 1;
var voltar = 1;
function SetasPage() {

		avancar = valorDePage + 1;
			
		if(valorDePage > 1){
			voltar = valorDePage - 1;
		}
		else {
			voltar = 1;		
		}
		
		 removerConteudoDiv(document.getElementById("setasBusca"));
	
		
			var proximo = '<a id="next" class="next item-center" onclick="proximaPagina('+avancar+')"><i class="material-icons">forward</i></a>';
			var voltar = '<a id="prev" class="prev item-center" onclick="voltarPagina('+voltar+')"><i style="transform:rotate(180deg);" class="material-icons">forward</i></a>';
			
			//Setas de buscas e de compare preços
			document.getElementById("setasBusca").innerHTML = proximo + voltar;
			document.getElementById("next").style.display = "block";
			document.getElementById("prev").style.display = "block";
			
			
			window.scrollTo(0,0); 
}


function proximaPagina(number){
	
	if(totalPage >= number){
		valorDePage++;
		removerConteudoDiv(document.getElementById("ofertas12"));
	
		inicio();
		SetasPage();
}
	
}
function voltarPagina(number){
	
	if(valorDePage > 1){
	  removerConteudoDiv(document.getElementById("ofertas12"));
	
	  valorDePage--;
	  inicio();
	  SetasPage();
	 }
}


//Excluir conteudo de uma div
async function removerConteudoDiv(element){
	//Remove conteudo anterior
if(element.firstChild != null){
	while (element.hasChildNodes()) {

		element.removeChild(element.firstChild); 
							   
	}
}
	
}



}//Inicio
