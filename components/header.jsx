import header from "./header.module.scss";
import { useState, createContext, useContext, useRef, useEffect } from "react";
import Link from "next/link";
import { ContextGlobal } from "@/app/layout";
import io from "socket.io-client";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

//servidor vercel back:https://back-next-eccomerce-7e7kj42g7-pskey35.vercel.app
//const socket = io("http://localhost:9000");
//const socket = io("http://localhost:9000");
const socket = io(`${process.env.NEXT_PUBLIC_serverSockets}`)
export function Input() {
  const inputSearch = useRef();
  const router = useRouter();
  const sugerenciasInputRef = useRef();

  const { setInputHeader } = useContext(ContextGlobal);

  useEffect(() => {
    inputSearch.current.value = new URL(window.location.href).searchParams.get(
      "q"
    );

    const inputChild = document.querySelector(`.${header.inputChild} > input`);
    //ponemos esto en el Context global para usarlo en el /search y poder limpiar cuando se da click en categorias al input
    setInputHeader(header);
  }, []);

  const [listaSugerencias, setListaSugerencias] = useState([]);
  // const { mostrarMenu, setAnimMenu, setMostrarMenu } = useContext(ContextHeader)
  //onKeyUp

  //esta funcion es la del "click" evento es que quiero saber cual es el siguiente click del usuario

  let clickAfuera = null;
  function funcionNextClick(event) {
    //aqui nose requiere del i> 1 porq se esta llamando dentro de un onInput y no de un onClick como normalmente lo solia usar
    //osea que la funcion window.addEvent..... se llama en keyValueInput y este es de tipo onInput

    //aqui para determinar el siguiente click

    // console.log("determinando siguiente click....")
    const sugerenciasListaElements = document.querySelectorAll(
      `.${header.sugerenciasInput_content} > div`
    );
    const idElementoClick = event.target.getAttribute("id");
    //console.log(sugerenciasListaElements)
    //console.log("idelementoClick:" + idElementoClick)
    //este idElementoClick para evitar errores
    if (idElementoClick) {
      for (let e = 0; e < sugerenciasListaElements.length; e++) {
        //si no es igual entonces le ponemos clickAfuera = true;
        if (
          idElementoClick !== sugerenciasListaElements[e].getAttribute("id")
        ) {
          clickAfuera = false;
        } else {
          clickAfuera = true;
        }
      }
    } else if (idElementoClick == "wazaInput") {
      clickAfuera = false;
    } else {
      clickAfuera = true;
    }

    //console.log("clickAfuera:" + clickAfuera)
    //como todo esto es asincrono(osea espera paso por paso) al final vemos que si clickAfuera es true
    if (clickAfuera) {
      //si es true entonces quitamos el sugerenciasElement
      //  const sugerenciasCajaElement = document.querySelector(`.${header.sugerenciasInput}`)
      // sugerenciasCajaElement.style.cssText = "visibility:hidden;opacity:0"

      //verificamos que este definido sale error porque porque seguro es porque se reutiliza
      //el input de mobile desaparece en en pc pero con un display none por eso no lo encuetnra
      if (sugerenciasInputRef.current) {
        sugerenciasInputRef.current.style.cssText =
          "visibility:hidden;opacity:0;max-height:400px;overflow:auto";

        // console.log("AAAAAAAAAAAA")
        // console.log(sugerenciasInputRef)
      }

      window.removeEventListener("click", funcionNextClick);
    }
  }

  const keyValueInput = (e) => {
    //aqui recortamos el valor por si tiene mas de un espacio
    const valorRecortado = inputSearch.current.value
      .replace(/\s+/g, " ")
      .trim();

    if (valorRecortado.length > 0) {
      ///console.log("Holalaa")
      //esto es  si se preciona ENTER
      if (e.keyCode == 13) {
        //verificar si esta el menu activo y si lo esta, quita el menu
        //aqui para el MENU crearemos un componente especial porque este input lo requiero en otros archivos
        //rutas /home y /search
        /*  if (mostrarMenu) {
            setAnimMenu(false)
            setTimeout(() => {
              setMostrarMenu(false)
            }, 400)*/
        //redirect(`/search?q=${valorRecortado}`)
        router.push(`/search?q=${valorRecortado}`);
      }

      //aqui usaremos fetch para mostrar sugerencias hay una tecnica llamada debounce usar eso
      const query = `query{giveSugerenciasInput(textoSearch:"${valorRecortado}"){
        nombre_producto
      }}`;

      fetch(`${process.env.NEXT_PUBLIC_api}/graphql`, {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify({ query }),
      })
        .then((e) => e.json())
        .then((e) => {
          // console.log(e)
          setListaSugerencias(e.data.giveSugerenciasInput);

          if (e.data.giveSugerenciasInput.length == 0) {
            sugerenciasInputRef.current.style.cssText =
              "visibility:visible;opacity:1;height:30px;";
          } else {
            //aqui puse * 29 porq cada ItemLista mide eso con todo y padding
            const calcularHeight = 29 * e.data.giveSugerenciasInput.length;

            //aqui sume +2 porque si no aparecia el scroll de overflow bueno eso lo soluciona
            sugerenciasInputRef.current.style.cssText = `visibility:visible;opacity:1;height:${calcularHeight + 2
              }px;max-height:400px;overflow:auto`;
          }

          //este evento click es para determinar donde sera su siguiente click para poder cerrar ese cuadro ps xd
          window.addEventListener("click", funcionNextClick);
        });
    } else if (e.target.value.length == 0) {
      //si en caso de que el usuario escribio texto y luego borro todo eso de quitar esa sugerenciasElement

      sugerenciasInputRef.current.style.cssText =
        "visibility:hidden;opacity:0;max-height:400px;overflow:auto";
    }
  };

  const clickSugerenciaItem = (textoRecibido) => {
    //redirigimos a su busqueda
    router.push(`/search?q=${textoRecibido}`);
    inputSearch.current.value = textoRecibido;

    //quitamos las sugerencias una vez dado click ya que como es a la misma pagina que redirige
    //ps no recarga ni nada lo cual es bueno para el performance xd

    sugerenciasInputRef.current.style.cssText = "visibility:hidden;opacity:0";
  };

  //cada itemLista mide 29px con todo y padding
  //

  const clickSearch = () => {
    const valorRecortado = inputSearch.current.value
      .replace(/\s+/g, " ")
      .trim();
    if (valorRecortado.length > 0) {
      sugerenciasInputRef.current.style.cssText = `visibility:visible;opacity:1;max-height:400px;overflow:auto`;

      //este evento click es para determinar donde sera su siguiente click para poder cerrar ese cuadro ps xd
      window.addEventListener("click", funcionNextClick);
    }
  };

  const clickLupa = () => {
    //aqui basicamente hace todo como si hubiera sido dado click a uno de los items de sugerencias
    clickSugerenciaItem(inputSearch.current.value);
  };
  return (
    <div className={header.inputContainer}>
      <div className={header.inputChild}>
        <input
          autocomplete="off"
          ref={inputSearch}
          onClick={clickSearch}
          onKeyUp={keyValueInput}
          id="wazaInput"
          type="text"
          placeholder="Buscar productos..."
        />
        <span onClick={clickLupa}>
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
      <div className={header.sugerenciasInput} ref={sugerenciasInputRef}>
        <div className={header.sugerenciasInput_content}>
          {listaSugerencias.length == 0 ? (
            <div
              className={header.noExiste}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{ height: "20px", width: "20px", marginRight: "5px" }}
              >
                <svg
                  style={{ height: "100%", width: "100%" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  id="exclamation-triangle"
                >
                  <path
                    fill="#e55119"
                    d="M12,16a1,1,0,1,0,1,1A1,1,0,0,0,12,16Zm10.67,1.47-8.05-14a3,3,0,0,0-5.24,0l-8,14A3,3,0,0,0,3.94,22H20.06a3,3,0,0,0,2.61-4.53Zm-1.73,2a1,1,0,0,1-.88.51H3.94a1,1,0,0,1-.88-.51,1,1,0,0,1,0-1l8-14a1,1,0,0,1,1.78,0l8.05,14A1,1,0,0,1,20.94,19.49ZM12,8a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V9A1,1,0,0,0,12,8Z"
                  ></path>
                </svg>
              </div>
              <div>no se encontró tu busqueda</div>
            </div>
          ) : (
            listaSugerencias.map((dataUnidad, indice) => {
              return (
                <div
                  key={`sugerencia-${indice}`}
                  id={`sugerenciaID_${indice}`}
                  onClick={() =>
                    clickSugerenciaItem(dataUnidad.nombre_producto)
                  }
                >
                  {dataUnidad.nombre_producto}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

function ProductoCar({ data, id, indice }) {
  //el indice lo usare para saber que posicion del producto es el que esta sumando o restando para actualizar el estado carrito
  const { setConteoCar } = useContext(ContextHeader);
  const { dataCarrito, setDataCarrito, setModifyProduct } =
    useContext(ContextGlobal);

  //este loader es para cuando se da click en borrarProducto sumar o restar
  const [loader, setLoader] = useState({
    deleteLoader: { isLoading: false, saveInDatabase: null },
    sumaLoader: { isLoading: false, saveInDatabase: null },
    restaLoader: { isLoading: false, saveInDatabase: null },
  });

  const ekisElementRef = useRef();
  const sumaElementRef = useRef();
  const restaElementRef = useRef();

  const clickBorrarProducto = (idRecibido) => {
    // console.log("borrando.....")
    const ekisElement = ekisElementRef.current;
    // console.log(ekisElement)
    ekisElement.style.cursor = "not-allowed";
    setLoader((prevState) => ({
      ...prevState,
      deleteLoader: { isLoading: true, savingInDatabase: false },
    }));

    // console.log("borrando producto....")
    //primero se elimina el producto de la database y luego recien se ejecuta la animacion esa de eliminacion
    const prodCar = localStorage.getItem("prodCar");

    const query = `mutation{deleteProducto(idCar:"${prodCar}",idProducto:"${idRecibido}"){
      error
    }}`;

    fetch(`${process.env.NEXT_PUBLIC_api}/graphql`, {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((e) => e.json())
      .then((e) => {
        if (e.data.deleteProducto.error == false) {
          const x = document.querySelector(`#prod-${idRecibido}`);
          //x.style.opacity = "0"
          //x.style.animation = "salidaProducto 1s ease"
          /* x.style.animationName = "salidaProducto";
           x.style.animationDuration = "1s";*/

          //aqui hay un error en la animacion a la hora de eliminar un producto
          //aqui no se nota ese error porque pasa rapido pero hay un pequeño transicion brusco
          //ese error era por el margin creo ya no me acuerdo
          //busca el archivo errorAnimacion.html ahi solucionalo
          x.style.animation = `${header.salidaProducto} 200ms ease forwards`;
          setTimeout(() => {
            x.style.height = "0px";
            setTimeout(() => {
              //terminado toda la animacion recien elimanos realmente de la interfaz
              setDataCarrito((prevState) => {
                let newItems = [...prevState];
                //usar filter con el idProducto
                let filtrado = newItems.filter(
                  (dataUnidad) => dataUnidad.idProducto !== id
                );

                return filtrado;
              });

              setLoader((prevState) => ({
                ...prevState,
                deleteLoader: { isLoading: false, saveInDatabase: true },
              }));
              ekisElement.style.cursor = "pointer";
              //poner esto de setConteoCar..me salia -1 en el carrito al eliminar
              // setConteoCar(prev => prev) //aqui ya no se resta ya que hay un useEffect que detecta cuando se cambia el estao carrito y automaticamente se resta

              setModifyProduct((prev) => !prev);
            }, 200);
          }, 200);
        }
      });
  };

  const clickRestaProducto = (idRecibido, cantidadProducto) => {
    /*Por otro lado, cuando utilizas paréntesis () alrededor del cuerpo de la función de flecha (prev => (...)), JavaScript asume 
    que todo dentro de los paréntesis es la expresión que 
    se debe devolver. En este caso, estás utilizando la
     notación de objeto ({ ... }), que es una expresión, 
     y por lo tanto, JavaScript interpreta automáticamente
      que eso es lo que debe devolver.*/
    /*setLoader(prev => ({
 ...prev,
 restaLoader: true
}));*/
    //aqui usare esto de momento xd
    restaElementRef.current.style.cursor = "not-allowed";
    setLoader((prev) => {
      return {
        ...prev,
        restaLoader: { isLoading: true, saveInDatabase: false },
      };
    });
    //console.log(loader.restaLoader)
    //si aqui vemos que cantidadProducto tiene 1 entonces se resta y seria 0 asi que mejor usar la funcion eliminar
    if (cantidadProducto == 1) {
      //  console.log("se detecto que es 1 entonces mejor se elimina el producto")
      clickBorrarProducto(idRecibido);
      return;
    }
    // console.log("restando producto....")
    const prodCar = localStorage.getItem("prodCar");
    const query = `mutation{restaProducto(idCar:"${prodCar}",idProducto:"${idRecibido}"){
      error,
      cantidadProducto
    }}`;

    fetch(`${process.env.NEXT_PUBLIC_api}/graphql`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((e) => e.json())
      .then((e) => {
        setDataCarrito((prevState) => {
          let newItems = [...prevState]; //copiamos el array de objetos

          //modificamos lo necesario
          newItems[indice].cantidadProducto =
            e.data.restaProducto.cantidadProducto;
          return newItems;
        });

        setLoader((prev) => ({
          ...prev,
          restaLoader: { isLoading: false, saveInDatabase: true },
        }));

        restaElementRef.current.style.cursor = "pointer";

        setModifyProduct((prev) => !prev);
      });
  };

  //aqui se ejecuta cuando se da click al icono de sumar.svg
  const clickSumaProducto = (idRecibido) => {
    sumaElementRef.current.style.cursor = "not-allowed";

    setLoader((prevState) => ({
      ...prevState,
      sumaLoader: { isLoading: true, saveInDatabase: false },
    }));

    // console.log("sumandoPRoducto...")
    const prodCar = localStorage.getItem("prodCar");

    const query = `mutation{addProducto(idCar:"${prodCar}",idProducto:"${idRecibido}"){
      error,
      cantidadProducto,
      idProducto
    }}`;
    fetch(`${process.env.NEXT_PUBLIC_api}/graphql`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((e) => e.json())
      .then((e) => {
        //  console.log(e)

        //aqui ya no se usa setConteoCar --- porq el useEffect detecta cuando cambia el estado carrito automaticamente cambia ese valor del conteo
        setDataCarrito((prevState) => {
          let newItems = [...prevState];

          //este indice se saca del prop (ProductoCar)
          newItems[indice].cantidadProducto =
            e.data.addProducto.cantidadProducto;
          return newItems;
        });

        setLoader((prevState) => ({
          ...prevState,
          sumaLoader: { isLoading: false, saveInDatabase: true },
        }));

        sumaElementRef.current.style.cursor = "pointer";

        //este modify es para poder escuchar eventos en socket io en el carrito
        setModifyProduct((prev) => !prev);
      });
  };

  useEffect(() => {
    const funcionAsync = (recibeKey) => {
      if (recibeKey == "deleteLoader") {
        // console.log("DELETEADOOOO")
        clickBorrarProducto(id);
      } else if (recibeKey == "sumaLoader") {
        clickSumaProducto(id);
      } else if (recibeKey == "restaLoader") {
        clickRestaProducto(id, data.cantidadProducto);
      }
    };
    // console.log("****//**")
    Object.keys(loader).forEach((key) => {
      //const valor = loader.key.saveInDatabase //esto no funciona porque se lee como "key" literal
      const valor = loader[key].saveInDatabase; //esto si funciona porque transforma ese string de variable key a metodo
      // console.log(valor)
      if (valor == false) {
        funcionAsync(key);
      } else if (valor == true) {
      }
    });
  }, [
    loader.deleteLoader.saveInDatabase,
    loader.sumaLoader.saveInDatabase,
    loader.restaLoader.saveInDatabase,
  ]);

  const LoaderJSX = () => {
    return (
      <div className={header.circles}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  };

  const clickModifyState = (typeLoader) => {
    setLoader((prevState) => ({
      ...prevState,
      [typeLoader]: { isLoading: true, saveInDatabase: false },
    }));
  };

  //necesito que setDataCarrito(dataCarrito.filter(e=>e.product)
  return (
    <div className={header.productoContainer} id={`prod-${id}`}>
      <div className={header.producto}>
        <div className={header.producto_left}>
          <div className={header.cajaImagen}>
            <div className={header.imagenContainer}>
              <img src={`${data.imgUrl_first}`} />
            </div>
            <div
              className={header.ekis}
              ref={ekisElementRef}
              onClick={() => clickModifyState("deleteLoader")}
            >
              {loader.deleteLoader.isLoading == true ? (
                <LoaderJSX></LoaderJSX>
              ) : (
                <div className={header.boton}>
                  <svg
                    fill="white"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="black"
                    aria-hidden="true"
                    class="hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </div>
              )}
            </div>
          </div>
          <div className={header.detalles}>
            <p>{data.nombre_producto}</p>
            <p>
              {data.color}/{data.talla}
            </p>
          </div>
        </div>
        <div className={header.producto_right}>
          <div className={header.top}>
            <p>{data.precio_en_dolares}$USD</p>
          </div>
          <div className={header.bottom}>
            <div
              className={header.imagen}
              ref={restaElementRef}
              onClick={() => clickModifyState("restaLoader")}
            >
              {loader.restaLoader.isLoading == true ? (
                <LoaderJSX></LoaderJSX>
              ) : (
                <img src="/resta.svg" />
              )}
            </div>
            <div className={header.totalItem}>{data.cantidadProducto}</div>
            <div
              className={header.imagen}
              ref={sumaElementRef}
              onClick={() => clickModifyState("sumaLoader")}
            >
              {loader.sumaLoader.isLoading == true ? (
                <LoaderJSX></LoaderJSX>
              ) : (
                <img src="/suma.svg" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CajaCompras() {
  const router = useRouter();
  //este ContextGlobal esta en el archivo layout.jsx
  const { setDataCarrito, dataCarrito } = useContext(ContextGlobal);

  useEffect(() => {
    let total_a_pagar = 0;

    dataCarrito.map((dataUnidad, indice) => {
      //aqui sacamos la cuenta cuanto cuesta el producto y cuantos  a agregado al carrito
      const totalPorItem =
        dataUnidad.cantidadProducto * dataUnidad.precio_en_dolares;

      total_a_pagar = totalPorItem;
    });

    const headerCajaElement = document.querySelector(`#total_a_pagar`);
    headerCajaElement.textContent = `${total_a_pagar} $USD`;
    // console.log("pagar...")
    // console.log(total_a_pagar)
  }, [dataCarrito]);

  const clickGoCaja = () => {
    //esto te redirige a la ruta checkout
    router.push(`/checkout/information`);
  };
  return (
    <div className={header.cajaCompras}>
      <div className={header.caja}>
        {dataCarrito.map((dataUnidad, indice) => {
          return (
            <ProductoCar
              key={dataUnidad.idProducto}
              id={dataUnidad.idProducto}
              data={dataUnidad}
              indice={indice}
            ></ProductoCar>
          );
        })}
      </div>
      <div className={header.otros}>
        <div className={header.otros_caja}>
          <p>Impuestos</p>
          <p>0,00 $USD</p>
        </div>
        <div className={header.otros_caja}>
          <p>Shipping</p>
          <p>1.50 $USD</p>
        </div>
        <div className={header.otros_caja}>
          <p>Total</p>
          <p id="total_a_pagar"></p>
        </div>
        <div className={header.otros_botonPagar} onClick={clickGoCaja}>
          Pasar por la caja
        </div>
      </div>
    </div>
  );
}

function CarritoPage() {
  const { animCarrito, setAnimCarrito, setMostrarCarrito, conteoCar } =
    useContext(ContextHeader);

  //cuando se da click en botonCarrito animCarrito pasa a true
  const clickCerrarCarrito = () => {
    setAnimCarrito(false);
    setTimeout(() => {
      setMostrarCarrito(false);
    }, 200);
  };

  const clickCarritoLeft = () => {
    clickCerrarCarrito();
  };

  return (
    <div
      className={`${header.carritoPage} ${animCarrito ? "" : header.carritoPageSalida
        }`}
    >
      <div
        className={header.carritoLeft}
        style={{
          animation: animCarrito ? "" : "carritoLeftSalida ease 100ms forwards",
        }}
        onClick={clickCarritoLeft}
      ></div>
      <div
        className={`${header.carritoRight} ${animCarrito ? "" : header.carritoRightSalida
          }`}
      >
        <div className={header.carrito_first}>
          <div>Mi Carrito</div>
          <div className={header.botonContainer} onClick={clickCerrarCarrito}>
            <div className={header.botonEkis}>
              <img src="/ekis.svg" />
            </div>
          </div>
        </div>
        {/*conteoCar == 0*/}
        {conteoCar == 0 ? (
          <div className={header.carrito_vacio}>
            <div>
              <img src="/carrito.svg" />
            </div>
            <p>Tu carrito esta vacio</p>
          </div>
        ) : (
          <CajaCompras></CajaCompras>
        )}
      </div>
    </div>
  );
}

//esto solo se muestra en dispositivos mobiles
function MenuPage() {
  const { setMostrarMenu, animMenu, setAnimMenu } = useContext(ContextHeader);

  const clickCerrarMenu = () => {
    setAnimMenu(false);
    setTimeout(() => {
      setMostrarMenu(false);
    }, 400);
  };
  return (
    <div
      className={`${header.menuPage} ${animMenu ? "" : header.menuPageSalida}`}
    >
      <div className={header.menuContainer}>
        <div className={header.menuPageEkis} onClick={clickCerrarMenu}>
          <img src="/ekis.svg" />
        </div>
        <div className={header.menu_inputContainer}>
          <Input></Input>
        </div>
        <ul className={header.menu_lista}>
          <li>Tecnología</li>
          <li>Novedades</li>
          <li>Todo</li>
        </ul>
      </div>
    </div>
  );
}

export const ContextHeader = createContext();

function Login() {
  const focusInput = (event) => {
    if (event.target.getAttribute("id") == "email") {
      const labelEmail = document.querySelector("#labelEmail");
      labelEmail.style.cssText = "font-size:10px;top:-15px";
    } else if (event.target.getAttribute("id") == "password") {
      const labelPassword = document.querySelector("#labelPassword");
      labelPassword.style.cssText = "font-size:10px;top:-10px";
    }
  };

  const blurInput = (event) => {
    if (event.target.getAttribute("id") == "email") {
      const labelEmail = document.querySelector("#labelEmail");
      labelEmail.style.cssText = "font-size:16px;top:4px";
    } else if (event.target.getAttribute("id") == "password") {
      const labelPassword = document.querySelector("#labelPassword");
      labelPassword.style.cssText = "font-size:16px;top:4px";
    }
  };

  return (
    <div className={header.registroCaja}>
      <div className={header.registroCaja_content}>
        <div className={header.registro_first}>
          <div className={header.ekisIcon}>
            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="m18.442 2.442-.884-.884L10 9.116 2.442 1.558l-.884.884L9.116 10l-7.558 7.558.884.884L10 10.884l7.558 7.558.884-.884L10.884 10l7.558-7.558Z"></path>
            </svg>
          </div>
        </div>
        <div className={header.registro_second}>
          <div className={header.registro_second_content}>
            <h1>Iniciar sesion</h1>
            <p>
              <span>Al continuar, aceptar nuestro </span>
              <Link href="/">Acuerdo del usuario</Link>
              <span> confirmas que has entendido la </span>
              <Link href="/">Politica de privacidad</Link>
            </p>
            <div className={header.registroGoogle}>
              <svg viewBox="0 0 48 48" class="LgbsSe-Bz112c">
                <g>
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  ></path>
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  ></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </g>
              </svg>
              <span>Continuar con Google</span>
            </div>
            <div className={header.registroApple}>
              <svg
                viewBox="0 0 18 18"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  strike="inherit"
                  d="m8.8162 4.15385c.78824 0 1.7763-.54927 2.3647-1.28163.5329-.6637.9215-1.59059.9215-2.517484 0-.125875-.0111-.251748-.0333-.354736-.8771.0343293-1.9318.606484-2.56458 1.37317-.49959.5836-.95477 1.49905-.95477 2.43738 0 .13732.02221.27464.03331.32041.05551.01144.14433.02289.23314.02289zm-2.77549 13.84615c1.07689 0 1.55427-.7438 2.89761-.7438 1.36558 0 1.66528.7209 2.86428.7209 1.1768 0 1.9651-1.1214 2.7089-2.2199.8327-1.2588 1.1768-2.4946 1.199-2.5519-.0777-.0228-2.3314-.9726-2.3314-3.63887 0-2.3115 1.7763-3.35283 1.8762-3.43293-1.1768-1.73935-2.9642-1.78512-3.4527-1.78512-1.3211 0-2.39799.8239-3.07521.8239-.73274 0-1.69861-.77813-2.84211-.77813-2.17599 0-4.38528 1.85378-4.38528 5.35537 0 2.17418.82155 4.47428 1.83183 5.96188.86595 1.2587 1.62088 2.2886 2.70888 2.2886z"
                ></path>
              </svg>
              <span>Continuar con Apple</span>
            </div>
            <div className={header.barra}>
              <span></span>
              <span>O</span>
              <span></span>
            </div>

            <div className={header.inputsContainer}>
              <div className={header.cajaInput}>
                <label for="email" id="labelEmail">
                  Correo electrónico o nombre de usuario *
                </label>
                <input
                  id="email"
                  onFocus={focusInput}
                  onBlur={blurInput}
                ></input>
              </div>
              <div className={header.cajaInput}>
                <label for="password" id="labelPassword">
                  Contraseña *
                </label>
                <input
                  id="password"
                  onFocus={focusInput}
                  onBlur={blurInput}
                ></input>
              </div>
            </div>
            <div className={header.ayuda}>
              <Link href="/">Has olvidado tu contraseña?</Link>
              <p>
                Es tu primera vez en NOMBRE?
                <Link href="/">Registrate</Link>
              </p>
            </div>
          </div>
        </div>
        <div className={header.registro_third}>
          <div className={header.signInBoton}>Iniciar sesión</div>
        </div>
      </div>
    </div>
  );
}

function SettingsMobile() {
  const lista = [
    "español",
    "ingles",
    "frances",
    "italiano",
    "portugues",
    "ruso",
    "arabe",
  ];
  const [listaIdiomas, setListaIdiomas] = useState(lista);

  const refMonedaAutoCmptd = useRef();
  const refIdiomaCmptd = useRef();

  const onKeyUpIdioma = (event) => {
    //filtrado para el autocompletado
    setListaIdiomas(
      listaIdiomas.filter((item, ind) => {
        const newLista = item
          .toLowerCase()
          .includes(event.target.value.toLowerCase());

        return newLista;
      })
    );
  };

  const { setMostrarSettings } = useContext(ContextHeader);

  useEffect(() => {
    setTimeout(() => {
      //cuando se renderize por primera vez tenemos que aplicar los estilos de mostrar
      const settingsContainer = document.querySelector(
        `.${header.settingsContainer}`
      );
      settingsContainer.style.visibility = "visible";
      settingsContainer.style.opacity = "1";
      console.log(settingsContainer);
    }, 0);
  }, []);

  useEffect(() => {
    //28 porque es lo que mide un item de un solo sugerencia
    const cuentaTotal = 28 * listaIdiomas.length;
    console.log(cuentaTotal);
  }, [listaIdiomas]);

  const focusInput = (referencia) => {
    referencia.current.style.cssText = "opacity:1;visibility:visible";
  };

  const blurInput = (referencia) => {
    referencia.current.style.cssText = "opacity:0;visibility:hidden";
  };

  const clickSettingsEkis = () => {
    //si se da click al ekis se elimina todo
    //cuando se renderize por primera vez tenemos que aplicar los estilos de mostrar
    const settingsContainer = document.querySelector(
      `.${header.settingsContainer}`
    );
    settingsContainer.style.visibility = "hidden";
    settingsContainer.style.opacity = "0";
    console.log(settingsContainer);

    settingsContainer.addEventListener("transitionend", () => {
      setMostrarSettings(false);
    });

    //simulamos click esto para eliminar las cosas que tiene como outline
    const spanEkis = document.querySelector(`.${header.settingsIcon}`);
    spanEkis.click();
  };

  return (
    <div className={header.settingsContainer}>
      {/*probablemente a futuro aqui agrege lo de THEMES light y dark ahora no*/}
      <div className={header.firstBlock}>
        <div className={header.ekis}>
          <span onClick={clickSettingsEkis}>
            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="m18.442 2.442-.884-.884L10 9.116 2.442 1.558l-.884.884L9.116 10l-7.558 7.558.884.884L10 10.884l7.558 7.558.884-.884L10.884 10l7.558-7.558Z"></path>
            </svg>
          </span>
        </div>
        <h1>Settings</h1>
        <div className={header.idiomaContainer}>
          <h4>Idioma</h4>
          <p>escoje el idioma que quieres vizualir para la pagina</p>
          <div className={header.inputSettings}>
            <div className={header.inputSettings_content}>
              <input
                placeholder="Español"
                onFocus={() => focusInput(refIdiomaCmptd)}
                onBlur={() => blurInput(refIdiomaCmptd)}
                onKeyUp={onKeyUpIdioma}
              ></input>
              <span className={header.iconoLupa}>
                <svg viewBox="0 0 48 48" fill="#4b4b4b">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"
                  ></path>
                </svg>
              </span>
            </div>
            <div
              className={header.inputSettings_autoCmptd}
              ref={refIdiomaCmptd}
            >
              <div className={header.inputSettings_autoCmptd_content}>
                {listaIdiomas.map((dataUnidad,index) => {
                  return (
                    <div className={header.autoCmptd_item} key={`idiomas-${index}`}>{dataUnidad}</div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={header.monedaContainer}>
          <h4>Moneda</h4>
          <p>escoje la moneda para poder ver los productos a tu moneda local</p>
          <div className={header.inputSettings}>
            <div className={header.inputSettings_content}>
              <input
                placeholder="Español"
                onFocus={() => focusInput(refMonedaAutoCmptd)}
                onBlur={() => blurInput(refMonedaAutoCmptd)}
                onKeyUp={onKeyUpIdioma}
              ></input>
              <span className={header.iconoLupa}>
                <svg viewBox="0 0 48 48" fill="#4b4b4b">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"
                  ></path>
                </svg>
              </span>
            </div>
            <div
              className={header.inputSettings_autoCmptd}
              ref={refMonedaAutoCmptd}
            >
              <div className={header.inputSettings_autoCmptd_content}>
               
                {listaIdiomas.map((dataUnidad,index) => {
                  return (
                    <div className={header.autoCmptd_item} key={index} >{dataUnidad}</div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={header.saveChangesButton}>hola</div>
    </div>
  );
}

//esta opcion es la de cookie si acepta o no mas que nada
//lo hago para que se vea profesional haha
function CookieModal() {





  const { setCookieModal } = useContext(ContextHeader)
  const clickCerrarCookies = () => {
    //si se cierra el cookie entonces en localstorage guardamos un valor para no volvera  mostrar
    //el seccion de cookie
    //si ya se dio click a cerrar cookies entonces para que no se muestre otra vez
    //si el usuario va a otra seccion de la pagina 
    localStorage.setItem("cookie", "hidden")

    const cookieModal = document.querySelector(`.${header.cookieCaja}`)
    console.log(cookieModal)
    cookieModal.style.animation = `${header.closeCookies} 200ms ease forwards`

    setTimeout(() => {
      setCookieModal(false)
    }, 210)



  }


  return (
    <div className={header.cookieCaja}>
      <div className={header.ekisCookies} onClick={clickCerrarCookies}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          stroke="gray"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          aria-hidden="true"
          class="h-6 transition-all ease-in-out hover:scale-110 "
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </div>
      <div className={header.cookieMensaje}>
        <div className={header.cookieImg}>
          <svg viewBox="0 0 416.991 416.991">
            <g>
              <g>
                <path
                  style={{ fill: "#D4B783" }}
                  d="M344.649,204.32c-7.807,3.62-16.314,5.501-25.067,5.503c-10.392,0.001-20.665-2.759-29.711-7.982
			c-16.886-9.749-27.772-27.175-29.52-46.218c-19.143-1.749-36.518-12.726-46.216-29.523c-9.747-16.882-10.465-37.41-2.462-54.773
			c-12.251-8.607-20.792-21.491-23.926-36.143c-41.698,1.338-79.982,16.399-110.502,40.79c7.997,7.752,12.731,18.522,12.731,30.139
			c0,14.868-7.772,27.946-19.461,35.412c-6.518,4.163-14.248,6.588-22.539,6.588c-5.841,0-11.538-1.211-16.78-3.498
			c-0.026,0.027-0.052,0.053-0.078,0.08c-1.962,5.439-3.673,10.997-5.136,16.655C22.086,176.423,20,192.219,20,208.496
			c0,103.937,84.559,188.496,188.495,188.496c41.112,0,79.18-13.243,110.192-35.67c0.654-0.587,1.493-1.204,2.467-1.842
			c11.615-8.688,22.217-18.658,31.549-29.74c-10.812-7.738-17.66-20.402-17.66-34.193c0-9.15,2.95-17.619,7.937-24.526
			c7.339-10.164,19.105-16.916,32.449-17.425c0.523-0.029,1.057-0.049,1.615-0.049c0.404,0,0.807,0.014,1.21,0.026
			c1.405-8.275,2.272-16.73,2.548-25.333C366.147,225.109,353.26,216.57,344.649,204.32z M132.435,334.871
			c-13.093,0-24.803-6.025-32.512-15.445c-6.215-7.325-9.976-16.795-9.976-27.131c0-23.159,18.841-42,42-42
			c13.093,0,24.804,6.025,32.512,15.445c6.215,7.325,9.976,16.795,9.976,27.131C174.435,316.03,155.595,334.871,132.435,334.871z
			 M160.194,183.688c-13.093,0-24.803-6.025-32.512-15.445c-6.215-7.325-9.976-16.795-9.976-27.131c0-23.159,18.841-42,42-42
			c13.093,0,24.803,6.025,32.512,15.445c6.215,7.325,9.976,16.795,9.976,27.131C202.194,164.846,183.354,183.688,160.194,183.688z
			 M246.963,314.835c-16.814,0-31.855-7.727-41.767-19.815c-7.929-9.401-12.721-21.53-12.721-34.762c0-29.776,24.225-54,54-54
			c16.814,0,31.855,7.727,41.767,19.815c7.929,9.401,12.721,21.53,12.721,34.762C300.963,290.611,276.738,314.835,246.963,314.835z"
                />
                <path
                  style={{ fill: "#89634A" }}
                  d="M159.706,163.111c12.131,0,22-9.869,22-22c0-12.131-9.869-22-22-22c-12.131,0-22,9.869-22,22
			C137.706,153.242,147.576,163.111,159.706,163.111z"
                />
                <path
                  style={{ fill: "#89634A" }}
                  d="M131.948,314.295c12.131,0,22-9.869,22-22c0-12.131-9.869-22-22-22c-12.131,0-22,9.869-22,22
			C109.948,304.426,119.817,314.295,131.948,314.295z"
                />
                <path
                  style={{ fill: "#89634A" }}
                  d="M69.977,106.111c0-6.503-2.838-12.494-7.563-16.596c-9.154,11.218-17.041,23.505-23.448,36.643
			c2.809,1.265,5.866,1.954,9.011,1.954C60.108,128.111,69.977,118.242,69.977,106.111z"
                />
                <path
                  style={{ fill: "#89634A" }}
                  d="M355.043,295.546c0,7.423,3.79,14.218,9.724,18.234c8.124-12.02,14.894-25.024,20.101-38.79
			c-2.469-0.943-5.101-1.444-7.825-1.444C364.913,273.546,355.043,283.415,355.043,295.546z"
                />
                <path
                  style={{ fill: "#89634A" }}
                  d="M246.475,294.259c18.748,0,34-15.253,34-34c0-18.748-15.252-34-34-34c-18.748,0-34,15.252-34,34
			C212.475,279.006,227.727,294.259,246.475,294.259z"
                />
              </g>
              <g>
                <path
                  style={{ fill: "#89634A" }}
                  d="M192.218,114.556c5.926,7.242,9.488,16.489,9.488,26.555c0,23.159-18.841,42-42,42
			c-12.822,0-24.314-5.782-32.024-14.869c7.708,9.42,19.419,15.445,32.512,15.445c23.159,0,42-18.841,42-42
			C202.194,131.351,198.434,121.881,192.218,114.556z"
                />
                <path
                  style={{ fill: "#89634A" }}
                  d="M173.948,292.295c0,23.159-18.841,42-42,42c-12.822,0-24.314-5.782-32.024-14.869
			c7.709,9.42,19.419,15.445,32.512,15.445c23.159,0,42-18.841,42-42c0-10.337-3.761-19.806-9.976-27.131
			C170.385,272.982,173.948,282.229,173.948,292.295z"
                />
                <path
                  style={{ fill: "#89634A" }}
                  d="M300.475,260.259c0,29.776-24.225,54-54,54c-16.543,0-31.365-7.485-41.279-19.238
			c9.911,12.087,24.952,19.815,41.767,19.815c29.775,0,54-24.224,54-54c0-13.232-4.792-25.361-12.721-34.762
			C295.882,235.391,300.475,247.297,300.475,260.259z"
                />
                <path
                  d="M159.706,183.111c23.159,0,42-18.841,42-42c0-10.066-3.562-19.313-9.488-26.555c-7.708-9.42-19.418-15.445-32.512-15.445
			c-23.159,0-42,18.841-42,42c0,10.337,3.761,19.806,9.976,27.131C135.393,177.329,146.884,183.111,159.706,183.111z
			 M159.706,119.111c12.131,0,22,9.869,22,22c0,12.131-9.869,22-22,22c-12.131,0-22-9.869-22-22
			C137.706,128.98,147.576,119.111,159.706,119.111z"
                />
                <path
                  d="M131.948,334.295c23.159,0,42-18.841,42-42c0-10.066-3.562-19.313-9.488-26.555c-7.708-9.42-19.419-15.445-32.512-15.445
			c-23.159,0-42,18.841-42,42c0,10.337,3.761,19.806,9.976,27.131C107.634,328.513,119.125,334.295,131.948,334.295z
			 M131.948,270.295c12.131,0,22,9.869,22,22c0,12.131-9.869,22-22,22c-12.131,0-22-9.869-22-22
			C109.948,280.164,119.817,270.295,131.948,270.295z"
                />
                <path
                  d="M416.97,206.596l-0.013-0.831c-0.064-5.279-4.222-9.598-9.494-9.864c-14.875-0.751-28.007-9.639-34.27-23.193
			c-1.245-2.694-3.623-4.696-6.489-5.465c-2.867-0.769-5.927-0.224-8.353,1.487c-6.706,4.73-14.927,7.335-23.146,7.336
			c-6.964,0-13.857-1.854-19.935-5.363c-13.458-7.77-21.242-22.803-19.83-38.299c0.269-2.956-0.789-5.879-2.888-7.977
			c-2.1-2.1-5.033-3.154-7.977-2.889c-1.195,0.109-2.411,0.164-3.614,0.164c-14.272,0-27.562-7.662-34.683-19.996
			c-7.77-13.458-6.994-30.369,1.976-43.084c1.711-2.425,2.257-5.485,1.488-8.352c-0.768-2.867-2.77-5.245-5.464-6.49
			c-13.548-6.262-22.434-19.387-23.189-34.254c-0.268-5.269-4.583-9.424-9.858-9.492l-0.816-0.013C209.777,0.01,209.137,0,208.496,0
			C93.531,0,0.001,93.531,0.001,208.496s93.53,208.496,208.495,208.496s208.495-93.531,208.495-208.496
			C416.991,207.861,416.981,207.229,416.97,206.596z M62.414,89.515c4.725,4.102,7.563,10.093,7.563,16.596c0,12.131-9.869,22-22,22
			c-3.145,0-6.202-0.689-9.011-1.954C45.373,113.02,53.26,100.733,62.414,89.515z M364.768,313.781
			c-5.935-4.016-9.724-10.811-9.724-18.234c0-12.131,9.869-22,22-22c2.725,0,5.356,0.501,7.825,1.444
			C379.662,288.757,372.892,301.761,364.768,313.781z M390.948,255.926c-4.067-1.428-8.354-2.227-12.695-2.354
			c-0.403-0.012-0.806-0.026-1.21-0.026c-0.542,0-1.077,0.029-1.615,0.049c-13.344,0.509-25.11,7.26-32.449,17.425
			c-4.987,6.906-7.937,15.376-7.937,24.526c0,13.791,6.848,26.454,17.66,34.193c-9.332,11.082-19.935,21.052-31.549,29.74
			c-0.822,0.615-1.635,1.24-2.467,1.842c-31.012,22.428-69.08,35.67-110.192,35.67C104.559,396.991,20,312.433,20,208.496
			c0-16.276,2.085-32.073,5.983-47.148c1.463-5.657,3.174-11.215,5.136-16.655c0.012-0.032,0.022-0.065,0.034-0.098
			c0.014,0.006,0.029,0.011,0.044,0.018c5.242,2.287,10.938,3.498,16.78,3.498c8.291,0,16.021-2.425,22.539-6.588
			c11.688-7.466,19.461-20.544,19.461-35.412c0-11.617-4.733-22.387-12.731-30.139c-0.451-0.437-0.906-0.869-1.377-1.286
			c32.732-32.446,77.26-53.009,126.502-54.589c3.157,14.763,11.764,27.746,24.107,36.418c-8.064,17.495-7.341,38.179,2.48,55.19
			c9.771,16.925,27.278,27.985,46.567,29.748c1.761,19.188,12.729,36.747,29.744,46.57c9.114,5.262,19.466,8.043,29.936,8.042
			c8.82-0.001,17.392-1.897,25.258-5.544c8.676,12.343,21.661,20.947,36.427,24.102C396.436,228.84,394.398,242.665,390.948,255.926
			z"
                />
                <path
                  d="M246.475,314.259c29.775,0,54-24.224,54-54c0-12.961-4.593-24.868-12.233-34.185
			c-9.911-12.087-24.952-19.815-41.767-19.815c-29.775,0-54,24.224-54,54c0,13.232,4.792,25.361,12.721,34.762
			C215.11,306.774,229.932,314.259,246.475,314.259z M246.475,226.259c18.748,0,34,15.252,34,34c0,18.747-15.252,34-34,34
			c-18.748,0-34-15.253-34-34C212.475,241.511,227.727,226.259,246.475,226.259z"
                />
              </g>
            </g>
          </svg>
        </div>
        <div className={header.cookie_realMensaje}>
          <h2>Ten un Cookie ;&#41;</h2>
          <p>Nuestro sitio web usa cookies si sigues navegando
            en nuestra web tu estas aceptando las cookies
          </p>
        </div>
      </div>

      <div className={header.opciones}>
        <div onClick={clickCerrarCookies}>Rechazar</div>
        <div
          onClick={clickCerrarCookies}>Acepto</div>
      </div>
    </div>
  );
}

export default function Header() {

  const [t, i18n] = useTranslation("global")

  //importamos dataCarrito donde se guarda todos los productos de ContextGlobal
  const { setDataCarrito, dataCarrito, setAbrirCarritoFuncion, modifyProduct } =
    useContext(ContextGlobal);
  //aqui servira para poner la animacion de entrada si es false es porque esta en salida
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  //esto de abajo anima la entrada
  const [animCarrito, setAnimCarrito] = useState(false);

  const [mostrarMenu, setMostrarMenu] = useState(true);

  const [animMenu, setAnimMenu] = useState(false);

  const [conteoCar, setConteoCar] = useState(0);

  //esto se mostrara cuando se da click en boton registrar
  const [mostrarLogin, setMostrarLogin] = useState(false);

  const [mostrarSettings, setMostrarSettings] = useState(false);

  const [clickedBotonSettings, setClickedBotonSettings] = useState(false);

  //abre o cierra la cookie Caja
  const [cookieModal, setCookieModal] = useState(false);

  useEffect(() => {
  
    const getCookieStorage = localStorage.getItem("cookie")
    if (getCookieStorage) {
    
      //si ya se dio click a ocultar cookie entonces no deberiamos de retornar nada
      if (getCookieStorage == "hidden") {
        setCookieModal(false)
      }
    }else{
      setCookieModal(true)
    }

}, [])

useEffect(() => {
  //aqui cada vez que detecte un cambio en data carrito se actualizara el conteoCar
  //actualizar el conteoCar
  let conteoCar = 0;
  dataCarrito.map((dataUnidad) => {
    conteoCar += dataUnidad.cantidadProducto;
  });

  setConteoCar(conteoCar);
}, [dataCarrito]);

useEffect(() => {
  // console.clear()
  // console.log("MODIFIIIII")

  //si cambia el estado de esto es porque se dio a delete sumar o restar producto

  const prodCar = localStorage.getItem("prodCar");

  const giveAllProductsCarFunction = (dataCarro) => {
    //  console.log("******")
    //  console.log(dataCarro)
    setDataCarrito(dataCarro);
  };

  //console.log("MODIFICADOOOOO")
  if (prodCar) {
    socket.emit("envioGiveAllProductsCar", { idCar: prodCar });

    socket.on("give_all_products_car", giveAllProductsCarFunction);
  }

  return () => {
    socket.off("give_all_products_car", giveAllProductsCarFunction);
  };
}, [, modifyProduct]); //esto se renderiza la primera vez que cargue la pagina y ademas cuando cambie el modifyProduct

//este boton servira para abrir la pagina del carrito
const clickMostrarCarrito = () => {
  setMostrarCarrito(true);
  //por alguna razon esto funciona para las animaciones xd
  setAnimCarrito(true);
};

const clickMostrarMenu = () => {
  setMostrarMenu(true);
  setAnimMenu(true);
};

useEffect(() => {
  //con esto pasamo la funcion clickMostrarCarrito para ser usado en todas las  paginas
  setAbrirCarritoFuncion(() => clickMostrarCarrito);
}, []);

const router = useRouter();

const redirect = (url) => {
  router.push(`/search?ctg=${url}`);
};


const clickSettings = (elementClicked) => {
  //agrandamos la caja del language
  const settings_content = document.querySelector(
    `.${header.settings_content}`
  );

  //aqui cuando se haga click se mostrara el idioma que quiere escoje
  const languageCaja = document.querySelector(`.${header.languageCaja}`);
  const monedaCaja = document.querySelector(`.${header.monedaCaja}`);

  if (elementClicked == "idioma") {
    //aqui si se abre la caja idioma tiene que ocultarse la monedaCaja en caso de que haya sido abierto

    monedaCaja.style.cssText = "visibility:hidden";
    languageCaja.style.cssText = "visibility:visible";
    settings_content.style.cssText =
      "height:382px;width:270px;visibility:visible;opacity:1";
  } else if (elementClicked == "moneda") {
    //ocultamos languageCaja en caso de que este visible
    languageCaja.style.cssText = "visibility:hidden";
    monedaCaja.style.cssText = "visibility:visible";
    settings_content.style.cssText =
      "height:372px;width:270px;visibility:visible;opacity:1";
  }

  const settings_cnt_second = document.querySelector(
    `.${header.settings_cnt_second}`
  );

  settings_cnt_second.style.visibility = "visible";
  settings_cnt_second.style.opacity = "1";
};

const focusInput = (elementClicked) => {
  //solo cambiar los colores de los inputs
  if (elementClicked == "idioma") {
    const languageCajaInput = document.querySelector(
      `.${header.languageCaja_input}`
    );
    languageCajaInput.style.cssText = "border:2px solid #02adffdb";
  } else if (elementClicked == "moneda") {
    const monedaCajaInput = document.querySelector(
      `.${header.monedaCajaInput}`
    );

    monedaCajaInput.style.cssText = "border:2px solid #02adffdb";
  }
};

const blurInput = (elementClicked) => {
  //esto hara que simplemente cambie los colores de los inputs

  if (elementClicked == "idioma") {
    const languageCajaInput = document.querySelector(
      `.${header.languageCaja_input}`
    );
    languageCajaInput.style.cssText = "border:2px solid #616161";
  } else if (elementClicked == "moneda") {
    const monedaCajaInput = document.querySelector(
      `.${header.monedaCaja_input}`
    );

    monedaCajaInput.style.cssText = "border:2px solid #616161";
  }
};

const backSettingsHome = () => {
  const settings_content = document.querySelector(
    `.${header.settings_content}`
  );

  //aqui cuando se haga click se mostrara el idioma que quiere escoje
  const languageCaja = document.querySelector(`.${header.languageCaja}`);
  const monedaCaja = document.querySelector(`.${header.monedaCaja}`);

  settings_content.style.cssText = "height:88px;visibility:visible;opacity:1";

  //no importa que haya cerrado a ambos elementos le pondremos hidden
  languageCaja.style.cssText = "visibility:hidden";
  monedaCaja.style.cssText = "visibility:hidden";

  const settings_cnt_second = document.querySelector(
    `.${header.settings_cnt_second}`
  );
  settings_cnt_second.style.cssText = "opacity:0";
};

const clickSettingsIcon = () => {
  const settings_content = document.querySelector(
    `.${header.settings_content}`
  );
  const settingsIcon = document.querySelector(`.${header.settingsIcon}`);
  setClickedBotonSettings((prevState) => {
    if (prevState == false) {
      //aqui entra cuando se da click por primera vez...la tercera...quinta y asi

      settings_content.style.visibility = "visible";
      settings_content.style.opacity = "1";

      settingsIcon.style.cssText = "outline:#2185ff solid 2px";
      return true;
    } else {
      //aqui entra al segundo click....
      settings_content.style.visibility = "hidden";
      settings_content.style.opacity = "0";
      settingsIcon.style.cssText = "outline:1px solid #393939";
      return false;
    }
  });

  //actualizar este estado solo servira para mostrar el settingContainer mobil
  setMostrarSettings(true);
};


const value = {
  animCarrito,
  setAnimCarrito,
  setMostrarCarrito,

  mostrarMenu,
  setMostrarMenu,
  setAnimMenu,
  animMenu,

  setConteoCar,
  conteoCar,

  dataCarrito, //esto es de contextGlobal

  setMostrarSettings,
  setCookieModal

};

return (
  <ContextHeader.Provider value={value}>
    <div className={header.container}>
      <div className={header.headerPrincipal}>
        <div className={header.headerLeft}>
          <div className={header.menuBoton} onClick={clickMostrarMenu}>
            <div className={header.menu}>
              <img src="/menu.svg" />
            </div>
          </div>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div className={header.perfilContainer}>
              <div className={header.perfil}>
                <img src="/logo.avif" />
              </div>
              {/*aqui pondre LN store pero de momento DIGITAL SPACE*/}
              <span className={header.nombreTienda}>Leaft</span>
            </div>
          </Link>
          <ul className={header.lista}>
            <li onClick={() => redirect("tecnologia")}>Tecnología</li>
            <li onClick={() => redirect("novedades")}>Novedades</li>
            <li onClick={() => redirect("todo")}>Todo</li>
          </ul>
        </div>
        <div className={header.center}>
          <Input></Input>
        </div>
        <div className={header.headerRight}>
          <div className={header.settingsBoton}>
            <div className={header.settingsIcon} onClick={clickSettingsIcon}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  stroke="white"
                  stroke-width="1.5"
                />
                <path
                  d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z"
                  stroke="white"
                  stroke-width="1.5"
                />
              </svg>
            </div>
            <div className={header.settings_content}>
              <div className={header.settings_content_real}>
                <div className={header.settings_cnt_first}>
                  <div
                    className={header.settings_language}
                    onClick={() => clickSettings("idioma")}
                  >
                    <span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M14.6921 5H9.30807C8.15914 5.00635 7.0598 5.46885 6.25189 6.28576C5.44398 7.10268 4.99368 8.20708 5.00007 9.356V14.644C4.99368 15.7929 5.44398 16.8973 6.25189 17.7142C7.0598 18.5311 8.15914 18.9937 9.30807 19H14.6921C15.841 18.9937 16.9403 18.5311 17.7482 17.7142C18.5562 16.8973 19.0064 15.7929 19.0001 14.644V9.356C19.0064 8.20708 18.5562 7.10268 17.7482 6.28576C16.9403 5.46885 15.841 5.00635 14.6921 5Z"
                          stroke="#000000"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8.00012 9C7.58591 9 7.25012 9.33579 7.25012 9.75C7.25012 10.1642 7.58591 10.5 8.00012 10.5V9ZM12.0001 10.5C12.4143 10.5 12.7501 10.1642 12.7501 9.75C12.7501 9.33579 12.4143 9 12.0001 9V10.5ZM11.2501 9.75C11.2501 10.1642 11.5859 10.5 12.0001 10.5C12.4143 10.5 12.7501 10.1642 12.7501 9.75H11.2501ZM12.7501 8C12.7501 7.58579 12.4143 7.25 12.0001 7.25C11.5859 7.25 11.2501 7.58579 11.2501 8H12.7501ZM12.0001 9C11.5859 9 11.2501 9.33579 11.2501 9.75C11.2501 10.1642 11.5859 10.5 12.0001 10.5V9ZM15.5001 10.5C15.9143 10.5 16.2501 10.1642 16.2501 9.75C16.2501 9.33579 15.9143 9 15.5001 9V10.5ZM15.5001 9C15.0859 9 14.7501 9.33579 14.7501 9.75C14.7501 10.1642 15.0859 10.5 15.5001 10.5V9ZM16.0001 10.5C16.4143 10.5 16.7501 10.1642 16.7501 9.75C16.7501 9.33579 16.4143 9 16.0001 9V10.5ZM16.1138 10.1811C16.3519 9.84222 16.2702 9.37443 15.9313 9.13631C15.5923 8.8982 15.1246 8.97992 14.8864 9.31885L16.1138 10.1811ZM11.2737 13.2783C10.9579 13.5464 10.9193 14.0197 11.1874 14.3354C11.4555 14.6512 11.9288 14.6898 12.2445 14.4217L11.2737 13.2783ZM9.29973 14.9003C8.96852 15.149 8.90167 15.6192 9.15041 15.9504C9.39916 16.2816 9.8693 16.3485 10.2005 16.0997L9.29973 14.9003ZM12.2569 14.407C12.5667 14.1321 12.595 13.6581 12.3201 13.3483C12.0453 13.0384 11.5712 13.0101 11.2614 13.285L12.2569 14.407ZM11.1691 14.3091C11.4249 14.6349 11.8963 14.6917 12.2222 14.436C12.548 14.1802 12.6048 13.7088 12.3491 13.3829L11.1691 14.3091ZM11.186 11.4467C11.0185 11.0678 10.5756 10.8966 10.1968 11.0641C9.81796 11.2316 9.64667 11.6745 9.8142 12.0533L11.186 11.4467ZM12.3609 13.4024C12.1137 13.07 11.6439 13.001 11.3115 13.2482C10.9792 13.4954 10.9101 13.9652 11.1573 14.2976L12.3609 13.4024ZM13.8953 16.6608C14.2602 16.8567 14.7149 16.7198 14.9109 16.3548C15.1068 15.9899 14.9699 15.5352 14.605 15.3392L13.8953 16.6608ZM8.00012 10.5H12.0001V9H8.00012V10.5ZM12.7501 9.75V8H11.2501V9.75H12.7501ZM12.0001 10.5H15.5001V9H12.0001V10.5ZM15.5001 10.5H16.0001V9H15.5001V10.5ZM14.8864 9.31885C13.8552 10.7867 12.6412 12.1172 11.2737 13.2783L12.2445 14.4217C13.7091 13.1782 15.0093 11.7532 16.1138 10.1811L14.8864 9.31885ZM10.2005 16.0997C10.7113 15.7161 11.4531 15.1201 12.2569 14.407L11.2614 13.285C10.4871 13.9719 9.77692 14.5419 9.29973 14.9003L10.2005 16.0997ZM12.3491 13.3829C11.8824 12.7884 11.4917 12.1379 11.186 11.4467L9.8142 12.0533C10.1703 12.8586 10.6255 13.6164 11.1691 14.3091L12.3491 13.3829ZM11.1573 14.2976C11.8855 15.2767 12.8203 16.0835 13.8953 16.6608L14.605 15.3392C13.7239 14.8661 12.9578 14.2048 12.3609 13.4024L11.1573 14.2976Z"
                          fill="#000000"
                        />
                      </svg>
                    </span>
                    <p>{t("header.settings")}</p>
                  </div>
                  <div
                    className={header.settings_moneda}
                    onClick={() => clickSettings("moneda")}
                  >
                    <span>
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                      >
                        <path
                          stroke="#000000"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m14.5 10-.035-.139A2.457 2.457 0 0 0 12.082 8h-.522a1.841 1.841 0 0 0-.684 3.55l2.248.9A1.841 1.841 0 0 1 12.44 16h-.521a2.457 2.457 0 0 1-2.384-1.861L9.5 14M12 6v2m0 8v2m9-6a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </span>
                    <p>Moneda</p>
                  </div>
                </div>
                <div className={header.settings_cnt_second}>
                  <div className={header.settings_cnt_second_real}>
                    <div className={header.languageCaja}>
                      <div className={header.back_block}>
                        <span onClick={backSettingsHome}>
                          <svg
                            fill="#000000"
                            viewBox="0 0 32 32"
                            data-name="Layer 2"
                            id="Layer_2"
                          >
                            <title />
                            <path d="M11.17,10.23a33.37,33.37,0,0,0-3.05,3.13c-.51.62-1.28,1.3-1.21,2.17s.81,1.24,1.35,1.76a16.3,16.3,0,0,1,2.57,3.17c.86,1.36,3,.11,2.16-1.26a21.06,21.06,0,0,0-1.82-2.48A16.16,16.16,0,0,0,10,15.52c-.22-.21-.86-1.14-.68-.49l-.13,1a17.85,17.85,0,0,1,3.72-4c1.19-1.08-.58-2.85-1.77-1.76Z" />
                            <path d="M9.4,17a109.13,109.13,0,0,0,12.53-.1c1.59-.11,1.61-2.61,0-2.5a109.13,109.13,0,0,1-12.53.1c-1.61-.07-1.6,2.43,0,2.5Z" />
                          </svg>
                        </span>
                      </div>
                      <div className={header.languageCaja_input}>
                        <input
                          onFocus={() => focusInput("idioma")}
                          onBlur={() => blurInput("idioma")}
                        ></input>
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
                      <div className={header.sugerenciasLanguage}>
                        <div>
                          <span className={header.flagIcon}>
                            <svg
                              viewBox="0 0 36 36"
                              aria-hidden="true"
                              role="img"
                              class="iconify iconify--twemoji"
                              preserveAspectRatio="xMidYMid meet"
                            >
                              <path
                                fill="#C60A1D"
                                d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v18z"
                              ></path>
                              <path fill="#FFC400" d="M0 12h36v12H0z"></path>
                              <path
                                fill="#EA596E"
                                d="M9 17v3a3 3 0 1 0 6 0v-3H9z"
                              ></path>
                              <path fill="#F4A2B2" d="M12 16h3v3h-3z"></path>
                              <path fill="#DD2E44" d="M9 16h3v3H9z"></path>
                              <ellipse
                                fill="#EA596E"
                                cx="12"
                                cy="14.5"
                                rx="3"
                                ry="1.5"
                              ></ellipse>
                              <ellipse
                                fill="#FFAC33"
                                cx="12"
                                cy="13.75"
                                rx="3"
                                ry=".75"
                              ></ellipse>
                              <path
                                fill="#99AAB5"
                                d="M7 16h1v7H7zm9 0h1v7h-1z"
                              ></path>
                              <path
                                fill="#66757F"
                                d="M6 22h3v1H6zm9 0h3v1h-3zm-8-7h1v1H7zm9 0h1v1h-1z"
                              ></path>
                            </svg>
                          </span>
                          <span className={header.countrieName}>Español</span>
                        </div>
                        <div>
                          <span className={header.flagIcon}>
                            <svg
                              viewBox="0 0 36 36"
                              aria-hidden="true"
                              role="img"
                              class="iconify iconify--twemoji"
                              preserveAspectRatio="xMidYMid meet"
                            >
                              <path
                                fill="#B22334"
                                d="M35.445 7C34.752 5.809 33.477 5 32 5H18v2h17.445zM0 25h36v2H0zm18-8h18v2H18zm0-4h18v2H18zM0 21h36v2H0zm4 10h28c1.477 0 2.752-.809 3.445-2H.555c.693 1.191 1.968 2 3.445 2zM18 9h18v2H18z"
                              ></path>
                              <path
                                fill="#EEE"
                                d="M.068 27.679c.017.093.036.186.059.277c.026.101.058.198.092.296c.089.259.197.509.333.743L.555 29h34.89l.002-.004a4.22 4.22 0 0 0 .332-.741a3.75 3.75 0 0 0 .152-.576c.041-.22.069-.446.069-.679H0c0 .233.028.458.068.679zM0 23h36v2H0zm0-4v2h36v-2H18zm18-4h18v2H18zm0-4h18v2H18zM0 9zm.555-2l-.003.005L.555 7zM.128 8.044c.025-.102.06-.199.092-.297a3.78 3.78 0 0 0-.092.297zM18 9h18c0-.233-.028-.459-.069-.68a3.606 3.606 0 0 0-.153-.576A4.21 4.21 0 0 0 35.445 7H18v2z"
                              ></path>
                              <path
                                fill="#3C3B6E"
                                d="M18 5H4a4 4 0 0 0-4 4v10h18V5z"
                              ></path>
                              <path
                                fill="#FFF"
                                d="M2.001 7.726l.618.449l-.236.725L3 8.452l.618.448l-.236-.725L4 7.726h-.764L3 7l-.235.726zm2 2l.618.449l-.236.725l.617-.448l.618.448l-.236-.725L6 9.726h-.764L5 9l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L9 9l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L13 9l-.235.726zm-8 4l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L5 13l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L9 13l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L13 13l-.235.726zm-6-6l.618.449l-.236.725L7 8.452l.618.448l-.236-.725L8 7.726h-.764L7 7l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L11 7l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L15 7l-.235.726zm-12 4l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L3 11l-.235.726zM6.383 12.9L7 12.452l.618.448l-.236-.725l.618-.449h-.764L7 11l-.235.726h-.764l.618.449zm3.618-1.174l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L11 11l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L15 11l-.235.726zm-12 4l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L3 15l-.235.726zM6.383 16.9L7 16.452l.618.448l-.236-.725l.618-.449h-.764L7 15l-.235.726h-.764l.618.449zm3.618-1.174l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L11 15l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L15 15l-.235.726z"
                              ></path>
                            </svg>
                          </span>
                          <span className={header.countrieName}> ingles</span>
                        </div>
                        <div>
                          <span className={header.flagIcon}>
                            <svg
                              viewBox="0 0 36 36"
                              aria-hidden="true"
                              role="img"
                              class="iconify iconify--twemoji"
                              preserveAspectRatio="xMidYMid meet"
                            >
                              <path
                                fill="#ED2939"
                                d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4v18z"
                              ></path>
                              <path
                                fill="#002495"
                                d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5H4z"
                              ></path>
                              <path fill="#EEE" d="M12 5h12v26H12z"></path>
                            </svg>
                          </span>
                          <span className={header.countrieName}>frances</span>
                        </div>
                        <div>
                          <span className={header.flagIcon}>
                            <svg
                              viewBox="0 0 36 36"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              role="img"
                              class="iconify iconify--twemoji"
                              preserveAspectRatio="xMidYMid meet"
                            >
                              <path
                                fill="#FFCD05"
                                d="M0 27a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4v-4H0v4z"
                              ></path>
                              <path fill="#ED1F24" d="M0 14h36v9H0z"></path>
                              <path
                                fill="#141414"
                                d="M32 5H4a4 4 0 0 0-4 4v5h36V9a4 4 0 0 0-4-4z"
                              ></path>
                            </svg>
                          </span>
                          <span className={header.countrieName}>Aleman</span>
                        </div>
                        <div>
                          <span className={header.flagIcon}>
                            <svg
                              viewBox="0 0 36 36"
                              aria-hidden="true"
                              role="img"
                              class="iconify iconify--twemoji"
                              preserveAspectRatio="xMidYMid meet"
                            >
                              <path
                                fill="#138808"
                                d="M0 27a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4v-4H0v4z"
                              ></path>
                              <path fill="#EEE" d="M0 13h36v10H0z"></path>
                              <path
                                fill="#F93"
                                d="M36 13V9a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v4h36z"
                              ></path>
                              <circle
                                fill="navy"
                                cx="18"
                                cy="18"
                                r="4"
                              ></circle>
                              <circle
                                fill="#EEE"
                                cx="18"
                                cy="18"
                                r="3"
                              ></circle>
                              <path
                                fill="#6666B3"
                                d="M18 15l.146 2.264l1.001-2.035l-.73 2.147l1.704-1.498l-1.497 1.705l2.147-.731l-2.035 1.002L21 18l-2.264.146l2.035 1.001l-2.147-.73l1.497 1.704l-1.704-1.497l.73 2.147l-1.001-2.035L18 21l-.146-2.264l-1.002 2.035l.731-2.147l-1.705 1.497l1.498-1.704l-2.147.73l2.035-1.001L15 18l2.264-.146l-2.035-1.002l2.147.731l-1.498-1.705l1.705 1.498l-.731-2.147l1.002 2.035z"
                              ></path>
                              <circle
                                fill="navy"
                                cx="18"
                                cy="18"
                                r="1"
                              ></circle>
                            </svg>
                          </span>
                          <span className={header.countrieName}>indio</span>
                        </div>
                        <div>
                          <span className={header.flagIcon}>
                            <svg
                              viewBox="0 0 36 36"
                              aria-hidden="true"
                              role="img"
                              class="iconify iconify--twemoji"
                              preserveAspectRatio="xMidYMid meet"
                            >
                              <path
                                fill="#CE2028"
                                d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4v-4h36v4z"
                              ></path>
                              <path fill="#22408C" d="M0 13h36v10H0z"></path>
                              <path
                                fill="#EEE"
                                d="M32 5H4a4 4 0 0 0-4 4v4h36V9a4 4 0 0 0-4-4z"
                              ></path>
                            </svg>
                          </span>
                          <span className={header.countrieName}>ruso</span>
                        </div>
                        <div>
                          <span className={header.flagIcon}>
                            <svg
                              viewBox="0 0 36 36"
                              aria-hidden="true"
                              role="img"
                              class="iconify iconify--twemoji"
                              preserveAspectRatio="xMidYMid meet"
                            >
                              <path
                                fill="#060"
                                d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v18z"
                              ></path>
                              <path
                                fill="#D52B1E"
                                d="M32 5H15v26h17a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z"
                              ></path>
                              <path
                                fill="#FFCC4D"
                                d="M15 10a8 8 0 0 0-8 8a8 8 0 1 0 16 0a8 8 0 0 0-8-8zm-6.113 4.594l1.602 1.602l-2.46 1.23a6.95 6.95 0 0 1 .858-2.832zm-.858 3.979l4.4 2.207l-2.706 1.804l.014.021a6.963 6.963 0 0 1-1.708-4.032zM14 24.92a6.945 6.945 0 0 1-2.592-.92H14v.92zM14 23h-3.099L14 20.934V23zm0-3.268l-.607.405L9.118 18l2.116-1.058L14 19.707v.025zm0-1.439l-3.543-3.543l3.543.59v2.953zm0-3.992l-4.432-.713A6.983 6.983 0 0 1 14 11.08v3.221zm7.113.293a6.95 6.95 0 0 1 .858 2.833l-2.46-1.23l1.602-1.603zM16 11.08a6.987 6.987 0 0 1 4.432 2.508L16 14.301V11.08zm0 4.26l3.543-.591L16 18.293V15.34zm0 4.367l2.765-2.765L20.882 18l-4.274 2.137l-.608-.405v-.025zm0 5.213V24h2.592a6.945 6.945 0 0 1-2.592.92zM16 23v-2.066L19.099 23H16zm4.264-.395l.014-.021l-2.706-1.804l4.4-2.207a6.976 6.976 0 0 1-1.708 4.032z"
                              ></path>
                              <path
                                fill="#D52B1E"
                                d="M11 13v7a4 4 0 0 0 8 0v-7h-8z"
                              ></path>
                              <path
                                fill="#FFF"
                                d="M12 14v6a3 3 0 0 0 6 0v-6h-6z"
                              ></path>
                              <path fill="#829ACD" d="M13 17h4v2h-4z"></path>
                              <path fill="#829ACD" d="M14 16h2v4h-2z"></path>
                              <path
                                fill="#039"
                                d="M12 17h1v2h-1zm2 0h2v2h-2zm3 0h1v2h-1zm-3 3h2v2h-2zm0-6h2v2h-2z"
                              ></path>
                            </svg>
                          </span>
                          <span className={header.countrieName}>
                            portugues
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={header.monedaCaja}>
                      <div className={header.back_block}>
                        <span onClick={backSettingsHome}>
                          <svg
                            fill="#000000"
                            viewBox="0 0 32 32"
                            data-name="Layer 2"
                            id="Layer_2"
                          >
                            <title />
                            <path d="M11.17,10.23a33.37,33.37,0,0,0-3.05,3.13c-.51.62-1.28,1.3-1.21,2.17s.81,1.24,1.35,1.76a16.3,16.3,0,0,1,2.57,3.17c.86,1.36,3,.11,2.16-1.26a21.06,21.06,0,0,0-1.82-2.48A16.16,16.16,0,0,0,10,15.52c-.22-.21-.86-1.14-.68-.49l-.13,1a17.85,17.85,0,0,1,3.72-4c1.19-1.08-.58-2.85-1.77-1.76Z" />
                            <path d="M9.4,17a109.13,109.13,0,0,0,12.53-.1c1.59-.11,1.61-2.61,0-2.5a109.13,109.13,0,0,1-12.53.1c-1.61-.07-1.6,2.43,0,2.5Z" />
                          </svg>
                        </span>
                      </div>
                      <div className={header.monedaCaja_input}>
                        <input placeholder="moneda"></input>
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
                      <div className={header.listaMonedas}>
                        <div>
                          <span>USD</span>
                          <span> (Dólar estadounidense)</span>
                        </div>
                        <div>
                          <span>EUR</span>
                          <span> (Euro)</span>
                        </div>
                        <div>
                          <span>JPY</span>
                          <span> (Yen japonés)</span>
                        </div>
                        <div>
                          <span>GBP</span>
                          <span> (Libra esterlina)</span>
                        </div>
                        <div>
                          <span>AUD</span>
                          <span> (Dólar australiano)</span>
                        </div>
                        <div>
                          <span>CAD</span>
                          <span> (Dólar canadiense)</span>
                        </div>
                        <div>
                          <span>CHF</span>
                          <span> (Franco suizo)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={header.registrarse}>
            <svg width="30px" height="30px" viewBox="0 0 24 24">
              <path
                d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div onClick={clickMostrarCarrito} className={header.carritoBoton}>
            <div className={header.carritoImagen}>
              <img src="/carrito.svg" />
            </div>
            {conteoCar > 0 ? (
              <span className={header.carritoConteo}>{conteoCar}</span>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {mostrarCarrito ? <CarritoPage></CarritoPage> : ""}
      {mostrarMenu ? <MenuPage></MenuPage> : ""}
      {mostrarLogin ? <Login></Login> : ""}
      {mostrarSettings ? <SettingsMobile></SettingsMobile> : ""}
      {cookieModal ? <CookieModal></CookieModal> : ""}
    </div>
  </ContextHeader.Provider>
);
}
