"use client"
import shipping from "./shipping.module.css"
import {useState,useEffect,useContext,useRef} from "react"
import {SkeletonContent,NavBar,CarroRight,CarroMobile,Header,LeftFooter} from "@/app/checkout/page.jsx"
import {ContextCheckoutLayout} from "./../layout.jsx"
import Link from "next/link"



function Left(){

	const focusEconomyMethod = ()=>{
		//le ponemos bordes de color azul 
		const elementEconomy = document.querySelector(`.${shipping.economy}`)
		elementEconomy.style.cssText = `border:1px solid #0144ff;border-radius:5px 5px 0 0;outline-bottom:1px solid #0144ff`
	
	}

	const blurEconomyMethod = ()=>{
		const elementEconomy = document.querySelector(`.${shipping.economy}`)
		elementEconomy.style.cssText = "border:1px solid gray;border-bottom:none"
	}

	const focusStandard = ()=>{
		const elementStandard = document.querySelector(`.${shipping.standard}`)
		elementStandard.style.cssText = `border:1px solid #0144ff;border-radius:0 0 5px 5px;outline-bottom:1px solid #0144ff`
	}

	const blurStandard = ()=>{
		const elementStandard = document.querySelector(`.${shipping.standard}`)
		elementStandard.style.cssText = "border:1px solid gray;border-top:none"
	}

/*onFocus={focusStandard} onBlur={blurStandard}*/
	
	return(
      <div className={shipping.left}>
      		<div className={shipping.left_content}>
      			<Header></Header>
      			<CarroMobile></CarroMobile>
      			<div className={shipping.bottomLeft}>
      			  <NavBar></NavBar>
      			  	<div className={shipping.shippingContainer}>
      			  		<div className={shipping.table}>
      			  			<div className={shipping.contact}>
      			  				<p>Contact</p>
      			  				<p>juanito@gmail.com</p>
      			  				<Link href="/information">Change</Link>
      			  			</div>
      			  			<div className={shipping.shipTo}>
      			  				<p>Ship to</p>
      			  				<div>
      			  					<span>address,</span>
      			  					<span>apartment,</span>
      			  					<span>state</span>
      			  					<span>zipCode</span>
      			  					<span>country</span>
      			  				</div>
      			  				<Link href="/information">Change</Link>
      			  			</div>
      			  		</div>
      			  	</div>
      			  	<div className={shipping.method}>
      			  		<h2>Shipping method</h2>
      			  		<div className={shipping.tableMethod}>
      			  			<label for="economy" className={shipping.economy} onFocus={focusEconomyMethod} onBlur={blurEconomyMethod}>
      			  				<div className={shipping.economy_left}>
	      			  				<input id="economy" type="radio"/>
	      			  				<div>
	      			  					<p>Economy</p>
	      			  					<p>5 to 8 bussines days</p>
	      			  				</div>
      			  				</div>
      			  				<div className={shipping.economy_right}>
      			  					$4.50
      			  				</div>	
      			  			</label>
      			  			<label for="standard" className={shipping.standard} onFocus={focusStandard} onBlur={blurStandard}>
      			  				<div className={shipping.standard_left}>
	      			  				<input id="standard" type="radio"/>
	      			  				<div>
	      			  					<p>Economy</p>
	      			  					<p>5 to 8 bussines days</p>
	      			  				</div>
      			  				</div>
      			  				<div className={shipping.standard_right}>
      			  					$4.50
      			  				</div>	
      			  			</label>
      			  		</div>
      			  		<div className={shipping.botonesOrder}>
      			  			<Link href="/checkout/information">
      			  				 <span className={shipping.flechaLeft}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" focusable="false" aria-hidden="true" class="a8x1wuo _1fragemgc _1fragemig _1frageme8 _1frageme4"><path stroke-linecap="round" stroke-linejoin="round" d="M8.4 11.9 3.748 7.248a.35.35 0 0 1 0-.495L8.4 2.1"></path></svg>
                                </span>
      			  				<p>Return to information</p>
      			  			</Link>

      			  			<div className={shipping.botonContinue}>
      			  				Continue to payment
      			  			</div>
      			  		</div>
      			  	</div>
      			</div>
      		</div>
      </div>
		)
}


export default function App(){
	const {skeletonLoader} = useContext(ContextCheckoutLayout)
	return(
		<div className={shipping.ventana}>
			{skeletonLoader ? <SkeletonContent></SkeletonContent>:
			<div className={shipping.container}>
				<div className={shipping.container_content}>
					<Left></Left>
					<CarroRight></CarroRight>
				</div>
			</div>
		}
		</div>
   )
}