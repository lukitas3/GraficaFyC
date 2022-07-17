const contenido=document.querySelector(".contenido");let token="IGQVJYODYtWUh2cEpBY3pRd0dBdUZAoRkxpU3ljT0kxSWlnTDBNbzh4c1VIb0loRm5rRHVVUWx6X3NPTWpDUkFNYVMtOEpDcjBuM1dmbGhQeVFjbFM1R3dRYzBFWWh3RWpVdm12blloZAnFJaTNhYjdmZAwZDZD",FeedInstagram=`https://graph.instagram.com/me/media?fields=thumbnail_url,media_url,children,children_url,timestamp,media_type,caption,permalink&limit=12&access_token=${token}`,galeria=document.querySelector(".galeria");window.addEventListener("hashchange",()=>{""===location.hash&&Inicio(),"#Galeria"===location.hash&&Galeria(),"#Contacto"===location.hash&&Contacto(),"#Trabajo"===location.hash&&Trabajo(),Active(),Overflow()}),window.addEventListener("DOMContentLoaded",()=>{""===location.hash&&Inicio(),"#Galeria"===location.hash&&Galeria(),"#Contacto"===location.hash&&Contacto(),"#Trabajo"===location.hash&&Trabajo(),Active(),Overflow()}),document.addEventListener("click",a=>{a.target.matches(".foto")&&SetImg(a.target.parentElement),a.target.matches(".close")&&Delete(),a.target.matches(".conteiner-modal")&&Delete(),a.target.matches(".next")&&Instagram(a.target.getAttribute("data-page")),a.target.matches(".prev")&&Instagram(a.target.getAttribute("data-page"))});const Inicio=()=>{contenido.innerHTML=`
            <img class="portada" src="portada.jpg">
            <div class="novedades">
                <h2 class="title-novedades">Novedades!</h2>
                <div class="conteiner-ejemplos">
                    <img class="news img-ej" src="work (3).jpeg" class="img-ej">
                    <img class="news img-ej" src="work (18).jpeg" class="img-ej">
                    <img class="news img-ej" src="work (5).jpeg" class="img-ej">
                </div>
            </div>
            <div class="footer">
                <div class="redes">
                    <h4>Redes</h4>
                    <div class="icons">
                        <a href="https://www.facebook.com/GraficaFYC" target="_blank"><img class="icons-img" src="facebookb.png"></a>
                        <a href="https://www.instagram.com/graficafyc/" target="_blank"><img class="icons-img" src="instagramb.png"></a>
                    </div>
                </div>
                <div class="contact">
                    <h4>Contacto</h4>
                    <ul>
                        <a class="mail" href="mailto:fycimpresion@gmail.com"><li class="lista">Enviar Mail</li></a>
                        <li class="lista">1138849632</li>
                        <li class="lista">1165250943</li>
                        <li class="lista">GBA, Florencio Varela, Pico de oro</li>
                    </ul>
                </div>
            </div>`,contenido.setAttribute("data-","inicio")},Galeria=()=>{contenido.innerHTML=`
            <div id="Galeria" class="titulo">
                <h2 class="title-page"><b class="subrayado">Ultimos trabajos</b></h2>
            </div>
            <div class="seccion">
            </div>
            <div class="previous-next">
                 <a href="#Galeria"><button class="prev">Anterior</button></a>
                 <a href="#Galeria"><button class="next">Siguiente</button></a>
            </div>
            <div class="conteiner-modal"></div>
            <div class="footer">
                <div class="redes">
                    <h4>Redes</h4>
                    <div class="icons">
                        <a href="https://www.facebook.com/GraficaFYC" target="_blank"><img class="icons-img" src="facebookb.png"></a>
                        <a href="https://www.instagram.com/graficafyc/" target="_blank"><img class="icons-img" src="instagramb.png"></a>
                    </div>
                </div>
                <div class="contact">
                    <h4>Contacto</h4>
                    <ul>
                        <a class="mail" href="mailto:fycimpresion@gmail.com"><li class="lista">Enviar Mail</li></a>
                        <li class="lista">1138849632</li>
                        <li class="lista">1165250943</li>
                        <li class="lista">GBA, Florencio Varela, Pico de oro</li>
                    </ul>
                </div>
            </div>`,contenido.setAttribute("data-","galeria"),Instagram(FeedInstagram)},Instagram=async e=>{let b=document.querySelector(".seccion");b.innerHTML=`
                <div class="cont-loader">
                    <img src="tail-spin.svg" class="loader"> 
                </div>`;try{let a=await fetch(e);if(json=await a.json(),template="",!a.ok)throw{status:a.status,statusText:a.statusText};json.data.forEach(a=>{json.paging.next,json.paging.previous;let b=a.media_type,c=a.timestamp;timeMoment=moment(c).format("LL"),"VIDEO"===b?template+=`
                        <div class="conteiner-card">
                            <div class="card">
                                <video id="${a.id}" class="foto" data-type="${b}" src="${a.media_url}" alt=""></video>
                                <h3 class="describ">${a.caption||"Sin titulo"}</h3>
                                <p class="time">${timeMoment}</p>
                            </div>
                        </div>
                    `:template+=`
                        <div class="conteiner-card">
                            <div class="card">
                                <img id="${a.id}" class="foto" data-type="${b}" src="${a.media_url}" alt="">
                                <h3 class="describ">${a.caption||"Sin titulo"}</h3>
                                <p class="time">${timeMoment}</p>
                            </div>
                        </div>`,document.querySelector(".next").setAttribute("data-page",json.paging.next),document.querySelector(".prev").setAttribute("data-page",json.paging.previous)}),setTimeout(()=>{b.innerHTML=template},1e3);let f=json.paging.next,g=json.paging.previous,c=document.querySelector(".prev"),d=document.querySelector(".next");void 0===g?c.classList.add("inactive"):c.classList.remove("inactive"),void 0===f?d.classList.add("inactive"):d.classList.remove("inactive")}catch(h){b.innerHTML=`
                            <div class="error-conteiner">
                                <h3 class="error">Ha ocurrido un error! <br> recarge la pagina</h3>    
                            </div>`}finally{let i=document.querySelector(".cont-loader");setTimeout(()=>{i.classList.add("none")},1e3)}},Contacto=()=>{contenido.innerHTML=`
            <h2 class="title-page titulo"><b class="subrayado">Contactanos</b></h2>
            <div class="contacto">
                <div class="formulario">
                    <h2>Envianos tu mensaje!</h2>
                    <form>
                        <input class="inputs" type="text" placeholder="Ingrese su nombre">
                        <input class="inputs" type="text" placeholder="Ingrese su email">
                        <textarea placeholder="Ingrese su comentario"></textarea>
                        <button class="enviar" type="submit">Enviar</button>
                    </form>
                </div>
                <div class="mapa">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2315.5968615485376!2d-58.28751916862012!3d-34.837415752204585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a32a2f3f0063c1%3A0xdbc0ea69f38fb33f!2sGrafica%20FYC!5e0!3m2!1ses-419!2sar!4v1654096816325!5m2!1ses-419!2sar" width="500" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    <ul class="contact-list">
                        <li class="lista-cont">
                            <span class="material-symbols-outlined">
                            call
                            </span><a class="whats" href="https://api.whatsapp.com/send?phone=%2B541138849632&fbclid=IwAR2SlUZwo-do9K8Yz0_qktKr5cFo90h6zcf0dYKIR78pMxs2Fd5Z0hO3zjY" target="_blank"><b>WhatsApp</b></a>
                        </li>
                        <li class="lista-cont">
                            <span class="material-symbols-outlined">
                                smartphone
                            </span><b>1165250943</b> o <b>1138849632</b>
                        </li>
                        <li class="lista-cont">
                            <span class="material-symbols-outlined">
                            pin_drop
                            </span><b>Florencio Varela, Pico de oro</b>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="footer">
                <div class="redes">
                    <h4>Redes</h4>
                    <div class="icons">
                        <a href="https://www.facebook.com/GraficaFYC" target="_blank"><img class="icons-img" src="facebookb.png"></a>
                        <a href="https://www.instagram.com/graficafyc/" target="_blank"><img class="icons-img" src="instagramb.png"></a>
                    </div>
                </div>
                <div class="contact">
                    <h4>Contacto</h4>
                    <ul>
                        <a class="mail" href="mailto:fycimpresion@gmail.com"><li class="lista">Enviar Mail</li></a>
                        <li class="lista">1138849632</li>
                        <li class="lista">1165250943</li>
                        <li class="lista">GBA, Florencio Varela, Pico de oro</li>
                    </ul>
                </div>
            </div>`,contenido.setAttribute("data-","contact")},Trabajo=()=>{contenido.innerHTML=`
            <h2 class="title-page titulo"><b class="subrayado">Sobre Nosotros</b></h2>
            <div class="trabajo">
                <div class="aboutme">
                    <p class="descripcion"><b>\xbfQui\xe9nes somos?</b><br><br>

                    Somos una empresa familiar que a lo largo de varios a\xf1os construimos procesos de producci\xf3n que nos permiten ser competitivos en el mercado. 
                    
                    Hoy somos una empresa que brinda soluciones gr\xe1ficas con m\xe1s de 5 a\xf1os de experiencia.
                    
                    Trabajamos con los mejores insumos y maquinaria del sector, ofreciendo amplia variedad y novedades de productos y terminaciones.  
                    
                    Brindamos servicios tanto para el gremio, como empresas, emprendedores, comercio y m\xe1s.
                    
                    Nuestro principal compromiso es la buena atenci\xf3n, con gran dedicaci\xf3n para lograr la mejor calidad y precios competitivos en base a tus necesidades.<br><br>
                    
                    \xa1Conocenos!</p>
                </div>
                <div class="proyectos">
                    <img class="impresora" src="impresora.webp">
                    <img class="impresora" src="impresora.png">
                </div>
            </div>
            <div class="footer">
                <div class="redes">
                    <h4>Redes</h4>
                    <div class="icons">
                        <a href="https://www.facebook.com/GraficaFYC" target="_blank"><img class="icons-img" src="facebookb.png"></a>
                        <a href="https://www.instagram.com/graficafyc/" target="_blank"><img class="icons-img" src="instagramb.png"></a>
                    </div>
                </div>
                <div class="contact">
                    <h4>Contacto</h4>
                    <ul>
                        <a class="mail" href="mailto:fycimpresion@gmail.com"><li class="lista">Enviar Mail</li></a>
                        <li class="lista">1138849632</li>
                        <li class="lista">1165250943</li>
                        <li class="lista">GBA, Florencio Varela, Pico de oro</li>
                    </ul>
                </div>
            </div>`,contenido.setAttribute("data-","work")},Router=()=>{document.addEventListener("click",a=>{let b=a.target.getAttribute("data-href");a.target.matches(".a-nav")&&(location.hash=b)})},Active=()=>{document.addEventListener("click",a=>{let b=a.target.getAttribute("data-active"),c=document.querySelectorAll(".a-nav");(b||"#"===location.hash)&&(c.forEach(a=>{a.classList.remove("active")}),a.target.classList.add("active")),b===location.hash&&(c.forEach(a=>{a.classList.remove("active")}),a.target.classList.add("active")),b===location.hash&&(c.forEach(a=>{a.classList.remove("active")}),a.target.classList.add("active")),b===location.hash&&(c.forEach(a=>{a.classList.remove("active")}),a.target.classList.add("active"))})},Delete=()=>{let a=document.querySelector(".conteiner-modal");a.innerHTML=" ",a.classList.remove("visible"),Overflow()},Overflow=()=>document.body.style.overflow="visible",SetImg=c=>{let a={archivo:c.querySelector(".foto"),img:c.querySelector(".foto").src,title:c.querySelector(".describ").textContent,time:c.querySelector(".time").textContent},d=document.querySelector(".conteiner-modal"),e=document.createDocumentFragment(),b=document.createElement("div");b.classList.add("modal"),a.archivo.getAttribute("data-type"),b.innerHTML=`
            <img class="img-up" src="${a.img}">
            <span class="material-symbols-outlined close">
                close
            </span>
            <div class="describ-img">
                <h5 class="title-modal">${a.title}</h5>
                <p class="time-modal">${a.time}</p>
                </div>`,e.appendChild(b),d.appendChild(e),d.classList.add("visible"),document.body.style.overflow="hidden","VIDEO"===a.archivo.getAttribute("data-type")&&(b.innerHTML=`
            <video class="img-up" src="${a.img}" controls></video>
            <span class="material-symbols-outlined close">
                close
            </span>
            <div class="describ-img">
                <h5 class="title-modal">${a.title}</h5>
                <p class="time-modal">${a.time}</p>
                </div>`,e.appendChild(b),d.appendChild(e),d.classList.add("visible"),document.body.style.overflow="hidden")};Router()