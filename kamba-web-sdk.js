function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

//===================================================== Check if devise is mobile?
function isMobileDevice() {
  return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

//===================================================== Get mobile operating system
function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/android/i.test(userAgent)) {
    return 'Android';
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'iOS';
  }
  return 'unknown';
}

ready(function() {
  //Style for button Pay with Kamba - Merchant
  const btnOpenWidgetKamba = document.querySelector('.btnOpenWidgetKamba');
  btnOpenWidgetKamba.innerHTML = 'Pagar com Kamba';
  const imgButtonKamba = document.createElement('img');
  imgButtonKamba.src='https://image.ibb.co/mFZUTz/Pay_Logo_kamba.png';
  imgButtonKamba.classList.add('classImgButtonKamba');
  btnOpenWidgetKamba.appendChild(imgButtonKamba);

  const classImgButtonKamba = document.querySelector('.classImgButtonKamba');
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

(function() {
  (function bootstrap() {
    'use strict'

    window.KAMBA = window.KAMBA || {};

    window.kamba = function kamba(api_config, checkout_config) {

      function ready(fn) {
        if (document.readyState != 'loading') {
          fn();
        } else {
          document.addEventListener('DOMContentLoaded', fn);
        }
      }

      ready(function() {

        //modal template for post progress bar
        const mainKambaModalContainer = document.createElement('main');
        const kambaModalContainer = document.getElementsByTagName('body')[0].appendChild(mainKambaModalContainer);
        kambaModalContainer.classList.add('kambaModalProgressBarTemplate');
        const kambaModalProgressBarTemplate = document.querySelector('.kambaModalProgressBarTemplate');
        kambaModalProgressBarTemplate.style.width = '100vw';
        kambaModalProgressBarTemplate.style.height = '100%';
        kambaModalProgressBarTemplate.style.background = 'rgba(0,0,0,.45)';
        kambaModalProgressBarTemplate.style.position = 'fixed';
        kambaModalProgressBarTemplate.style.top = '0';
        kambaModalProgressBarTemplate.style.left = '0';
        kambaModalProgressBarTemplate.style.zIndex = '1000000000000000000000';
        kambaModalProgressBarTemplate.style.display = 'flex';
        kambaModalProgressBarTemplate.style.justifyContent = 'center';
        kambaModalProgressBarTemplate.style.alignItems = 'center';
        kambaModalProgressBarTemplate.style.boxSizing = 'border-box';
        kambaModalProgressBarTemplate.style.overflow = 'auto';
        kambaModalProgressBarTemplate.style.color = '#ffffff';

        let canvasKamba = document.createElement('canvas');
        canvasKamba.width='500';
        canvasKamba.height='200';
        canvasKamba.classList.add('myKambaCanvas');
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

        if (api_config.environment == 'sandbox') {
          url = 'https://sandbox.usekamba.com/v1/checkouts/';
        } else {
          url = 'https://api.usekamba.com/v1/checkouts/';
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

            if (response.ok) {
              response.json().then(data => {
              kambaModalProgressBarTemplate.style.display = 'none';

              //To transform
              let initial_amount = new Number(data.initial_amount);
              let total_amount = new Number(data.total_amount);

              let dateConvert = new Date(data.expires_at);
              let newDateConvert = [dateConvert.getDate(), dateConvert.getMonth(), dateConvert.getFullYear()].join('/')+' às '+[dateConvert.getHours(), dateConvert.getMinutes()].join(':');

              const mainKambaModalContainer = document.createElement('main');
              //Modal Container
              let kambaModalContainer = document.getElementsByTagName('body')[0].appendChild(mainKambaModalContainer);
              kambaModalContainer.classList.add('kambaModalContainer');
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
              kambaModalContainer.style.overflow = 'auto';

              let merchantId = data.merchant.id;
              let checkoutId = data.id;
              

              //Template
              const kambaWidget = `

              <div class="kambaModalWidget">

                  <header class="checkoutHeader">
                    <div class="cancelKambaCheckout">Cancelar</div>
                    <div class="newTrasactionKamba">Nova transação</div>
                  </header>

                  <section>

                      <article class="showBusinessKamba">
                        <div>
                          <img src="https://image.ibb.co/gJm1pf/Loja-small.png" alt="Loja-small" border="0" class="imgShopBusinessKamba">
                        </div>

                        <div class="descriptionBusinessKamba">
                          <div class="descritionKambaMerchant">${data.merchant.business_name}</div>
                          <div class="priceProductKambaMerchant">${total_amount.toLocaleString('pt-ao', {style: 'currency', currency: 'AKZ'})}</div>
                        </div>
                      </article>

                      <hr>

                      <div class="nameProductKambaMerchant">${data.notes}</div>

                      <article class="qrPartKambaMerchant">
                      
                        <div class="SvgKambaMerchant">

                            <svg viewBox="0 0 670 670" preserveAspectRatio="xMidYMid meet" class="imgQrKambaMerchant">
                                ${data.qr_code}
                            </svg>

                            <div class="textValidatKambaMerchant">
                              Expira em ${newDateConvert}
                            </div>
                        </div>

                        <div class="optionHelpKamba1">
                          Abra a sua carteira Kamba e escaneie o código de pagamento.
                        </div>
                        <div class="openAppKamba">
                          <a href="https://usekamba.page.link/?link=https://www.usekamba.com/&apn=com.usekamba.kamba.kamba&ibi=com.usekamba.kamba&mID=${merchantId}&chID=${checkoutId}" class="btnKamba">
                                      Clica para pagar com Kamba
                                      <img src="https://image.ibb.co/mFZUTz/Pay_Logo_kamba.png" class="btnImgPayKamba">
                                    </a>
                        </div>

                      </article>

                      <footer class="footerCheckoutKamba">

                        <div class="securityPayKamba">
                          <div class="textSecurityPay"><img src="https://image.ibb.co/bxv8MK/icons8_lock_kamba.png" class="lock"> <span class="descriptionSecurityPayKamba">Conexão segura</span></div>
                        </div>

                        <div>
                          <img src="https://image.ibb.co/nrFpaL/Logo-small.png" alt="Logo-small" border="0" class="logoUseKamba">
                        </div>

                      </footer>

                  </section>
              </div>

              <style>

                .kambaModalWidget {
                  overflow: auto;
                  background: #fff;
                  font-family: Montserrat, sans-serif;
                  fontSize: 0.85rem;
                  width: 100% !important;
                  height: 100% !important;
                }

                .checkoutHeader {
                  background: #01ff5e;
                  height: 1rem;
                  color: #fff;
                  font-size: 1rem;
                  padding: 1rem;
                  justify-content: center;
                  align-items: center;
                }

                .cancelKambaCheckout {
                  cursor: pointer;
                  float: left;
                  font-size: 0.9rem;
                  margin-right: -2rem;
                }

                .newTrasactionKamba  {
                  font-weight: bolder;
                  font-size: 0.9rem;
                  text-align: center;
                }

                .showBusinessKamba {
                  padding: 1.2rem 1rem 0 1rem;
                  display: flex;
                }

                .imgShopBusinessKamba {
                  width: 88%;
                  height: 88%;
                }

                .descriptionBusinessKamba{
                  margin-left: 0.5rem;
                }

                .descritionKambaMerchant {     
                  font-size: 0.9rem;
                  font-weight: bolder;
                  color: rgb(105, 105, 105);
                  margin-bottom: 0.5rem;
                }

                .priceProductKambaMerchant {
                  font-size: 1rem;
                  font-weight: bolder;
                }

                hr {
                  border: 0.5px solid #ccc;
                }

                .nameProductKambaMerchant {
                  padding: 0.5rem 1rem;
                  color: rgb(105, 105, 105);
                  font-weight: bolder;
                  font-size: 0.85rem;
                }

                .qrPartKambaMerchant {
                  width: 100%;
                  position: relative;
                }

                .SvgKambaMerchant {
                  text-align: center;
                  width: 100%;
                  margin-top: 0.5rem;
                }

                .imgQrKambaMerchant {
                  width: 41%;
                  height: 41%;
                  text-align: center;
                  border: 2px solid #000;
                  padding: 0.2rem;
                  margin: 0.5rem 0;
                }

                .textValidatKambaMerchant {
                  font-size: 0.7rem;
                  font-weight: bolder;
                  color: rgb(105, 105, 105);
                }

                .optionHelpKamba1 {
                  text-align: center;
                  font-weight: bolder;
                  margin-top: 2rem;
                  font-size: 0.9rem;
                  padding: 0 1rem;
                  text-align: center;
                }

                .footerCheckoutKamba {
                  padding: 1rem 1rem 0 1rem;
                  margin-top: 1rem;
                }

                .securityPayKamba {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                }

                .textSecurityPay {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  box-sizing: border-box;
                  text-align: center;
                }

                .descriptionSecurityPayKamba {
                  margin-left: 0.2rem;
                  color: #000;
                  font-size: 0.8rem;
                  font-weight: bolder;
                }

                @-moz-document url-prefix() {
                  .cancelKambaCheckout {
                    font-size: 0.88rem;
                  }

                  .newTrasactionKamba  {
                    font-size: 0.88rem;
                  }

                  .HowToPayKambaMerchant {
                    font-size: 0.88rem;
                  }

                  .optionHelpKamba1 {
                    font-size: 0.8rem;
                  }

                  .textValidatKambaMerchant {
                  font-size: 0.6rem;
                  }

                }

                a.btnKamba {
                  background-image: linear-gradient(to left, rgb(0, 255, 179), rgb(0, 255, 95))!important;
                  padding: 0.5rem;
                  cursor: pointer;
                  font-size: 0.9rem;
                  border-radius: 0.3rem;
                  font-family: Montserrat, sans-serif;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-decoration: none;
                  color: #000;
                }

                .btnImgPayKamba {
                  width: 15%;
                  height: 15%;
                  margin-left: 0.5rem;
                }

                .openAppKamba {
                  padding: 3rem 1rem 1rem 1rem;
                }

                @media only screen and (min-width: 40.063em) {
                  .kambaModalWidget {
                    width: 22rem !important;
                    height: 34rem !important;
                    border-radius: 0.5rem;
                    box-shadow: 0 5px 8px 0 rgba(0,0,0,.2), 0 7px 20px 0 rgba(0,0,0,.10);
                  }

                  .openAppKamba{
                    display: none;
                  }

                  .cancelKambaCheckout {
                    font-size: 1rem;
                  }

                  .newTrasactionKamba  {
                    font-size: 1rem;
                  }

                }
      
              </style>
              `
              kambaModalContainer.innerHTML = kambaWidget;
              
              let btnCloseWidgetKamba = document.querySelector('.cancelKambaCheckout');
              btnCloseWidgetKamba.title = 'Sair do pagamento';
              btnCloseWidgetKamba.style.cursor = 'pointer';

              btnCloseWidgetKamba.onclick = function(){
                kambaModalContainer.style.display = 'none';
              };

              //Button for Pay Kamba
              document.querySelector('.btnOpenWidgetKamba').onclick = function(){
                kambaModalContainer.style.display = 'flex';
              };

  
            });

          } else {
            response.json().then(data => {

              kambaModalProgressBarTemplate.style.display = 'none';
              templateModalErrorPayKamba();
              let textErrorKamba = document.querySelector('.textErrorKamba');

              if ((typeof data.message !== 'undefined')) {
                  textErrorKamba.innerHTML =  `<p>${data.errors[0].field}: ${data.errors[0].message}</p>`;
              }

              if ((typeof data.errors.code !== 'undefined')) {
                textErrorKamba.innerHTML =  `<p>${data.errors.message} </p>`;
              }
            });
          }
        })
        .catch(function(error) {
          kambaModalProgressBarTemplate.style.display = 'none';
          templateModalErrorPayKamba();

          let textErrorKamba = document.querySelector('.textErrorKamba');
          textErrorKamba.innerHTML = 'Verifique sua conexão com a internet, ela pode estar muito lenta';
        });

        function templateModalErrorPayKamba() {
          const mainKambaModalContainer = document.createElement('main');

          //Modal Container
          var kambaModalContainer = document.getElementsByTagName('body')[0].appendChild(mainKambaModalContainer);
          kambaModalContainer.classList.add('kambaModalContainer');
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

          kambaModalContainer.addEventListener('click', function() {
            kambaModalContainer.style.display = 'none';
          });

          //Button for Pay Kamba
          document.querySelector('.btnOpenWidgetKamba').onclick = function() {
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
          var kambaModalWidget = document.querySelector('main .kambaModalWidget');
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

          function midiaMediumDivice(x) {
            if (x.matches) {
              kambaModalWidget.style.width = '40%';
              kambaModalWidget.style.height = '30%';
            }
          }

          var x = window.matchMedia("(min-width: 641px)");
          midiaMediumDivice(x);
          x.addListener(midiaMediumDivice);

          function midiaLargeDivice(x) {
            if (x.matches) {
              kambaModalWidget.style.width = '25%';
              kambaModalWidget.style.height = '30%';
            }
          }

          var x = window.matchMedia("(min-width: 1025PX)");
          midiaLargeDivice(x);
          x.addListener(midiaLargeDivice);

        }

        function kambaProgressBar() {
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

          if (al>=100000000000000) {
            clearTimeout(bar);
          }

          al++;
        }

      })

    }

  })();
})();