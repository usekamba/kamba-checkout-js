function ready (fn)
{
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(function(){
    //Style for button Pay with Kamba - Merchant
    const btnOpenWidgetKamba = document.querySelector(".btnOpenWidgetKamba");
    btnOpenWidgetKamba.innerHTML = "Pagar com Kamba";
    const imgButtonKamba = document.createElement("img");
    imgButtonKamba.src="https://image.ibb.co/mFZUTz/Pay_Logo_kamba.png";
    imgButtonKamba.classList.add("classImgButtonKamba");         
    btnOpenWidgetKamba.appendChild(imgButtonKamba);
    
    const classImgButtonKamba = document.querySelector(".classImgButtonKamba");
    classImgButtonKamba.style.width = '25%';
    classImgButtonKamba.style.marginLeft = '0.5rem';
      
    btnOpenWidgetKamba.style.backgroundImage = 'linear-gradient(to left, #00FFB3, #00ff5f)';
    btnOpenWidgetKamba.style.border = 'none';
    btnOpenWidgetKamba.style.padding = '0.5rem';
    btnOpenWidgetKamba.style.cursor = 'pointer';
    btnOpenWidgetKamba.style.fontSize = '1rem';
    btnOpenWidgetKamba.style.borderRadius = '0.3rem';
    btnOpenWidgetKamba.style.fontFamily = "'Montserrat', sans-serif";
    btnOpenWidgetKamba.style.display = 'flex';
    btnOpenWidgetKamba.style.justifyContent = 'center';
    btnOpenWidgetKamba.style.alignItems = 'center';
    btnOpenWidgetKamba.style.boxSizing = 'border-box';

});

(function () {
(function bootstrap() {
        'use strict'

        window.KAMBA = window.KAMBA || {};

        window.kamba = function kamba(api_config, checkout_config) {

            function ready (fn){
                if (document.readyState != 'loading') {
                    fn();
                } else {
                    document.addEventListener('DOMContentLoaded', fn);
                }
            }

            ready(function(){

                //modal template for post progress bar
                const mainKambaModalContainer = document.createElement("main");
                const kambaModalContainer = document.getElementsByTagName("body")[0].appendChild(mainKambaModalContainer);
                kambaModalContainer.classList.add("kambaModalProgressBarTemplate");
                const kambaModalProgressBarTemplate = document.querySelector('.kambaModalProgressBarTemplate');
                kambaModalProgressBarTemplate.style.width = '100vw';
                kambaModalProgressBarTemplate.style.height = '100%';
                kambaModalProgressBarTemplate.style.background = 'rgba(0,0,0,.25)';
                kambaModalProgressBarTemplate.style.position = 'fixed';
                kambaModalProgressBarTemplate.style.top = '0';
                kambaModalProgressBarTemplate.style.left = '0';
                kambaModalProgressBarTemplate.style.zIndex = '1000000000000000000000';
                kambaModalProgressBarTemplate.style.display = 'flex';
                kambaModalProgressBarTemplate.style.justifyContent = 'center';
                kambaModalProgressBarTemplate.style.alignItems = 'center';
                kambaModalProgressBarTemplate.style.boxSizing = 'border-box';
                kambaModalProgressBarTemplate.style.paddingRight = '1rem';
                kambaModalProgressBarTemplate.style.overflow = 'auto';
                kambaModalProgressBarTemplate.style.color = '#ffffff';

                let canvasKamba = document.createElement("canvas");
                canvasKamba.width="500";
                canvasKamba.height="200";
                canvasKamba.classList.add("myKambaCanvas");         
                kambaModalProgressBarTemplate.appendChild(canvasKamba);

                let canvas = document.querySelector('.myKambaCanvas');
                let context = canvas.getContext('2d');
                let al=0;
                let start=4.72;
                let cw=context.canvas.width/2;
                let ch=context.canvas.height/2;
                let diff;
                let bar=setInterval(kambaProgressBar,50);

                //Send - Post request
                let url;
                const token = 'Token ';
           
                if (api_config.environment == 'sandbox'){
                    url = "https://sandbox.usekamba.com/v1/checkouts/";
                }else{
                    url = "https://api.usekamba.com/v1/checkouts/";
                }

                fetch(url, {method: 'POST',
                    headers: {
                                'Content-Type': 'application/json',
                                'authorization': token.concat(api_config.api_key)
                            }, 
                    body:  JSON.stringify({
                            channel: checkout_config.channel,
                            currency: checkout_config.currency,
                            initial_amount: checkout_config.initial_amount,
                            notes: checkout_config.notes,
                            redirect_url_success: checkout_config.redirect_url_success,
                            payment_method: checkout_config.payment_method
                        })

                }).then(function(response) {

                  if(response.ok) {

                    response.json().then(data => {

                    kambaModalProgressBarTemplate.style.display = 'none';

                    //To transform
                    let initial_amount = new Number(data.initial_amount);
                    let total_amount = new Number(data.total_amount);

                    let dateConvert = new Date(data.expires_at);
                    let newDateConvert = [dateConvert.getDate(), dateConvert.getMonth(), dateConvert.getFullYear()].join('/')+' às '+[dateConvert.getHours(), dateConvert.getMinutes(), dateConvert.getSeconds()].join(':');

                    const mainKambaModalContainer = document.createElement("main");
                   
                    //Modal Container
                    var kambaModalContainer = document.getElementsByTagName("body")[0].appendChild(mainKambaModalContainer);
                    kambaModalContainer.classList.add("kambaModalContainer");
                    kambaModalContainer.style.width = '100vw';
                    kambaModalContainer.style.height = '100%';
                    kambaModalContainer.style.background = 'rgba(0,0,0,.25)';
                    kambaModalContainer.style.position = 'fixed';
                    kambaModalContainer.style.top = '0';
                    kambaModalContainer.style.left = '0';
                    kambaModalContainer.style.zIndex = '1000000000000000000000';
                    kambaModalContainer.style.display = 'flex';
                    kambaModalContainer.style.justifyContent = 'center';
                    kambaModalContainer.style.alignItems = 'center';
                    kambaModalContainer.style.boxSizing = 'border-box';
                    kambaModalContainer.style.paddingRight = '1rem';
                    kambaModalContainer.style.overflow = 'auto';

                    //Template
                    const kambaWidget = `

                    <div class="kambaModalWidget">

                        <header class="checkoutHeader">

                            <div class="securityPay">
                                        <div class="textSecurityPay"><img src="https://image.ibb.co/bxv8MK/icons8_lock_kamba.png" class="lock"> <span class="ps"> Pagamento seguro</span></div>
                                    </div>
                        </header>
                     
                        <section>

                            <article class="headerWidget">
                                
                                <div class="qrPart">

                                    <div class="detailQr">
                                        
                                        <div class="divSvg">
                                        
                                            <svg viewBox="0 0 670 670" preserveAspectRatio="xMidYMid meet" class="imgQr">
                                                    ${data.qr_code}
                                            </svg>

                                             <div class="textValidate">
                                                Válido até ${newDateConvert}
                                            </div>
                                        </div>

                                    </div>
                             
                                
                                </div>
            
                                <div class="partDetailPay">
                
                                    <div class="payDetail">

                                        <ul class="listProprietyProduct">
                                            <li class="nameProduct"><b> ${data.notes} </b></li>
                                            <li class="priceProduct"><b>${initial_amount.toLocaleString('pt-ao', {style: 'currency', currency: 'AKZ'})} </b></li>
                                        </ul>

                                        <ul class="listTotal">
                                            <li class="descriptionTotal"><b>TOTAL</b></li>
                                            <li class="priceTotal"><b>${total_amount.toLocaleString('pt-ao', {style: 'currency', currency: 'AKZ'})} </b></li>
                                        </ul>
                                    </div>

                                </div>                  
                                          
                            </article>
                            <article>

                                <div  class="descriptionKamba">

                                    <div class="helpKamba">

                                        <div class="optionHelpKamba1">
                                            Abra o aplicativo Kamba no seu telemóvel e digitalize o código de pagamento.
                                        </div>
                                    
                                        <div class="optionHelpKamba2">Não tem uma conta Kamba? <a href="https://usekamba.com/"  target="_blank" class="appLinkKamba"> Faça download do aplicativo.</a>
                                        </div>

                                    </div>
                                    
                                </div>
             
                            </article>
                            <footer class="footerKamba">
                                <div class="descritionKambaMerchant">Pagar <b> ${data.merchant.business_name} </b>
                                </div>
                                    
                                <div class="btnCloseWidgetKamba">
                                    Fechar
                                </div> 
                            </footer>

                        </section>
                    </div>`
                    kambaModalContainer.innerHTML = kambaWidget;
        
                    //Style Widget Modal
                    const kambaModalWidget = document.querySelector("main .kambaModalWidget");
                    kambaModalWidget.style.borderRadius = '0.2rem';
                    kambaModalWidget.style.overflow = 'auto';
                    kambaModalWidget.style.background = '#fff';
                    kambaModalWidget.style.width = '100%';
                    kambaModalWidget.style.height = '100%';
                    kambaModalWidget.style.position = 'absolute';
                    kambaModalWidget.style.fontFamily = "'Montserrat', sans-serif";
                    kambaModalWidget.style.fontSize = '0.85rem';
                    kambaModalWidget.style.boxShadow = '0 5px 8px 0 rgba(0,0,0,.2), 0 7px 20px 0 rgba(0,0,0,.10)';

                    //Header
                    const checkoutHeader = document.querySelector(".checkoutHeader");
                    checkoutHeader.style.padding = '1rem 0 0 1rem';
                
                    //Body
                    const headerWidget = document.querySelector(".headerWidget");
                    headerWidget.style.width = '100%';
                    headerWidget.style.float = 'left';
                    headerWidget.style.marginTop = '1rem';
                    headerWidget.style.background = 'white';

                    let securityPay = document.querySelector(".securityPay");
                    securityPay.style.marginRight = '1rem';
                    securityPay.style.float = 'right';

                    let textSecurityPay = document.querySelector(".textSecurityPay");
                    textSecurityPay.style.textDecoration = 'none';
                    textSecurityPay.style.display = 'flex';
                    textSecurityPay.style.justifyContent = 'center';
                    textSecurityPay.style.alignItems = 'center';
                    textSecurityPay.style.boxSizing = 'border-box';

                    let ps = document.querySelector(".ps");
                    ps.style.marginLeft = '0.2rem';
                    ps.style.color = '#666666';
                    ps.fontSize = '0.8rem';

                    let qrPart = document.querySelector(".qrPart");
                    qrPart.style.width = '100%';
                    qrPart.style.background = "#00ff5f";
                    qrPart.style.position = 'relative';

                    let detailQr = document.querySelector(".detailQr");
                    detailQr.style.width = '90%';
                    detailQr.style.float = 'left';
                    detailQr.style.background = 'white';
                    detailQr.style.boxSizing = 'border-box';
                    detailQr.style.textAlign = 'center';

                    let divSvg = document.querySelector(".divSvg");
                    divSvg.style.textAlign = 'center';
                    divSvg.style.padding = '0 1rem 1rem 1rem';
                    divSvg.style.width = '100%';

                    let imgQr = document.querySelector(".imgQr");
                    imgQr.style.width = '50%';
                    imgQr.style.height = '50%';
                    imgQr.style.textAlign = 'center';
                    imgQr.style.boxShadow = '0px 0px 5px #7f7f7f';
                    imgQr.style.padding = '0.5rem';
                    imgQr.style.borderRadius = '0.3rem';

                    let textValidate = document.querySelector(".textValidate");
                    textValidate.style.textAlign = 'center';
                    textValidate.style.fontSize = '0.72rem';
                    textValidate.style.marginTop = '1rem';
                    textValidate.style.float = 'left';
                    textValidate.style.width = '100%';

                    //Pay Detail
                    let partDetailPay = document.querySelector(".partDetailPay");
                    partDetailPay.style.width = '100%';
                    partDetailPay.style.float = 'left';
                    partDetailPay.style.background = 'white';

                    let payDetail = document.querySelector(".payDetail");
                    payDetail.style.width = '92%';
                    payDetail.style.float = 'left';
                    payDetail.style.margin = '1rem 1rem 0 1rem';

                    let listProprietyProduct = document.querySelector(".listProprietyProduct");
                    listProprietyProduct.style.width = '100%';
                    listProprietyProduct.style.listStyle = 'none';
                    listProprietyProduct.style.float = 'left';
                    listProprietyProduct.style.marginLeft = '0';
                    listProprietyProduct.style.paddingLeft = '0';
                    listProprietyProduct.style.background = 'white';

                    let nameProduct = document.querySelector(".nameProduct");
                    nameProduct.style.float = 'left';

                    let priceProduct = document.querySelector(".priceProduct");
                    priceProduct.style.float = 'right';

                    let listTotal = document.querySelector(".listTotal");
                    listTotal.style.width = '100%';
                    listTotal.style.listStyle = 'none';
                    listTotal.style.float = 'left';
                    listTotal.style.marginLeft = '0';
                    listTotal.style.paddingLeft = '0';
                    listTotal.style.background = 'white';
                    listTotal.style.borderBottom = '1px solid #D2CFCF';
                    listTotal.style.paddingBottom = '0.1rem';

                    let descriptionTotal = document.querySelector(".descriptionTotal");
                    descriptionTotal.style.float = 'left';

                    let priceTotal = document.querySelector(".priceTotal");
                    priceTotal.style.float = 'right';

                    let descriptionKamba = document.querySelector(".descriptionKamba");
                    descriptionKamba.style.width = '90%';
                    descriptionKamba.style.padding = '0 1rem';
                    descriptionKamba.style.textAlign = 'center';
                    descriptionKamba.style.float = 'left';

                    let helpKamba = document.querySelector(".helpKamba");
                    helpKamba.style.textAlign = 'center';

                    let optionHelpKamba1 = document.querySelector(".optionHelpKamba1");
                    optionHelpKamba1.style.fontSize = '0.735rem';

                    let optionHelpKamba2 = document.querySelector(".optionHelpKamba2");
                    optionHelpKamba2.style.marginTop = '0.75rem';
                    optionHelpKamba2.style.fontSize = '0.735rem';

                    let appLinkKamba = document.querySelector(".appLinkKamba");
                    appLinkKamba.style.textDecoration = 'none';
                    appLinkKamba.style.color = '#3399cc';

                    let footerKamba = document.querySelector(".footerKamba");
                    footerKamba.style.width = '90%';
                    footerKamba.style.float = 'left';
                    footerKamba.style.padding = '0 1rem';
                    footerKamba.style.marginTop = '1.5rem';

                    let descritionKambaMerchant = document.querySelector(".descritionKambaMerchant");
                    descritionKambaMerchant.style.float = 'left';

                    let btnCloseWidgetKamba = document.querySelector(".btnCloseWidgetKamba");
                    btnCloseWidgetKamba.title = 'Sair do pagamento';
                    btnCloseWidgetKamba.style.border = 'none';
                    btnCloseWidgetKamba.style.cursor = 'pointer';
                    btnCloseWidgetKamba.style.borderRadius = '0.3rem';
                    btnCloseWidgetKamba.style.float = 'right';
                    btnCloseWidgetKamba.style.color = 'red';

                    btnCloseWidgetKamba.onclick = function(){
                        kambaModalContainer.style.display = 'none';
                    };

                    //Button for Pay Kamba
                    document.querySelector(".btnOpenWidgetKamba").onclick = function(){
                        kambaModalContainer.style.display = 'flex';
                    };

                    

                    //Function Midia Query - MEDIUM and LARGE
                    function midiaMediumDivice(x) {
                        if (x.matches) { 
                             kambaModalWidget.style.width = '360px';
                             kambaModalWidget.style.height = '475px';
                             partDetailPay.style.width = '100%';
                             partDetailPay.style.float = 'left';
                             descritionKambaMerchant.style.float = 'left';
                             descriptionKamba.style.width = '91%';
                        }
                    }

                    let x = window.matchMedia("(min-width: 641px)")
                    midiaMediumDivice(x)
                    x.addListener(midiaMediumDivice)

                    });

                  } else {

                    response.json().then(data => {
                        
                        kambaModalProgressBarTemplate.style.display = 'none';
                        templateModalErrorPayKamba();
                        let textErrorKamba = document.querySelector(".textErrorKamba");           

                        if((typeof data.message !== 'undefined')){
                            textErrorKamba.innerHTML =  `<p>${data.errors[0].field}: ${data.errors[0].message}</p>`;
                        }
                        
                        if((typeof data.errors.code !== 'undefined')){
                        textErrorKamba.innerHTML =  `<p>${data.errors.message} </p>`;
                        }
                                 
                    });

                  }
                })
                .catch(function(error) {

                    kambaModalProgressBarTemplate.style.display = 'none';
                    templateModalErrorPayKamba();

                    let textErrorKamba = document.querySelector(".textErrorKamba");
                    textErrorKamba.innerHTML = "Verifique sua conexão com a internet, ela pode estar muito lenta";
                });
               


               function templateModalErrorPayKamba(){
                   const mainKambaModalContainer = document.createElement("main");
                   
                    //Modal Container
                    var kambaModalContainer = document.getElementsByTagName("body")[0].appendChild(mainKambaModalContainer);
                    kambaModalContainer.classList.add("kambaModalContainer");
                    kambaModalContainer.style.width = '100vw';
                    kambaModalContainer.style.height = '100%';
                    kambaModalContainer.style.background = 'rgba(0,0,0,.4)';
                    kambaModalContainer.style.position = 'fixed';
                    kambaModalContainer.style.top = '0';
                    kambaModalContainer.style.left = '0';
                    kambaModalContainer.style.zIndex = '1000000000000000000000';
                    kambaModalContainer.style.display = 'flex';
                    kambaModalContainer.style.justifyContent = 'center';
                    kambaModalContainer.style.alignItems = 'center';
                    kambaModalContainer.style.boxSizing = 'border-box';
                    kambaModalContainer.style.paddingRight = '1rem';
                    kambaModalContainer.style.overflow = 'auto';
                    kambaModalContainer.style.cursor = 'pointer';

                    kambaModalContainer.addEventListener('click', function(){
                    kambaModalContainer.style.display = 'none';
                    });

                    //Button for Pay Kamba
                    document.querySelector(".btnOpenWidgetKamba").onclick = function(){
                        kambaModalContainer.style.display = 'flex';
                    };

                    //Template
                    const kambaWidget = `

                    <div class="kambaModalWidget">
                        <section> 
                                <p class="textErrorKamba"></p>
                        </section>
                    </div>`
                    kambaModalContainer.innerHTML = kambaWidget;

                    //Style Widget Modal
                    var kambaModalWidget = document.querySelector("main .kambaModalWidget");
                    kambaModalWidget.style.borderRadius = '0.2rem';
                    kambaModalWidget.style.overflow = 'auto';
                    kambaModalWidget.style.background = '#fff';
                    kambaModalWidget.style.width = '65%';
                    kambaModalWidget.style.height = '35%';
                    kambaModalWidget.style.position = 'absolute';
                    kambaModalWidget.style.fontFamily = "'Montserrat', sans-serif";
                    kambaModalWidget.style.fontSize = '0.95rem';
                    kambaModalWidget.style.boxShadow = '0 5px 8px 0 rgba(0,0,0,.2), 0 7px 20px 0 rgba(0,0,0,.10)';
                    kambaModalWidget.style.display = 'flex';
                    kambaModalWidget.style.justifyContent = 'center';
                    kambaModalWidget.style.alignItems = 'center';
                    kambaModalWidget.style.boxSizing = 'border-box';
                    kambaModalWidget.style.textAlign = 'center';
                    kambaModalWidget.style.padding = '1.5rem';
                    kambaModalWidget.style.color = 'red';


                    //Function Midia Query - MEDIUM
                    function midiaMediumDivice(x) {
                        if (x.matches) { 
                             kambaModalWidget.style.width = '40%';
                             kambaModalWidget.style.height = '30%';
                            
                        }
                    }

                    var x = window.matchMedia("(min-width: 641px)")
                    midiaMediumDivice(x)
                    x.addListener(midiaMediumDivice)

                    //Function Midia Query - LARGE
                    function midiaLargeDivice(x) {
                        if (x.matches) {   
                            kambaModalWidget.style.width = '25%';
                            kambaModalWidget.style.height = '30%';
                
                        } 
                    }

                    var x = window.matchMedia("(min-width: 1025PX)")
                    midiaLargeDivice(x)
                    x.addListener(midiaLargeDivice)
                
               }   
               
               //Function Kamba Progress Bar
               function kambaProgressBar()
               {
                    diff=(al/18)*Math.PI*2;
                    context.clearRect(0,0,400,200);
                    context.beginPath();
                    context.arc(cw,ch,38,0,2*Math.PI,false);
                    context.fillStyle='rgba(0,0,0,.1)';
                    context.fill();
                    context.strokeStyle='#00ff5f';
                    context.stroke();
                    context.fillStyle='#000';
                    context.strokeStyle='#e7f2ba';
                    context.fillStyle = '#fff';
                    context.textAlign='center';
                    context.lineWidth=5;
                    context.font = '11pt Verdana';
                    context.beginPath();
                    context.arc(cw,ch,38,start,diff+start,true);
                    context.stroke();
                    context.fillText('Kamba',cw+2,ch+6);
                    if(al>=100000000000000)
                    {
                        clearTimeout(bar);
                    }
                    
                    al++;
                }
               
            })  
        }
    })();
})();