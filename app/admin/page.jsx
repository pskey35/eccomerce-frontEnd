"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useContext, createContext } from "react";
import page from "./page.module.css";
import Link from "next/link";

function ModalEliminarProducto() {
  const { setModalAbierto } = useContext(AdminContext);
  const clickDescartar = () => {
    const modalEliminar = document.querySelector(`.${page.modalEliminar}`);
    modalEliminar.style.animation = `${page.salidaModal} ease 300ms forwards`;
    modalEliminar.addEventListener("animationend", () => {
      setModalAbierto(false);
    });
  };
  return (
    <div className={page.modalEliminar}>
      <div className={page.modalEliminar_content}>
        <p className={page.advertencia}>
          Estas seguro de eliminar este producto?
        </p>
        <p className={page.advertenciaInfo}>
          una vez que lo elimines no hay marcha atrás
        </p>
        <div className={page.producto}>
          <div className={page.leftProducto}>
            <div className={page.imagen}>
              <img className={page.fondoImagen} src="/images/audi.png"></img>
              <img className={page.frontImagen} src="/images/audi.png"></img>
            </div>
            <div className={page.infoProducto}>
              <div className={page.nombre}>audifono b612</div>
              <div className={page.precio}>150$</div>
            </div>
          </div>
          <div className={page.rightDescripcion}>
            Lorem ipsum dolexplicabo esse tempora blanditiis placeat
            exercitationem accusantium doloremque, in fugit odit recusandae
            nostrum soluta assumenda. Iure temporibus pariatur ratione?
          </div>
        </div>
        <div className={page.modalOpciones}>
          <div className={page.descartarEliminacion} onClick={clickDescartar}>
            No,deseo conservarlo
          </div>
          <div className={page.eliminacionDefinitiva}>Si, deseo elimarlo</div>
        </div>
      </div>
    </div>
  );
}

function ModalEditarProducto() {
  const { setModalAbierto } = useContext(AdminContext);
  const textareaRef = useRef();
  useEffect(() => {
    textareaRef.current.value =
      "Audifonos color blanco marca B12 para appple pequeño para uso personal adksjljadsj ladgad sg agdasdgklj adjskladfjs jkllafsdj lñjlajdsfñj kljja dsfjñlja lsdfjjadfjs ajfsjjasdfjñj asdfj ljjajaj lñjasdf ñ asdfjlj ladfj lj j ajaj lñjasdf ñ asdfjlj ladfj lj j ajaj lñjasdf ñ asdfjlj ladfj lj j ajaj lñjasdf ñ asdfjlj ladfj lj j ajaj lñjasdf ñ asdfjlj ladfj lj j ajaj lñjasdf ñ asdfjlj ladfj lj j ajaj lñjasdf ñ asdfjlj ladfj lj j ajaj lñjasdf ñ asdfjlj ladfj lj j ajaj lñjasdf ñ asdfjlj ladfj lj j ajaj lñjasdf ñ asdfjlj ladfj lj j ajaj lñjasdf ñ asdfjlj ladfj lj j ajaj lñjasdf ñ asdfjlj ladfj lj j ajaj lñjasdf ñ asdfjlj ladfj lj j ajaj lñjasdf ñ asdfjlj ladfj lj j ajaj lñjasdf ñ asdfjlj ladfj lj j ajaj lñjasdf ñ asdfjlj ladfj lj j ajaj lñjasdf ñ asdfjlj ladfj lj j adljñadfs";
  }, []);

  const clickDescartarEdicion = () => {
    const modalEditar = document.querySelector(`.${page.modalEditar}`);
    modalEditar.style.animation = `${page.salidaModal} ease forwards 300ms`;
    modalEditar.addEventListener("animationend", () => {
      setModalAbierto(false);
    });
  };
  //se debe de editar todas las imagenes se permitira maximo de 4 imagenes por producto
  //editar el nombre,precio,descripcion
  return (
    <div className={page.modalEditar}>
      <div className={page.modalEditar_content}>
        <p className={page.tituloEdit}>Editar Producto</p>
        <div className={page.productoEdit}>
          <div className={page.imagenes}></div>
          <div className={page.editarInfo}>
            <div className={page.descripcion}>
              <textarea ref={textareaRef} spellCheck="false"></textarea>
            </div>
            <div className={page.caja2}>
              <div className={page.nombre}>
                <div>audifono b612</div>
                <div>imgEdit</div>
              </div>
              <div className={page.caja2_precio}>
                <div>150</div>
                <div>$</div>
              </div>
            </div>
          </div>
        </div>
        <div className={page.opciones}>
          <div
            className={page.descartarEdicion}
            onClick={clickDescartarEdicion}
          >
            Descartar edición
          </div>
          <div className={page.saveData}>Guardar cambios</div>
        </div>
      </div>
    </div>
  );
}

//este componente se usa en Left
function AllProducts() {
  const [dataProducts, setDataProducts] = useState([
    { nombre: "as" },
    { nombre: "as" },
    { nombre: "as" },
    { nombre: "as" },
    { nombre: "as" },
    { nombre: "as" },
    { nombre: "as" },
    { nombre: "as" },
  ]);

  const { setModalAbierto, setModalComponente } = useContext(AdminContext);

  const clickEliminarProducto = () => {
    //aqui mostrar el modal si realmente quiere eliminar
    setModalAbierto(true);
    setModalComponente(<ModalEliminarProducto></ModalEliminarProducto>);
  };

  const clickEditarProducto = () => {
    setModalAbierto(true);
    setModalComponente(<ModalEditarProducto></ModalEditarProducto>);
  };
  return (
    <div className={page.allProduct}>
      <div className={page.allProduct_content}>
        <div className={page.cajaProductos}>
          {dataProducts.map((dataUnidad, indice) => {
            return (
              <div className={page.productoUnidad}>
                <div className={page.imagen}>
                  <img src="/images/audi.png"></img>
                </div>
                <div className={page.opciones}>
                  <div
                    className={page.eliminar}
                    onClick={clickEliminarProducto}
                  >
                    Eliminar
                  </div>
                  <div className={page.editar} onClick={clickEditarProducto}>
                    Editar
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={page.loading}>
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

//Eliminar producto
//seguimiento de todos los productos que has subido
//aqui mostrar cuanto vendio en que pais vendio
//si quiere modificar el precio del producto y asi...
function Left() {
  const inputSearchRef = useRef();

  //esto de aca es la funcion del evento onInput xd
  const inputSearch = () => {
    const query = `query{}`;
    fetch(`${process.env.NEXT_PUBLIC_api}/graphql`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
  };

  return (
    <div className={page.left}>
      <div className={page.left_content}>
        <div className={page.cajaInput}>
          <input
            type="text"
            onInput={inputSearch}
            ref={inputSearchRef}
            placeholder="Busca por nombre,precio o descripción tus productos"
          ></input>
          <div className={page.lupa}>
            <svg
              width="24"
              data-e2e=""
              height="24"
              viewBox="0 0 48 48"
              fill="rgba(255, 255, 255, .75)"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"
              ></path>
            </svg>
            <span></span>
          </div>
        </div>
        {/*tiene productos subidos?*/}
        <div className={page.mini_dashboard}>
          <div className={page.mini_dashboard_content}>
            {true ? (
              <AllProducts></AllProducts>
            ) : (
              <div className={page.noFounded}>
                <p>Aún no has subido ningún producto</p>
              </div>
            )}
          </div>
          <div className={page.animScroll}></div>
        </div>
      </div>
    </div>
  );
}

//Agregar producto
function Right() {
  //este loader es del boton subirProducto cuando se da click
  const [loading, setLoading] = useState(false);

  //aqui se guardara el src de la imagen para poder verlo en el front
  const [imgData, setImgData] = useState();

  //este mensaje es para indicarle el usuario ahi se nota abajo en la seccion de agregar imagenes
  const [mensajeImagen, setMensajeImagen] = useState(
    "Es obligatorio subir por lo menos una imagen al producto!"
  );

  //este contador es para saber que indice de input dar click por si ya esta en el tercer input o cuarto y asi...
  //y ademas ponerle en mensaje algo como "si deseas puedes introducis otros ${4} imagenes mas"
  const [contadorInputsClick, setContadorInputsClick] = useState(0);

  //aqui se recibira los mensajes del servidor o si le falto agregar algo...
  //esto de aqui se mostrara en la parte de abajo al ultimo de la seccion agregar producto container
  const [mensajeSistema, setMensajeSistema] = useState();

  //aqui se guardaran las categorias que existen en la database para que sean seleccionados
  const [listaCategorias, setListaCategorias] = useState();

  //esto lo usare en enviarProducto creo que es mejor asi que usar el element.textContent y enviar lo que hay en <p>
  //creo que esto es menos inseguro,(el set se usara en clickCategoria...)
  const [categoriaSeleccionado, setCategoriaSeleccionado] = useState(null);

  const inputPrecio = useRef();
  const textareaDescripcionRef = useRef();
  const inputNameProduct = useRef();
  const createNewCategoriaRef = useRef();
  //este link de aqui es para solucionar el problema de los inputs lastimosamente solo se soluciona con js F
  /*https://css-tricks.com/auto-growing-inputs-textareas/*/
  //--onInput
  const inputPrecioFuncion = (event) => {
    console.log(
      "texto ultimo" + event.target.value[event.target.value.length - 1]
    );

    if (isNaN(event.target.value)) {
      //esto de aqui tambien soluciona si alguien pulsa un ESPACIO en medio de las letras
      //ahora lo que hacemos es detectar en que casilla esta la letra y de ahi lo cortamos es mucho mejor
      //que embes de estar recortando los ultimos digitos del valor ...porq tuve el error de que si el usuario
      //metia letras en medio de todo los digitos borraba el ultimo digito y eso estaba mal
      let nuevoTexto = "";

      for (let i = 0; i < event.target.value.length; i++) {
        if (
          event.target.value[i] > 0 ||
          event.target.value[i] < 0 ||
          event.target.value[i] == "."
        ) {
          //aqui basicamente detectamos si es numero o si es el punto, y si lo son, entonces agregamos al nuevoTexto
          nuevoTexto += event.target.value[i];
        }
      }
      console.log("nuevTExto cuando letra se aparece:" + nuevoTexto);
      //esto de aca elimina todas los caracteres que sen letras ya que solo requerimos de numeros
      event.target.value = nuevoTexto;
    }

    //esto quita todos los espacios que exista
    event.target.value = event.target.value.replace(/\s/g, "").trim();

    let indicePoint = null;
    for (let i = 0; i < event.target.value.length - 1; i++) {
      if (event.target.value[i] == ".") {
        //este indicePoint cuenta desde izquierda hasta el punto cuantos caracteres habian y se guardan
        indicePoint = i;
      }
    }

    //aqui ponemos indicePoint en caso de que no encuentre el punto esto porque quiza no haya puesto aun el punto
    if (indicePoint !== null) {
      //aqui se cuenta cuantos digitos hay despues del punto ::: ejemplo entrada > 45.3443 > aqui hay 4 digitos despues del punto
      const digitsAfterPoint = event.target.value.length - 1 - indicePoint;
      console.log("digitsAfert:" + digitsAfterPoint);

      //si se ve que hay mas de 2 digitos despues del punto lo recortamos
      if (digitsAfterPoint > 2) {
        //este total es para saber cuantos digitos hay antes del punto y se le suma +2
        //porq se requiere solo los 2 ultimos digitos nomas
        const total = indicePoint + 2 + 1; //aqui sume +1 porq es el punto que tambien se cuenta
        console.log("total:" + total);

        let newText = "";
        for (let i = 0; i < total; i++) {
          newText += event.target.value[i];
        }
        console.log("nextText:" + newText);

        //finalmente todo lo recortado lo agregamos y queda fino
        event.target.value = newText;
      }
    }
  };

  //esta funcion solo se usa para el precio cuando se va a enviar la data al backend
  const validatorPrecio = (num) => {
    let point = {
      indice: null,
      boleano: false,
    };
    for (let i = 0; i < num.length; i++) {
      //aqui detectamos en que posicion esta ese punto .
      if (num[i] == ".") {
        point.indice = i;
        point.boleano = true; //este boleano lo usamos luego
      }
    }

    if (point.boleano == false) {
      //aqui entra si no tiene el punto en el num
      num += ".00";
    } else if (point.boleano == true) {
      //aqui entra si, si tiene el punto
      //digitsAfterPoint ejemplo entrada: "45.44"  - salida: 2...porq hay 2 digitos despues del punto
      const digitsAfterPoint = num.length - 1 - point.indice;

      if (digitsAfterPoint == 0) {
        //esto es por si solo agrego un punto que puede pasar xd
        num += "00";
      } else if (digitsAfterPoint == 1) {
        //aqui si despues del punto solo hay 1 digito se le agrega un 0
        num += "0";
      }
    }

    return num;
  };

  const clickSubirProducto = () => {
    const firstInputImgFile = document.querySelectorAll(
      `.${page.containerInputs} > input`
    )[0];
    // console.log(firstImgFile.files[0])
    console.log("****");
    //aqui se valida si se completo todos los inputs
    if (
      textareaDescripcionRef.current.value.length > 3 &&
      inputPrecio.current.value.length > 0 &&
      inputNameProduct.current.value.length > 0 &&
      firstInputImgFile.value &&
      (categoriaSeleccionado !== null ||
        createNewCategoriaRef.current.value.trim().length > 0)
    ) {
      //aqui entra si todo esta correcto
      setMensajeSistema(<></>); //borramos todos los mensajes del sistema
      setLoading(true); //este loading se muestra en el boton "subirProducto"
      const formData = new FormData();

      //aqui vemos que archivos se subieron y de acuerdo a eso agregamos al formData
      const allInputsFile = document.querySelectorAll(
        `.${page.containerInputs} > input`
      );

      let conteoImgsValidos = 0; //esto de aqui lo usare para saber cuantas imagenes se enviaron y usarlo en el back
      for (let i = 0; i < allInputsFile.length; i++) {
        if (allInputsFile[i].value) {
          //console.log(allInputsFile[i].files[0])
          formData.append(`archivo_${i}`, allInputsFile[i].files[0]);
          conteoImgsValidos++;
        }
      }

      // formData.append("archivo", productImg.files[0])

      //creo que no es necesario enviar el token porq si el atackannte tiene el token correcto
      //igual no podra hacer fetch por cors
      //ahora que me doy cuenta envio el token para decodificarlo en el back y de ahi sacar su idAdmin y subirlo a database haha
      const data = {
        descripcion: textareaDescripcionRef.current.value.trim(),
        precio: validatorPrecio(inputPrecio.current.value),
        nombre: inputNameProduct.current.value.trim(),
        token: localStorage.getItem("tkn"),
        cantidadImgsUploaded: conteoImgsValidos,
        categoria:
          categoriaSeleccionado == null
            ? createNewCategoriaRef.current.value.trim()
            : categoriaSeleccionado,
      };

      formData.append("json_data", JSON.stringify(data));
      fetch(`${process.env.NEXT_PUBLIC_api}/file-createProducto`, {
        method: "POST",
        haders: {
          "content-type": "application/json",
        },
        body: formData,
      })
        .then((e) => e.json())
        .then((data) => {
          setMensajeSistema(
            <>
              {data.mensaje}
              <p style={{ color: "#6b6bff", textDecoration: "underline" }}>
                <Link href={data.url_producto} target="_blank">
                  click aqui para ver producto en la web
                </Link>
              </p>
            </>
          );
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
        });
    } else if (inputNameProduct.current.value.length == 0) {
      setMensajeSistema(<>Te falta agregar un nombre al producto</>);
    } else if (!firstInputImgFile.value) {
      setMensajeSistema(
        <>
          Debes de agregar por lo menos una imagen para poder subir el producto
        </>
      );
    } else if (textareaDescripcionRef.current.value.length < 4) {
      setMensajeSistema(<>La descripcion debe de tener mas de 3 caracteres</>);
    } else if (
      categoriaSeleccionado == null &&
      createNewCategoriaRef.current.value.trim().length == 0
    ) {
      //aqui entra si no ha elegido nada en categoria y sino escribio nada en crear nueva categoria
      setMensajeSistema(
        <>Te falta escojer una categoria o también si deseas crear una nueva</>
      );
    } else if (inputPrecio.current.value.length == 0) {
      setMensajeSistema(<>Te falta agregar un precio al producto</>);
    }
  };

  const clickDescartar = () => {
    textareaDescripcionRef.current.value = "";
    inputPrecio.current.value = "";
    inputNameProduct.current.value = "";

    //aqui borramos todas las imagenes que haya subido el usuario
    const imgFile = document.querySelectorAll(`.${page.imgFile}`);
    const allInputsFile = document.querySelectorAll(
      `.${page.containerInputs} > input`
    );
    for (let i = 0; i < imgFile.length; i++) {
      //lo de imgFile es para borrar del lado visible
      imgFile[i].src = "/carrito.svg";
      imgFile[i].style.cssText = "height:40%;width:40%;";
      if (i == imgFile.length - 1) {
        setContadorInputsClick(0);
        setMensajeImagen(
          "Es obligatorio subir por lo menos una imagen al producto!"
        );
      }

      //esto de aqui borramos solo para cuando se de click en subirProducto poder si inputFirstFile.value contiene algo o no
      //esto lo hago solo para poder subir el producto
      allInputsFile[i].value = "";
    }
  };

  const clickIconoUploadImage = () => {
    console.log(contadorInputsClick);
    if (contadorInputsClick <= 4) {
      //seleccionamos todos los inputs y de ahi clickeamos el input numero segun el estado contadorInputsClick...
      const allInputsFile = document.querySelectorAll(
        `.${page.containerInputs} > input`
      );
      allInputsFile[contadorInputsClick].click();

      console.log(allInputsFile[contadorInputsClick]);
    } else {
      // setMensajeImagen("llenaste todas las imagenes")
    }
  };

  //esto de aqui se usa en addImagenes
  const changeInputFile = (event) => {
    if (event.target.files[0]) {
      const imgFile = document.querySelectorAll(`.${page.imgFile}`);
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e) => {
        imgFile[contadorInputsClick].src = e.target.result;
        imgFile[contadorInputsClick].style.cssText = "height:100%;width:100%";
        setContadorInputsClick(contadorInputsClick + 1);
        if (contadorInputsClick < 3) {
          setMensajeImagen(
            `Si deseas puedes subir ${4 - contadorInputsClick} imagenes más...`
          );
          return;
        } else if (contadorInputsClick == 3) {
          setMensajeImagen(
            "Si deseas puedes subir 1 imagen más al producto..."
          );
          return;
        }

        setMensajeImagen("Todo listo para subir el producto al sistema ...👍");
      };
    }
  };

  //esto es un - onInput
  const onInputNameProduct = (event) => {
    //aqui solo validamos el nombre producto
    event.target.value = event.target.value.replace(/\s+/g, " ");
  };

  useEffect(() => {
    //aqui hacemos fetch solo para saber las categorias que existen

    const query = `query{giveAllCategorias}`;
    fetch(`${process.env.NEXT_PUBLIC_api}/graphql`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ query }),
    }).then((e) => {
      console.log(e);
    });

    setTimeout(() => {
      setListaCategorias([
        {
          categoriaName: "vestimenta",
        },
        {
          categoriaName: "calzados",
        },
        {
          categoriaName: "tecnologia",
        },
        {
          categoriaName: "accesorios",
        },
        {
          categoriaName: "ropa",
        },
        {
          categoriaName: "otros",
        },
      ]);
    }, 3000);
  }, []);

  //esto es cuando se da click a uno de sus divs de esas listas
  const clickListaCategoria = (indice, categoriaName) => {
    //esto es en donde dice "escoje una categoria"
    const select = document.querySelector(`.${page.select} > p`);

    //aqui cambiamos el texto a lo que dio click
    select.textContent = categoriaName;

    //cerramos la cajaLista
    const cajaLista = document.querySelector(`.${page.opcionesCategorias}`);
    cajaLista.style.animation = `${page.salidaCategorias} 200ms ease forwards`;

    setCategoriaSeleccionado(categoriaName);
    console.clear();
    //si selecciona algo eliminamos en caso de que haya escrito en crear nueva categoria
    createNewCategoriaRef.current.value = "";
  };

  let i = 0;
  let clickAfuera = null; //este boleano sirve enbes de poner if y elseif por monton y ps esto lo acorta
  const funcion = (event) => {
    i++;
    //aqui tiene que ser mayor a 1 por que sino cuenta el primer click que dio ps e inmediatamente se cierra
    //esto es para analizar el siguiente click en otras palabras
    if (i > 1) {
      const listaCajaCategorias = document.querySelectorAll(
        `.${page.opcionesCategorias} > div`
      );
      const idElementoClick = event.target.getAttribute("id");
      if (idElementoClick) {
        for (let e = 0; e < listaCategorias.length; e++) {
          //aqui si al ultimo elemento que dio click su id es diferente
          //a de los de la lista se le pone false al clickAfuera
          if (idElementoClick !== listaCajaCategorias[i].getAttribute("id")) {
            clickAfuera = false;
          } else {
            clickAfuera = true;
          }
        }
      } else {
        //si de por si no se encuentra un id es porque es otro elemento ps xd
        clickAfuera = true;
      }

      if (clickAfuera) {
        //si al final se ve que clickAfuera es true es porq realmente se dio clickAfuera xd
        const opcionesCategorias = document.querySelector(
          `.${page.opcionesCategorias}`
        );
        opcionesCategorias.style.animation = `${page.salidaCategorias} 200ms ease forwards`;
      }

      /*            for(let i =0;i<listaCategorias.length;i++){
            
                        }
            */

      window.removeEventListener("click", funcion);
      i = 0;
    }
  };

  //aqui se ejecuta cuando se da click a una de las listas que hay como en "ropa" "tecnologias" y asi..
  const clickSelect = () => {
    const cajaLista = document.querySelector(`.${page.opcionesCategorias}`);
    cajaLista.style.animation = `${page.entradaCategorias} 200ms ease forwards`;

    window.addEventListener("click", funcion);
  };

  //onInput
  const inputCreateNewCategoria = (event) => {
    //aqui validamos el input noma

    event.target.value = event.target.value.replace(/\s+/g, " ").toLowerCase();

    //aqui si se escribe algo entonces limpiamos el seleccionar categoria
    const textoDeSelect = document.querySelector(`.${page.select} > p`);
    textoDeSelect.textContent = "Escoje una categoria";
    setCategoriaSeleccionado(null);
  };
  return (
    <div className={page.addProducto}>
      <div className={page.addProducto_content}>
        <div className={page.animSCroll}></div>
        <p>Agrega un producto</p>
        <div className={page.nombre}>
          <input
            type="text"
            onInput={onInputNameProduct}
            ref={inputNameProduct}
            placeholder="Nombre del producto"
          ></input>
        </div>
        <div className={page.addImagen}>
          <div className={page.addImagen_content}>
            <div className={page.containerInputs}>
              <input type="file" id="1" onChange={changeInputFile} />
              <input type="file" id="2" onChange={changeInputFile} />
              <input type="file" id="3" onChange={changeInputFile} />
              <input type="file" id="4" onChange={changeInputFile} />
              <input type="file" id="5" onChange={changeInputFile} />
            </div>
            <div className={page.imagenes}>
              <div className={page.imagenes_content}>
                <div
                  className={page.iconoUpload}
                  onClick={clickIconoUploadImage}
                >
                  <svg fill="white" viewBox="0 0 24 24">
                    <path d="M12,11.7071068 L12,19.5 C12,19.7761424 11.7761424,20 11.5,20 C11.2238576,20 11,19.7761424 11,19.5 L11,11.7071068 L8.85355339,13.8535534 C8.65829124,14.0488155 8.34170876,14.0488155 8.14644661,13.8535534 C7.95118446,13.6582912 7.95118446,13.3417088 8.14644661,13.1464466 L11.1464466,10.1464466 C11.3417088,9.95118446 11.6582912,9.95118446 11.8535534,10.1464466 L14.8535534,13.1464466 C15.0488155,13.3417088 15.0488155,13.6582912 14.8535534,13.8535534 C14.6582912,14.0488155 14.3417088,14.0488155 14.1464466,13.8535534 L12,11.7071068 Z M15.7439414,7 L16.5,7 C18.9852814,7 21,9.01471863 21,11.5 C21,13.9852814 18.9852814,16 16.5,16 C16.2238576,16 16,15.7761424 16,15.5 C16,15.2238576 16.2238576,15 16.5,15 C18.4329966,15 20,13.4329966 20,11.5 C20,9.56700338 18.4329966,8 16.5,8 L15.9725356,8 C15.9906833,8.16416693 16,8.33099545 16,8.5 C16,8.77614237 15.7761424,9 15.5,9 C15.2238576,9 15,8.77614237 15,8.5 C15,6.56700338 13.4329966,5 11.5,5 L11,5 C8.790861,5 7,6.790861 7,9 L7,9.5 C7,9.77614237 6.77614237,10 6.5,10 C5.11928813,10 4,11.1192881 4,12.5 C4,13.8807119 5.11928813,15 6.5,15 C6.77614237,15 7,15.2238576 7,15.5 C7,15.7761424 6.77614237,16 6.5,16 C4.56700338,16 3,14.4329966 3,12.5 C3,10.736764 4.30385293,9.27805926 6,9.03544443 C6,6.23857625 8.23857625,4 11,4 L11.5,4 C13.4593282,4 15.1261868,5.25221144 15.7439414,7 L15.7439414,7 Z" />
                  </svg>
                </div>
                <div className={page.imagen_1}>
                  <img
                    className={page.imgFile}
                    src="/carrito.svg"
                    style={{ width: "40%", height: "40%" }}
                    alt="error"
                  ></img>
                  <div className={page.indiceNumero}>1</div>
                </div>
                <div className={page.imagenesRow}>
                  <div>
                    <img
                      src="/carrito.svg"
                      className={page.imgFile}
                      style={{ width: "40%", height: "40%" }}
                      alt=""
                    />
                    <div className={page.indiceNumero}>2</div>
                  </div>
                  <div>
                    <img
                      src="/carrito.svg"
                      className={page.imgFile}
                      style={{ width: "40%", height: "40%" }}
                      alt=""
                    />
                    <div className={page.indiceNumero}>3</div>
                  </div>
                  <div>
                    <img
                      src="/carrito.svg"
                      className={page.imgFile}
                      style={{ width: "40%", height: "40%" }}
                      alt=""
                    />
                    <div className={page.indiceNumero}>4</div>
                  </div>
                  <div>
                    <img
                      src="/carrito.svg"
                      className={page.imgFile}
                      style={{ width: "40%", height: "40%" }}
                      alt=""
                    />
                    <div className={page.indiceNumero}>5</div>
                  </div>
                </div>
                <div className={page.mensaje}>{mensajeImagen}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={page.descripcion}>
          <textarea
            ref={textareaDescripcionRef}
            spellCheck="false"
            placeholder="Descripción para el producto"
          ></textarea>
        </div>
        <div className={page.categoria}>
          <div className={page.categoria_content}>
            <div className={page.select} onClick={clickSelect}>
              <p>Escoje una categoria</p>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  class="h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  ></path>
                </svg>
              </span>
            </div>
            <div className={page.opcionesCategorias}>
              {listaCategorias &&
                listaCategorias.map((dataUnidad, indice) => {
                  return (
                    <div
                      onClick={() => {
                        clickListaCategoria(indice, dataUnidad.categoriaName);
                      }}
                      key={indice}
                      id={`listaNum_${indice}`}
                      className={`${page.listaCategoria_}${indice}`}
                    >
                      {dataUnidad.categoriaName}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className={page.linea}>
          ------------------- O -------------------
        </div>
        <div className={page.createNewCategoria}>
          <div>
            <input
              ref={createNewCategoriaRef}
              onInput={inputCreateNewCategoria}
              placeholder="Crear nueva categoria para este producto"
            ></input>
          </div>
        </div>
        <div className={page.addPrecio}>
          <p>Precio en dólares americanos:</p>
          <div className={page.inputContainer}>
            <input
              ref={inputPrecio}
              onInput={inputPrecioFuncion}
              placeholder="30.50"
            ></input>
            <div className={page.simboloDolar}>$</div>
          </div>
          {/* <div>escribe un numero valido</div>*/}
        </div>
        <div className={page.botones}>
          <div className={page.descartar} onClick={clickDescartar}>
            Descartar
          </div>
          <div className={page.botonSubir} onClick={clickSubirProducto}>
            {loading ? "enviando..." : "Subir Producto"}
          </div>
        </div>
        <div
          className={page.mensaje}
          style={{ minHeight: "30px", width: "100%" }}
        >
          {mensajeSistema}
        </div>
      </div>
      <div className={page.animScroll}></div>
    </div>
  );
}

const AdminContext = createContext();

function AdminPage() {
  //con este estado se abrira el modal
  const [modalAbierto, setModalAbierto] = useState(false);

  //aqui se guardara el componente modal ya sea el modalEliminar o el ModalEditar
  const [modalComponente, setModalComponente] = useState();

  const value = {
    modalAbierto,
    setModalAbierto,
    modalComponente,
    setModalComponente,
  };

  const clickCerrarSesion = () => {
    //esto automaticamente te redirige a login xd
    localStorage.removeItem("tkn");
    window.location.href = "/admin/login";
  };

  const clickAbrirSoporte = () => {
    //hacemos aparecer la ventana para que nadie pueda interactuar por lo que hay detras de la imagen
    const soporteCaja = document.querySelector(`.${page.soporteCaja}`);
    soporteCaja.style.display = "block";

    //hacemos que la imagen se centre y tenga sus medidas correctas
    const imagenSoporte = document.querySelector(
      `.${page.ventana} > .${page.imagen}`
    );
    imagenSoporte.style.cssText =
      "height:350px;width:350px;top:50%;right:50%;transform:translateX(50%) translateY(-60%);border-radius:20%;cursor:initial;outline:initial;animation:none";

    const img = document.querySelector(
      `.${page.ventana} > .${page.imagen} > img`
    );
    img.style.borderRadius = "20%";

    //mostramos todo lo texto que hay que mostrarse
    const soporteMensaje = document.querySelector(`.${page.soporteMensaje}`);
    soporteMensaje.style.visibility = "visible";
    soporteMensaje.style.display = "flex";

    //esto aqui modificamos el texto que estaba con efecto marquee
    const animFrase = document.querySelector(
      `.${page.ventana} > .${page.imagen} .${page.animFrase}`
    );
    animFrase.style.cssText = "width:100%;height:25px;";

    //este es el <p> le quitamos su efecto marquee y agrandamos y demas cosas
    const parrafoAnimFrase = document.querySelector(`.${page.animFrase} > p`);
    parrafoAnimFrase.style.cssText =
      "font-size:20px;font-weight:700;animation:none;width:100%;text-align:center;";

    setTimeout(() => {
      //este cerrarSoporte es la caja del icono de la ekis
      const cerrarSoporte = document.querySelector(`.${page.cerrarSoporte}`);
      const texto = document.querySelector(`.${page.texto}`);
      const whatsapp = document.querySelector(`.${page.whatsapp}`);

      cerrarSoporte.style.cssText = "visibility:visible;opacity:1;";

      texto.style.animation = `${page.entradaMensajeSoporte} 400ms ease forwards`;
      whatsapp.style.animation = `${page.entradaMensajeSoporte} 400ms ease forwards 200ms`;
    }, 250); //300ms dura la toda la transicion de .imagenSoporte
  };

  const clickCerrarSoporte = () => {
    //aqui el problema es que cuando se da click en la ekis tambien pertence a la imagen porlo que tambien
    //se ejecuta al mismo tiempo la funcion clickSoporte por eso no se cierra pero lo que yo hize para solucionar esto ponerle un setTimeout y asi funciona
    //la mejor solucion no es esa ni con setTimeout ya lo intente funciona pero hay error en las animaciones

    //lo primero sera volver a la posicion original la imagen

    const imagenSoporte = document.querySelector(
      `.${page.ventana} > .${page.imagen}`
    );
    imagenSoporte.style.cssText =
      "height:40px;width:40px;top:5px;right:55px;transform:translateX(0%) translateY(0%);border-radius:50%;cursor:pointer";

    const img = document.querySelector(
      `.${page.ventana} > .${page.imagen} > img`
    );
    img.style.borderRadius = "50%";

    //quitamos la animacion de entrada al texto
    const texto = document.querySelector(`.${page.texto}`);
    texto.style.animation = "";

    //quitamos la animacion de entrada al boton de whatsapp
    const whatsapp = document.querySelector(`.${page.whatsapp}`);
    whatsapp.style.animation = "";

    const cerrarSoporte = document.querySelector(`.${page.cerrarSoporte}`);
    cerrarSoporte.style.cssText = "visibility:hidden,opacity:0";

    const soporteMensaje = document.querySelector(`.${page.soporteMensaje}`);
    soporteMensaje.style.visibility = "hidden";

    //esto aqui modificamos el texto que estaba con efecto marquee
    const animFrase = document.querySelector(
      `.${page.ventana} > .${page.imagen} .${page.animFrase}`
    );
    animFrase.style.cssText = "width:50px,height:20px;";

    //este le agregamos su efecto marquee y agrandamos y demas cosas
    const parrafoAnimFrase = document.querySelector(`.${page.animFrase} > p`);
    parrafoAnimFrase.style.cssText = `font-size:12px;font-weight:700;animation:${page.markAnimation} 6.5s linear infinite`;

    const soporteCaja = document.querySelector(`.${page.soporteCaja}`);
    soporteCaja.style.display = "none";
  };
  return (
    <AdminContext.Provider value={value}>
      <div className={page.ventana}>
        <div className={page.header}>
          <h1>Bienvenido! Admin</h1>
          <div className={page.left}>
            <div className={page.exit} onClick={clickCerrarSesion}>
              <img src="/ekis.svg"></img>
            </div>
          </div>
        </div>
        <div className={page.imagen} onClick={clickAbrirSoporte}>
          <img src="/soporte.jpg"></img>
          <div className={page.soporteMensaje}>
            <div className={page.texto}>
              hola soy jayme Ln desarrollador y asistente técnico de este
              eccomerce si ocurrio algún error en el sistema escribeme a mi
              WhatsApp:
            </div>
            <div className={page.whatsapp}>
              <div className={page.icono}>logo</div>
              <div className={page.numero}>+51 903 032 251</div>
            </div>
          </div>
          <div className={page.animFrase}>
            <p>Soporte Técnico</p>
          </div>
        </div>
        <div className={page.container}>
          <Left></Left>
          <Right></Right>
        </div>
        {modalAbierto ? (
          <div className={page.modal}>{modalComponente}</div>
        ) : (
          ""
        )}
        <div className={page.soporteCaja}></div>
        <div className={page.cerrarSoporte}>
          <img src="/ekis.svg" onClick={clickCerrarSoporte}></img>
        </div>
      </div>
    </AdminContext.Provider>
  );
}

export default function App() {
  //aqui se va a redirigir si no tiene el token
  const [redirect, setRedirect] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getToken = localStorage.getItem("tkn");
    if (!getToken) {
      //si no tiene el token defrente se redirige

      setRedirect(true);

      //si tiene el token hay que verificar que sea valido
    } else {
      const query = `query{verifyToken(token:"${getToken}")}`;

      fetch(`${process.env.NEXT_PUBLIC_api}/graphql`, {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify({ query }),
      })
        .then((e) => e.json())
        .then((e) => {
          if (e.data.verifyToken) {
            setRedirect(false);
          } else {
            setRedirect(true);
          }
        });

      console.log("false");
    }
  }, []);

  useEffect(() => {
    if (redirect) {
      router.push("/admin/login");
    }
  }, [redirect]);

  return (
    <>
      {/*!redirect !== null && <AdminPage></AdminPage>*/}
      {/*si redirect es null que se muestre el cargando...*/}
      {redirect == null ? (
        <h1 style={{ color: "white" }}>cargando...</h1>
      ) : redirect ? (
        <h1 style={{ color: "white" }}>cargando...</h1>
      ) : (
        <AdminPage></AdminPage>
      )}
    </>
  );
}
