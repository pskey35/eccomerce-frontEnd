import footer from "./footer.module.css"


export default function Footer() {
    return (
      <div className={footer.footer}>
        <div className={footer.footer_content}>
          <div className={footer.first}>
          
            <div className={footer.about}>
              <ul className={footer.lista}>
                <li>Home</li>
                <li>Acerca de...</li>
                <li>Terminos y condiciones</li>
                <li>Política de envio y devolución</li>
                <li>Preguntas frecuentes</li>
              </ul>
            </div>
            <div className={footer.logo}>
              <div className={footer.logo_content}>
              <div className={footer.image}>
                <img src="/leaf.png"></img>
              </div>
              <div style={{marginLeft:"10px"}}>Leaft</div>
              </div>
            </div>
            <div className={footer.other}>
              <div className={footer.siguenos}>
                <p>Siguenos en nuestras redes sociales</p>
                <ul className={footer.socialMediaIconos}>
                  <li> 
                    <img src="/images/instagram.svg"></img>
                  </li>
                  <li>
                    <img src="/images/facebook.svg"></img>
                  </li>
                  <li>
                    <img style={{transform:"scale(1.3)"}} src="/images/tiktok.svg"></img>
                  </li>
                  <li>
                    <img src="/images/twitter.svg"></img>
                  </li>
                </ul>
              </div>
              <div className={footer.metodoPagos}>
                <p>Métodos de pagos</p>
                <ul className={footer.metodoPagosIconos}>
                  <li>
                    <img src="/images/visa.svg"></img>
                  </li>
                  <li>
                    <img src="/images/mastercard.svg"></img>
                  </li>
                  <li>
                    <img src="/images/amex.svg"></img>
                  </li>
                  <li>
                    <img src="/images/paypal.svg"></img>
                  </li>
                  <li>
                    <img src="/images/diners-club.svg"></img>
                  </li>
                  <li>
                    <img src="/images/discover.svg"></img>
                  </li>
                </ul>
              </div>
            </div>
            {/*contactanos falta agregar eso*/}
          </div>
          <div className={footer.second}>
            <div style={{color:"gray"}}>© 2023 Leaft</div>
            <div style={{color:"#6c84ff"}}>Created by Jayme_Ln</div>
          </div>
        </div>
      </div>
    );
  }