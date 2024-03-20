"use client"
import page from "./page.module.css";
import {useState,useEffect,useContext,useRef} from "react"
import {SkeletonContent,NavBar,CarroRight,CarroMobile,Header,LeftFooter} from "@/app/checkout/page.jsx"
import {ContextCheckoutLayout} from "./../layout.jsx"
import Link from "next/link"

//localstack is like a aws but in your pc localhost


function InputContainer({label_holderInput,forName}){
    const inputEmail = useRef()
    const labelEmail = useRef()

    const onInputEmail = ()=>{

    if(inputEmail.current.value.length > 0){
      //si hay se ha escrito mas de 1 caracter...mostrar el label y disminuir padding
      labelEmail.current.style.cssText = "opacity:1;transform:translateY(-80%)"
     inputEmail.current.style.cssText = "padding-bottom:6px;padding-top:21px"
    }else if(inputEmail.current.value.length == 0){
      labelEmail.current.style.cssText = "opacity:0;transform:translateY(0%)"
      inputEmail.current.style.cssText = "padding-bottom:21px; padding-top:21px"
    }
   }

   const blurInput = ()=>{

   }
  return(
     <div className={page.input} onBlur={blurInput}>
         <div className={page.input_content}>
            <label for={forName} ref={labelEmail}>{label_holderInput}</label>
             <input  id={forName} onInput={onInputEmail}  ref={inputEmail} type="text" placeholder={label_holderInput}/>          
         </div>
    </div>
      )
}



export function Left(){

  const refShippingAddress = useRef()

  const refAddressContainer = useRef()

  const refInputAddress = useRef()

  const refLabelAddress = useRef()

  const focusAddressContainer = ()=>{
   refAddressContainer.current.style.outline = "1.5px solid #1165cd"
  }

  const blurAddressContainer = ()=>{
    refAddressContainer.current.style.outline = "1.5px solid  #474747"
  }

  const onInputAddressContainer = ()=>{
    if(refInputAddress.current.value.length > 0){
      //si hay se ha escrito mas de 1 caracter...mostrar el label y disminuir padding
      refLabelAddress.current.style.cssText = "opacity:1;transform:translateY(-80%)"
      refInputAddress.current.style.cssText = "padding-bottom:6px;padding-top:21px"
    }else if(refInputAddress.current.value.length == 0){
      refLabelAddress.current.style.cssText = "opacity:0;transform:translateY(0%)"
      refInputAddress.current.style.cssText = ""
    }
  }

  return(
    <div className={page.leftContainer}>
      <div className={page.leftContainer_content}>
        <Header></Header>
        <CarroMobile></CarroMobile>
        <div className={page.bottomLeft}>
          <NavBar></NavBar>
          <div className={page.informationContainer}>
            <div className={page.contact}>
              <h2>Contact</h2>
              <div className={page.inputContact}>
              <InputContainer label_holderInput="Email or phone number" forName="email"></InputContainer>
              </div>
              <div className={page.checkboxContainer}>
                  <div className={page.checkbox_content}>
                    <input type="checkbox" id="checkboxEmail"/>
                  </div>
                  <label className={page.checkboxLabel} for="checkboxEmail">Email me with news and offers</label>
              </div>
            </div>
            <div className={page.shippingAddress} >
              <h2>Shipping address</h2>
             
              <div className={page.selectRegion}>
                <div className={page.selectRegion_content}>
                  <span>CountryRegion</span>
                  <div>Unided States</div>
                </div>



                <span className={page.flechaSelect}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" focusable="false" aria-hidden="true" class="a8x1wuo _1fragemgc _1fragemig _1frageme8 _1frageme4"><path stroke-linecap="round" stroke-linejoin="round" d="m11.9 5.6-4.653 4.653a.35.35 0 0 1-.495 0L2.1 5.6"></path></svg>
                </span>
                {/*aqui poner el div de toda los resultados a seleccionar*/}
              </div>


               <div className={page.names}>
                  <div className={page.firstNameContainer}>
                    <InputContainer label_holderInput="First name (optional)" forName="firstName"></InputContainer>
                  </div>

                  <div className={page.lastNameContainer}>
                    <InputContainer label_holderInput="Last name" forName="lastName"></InputContainer>
                  </div>
               </div>

               <div className={page.addressContainer} ref={refAddressContainer} onFocus={focusAddressContainer} onBlur={blurAddressContainer}>
                 <div className={page.address_content}>
                   <div className={page.left}>
                      <label for="addressLabel" ref={refLabelAddress}>Address</label>
                      <input id="addressLabel" ref={refInputAddress}  onInput={onInputAddressContainer} placeholder="Address"/>
                   </div>
                   <span className={page.iconoLupa}>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" focusable="false" aria-hidden="true" class="a8x1wuo _1fragemgc _1fragemig _1frageme8 _1frageme4"><path stroke-linecap="round" d="M9.16 9.159a4.194 4.194 0 1 0-5.933-5.93 4.194 4.194 0 0 0 5.934 5.93Zm0 0L12.6 12.6"></path></svg>
                   </span>
                 </div>
                 {/*las sugerencias de momento no las voy a usar*/}
                 <div className={page.sugerencias}>
                    <div className={page.sugerencias_content}>
                      <div className={page.sugerenciasHeader}>
                        <span>Sugerencias</span>
                        <span className={page.ekis}>
                          
                        </span>
                      </div>
                      <div className={page.sugerenciasTexto}>
                        {/*aqui hacer fetch y usar map busca una api bueno xd*/}
                      </div>
                    </div>
                 </div>
               </div>
               <div className={page.otherInfo}>
                 <InputContainer label_holderInput="Apartment, suite, etc. (optional)" forName="otherInfo"></InputContainer>
               </div>
               <div className={page.location}>
                 <div>
                   <InputContainer label_holderInput="City" forName="city"></InputContainer>
                 </div>
                  <div>
                   <InputContainer label_holderInput="State" forName="state"></InputContainer>
                 </div>
                  <div>
                   <InputContainer label_holderInput="ZIP code" forName="zipCode"></InputContainer>
                 </div>
               </div>
               <div className={page.checkBoxSaveInformation}>
                  <input type="checkbox" id="checkBoxSaveInformation"/>
                  <label for="checkBoxSaveInformation">Save this information for next time</label>
               </div>
               <div className={page.botonesOrder}>
                 <div className={page.returnCart}>
                   <Link href="/">
                      <span className={page.flechaLeft}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" focusable="false" aria-hidden="true" class="a8x1wuo _1fragemgc _1fragemig _1frageme8 _1frageme4"><path stroke-linecap="round" stroke-linejoin="round" d="M8.4 11.9 3.748 7.248a.35.35 0 0 1 0-.495L8.4 2.1"></path></svg>
                       </span>
                      <span>
                       Return to cart
                      </span>
                   </Link>
                </div>
                 <div className={page.botonContinue}>
                   Continue to shipping
                   </div>
                 </div>
               </div>
            </div>
          <LeftFooter></LeftFooter>
        </div>
        </div>
    </div>
    )
}




export default function App() {


  const {skeletonLoader} = useContext(ContextCheckoutLayout)

  return(
  	<div className={page.ventana}>
  		{skeletonLoader?<SkeletonContent></SkeletonContent>:
      <div className={page.container}>
        <div className={page.container_content}>
          <Left></Left>
          <CarroRight></CarroRight>
         
        </div>
      </div>
    }
  	</div>
  	)
}

