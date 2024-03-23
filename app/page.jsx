"use client";
import page from "./page.module.css";
import { useContext, createContext, useState, useEffect, useRef } from "react";
import Header, { Input } from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import { ProductoItem, SkeletonProductoItem } from "@/components/producto-item";
//your already lets go shaolin soccer end escena, song

//esto de aqui sera el producto caja
/*
export function ProductoItem({ style }) {
  const router = useRouter()
  const clickProducto = ()=>{
    router.push("/product/audifono-b12")
  }
  return (
    <div className={page.productoItem} style={style} onClick={clickProducto}>
      <div className={page.imagen}>
        <img src="/images/audi.png" />
      </div>
      <div className={page.infoBoton}>
        <p>Camiseta Parrot</p>
        <button>$20.00 USD</button>
      </div>
    </div>
  );
}
*/

function ContainerDeslizante() {
  const [dataItems, setDataItems] = useState([
    { nombre: "juan" },
    { nombre: "juanasdf" },
    { nombre: "juanasd" },
    { nombre: "juanasdf" },
    { nombre: "juanasdf" },
    { nombre: "juanasdf" },
    { nombre: "juanasdf" },
    { nombre: "juanasdf" },
    { nombre: "juanasdf" }
  ]);


  //esto le puse 330 ..porq tiene 300 de width 15px en cada lado 
  let pixeles_a_mover = 330

  const clickLeftRow = (data)=>{
    const containerD_contentElement = document.querySelector(`.${page.containerDeslizante_content}`)
   
    const posicionScroll_X = containerD_contentElement.scrollLeft
    containerD_contentElement.scrollLeft = posicionScroll_X - pixeles_a_mover
  }

  const clickRightArrow = (data)=>{
    const containerD_contentElement = document.querySelector(`.${page.containerDeslizante_content}`)
    
    const posicionScroll_X = containerD_contentElement.scrollLeft
    containerD_contentElement.scrollLeft = posicionScroll_X + pixeles_a_mover
  }

  /*
  
  useEffect(()=>{
    const mediaQuery = window.matchMedia("(max-width: 900px)");

// Función que se ejecuta cuando la media query cambia
const handleMediaQueryChange = (event) => {
  if (event.matches) {
    // El viewport es menor a 900px
    console.log("El viewport es pequeño");
  alert("small")
  } else {
    // El viewport es mayor o igual a 900px
    console.log("El viewport es grande");
    console.log("hola")
  }
};

// Registrar un listener para la media query
mediaQuery.addEventListener("change", handleMediaQueryChange);

// Comprobar el estado inicial de la media query
handleMediaQueryChange(mediaQuery);

  },[])
  */
  return (
    <div className={page.containerDeslizante}>
      {/*el leftSlide solo se mostrara si se hizo click en rightSlide*/}
      <div className={page.leftSlide} >
        <div className={page.leftArrow} onClick={()=>clickLeftRow(40)}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: "rotate(180deg)",position:"relative",right:"3px" }}
          >
            <path
              d="M9 5L14.15 10C14.4237 10.2563 14.6419 10.5659 14.791 10.9099C14.9402 11.2539 15.0171 11.625 15.0171 12C15.0171 12.375 14.9402 12.7458 14.791 13.0898C14.6419 13.4339 14.4237 13.7437 14.15 14L9 19"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className={page.containerDeslizante_content}>
        {dataItems &&
          dataItems.map((dataUnidad, indice) => {
            return (
              <div>
                <ProductoItem key={indice} data={dataUnidad}></ProductoItem>
              </div>
            );
          })}
      </div>
      <div className={page.rightSlide}>
        <div className={page.rightArrow} onClick={()=>clickRightArrow(40)}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{position:"relative",left:"3px"}}
          >
            <path
              d="M9 5L14.15 10C14.4237 10.2563 14.6419 10.5659 14.791 10.9099C14.9402 11.2539 15.0171 11.625 15.0171 12C15.0171 12.375 14.9402 12.7458 14.791 13.0898C14.6419 13.4339 14.4237 13.7437 14.15 14L9 19"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function InputCaja() {
  const input = useRef();
  const router = useRouter();

  //onKeyUp
  const keyValueInput = (e) => {
    const valorRecortado = input.current.value.replace(/\s+/g, " ").trim();

    //aqui verificamos que haya escrito almenos 1 letra no vaya a ser que defrente poga enter xd
    if (valorRecortado.length > 0) {
      if (e.keyCode == 13) {
        //aqui recortamos el valor por si tiene mas de un espacio
        //  const valorRecortado = input.current.value.replace(/\s+/g, " ").trim();
        //redirect(`/search?q=${valorRecortado}`)
        router.push(`/search?q=${valorRecortado}`);
      }

      //aqui usaremos fetch para mostrar sugerencias hay una tecnica llamada bounce usar eso
      const query = `query{giveSugerenciasInput(textoSearch:"${valorRecortado}"}`;

      fetch(`${process.env.NEXT_PUBLIC_api}/graphql`, {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify({ query }),
      })
        .then((e) => e.json())
        .then((e) => {
          console.log(e);
        });

      // console.log(parseFloat(a))
    }
  };

  return (
    <div className={page.input}>
      <div className={page.inputContainer}>
        <div className={page.inputChild}>
          <input
            ref={input}
            onKeyUp={keyValueInput}
            type="text"
            placeholder="Buscar productos..."
          />
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              aria-hidden="true"
              class="h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              ></path>
            </svg>
          </span>
        </div>
      </div>
      <div className={page.sugerencias}>
        <div className={page.sugerencias_content}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default function App() {

  useEffect(()=>{

  },[])
  return (
    <div className={page.ventana}>
      <Header></Header>
      <div className={page.inputContainer}>
        <Input></Input>
      </div>
      <div className={page.productoBloque}>
        <div className={page.productoContainer}>
          <div>
            <ProductoItem></ProductoItem>
          </div>

          <div>
            <ProductoItem></ProductoItem>
          </div>

          <div>
            <ProductoItem></ProductoItem>
          </div>
        </div>
      </div>
      <ContainerDeslizante></ContainerDeslizante>
      <Footer></Footer>
    </div>
  );
}
