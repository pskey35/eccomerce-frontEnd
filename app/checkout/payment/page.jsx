"use client"
import {SkeletonContent,NavBar,CarroRight,CarroMobile,Header,LeftFooter} from "@/app/checkout/page.jsx"
import payment from "./payment.module.css"
import {useState,useEffect,useContext,useRef} from "react"
import {ContextCheckoutLayout} from "./../layout.jsx"
import Link from "next/link"


function Card(){
	return(
			<div className={payment.card}>
				<div className={payment.card_title}>
					<h2>Payment</h2>
					<p>All transaction are secure and encrypted</p>
				</div>
				<div className={payment.cardFirst}>
					<div className={payment.first_left}>
						<div className={payment.cardNumber}>
							<p>Card number</p>
							<div className={payment.inputCardNumber}>
							   <div className={payment.inputContainer}>
						     		<input placeholder="1234 1234 1234 1234"/>
							   </div>
							   <div className={payment.imageCard}>
							    	<img src="dsfg" alt=""/>
						    	</div>
							</div>
							<div className={payment.dateCard}>
								<div className={payment.expiration}>
									<p>Expiration date</p>
									<div className={payment.inputContainer}>
										<input placeholder="MM/AA"/>
									</div>
								</div>
								<div className={payment.cvc}>
									<p>CVC</p>
									<div className={payment.inputContainer}>
										<input placeholder="CVC"/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={payment.first_right}>
						<div className={payment.cardPicture}>
							<div className={payment.image1}>
							    <span>
							        	<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 96 48" fill="none">
                                     <path d="M36.448 8.80005L23.88 38.784H15.68L9.496 14.852C9.12 13.38 8.796 12.84 7.652 12.22C5.788 11.208 2.708 10.26 0 9.66805L0.184 8.80005H13.384C14.2466 8.79925 15.0811 9.10685 15.7368 9.66725C16.3926 10.2276 16.8264 11.004 16.96 11.856L20.228 29.208L28.3 8.80005H36.448ZM68.58 28.996C68.612 21.08 57.636 20.644 57.712 17.108C57.736 16.032 58.76 14.8881 61 14.5961C63.6252 14.3469 66.269 14.8112 68.652 15.94L70.012 9.58005C67.6918 8.70785 65.2346 8.25685 62.756 8.24805C55.088 8.24805 49.692 12.328 49.644 18.164C49.596 22.48 53.496 24.884 56.436 26.324C59.46 27.792 60.476 28.736 60.46 30.048C60.44 32.064 58.052 32.948 55.82 32.984C51.92 33.044 49.66 31.932 47.852 31.092L46.448 37.66C48.26 38.492 51.604 39.22 55.072 39.252C63.22 39.252 68.552 35.228 68.58 28.996ZM88.824 38.784H96L89.74 8.80005H83.116C82.4082 8.79365 81.7148 8.99985 81.1258 9.39205C80.5366 9.78445 80.0788 10.3446 79.812 11L68.176 38.784H76.32L77.94 34.304H87.892L88.824 38.784ZM80.172 28.16L84.252 16.9L86.604 28.16H80.172ZM47.532 8.80005L41.12 38.784H33.36L39.78 8.80005H47.532Z" fill="#1633CB"/>
                                   </svg>
                                 </span>
							</div>
							<div className={payment.image2}>
							    <span>
								    <svg width="30" height="25" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.2881 8.7146H24.5168V11.6194H19.2881V8.7146Z" fill="currentColor"></path><path d="M5.229 13.3623H10.4577V16.2671H5.229V13.3623Z" fill="currentColor"></path><path d="M5.229 8.7146H10.4577V11.6194H5.229V8.7146Z" fill="currentColor"></path><path d="M12.2002 9.87646H17.5451V15.1052H12.2002V9.87646Z" fill="currentColor"></path><path d="M19.2881 13.3623H24.5168V16.2671H19.2881V13.3623Z" fill="currentColor"></path><path d="M11.3292 6.97167C11.8104 6.97167 12.2006 7.36184 12.2006 7.84312V8.1336H14.0016V6.10021C14.0016 5.86905 14.0934 5.64741 14.2569 5.48404L14.5122 5.22876H5.229V6.97167H11.3292Z" fill="currentColor"></path><path d="M15.7446 6.46117V8.1336H17.5456V7.84312C17.5456 7.36184 17.9358 6.97167 18.4171 6.97167H24.5173V5.22876H16.977L15.7446 6.46117Z" fill="currentColor"></path><path d="M18.4168 18.0101C17.9356 18.0101 17.5454 17.6199 17.5454 17.1386V16.8481H15.7444V18.8815C15.7444 19.1127 15.6526 19.3343 15.4891 19.4977L15.2339 19.753H24.517V18.0101H18.4168Z" fill="currentColor"></path><path d="M14.0016 18.5206V16.8481H12.2006V17.1386C12.2006 17.6199 11.8104 18.0101 11.3292 18.0101H5.229V19.753H12.7692L14.0016 18.5206Z" fill="currentColor"></path><path d="M25.3883 0H4.35727C1.95467 0 0 1.95467 0 4.35726V20.6244C0 23.027 1.95467 24.9817 4.35727 24.9817H25.3883C27.7909 24.9817 29.7456 23.027 29.7456 20.6244V4.35726C29.7456 1.95467 27.7909 0 25.3883 0ZM26.2598 20.6244C26.2598 21.1057 25.8696 21.4958 25.3883 21.4958H4.35727C3.87599 21.4958 3.48581 21.1057 3.48581 20.6244V4.35726C3.48581 3.87599 3.87599 3.48581 4.35727 3.48581H25.3883C25.8696 3.48581 26.2598 3.87599 26.2598 4.35726V20.6244Z" fill="currentColor"></path></svg>
							    </span>
							</div>
							<div className={payment.cardNumber}>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								<div>1234</div>
							</div>
							<div className={payment.infoCard}>
								<p>Nombre Card</p>
								<p>Expires 6/2026</p>
							</div>
						</div>
					</div>
				</div>
				<div className={payment.cardNameCard}>
					<p>Name on card</p>
					<div className={payment.inputContainer}>
						<input type="text"/>
					</div>
				</div>
			</div>
		)
}

function Left(){
	const method = "Standard"
	const pago = 90
	return(
		<div className={payment.left}>
		   <Header></Header>
		  <CarroMobile></CarroMobile>
	    	<div className={payment.bottomLeft}>
	        	<NavBar></NavBar>
	        	<Card></Card>

		       	<div className={payment.tableInfo}>
		       		<h2>Your info</h2>
		       		<div className={payment.tableInfo_content}>
					    <div className={payment.contact}>
						  <p>Contact</p>
						  <p className={payment.center}>email@gmail.com</p>
						  <Link href="/checkout/information">Change</Link>
					   </div>
				    	<div className={payment.shipTo}>
					    	<p>Ship to</p>
					    	<div className={payment.center}>
					    		<span>address</span>
					    		<span>apartamento</span>
					    		<span>ciudad</span>
					    		<span>NJ</span>
					    		<span>07712</span>
					    		<span>United states</span>
					    	</div>
					    	<Link href="/checkout/information">Change</Link>
				    	</div>
				    	<div className={payment.method}>
				    		<p>Shipping method</p>
				    		<p className={payment.center}>{method}.${pago}</p>
				    		<Link href="/checkout/information">Change</Link>
				    	</div>
					   </div>
				    	<div>
					</div>
				 </div>
				<div className={payment.botones}>
					<div className={payment.redirect}>
					  <Link href="/checkout/shipping">
					  	<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" focusable="false" aria-hidden="true" class="a8x1wuo _1fragemgc _1fragemig _1frageme8 _1frageme4"><path stroke-linecap="round" stroke-linejoin="round" d="M8.4 11.9 3.748 7.248a.35.35 0 0 1 0-.495L8.4 2.1"></path></svg></span>
					  	
					  	<span>
					  		Return to shipping
					  	</span>
					  </Link>
					</div>
					<div className={payment.botonPay}>
						Pay now
					</div>
				</div>
			</div>
		</div>
		)
}


export default function App(){
	const {skeletonLoader} = useContext(ContextCheckoutLayout)
	return(
		<div className={payment.ventana}>
		{skeletonLoader ? <SkeletonContent></SkeletonContent>:
		<div className={payment.container}>
			<div className={payment.container_content}>
				<Left></Left>
				<CarroRight></CarroRight>
			</div>
		</div>

	}
		</div>)
}