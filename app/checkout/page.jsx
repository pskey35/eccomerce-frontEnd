
"use client"
//aqui mayoria de las cosas se exportan noma para las sub rutas que hay
//y en todo caso se redirige a otro lado en caso de que entre a esta ruta
import checkout from "./checkout.module.css"
import {useContext,useState,useEffect} from "react"
import {ContextCheckoutLayout} from "./layout.jsx"
import Link from "next/link"
//este loader se va a usar en esta ruta checkout y sus subrutas
export function SkeletonContent() {
  return (
    <div className={checkout.loaderContent}>
      <div className={checkout.left}>
      	<div className={checkout.logo}>
      		<img src="/parrot.jpg"/>
      	</div>
        <div className={checkout.orderMobile}>
          <span></span>
          <span></span>
        </div>
      	<div className={checkout.left_second}>
      		<div className={checkout.second_1}>
      			<div className={checkout.first}>
              <span></span>   
            </div>
      			<div>
      				<span></span>
      				<span></span>
      				<span></span>
      			</div>
      		</div>
      		<div className={checkout.second_2}>
      			<span></span>
      			<span></span>
      			<span></span>
      		</div>

      		<div className={checkout.second_3}>
      			<span></span>
      			<span></span>
      			<span></span>
      		</div>
      	</div>
      </div>
      <div className={checkout.right}>
        <div className={checkout.right_top}>
          <div className={checkout.top_left}>
            
          </div>

          <div className={checkout.top_right}>
            <div className={checkout.top_r_left}>
              <span></span>
              <span></span>
            </div>
            <div className={checkout.top_r_right}></div>
          </div>
        </div>
        <div className={checkout.right_bottom}>
          <div className={checkout.bottom_left}>
            <span></span>
             <span></span>
             <span></span>
            <span></span>
          </div>
          <div className={checkout.bottom_right}>
              <span></span>
              <span></span>
               <span></span>
              <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}




export function Header(){
  return(
    <div className={checkout.header}>
      <div className={checkout.logo}>
        <img src="/parrot.jpg"/>
      </div>
    </div>
    )
}

//este navBar se usara en todos lados aqui estan los links de information/shipping /payment /
export function NavBar(){
return (
  <div className={checkout.navBar}>
    <div className={checkout.navBar_content}>
      <div className={checkout.navBar_li}>
        <Link href="/">Cart</Link>
      </div>
       <span className={checkout.rightFlecha}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
            focusable="false"
            aria-hidden="true"
            class="a8x1wuo _1fragemgc _1fragemig _1frageme8 _1frageme4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m5.6 2.1 4.652 4.652a.35.35 0 0 1 0 .495L5.6 11.9"
            ></path>
          </svg>
        </span>
      

      <div className={checkout.navBar_li}>
        <Link href="/checkout/information">Information</Link>
    
      </div>
     <span className={checkout.rightFlecha}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
            focusable="false"
            aria-hidden="true"
            class="a8x1wuo _1fragemgc _1fragemig _1frageme8 _1frageme4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m5.6 2.1 4.652 4.652a.35.35 0 0 1 0 .495L5.6 11.9"
            ></path>
          </svg>
        </span>


      <div className={checkout.navBar_li}>
        <Link href="/checkout/shipping">Shipping</Link>
       
      </div>
       <span className={checkout.rightFlecha}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
            focusable="false"
            aria-hidden="true"
            class="a8x1wuo _1fragemgc _1fragemig _1frageme8 _1frageme4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m5.6 2.1 4.652 4.652a.35.35 0 0 1 0 .495L5.6 11.9"
            ></path>
          </svg>
        </span>
      <div className={checkout.navBar_li}>
        <Link href="/checkout/payment">Payment</Link>
      </div>
      
    </div>
  </div>
);

}








function ProductoCar({data}){

  return(
    <div className={checkout.producto}>
      <div className={checkout.producto_content}>
        <div className={checkout.image}>
          <img src={`/${data.imgUrl_first}`}></img>
          <div className={checkout.cantidad}>{data.cantidadProducto}</div>
        </div>
        <div className={checkout.productoRight}>
          <div className={checkout.infoItem}>
          {data.nombre_producto}
          </div>
          <div className={checkout.precioItem}>${data.precio_en_dolares}</div>
        </div>
      </div>
    </div>
    )
}





//esto es para mobile es mas facil tener otro componente para mobiles que hacer cosas raras
export function CarroMobile(){
 const {dataCarritoForCaja} = useContext(ContextCheckoutLayout)
 
 //este subtotal es para saber todo lo sumado de los productos noma
 const [subTotal,setSubTotal] = useState(0)


 //esto mostraro u ocultara el carrito (solo mobile obviamente xd)
 const [clickedCarro,setClickedCarro] = useState(false)

 


  const shipping = 0
  const total = shipping + subTotal
  useEffect(()=>{
    //aqui ponemos ni bien que se renderiza porque ya tenemos el skeletonLoader asi que los datos no se necesita esperar
    
    console.log("CONTEOOO")
    let conteo = 0

   dataCarritoForCaja.map(dataUnidad=>{
      console.log(dataUnidad.cantidadProducto)
      conteo += dataUnidad.cantidadProducto
    //  setSubTotal(prev=>prev + dataUnidad.cantidadProducto) ---esto de aqui no funciona creo que entra en bucle xd
    })

   setSubTotal(conteo)
  },[])


  useEffect(()=>{
    if(clickedCarro){
      //si es true se abre el carro

    }else{
      //si es false se cierra el carro

    }
  },[clickedCarro])
  const clickCarroMb = ()=>{
    //aqui cambiamos el estado esto servira para abrir o cerrar el carrito
    setClickedCarro(prev=>!prev)
  }

  return(
   <div className={checkout.carroMb}>
  <div className={checkout.carroMb_content} onClick={clickCarroMb}>
    <div className={checkout.carroMb_left}>
      <span className={checkout.carroIcon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 14 14"
          focusable="false"
          aria-hidden="true"
          class="a8x1wuo _1fragemgc _1fragemig _1frageme8 _1frageme4"
        >
          <circle cx="3.5" cy="11.9" r="0.3"></circle>
          <circle cx="10.5" cy="11.9" r="0.3"></circle>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.502 11.898h-.004v.005h.004zm7 0h-.005v.005h.005zM1.4 2.1h.865a.7.7 0 0 1 .676.516l1.818 6.668a.7.7 0 0 0 .676.516h5.218a.7.7 0 0 0 .68-.53l1.05-4.2a.7.7 0 0 0-.68-.87H3.4"
          ></path>
        </svg>
      </span>

      <div className={checkout.showCarMessage}>
        {clickedCarro ? "Mostrar carrito" : "Ocultar carrito"}
      </div>

      <span className={checkout.flechaIcon} style={{transform:clickedCarro?"rotate(180deg)":"rotate(0deg)"}}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 14 14"
          focusable="false"
          aria-hidden="true"
          class="a8x1wuo _1fragemgc _1fragemig _1frageme8 _1frageme4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m11.9 5.6-4.653 4.653a.35.35 0 0 1-.495 0L2.1 5.6"
          ></path>
        </svg>
      </span>
    </div>
    <div className={checkout.carroMb_right}>${total}</div>
  </div>
  <div className={checkout.carroProducto} style={{height:clickedCarro?"300px":"0px"}}>
    <div className={checkout.carritoRight_mb}>
      <div className={checkout.carritoRight_content_mb}>
        <div className={checkout.productoContainer_mb}>
          {dataCarritoForCaja.map((dataUnidad, ind) => {
            return <ProductoCar data={dataUnidad} key={ind}></ProductoCar>;
          })}
        </div>
        <div className={checkout.infoProducto_mb}>
          <div className={checkout.subTotal_mb}>
            <span>SubTotal</span>
            <span>${subTotal}</span>
          </div>
          <div className={checkout.shipping_mb}>
            <span>Shipping</span>
            <span>${shipping}</span>
          </div>
          <div className={checkout.total_mb}>
            <span>Total</span>
            <div>
              <span>USD</span>
              <span>${total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}


//este carritoRight tambien se va a usar en todos lados
export function CarroRight(){
   const {dataCarritoForCaja} = useContext(ContextCheckoutLayout)
  const [subTotal,setSubTotal] = useState(0)

  const shipping = 0
  const total = shipping + subTotal
  useEffect(()=>{
    //aqui ponemos ni bien que se renderiza porque ya tenemos el skeletonLoader asi que los datos no se necesita esperar
    
    console.log("CONTEOOO")
    let conteo = 0

   dataCarritoForCaja.map(dataUnidad=>{
      console.log(dataUnidad.cantidadProducto)
      conteo += dataUnidad.cantidadProducto
    //  setSubTotal(prev=>prev + dataUnidad.cantidadProducto) ---esto de aqui no funciona creo que entra en bucle xd
    })

   setSubTotal(conteo)
  },[])


  return(
    <div className={checkout.carritoRight}>
      <div className={checkout.carritoRight_content}>
        <div className={checkout.productoContainer}>
        {dataCarritoForCaja.map((dataUnidad,ind)=>{
          return(<ProductoCar data={dataUnidad} key={ind}></ProductoCar>)
        })}
        </div>
        <div className={checkout.infoProducto}>
          <div className={checkout.subTotal}>
            <span>SubTotal</span>
            <span>${subTotal}</span>
          </div>
          <div className={checkout.shipping}>
            <span>Shipping</span>
            <span>${shipping}</span>
          </div>
          <div className={checkout.total}>
              <span>Total</span>
              <div>
                <span>USD</span>
                <span>${total}</span>
              </div>
          </div>
        </div>
      </div>
    </div>)
}




export function LeftFooter(){
  return(
    <div className={checkout.footerCheckout}>
      Todos los derechos reservados por Jayme Ln 
    </div>
    )
}


export default function App(){
  return(
    <div>
    en esta pagina no debes de estar....
      
    </div>
    )
}