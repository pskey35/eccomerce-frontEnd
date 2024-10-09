"use client";
import page from "./page.module.css";
import { useContext, createContext, useState, useEffect, useRef } from "react";
import Header, { Input } from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import { ProductoItem, SkeletonProductoItem } from "@/components/producto-item";

const ContextHome = createContext();
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

  const { itemProductosSlider, setItemProductosSlider } = useContext(ContextHome)

  let posicionScroll = 0

  //esto le puse 330 ..porq tiene 300 de width 15px en cada lado
  let pixeles_a_mover = 330;

  const clickLeftRow = (data) => {
    const containerD_contentElement = document.querySelector(
      `.${page.containerDeslizante_content}`
    );

    const posicionScroll_X = containerD_contentElement.scrollLeft;
    containerD_contentElement.scrollLeft = posicionScroll_X - pixeles_a_mover;;


  };


  const clickRightArrow = (data) => {
    const containerD_contentElement = document.querySelector(
      `.${page.containerDeslizante_content}`
    );

    const posicionScroll_X = containerD_contentElement.scrollLeft;
    //posicionScroll  += pixeles_a_mover
    containerD_contentElement.scrollLeft = posicionScroll_X + pixeles_a_mover;
  };

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

  /*const containerDeslizante_content = document.querySelector(`.${page.containerDeslizante_content}`)

  useEffect(()=>{
    const containerDeslizante_content = document.querySelector(`.${page.containerDeslizante_content}`)
    if(containerDeslizante_content.scrollLeft <= 0){
      //ocultamos la flecha izquierda boton en caso no haya mas contenido

      const arrow_left = document.querySelector(`.${page.leftArrow}`)
      arrow_left.style.cssText = "visibility:hidden"
    }
  },[,containerDeslizante_content.scrollLeft])*/

  useEffect(() => {
    const containerDeslizante_content = document.querySelector(`.${page.containerDeslizante_content}`)

    const arrow_left = document.querySelector(`.${page.leftArrow}`)
    arrow_left.style.cssText = "visibility:hidden"
    const handleScroll = () => {

      const scrollRight = containerDeslizante_content.scrollWidth - containerDeslizante_content.clientWidth - containerDeslizante_content.scrollLeft;





      console.log(scrollRight)
      if (containerDeslizante_content.scrollLeft <= 0) {
        //ocultamos la flecha izquierda boton en caso no haya mas contenido
        const arrow_right = document.querySelector(`.${page.rightArrow}`)
        arrow_right.style.cssText = "visibility:visible"

        const arrow_left = document.querySelector(`.${page.leftArrow}`)
        arrow_left.style.cssText = "visibility:hidden"
      } else if (containerDeslizante_content.scrollLeft > 0) {
        //mostramos el boton left en caso si haya
        const arrow_left = document.querySelector(`.${page.leftArrow}`)
        arrow_left.style.cssText = "visibility:visible"

        const arrow_right = document.querySelector(`.${page.rightArrow}`)
        arrow_right.style.cssText = "visibility:visible"

      }


      if (scrollRight == 0) {
        const arrow_right = document.querySelector(`.${page.rightArrow}`)
        arrow_right.style.cssText = "visibility:hidden"
      }

    }


    containerDeslizante_content.addEventListener("scroll", handleScroll)

    return () => {
      containerDeslizante_content.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    console.log("cuanto de length tiene itemProductosSlider")
    console.log(itemProductosSlider.length)
  }, [])
  return (
    <div className={page.containerDeslizante}>
      {/*el leftSlide solo se mostrara si se hizo click en rightSlide*/}
      <div className={page.leftSlide}>
        <div className={page.leftArrow} onClick={() => clickLeftRow(40)}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: "rotate(180deg)",
              position: "relative",
              right: "3px",
            }}
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
        {itemProductosSlider &&
          itemProductosSlider.map((dataUnidad, indice) => {
            return (
              <div key={indice}>
                <ProductoItem data={dataUnidad}></ProductoItem>
              </div>
            );
          })}
      </div>
      <div className={page.rightSlide}>
        <div className={page.rightArrow} onClick={() => clickRightArrow(40)}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "relative", left: "3px" }}
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
        }).catch((e) => {

          alert("error")
        })

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


//probandoxdfdsfsd
export default function App() {

  //aqui solo se guardaran 3 productos que son para el grid
  const [itemProductosGrid, setItemProductosGrid] = useState([]);

  //aqui se guardaran los productos del slider
  const [itemProductosSlider, setItemProductosSlider] = useState([])

  //este loader es porque la api esta en onrender y es lento
  const [loaderHome, setLoaderHome] = useState(true)

  useEffect(() => {
    async function dataRecoleccion() {
      setLoaderHome(true)
      const query = `query{getProducts(texto_a_buscar:"null",categoria:"novedades", numeroDePagina:1,itemsPorPagina:8)
      {
       nombre_producto
       precio_en_dolares,
       firstUrlImagen,
       categoria,
       idProducto
     }
  }`;
      const peticion = await fetch(`${process.env.NEXT_PUBLIC_api}/graphql`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ query: query }),
      });

      const resu = await peticion.json();



      setLoaderHome(false)
      //aqui tengo que hacer la peticion los 8 normalmente pero recortarlo a 3
      setItemProductosGrid(
        resu.data.getProducts.filter((e, ind) => ind < 3)
      )


      setItemProductosSlider(
        resu.data.getProducts.filter((e, ind) => ind > 3)
      );

      console.log("cuanto de length tiene en prnicipal")
      console.log(resu.data.getProducts)


      console.log("probando en seccion slider")
      const prueba = resu.data.getProducts.filter((e, ind) => ind > 3)
      console.log(prueba)
    }

    dataRecoleccion();
  }, []);

  useEffect(() => {
    const productoBloque = document.querySelector(`.${page.productoBloque}`)
    if (loaderHome) {
      //si esta cargando entonces que tenga un viewport adecuado para el loader
      productoBloque.style.cssText = "height:90vh";

    } else {
      productoBloque.style.cssText = "height:auto"
    }
  }, [loaderHome])



  const value = { itemProductosSlider, setItemProductosSlider }

  return (
    <ContextHome.Provider value={value}>
      <div className={page.ventana}>
        <Header></Header>
        <div className={page.inputContainer}>
          <Input></Input>
        </div>
        <div className={page.productoBloque}>


          <div className={page.productoContainer}>
            {itemProductosGrid &&
              itemProductosGrid.map((dataUnidad, indice) => {
                return (
                  <div key={dataUnidad.idProducto}>
                    <ProductoItem data={dataUnidad}></ProductoItem>
                  </div>
                );
              })}
          </div>
          {loaderHome ? <div className={page.loader}></div> : ""}

        </div>
        <ContainerDeslizante></ContainerDeslizante>
        <Footer></Footer>
      </div>
    </ContextHome.Provider>
  );
}
