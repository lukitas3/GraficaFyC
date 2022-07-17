const contenido = document.querySelector('.contenido')

let token = 'IGQVJYODYtWUh2cEpBY3pRd0dBdUZAoRkxpU3ljT0kxSWlnTDBNbzh4c1VIb0loRm5rRHVVUWx6X3NPTWpDUkFNYVMtOEpDcjBuM1dmbGhQeVFjbFM1R3dRYzBFWWh3RWpVdm12blloZAnFJaTNhYjdmZAwZDZD';

let FeedInstagram = `https://graph.instagram.com/me/media?fields=thumbnail_url,media_url,children,children_url,timestamp,media_type,caption,permalink&limit=12&access_token=${token}`

let galeria = document.querySelector('.galeria')

window.addEventListener('hashchange' , () => {
	if(location.hash === ''){
        Inicio()
	}
	if(location.hash === '#Galeria'){
        Galeria()   
	}
	if(location.hash === '#Contacto'){
        Contacto()
	}
	if(location.hash === '#Trabajo'){
        Trabajo()
	}
    Active()
    Overflow()
}) 

window.addEventListener('DOMContentLoaded' , () => {
	if(location.hash === ''){
        Inicio()
	}
	if(location.hash === '#Galeria'){
        Galeria()   
	}
	if(location.hash === '#Contacto'){
        Contacto()
	}
	if(location.hash === '#Trabajo'){
        Trabajo()
	}
    Active()
    Overflow()
})

document.addEventListener('click' , (e) => {
    if (e.target.matches('.foto')) {
        SetImg(e.target.parentElement) 
    }
    if (e.target.matches('.close')) {
        Delete()
    }
    if (e.target.matches('.conteiner-modal')) {
        Delete()
    }
    if (e.target.matches('.next')) {
        Instagram(e.target.getAttribute('data-page'))
    }
    if (e.target.matches('.prev')) {
        Instagram(e.target.getAttribute('data-page'))
    }
})

const Inicio = () => {
    contenido.innerHTML = `
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
            </div>`
        contenido.setAttribute('data-' , 'inicio')
}

const Galeria = () => {
    contenido.innerHTML = `
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
            </div>`
            contenido.setAttribute('data-' , 'galeria')

Instagram(FeedInstagram)
}

const Instagram = async (url) => {
        
    const seccion = document.querySelector('.seccion')
    seccion.innerHTML = `
                <div class="cont-loader">
                    <img src="tail-spin.svg" class="loader"> 
                </div>`
        try {
            let res = await fetch(url)
                json = await res.json(),
                template = "";

            if(!res.ok) throw { status: res.status, statusText: res.statusText}

            json.data.forEach(e => {
            const nextActive = json.paging.next,
                  prevActive = json.paging.previous,
                  type = e.media_type,
                  time = e.timestamp;
                
                timeMoment = moment(time).format('LL');
    
                if (type === 'VIDEO') {
                    template += `
                        <div class="conteiner-card">
                            <div class="card">
                                <video id="${e.id}" class="foto" data-type="${type}" src="${e.media_url}" alt=""></video>
                                <h3 class="describ">${e.caption || "Sin titulo"}</h3>
                                <p class="time">${timeMoment}</p>
                            </div>
                        </div>
                    `
                    } else if (type === 'IMAGE' || 'CAROUSEL_ALBUM' ) {
                        template += `
                        <div class="conteiner-card">
                            <div class="card">
                                <img id="${e.id}" class="foto" data-type="${type}" src="${e.media_url}" alt="">
                                <h3 class="describ">${e.caption || "Sin titulo"}</h3>
                                <p class="time">${timeMoment}</p>
                            </div>
                        </div>`
                    }
    
                let next = document.querySelector('.next')
                    next.setAttribute('data-page', json.paging.next)
    
                let prev = document.querySelector('.prev')
                    prev.setAttribute('data-page', json.paging.previous)
            });
                setTimeout(() => {
                    seccion.innerHTML = template;
                }, 1000);
                const nextActive = json.paging.next,
                      prevActive = json.paging.previous,
                      PrevBtn = document.querySelector('.prev'),
                      NextBtn = document.querySelector('.next');

        (prevActive === undefined)?PrevBtn.classList.add('inactive'):PrevBtn.classList.remove('inactive');
        (nextActive === undefined)?NextBtn.classList.add('inactive'):NextBtn.classList.remove('inactive');

            } catch (err) {
            seccion.innerHTML = `
                            <div class="error-conteiner">
                                <h3 class="error">Ha ocurrido un error! <br> recarge la pagina</h3>    
                            </div>`
        } finally {
            const loader = document.querySelector('.cont-loader')
            setTimeout(() => {
                loader.classList.add('none')
            }, 1000);
        }
}

const Contacto = () => {
    contenido.innerHTML = `
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
            </div>`
            contenido.setAttribute('data-' , 'contact')
}

const Trabajo = () => {
    contenido.innerHTML = `
            <h2 class="title-page titulo"><b class="subrayado">Sobre Nosotros</b></h2>
            <div class="trabajo">
                <div class="aboutme">
                    <p class="descripcion"><b>¿Quiénes somos?</b><br><br>

                    Somos una empresa familiar que a lo largo de varios años construimos procesos de producción que nos permiten ser competitivos en el mercado. 
                    
                    Hoy somos una empresa que brinda soluciones gráficas con más de 5 años de experiencia.
                    
                    Trabajamos con los mejores insumos y maquinaria del sector, ofreciendo amplia variedad y novedades de productos y terminaciones.  
                    
                    Brindamos servicios tanto para el gremio, como empresas, emprendedores, comercio y más.
                    
                    Nuestro principal compromiso es la buena atención, con gran dedicación para lograr la mejor calidad y precios competitivos en base a tus necesidades.<br><br>
                    
                    ¡Conocenos!</p>
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
            </div>`
            contenido.setAttribute('data-' , 'work')
}

const Router = () => {
    document.addEventListener('click' , (e) => {
        let href = e.target.getAttribute('data-href')
            if (e.target.matches('.a-nav')) {
                location.hash = href;
            }
    })
}

const Active = () => {
    document.addEventListener('click' , (e) => {
        let href = e.target.getAttribute('data-active')
        let links = document.querySelectorAll('.a-nav')
        if (href || '#' ===  location.hash) {    
            links.forEach(e => {
                e.classList.remove('active')
            })
            e.target.classList.add('active');
            
        }
        if (href ===  location.hash) {        
            links.forEach(e => {
                e.classList.remove('active')
            })
            e.target.classList.add('active');
            
        }
        if (href ===  location.hash) {            
            links.forEach(e => {
                e.classList.remove('active')
            })
            e.target.classList.add('active');
            
        }
        if (href ===  location.hash) {
            links.forEach(e => {
                e.classList.remove('active')
            })    
            e.target.classList.add('active');    
        }
    })
}

const Delete = () => {
    const ContModal = document.querySelector('.conteiner-modal')

    ContModal.innerHTML = ` `
    ContModal.classList.remove('visible')
    Overflow()
}

const Overflow = () => document.body.style.overflow = 'visible';

const SetImg = (obj) => {
    const seleccion = {
        archivo: obj.querySelector('.foto'),
        img: obj.querySelector('.foto').src,
        title: obj.querySelector('.describ').textContent,
        time: obj.querySelector('.time').textContent
    }
    const ContModal = document.querySelector('.conteiner-modal')
    let fragment = document.createDocumentFragment();
    const modal = document.createElement('div')
        modal.classList.add('modal')
        if (seleccion.archivo.getAttribute('data-type')==='IMAGE' || 'CAROUSEL-ALBUM') {
            modal.innerHTML = `
            <img class="img-up" src="${seleccion.img}">
            <span class="material-symbols-outlined close">
                close
            </span>
            <div class="describ-img">
                <h5 class="title-modal">${seleccion.title}</h5>
                <p class="time-modal">${seleccion.time}</p>
                </div>`
            fragment.appendChild(modal)
            ContModal.appendChild(fragment)
            ContModal.classList.add('visible')
            document.body.style.overflow = 'hidden'    
            }
        if (seleccion.archivo.getAttribute('data-type')==='VIDEO') {
            modal.innerHTML = `
            <video class="img-up" src="${seleccion.img}" controls></video>
            <span class="material-symbols-outlined close">
                close
            </span>
            <div class="describ-img">
                <h5 class="title-modal">${seleccion.title}</h5>
                <p class="time-modal">${seleccion.time}</p>
                </div>`
            fragment.appendChild(modal)
            ContModal.appendChild(fragment)
            ContModal.classList.add('visible')
            document.body.style.overflow = 'hidden'    
            }
}

Router()

