    (function () {

	(function bootstrap() {
        'use strict'




        window.KAMBA = window.KAMBA || {};

        window.kamba = function kamba(initial_config, api_key) {

            function ready (fn){
                if (document.readyState != 'loading') {
                    fn();
                } else {
                    document.addEventListener('DOMContentLoaded', fn);
                }
            }

            ready(function(){

            //Send - Post request
            const url = 'https://kamba-api-staging.herokuapp.com/v1/checkouts/';
                fetch(url, {method: 'POST',
                    headers: {'Content-Type': 'application/json', 'authorization': api_key}, 
                    body:  JSON.stringify({
                            channel: initial_config.channel,
                            currency: initial_config.currency,
                            initial_amount: initial_config.initial_amount,
                            notes: initial_config.notes,
                            redirect_url_success: initial_config.redirect_url_success,
                            payment_method: initial_config.payment_method
                        })

                }).then(res => res.json()).then(data => {


             //create HTMl elements modal
            var mainKambaModalContainer = document.createElement("main");
           
            var btnCloseKamba = document.createElement("button");
            var subtitleKamba = document.createElement("h4");
            var notes = document.createElement("p");
            var initial_amount = document.createElement("p");
            var btnNextKamba = document.createElement("button");


            //Value
            btnCloseKamba.innerHTML = "Cancelar";
            subtitleKamba.innerHTML = "Faça seu pagamento com Kamba Hoje";
            notes.innerHTML = initial_config.notes;
            initial_amount.innerHTML = "Preço: "+ initial_config.initial_amount +" Kz";
            btnNextKamba.innerHTML = "Avançar";

            //Modal Container
            var kambaModalContainer = document.getElementsByTagName("body")[0].appendChild(mainKambaModalContainer);
            kambaModalContainer.classList.add("kambaModalContainer");
            kambaModalContainer.style.width = '100vw';
            kambaModalContainer.style.background = 'rgba(0,0,0,.4)';
            kambaModalContainer.style.position = 'absolute';
            kambaModalContainer.style.top = '0';
            kambaModalContainer.style.left = '0';
            kambaModalContainer.style.zIndex = '10000';
            kambaModalContainer.style.display = 'flex';
            kambaModalContainer.style.justifyContent = 'center';
            kambaModalContainer.style.alignItems = 'center';
            kambaModalContainer.style.boxSizing = 'border-box';
            kambaModalContainer.style.paddingLeft = '0';

            //Template
            const kambaWidget = `
            <div class="kambaModalWidget">

                <header class="checkoutHeader">
                     <div class="">
                        <img src="images/KambaLogoGreen-kamba.png" class="imgLogoKamba"> 
                    </div>

                    <a href="#" class="divPrint">
                        <img src="images/icons8-print-kamba.png" class="imgPrint">
                    </a>
                </header>
             
                <section>

                    <article class="headerWidget">
                        
                        <div class="qrPart">

                            <div class="detailQr">
                                
                                <div class="divSvg">
                                    <svg class="imgQr">${data.qr_code.svg}</svg>
                                </div>

                                <div class="textQr">
                                        <div class="textPrice">${data.total_amount} kzs</div>
                                        <div class="textValidate"><span class="right fsize-09 gray-bold">Válido até</span><br>05.06.2018 12:46 PM</div>
                                </div>
                            </div>
                     
                            <ul class="optionsQr">
                                <li><a href="#" class="itemQrCode">Fazer download do QR</a></li>
                                <li><a href="#" class="itemQrCode">Enviar por sms</a></li>
                                <li><a href="#" class="itemQrCode">Enviar por e-mail</a></li>
                            </ul>
                        </div>

                        
                        <div class="partDetailPay">
                            <div class="securityPay">
                                <a href="#" class="textSecurityPay"><img src="images/icons8-lock-kamba.png" class="lock"> <span class="ps">Pagamento seguro</span></a>
                            </div>


                            <div class="payDetail">
                                <h3>Detalhes do pagamento</h3>

                                <ul class="listProprietyProduct">
                                    <li class="nameProduct"><b>${data.notes}</b></li>
                                    <li class="priceProduct">kz ${data.initial_amount}</li>
                                </ul>

                                <ul class="listTotal">
                                    <li class="descriptionTotal"><b>TOTAL</b></li>
                                    <li class="priceTotal">kz ${data.total_amount}</li>
                                </ul>
                            </div>

                        </div>

                    </article>


                    <!--Second Article-->
                    <article class="secondCard">
                        
                        <div class="illustration">
                                <img src="images/illustration-kamba.png" class="imgIllustration">
                        </div>

                        
                        <div class="infoPay">

                            <form class="formInfoPay">    
                                    <h3>Informações do pagamento</h3>
                                    <p>Você está a pagar <b>${data.merchant.business_name}</b>, por <b>${data.notes}</b> no valor de <b>${data.initial_amount} kz</b></p>
                                    <input type="text" class="inputInfo" placeholder="E-mail que uso com a carteira"/><br>
                                    
                                    <input type="password" class="inputInfo" placeholder="Senha de confirmação"/><br>

                                    <input type="password" class="inputInfo" placeholder="PIN ou código de segurança"/><br>
                                    
                                    <div class="divPayKamba">
                                        <button class="btnPayKamba"><b>Clica para pagar com Kamba</b></button>
                                        <button class="btnCloseWidgetKamba"><b>Cancelar</b></button>
                                    </div>
                                        
                                   

                                    <div  class="descriptionKamba">
                                        <a href="#">O que é Kamba?</a>
                                    </div>
                            </form>
                            
                        </div>

                    </article>

                </section>

                <!-- FOOTER -->
                <footer>
                    
                </footer>
                 
                  
            </div>`
            kambaModalContainer.innerHTML = kambaWidget;


            //Style Widget Modal
            var kambaModalWidget = document.querySelector("main .kambaModalWidget");
            kambaModalWidget.style.marginRight = '1rem';
            kambaModalWidget.style.padding = '1rem';
            kambaModalWidget.style.background = '#f1f6f4';
            kambaModalWidget.style.width = '100%';
            kambaModalWidget.style.boxShadow = '0 0 0 5px white';
            kambaModalWidget.style.position = 'relative';
            kambaModalWidget.style.fontFamily = "'Montserrat', sans-serif";
            kambaModalWidget.style.fontSize = '0.95rem';

            //Header
            var checkoutHeader = document.querySelector(".checkoutHeader");
            checkoutHeader.style.width = '100%';
            checkoutHeader.style.float = 'left';
            

            var imgLogoKamba = document.querySelector(".imgLogoKamba");
            imgLogoKamba.style.float = 'left';
            imgLogoKamba.style.width = '7%';

            var imgPrint = document.querySelector(".imgPrint");
            imgPrint.style.float = 'right';
            imgPrint.style.width = '7%';
        
            //Body
            var headerWidget = document.querySelector(".headerWidget");
            headerWidget.style.width = '100%';
            headerWidget.style.float = 'left';
            headerWidget.style.boxShadow = '0px 0px 1px #7f7f7f';
            headerWidget.style.borderRadius = '0.4rem';
            headerWidget.style.marginTop = '1rem';
            headerWidget.style.background = 'white';

            var qrPart = document.querySelector(".qrPart");
            qrPart.style.width = '100%';
            qrPart.style.background = "#00ff5f";
            qrPart.style.position = 'relative';
            qrPart.style.float = 'left';

            var detailQr = document.querySelector(".detailQr");
            detailQr.style.width = '100%';
            detailQr.style.float = 'left';
            detailQr.style.background = 'white';
            detailQr.style.boxSizing = 'border-box';

            var divSvg = document.querySelector(".divSvg");
            divSvg.style.textAlign = 'center';
            divSvg.style.paddingTop = '1rem';

            var imgQr = document.querySelector(".imgQr");
            imgQr.style.width = '90%';
            imgQr.style.height = '15rem';

            var textQr = document.querySelector(".textQr");
            textQr.style.width = '100%';
            textQr.style.background = 'white';
            textQr.style.float = 'left';
            textQr.style.padding = '1rem';
            textQr.style.boxSizing = 'border-box';

            var textPrice = document.querySelector(".textPrice");
            textPrice.style.float = 'left';

            var textValidate = document.querySelector(".textValidate");
            textValidate.style.float = 'right';


            var optionsQr = document.querySelector(".optionsQr");
            optionsQr.style.width = '100%';
            optionsQr.style.float = 'left';
            optionsQr.style.listStyle = 'none';
            optionsQr.paddingTop = '2rem';
            optionsQr.position = 'relative';

            var optionsQrLi1 = document.querySelectorAll(".optionsQr li")[0];
            optionsQrLi1.style.float= 'left';

            var optionsQrLi2 = document.querySelectorAll(".optionsQr li")[1].style.paddingTop = '1.5rem';
            var optionsQrLi3 = document.querySelectorAll(".optionsQr li")[2].style.paddingTop = '1.5rem';

            var itemQr1 = document.querySelectorAll(".itemQrCode")[0];
            var itemQr2 = document.querySelectorAll(".itemQrCode")[1];
            var itemQr3 = document.querySelectorAll(".itemQrCode")[2];
            
            itemQr1.style.textDecoration = 'none';
            itemQr1.style.color = 'black';

            itemQr2.style.textDecoration = 'none';
            itemQr2.style.color = 'black';
            itemQr2.style.marginTop = '2rem';

            itemQr3.style.textDecoration = 'none';
            itemQr3.style.color = 'black';
            itemQr3.style.marginTop = '2rem';

            //Pay Detail
            var partDetailPay = document.querySelector(".partDetailPay");
            partDetailPay.style.width = '100%';
            partDetailPay.style.float = 'left';
            partDetailPay.style.background = 'white';

            var securityPay = document.querySelector(".securityPay");
            securityPay.style.marginRight = '1rem';
            securityPay.style.float = 'right';
            securityPay.style.marginTop = '1.5rem';

            var textSecurityPay = document.querySelector(".textSecurityPay");
            textSecurityPay.style.textDecoration = 'none';
            textSecurityPay.style.color = '#666666';
            textSecurityPay.fontSize = '0.8rem';

            var payDetail = document.querySelector(".payDetail");
            payDetail.style.width = '92%';
            payDetail.style.float = 'left';
            payDetail.style.margin = '1rem';

            var listProprietyProduct = document.querySelector(".listProprietyProduct");
            listProprietyProduct.style.width = '100%';
            listProprietyProduct.style.listStyle = 'none';
            listProprietyProduct.style.float = 'left';
            listProprietyProduct.style.marginLeft = '0';
            listProprietyProduct.style.paddingLeft = '0';
            listProprietyProduct.style.background = 'white';

            var nameProduct = document.querySelector(".nameProduct");
            nameProduct.style.float = 'left';

            var priceProduct = document.querySelector(".priceProduct");
            priceProduct.style.float = 'right';

            var listTotal = document.querySelector(".listTotal");
            listTotal.style.width = '100%';
            listTotal.style.listStyle = 'none';
            listTotal.style.float = 'left';
            listTotal.style.marginLeft = '0';
            listTotal.style.paddingLeft = '0';
            listTotal.style.background = 'white';

            var descriptionTotal = document.querySelector(".descriptionTotal");
            descriptionTotal.style.float = 'left';

            var priceTotal = document.querySelector(".priceTotal");
            priceTotal.style.float = 'right';

            //Second article

            var secondCard = document.querySelector(".secondCard");
            secondCard.style.width = '100%';
            //secondCard.style.height = '30rem';
            secondCard.style.float = 'left';
            secondCard.style.background = 'white';
            secondCard.style.marginTop = '1.5rem';
            secondCard.style.boxShadow = '0px 0px 1px #7f7f7f';
            secondCard.style.borderRadius = '0.3rem';

            var illustration = document.querySelector(".illustration");
            illustration.style.width = '40%';
            illustration.style.float = 'left';
            illustration.style.display = 'flex';
            illustration.style.justifyContent = 'center';
            illustration.style.alignItems = 'center';
            illustration.style.marginTop = '4rem';
            illustration.style.boxSizing = 'border-box';

            var imgIllustration = document.querySelector(".imgIllustration");
            imgIllustration.style.display = 'flex';
            imgIllustration.style.justifyContent = 'center';
            imgIllustration.style.alignItems = 'center';

            var divPayKamba = document.querySelector(".divPayKamba");
            divPayKamba.style.textAlign = 'center';

            var infoPay = document.querySelector(".infoPay");
            infoPay.style.boxSizing = 'border-box';
            infoPay.style.margin = '1rem';

            var inputInfo1 = document.querySelectorAll(".inputInfo")[0];
            var inputInfo2 = document.querySelectorAll(".inputInfo")[1];
            var inputInfo3 = document.querySelectorAll(".inputInfo")[2];

            inputInfo1.style.fontSize = '1rem';
            inputInfo1.style.padding = '0.5rem';
            inputInfo1.style.marginTop = '1rem';
            inputInfo1.style.width = '92%';

            inputInfo2.style.fontSize = '1rem';
            inputInfo2.style.padding = '0.5rem';
            inputInfo2.style.marginTop = '1rem';
            inputInfo2.style.width = '92%';

            inputInfo3.style.fontSize = '1rem';
            inputInfo3.style.padding = '0.5rem';
            inputInfo3.style.marginTop = '1rem';
            inputInfo3.style.width = '92%';

            //Button Pay with Kamba
            var btnPayKamba = document.querySelector(".btnPayKamba");
            btnPayKamba.style.background = 'linear-gradient(to left, #00ff5f, #00FFB3)';
            btnPayKamba.style.border = 'none';
            btnPayKamba.style.marginTop = '1.5rem';
            btnPayKamba.style.width = '260px';
            btnPayKamba.style.padding = '1rem';
            btnPayKamba.style.cursor = 'pointer';
            btnPayKamba.style.fontSize = '1rem';
            btnPayKamba.style.boxSizing = 'border-box';
            btnPayKamba.style.borderRadius = '0.3rem';

            var btnCloseWidgetKamba = document.querySelector(".btnCloseWidgetKamba");
            //btnCloseWidgetKamba.style.background = 'linear-gradient(to left, #00ff5f, #00FFB3)';
            btnCloseWidgetKamba.style.border = 'none';
            btnCloseWidgetKamba.style.marginTop = '1.5rem';
            btnCloseWidgetKamba.style.width = '260px';
            btnCloseWidgetKamba.style.padding = '1rem';
            btnCloseWidgetKamba.style.cursor = 'pointer';
            btnCloseWidgetKamba.style.fontSize = '1rem';
            btnCloseWidgetKamba.style.boxSizing = 'border-box';
            btnCloseWidgetKamba.style.borderRadius = '0.3rem';

            btnCloseWidgetKamba.onclick = function(){
                kambaModalContainer.style.display = 'none';
            };


            var descriptionKamba = document.querySelector(".descriptionKamba");
            descriptionKamba.style.margin = '1rem';
            descriptionKamba.style.textAlign = 'center';
            descriptionKamba.style.textDecoration = 'none';

            //Function Midia Query

            //SMALL
            function midiaSmallDivice(x) {
                if (x.matches) {
                    illustration.style.display = 'none';
                   
                } else {
                   illustration.style.display = 'flex';
                  
                }
            }

            var x = window.matchMedia("(max-width: 640px)")
            midiaSmallDivice(x) 
            x.addListener(midiaSmallDivice)

            //MEDIUM
            function midiaMediumDivice(x) {
                if (x.matches) { 
                     inputInfo1.style.width = '52%';
                     inputInfo2.style.width = '52%';
                     inputInfo3.style.width = '52%';
                     detailQr.style.width = '48%';
                     optionsQr.style.width = '45%';
                     optionsQr.style.paddingTop = '6rem';
                     imgLogoKamba.style.width = '4%';
                     imgPrint.style.width = '4%';
                   
                } else if(x = window.matchMedia("(max-width: 640px)")) {
                  inputInfo1.style.width = '92%';
                  inputInfo2.style.width = '92%';
                  inputInfo3.style.width = '92%';
                  optionsQr.style.paddingTop = '2rem';
                 
                }
            }

            var x = window.matchMedia("(min-width: 641px)")
            midiaMediumDivice(x)
            x.addListener(midiaMediumDivice)

            //LARGE
            function midiaLargeDivice(x) {
                if (x.matches) {   
                    kambaModalWidget.style.width = '75%';
                    kambaModalWidget.style.marginTop = '4rem';
                    kambaModalWidget.style.marginBottom = '4rem';
                    qrPart.style.width = '70%';
                    detailQr.style.width = '45%';
                    optionsQr.style.width = '25%';
                    partDetailPay.style.width = '30%';

                    imgLogoKamba.style.width = '3%';
                    imgPrint.style.width = '3%';
                   
                } else {
                   kambaModalWidget.style.width = '100%';
                   kambaModalWidget.style.marginTop = '0';
                   kambaModalWidget.style.marginBottom = '0';
                   kambaModalWidget.style.borderRadius = '0';

                   qrPart.style.width = '100%';
                   detailQr.style.width = '100%';
                   optionsQr.style.width = '100%';
                   partDetailPay.style.width = '100%';

                   imgLogoKamba.style.width = '7%';
                   imgPrint.style.width = '7%';
                }
            }

            var x = window.matchMedia("(min-width: 960PX)")
            midiaLargeDivice(x)
            x.addListener(midiaLargeDivice)




           







                }).catch(function(err){

                    console.error(err);

                });













                //inicio




                //fim
            })

        
        	          
        }
    })();
})();








