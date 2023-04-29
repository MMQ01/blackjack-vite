// 2C = 2 de treboles
// 2D = 2 de Diamantes
// 2H = 2 de corazones
// 2S = 2 de espadas



const miModulo=(()=>{
    'use strict'





    let deck = []
    const tipos = ['C','D','H','S'],
          especiales = ['A','J','Q','K']

    // let puntosJugador=0,
    //     puntosPC=0
    let puntosJugadores=[]
    //referencias HTML
    const   btnPedir =document.querySelector('#btnPedir'),
            btnDetener =document.querySelector('#btnDetener'),
            btnNuevo =document.querySelector('#btnNuevo'),
            puntosHTML =  document.querySelectorAll('small'),
            divCartasJugador = document.querySelectorAll('.divCartas')
            // divCartasJugador = document.querySelector('#jugador-cartas'),
            // divCartasPC = document.querySelector('#computadora-cartas')
    let puntosPC =0
    const inicializarJuego = (numJugadores = 2)=>{
       deck= crearDeck()
       puntosJugadores=[]
       for (let i = 0; i < numJugadores; i++) {
        puntosJugadores.push(0)
        
       }

       
       
        puntosHTML[0].innerText=0
        puntosHTML[1].innerText=0
        divCartasJugador[0].innerHTML=''
        divCartasJugador[1].innerHTML=''
        
        btnDetener.disabled= false
        btnPedir.disabled= false
        console.clear()
    }
    const crearDeck =()=>{
    
        deck=[]

        for (let i = 2; i < 10; i++) {
    
            for (const tipo of tipos) {
                deck.push(i + tipo)
            }    
        }
    
        for (const tipo of tipos) {
            for (const esp of especiales) {
                deck.push(esp + tipo)
            }
        }
    
        return _.shuffle(deck);
    }
    
   
    
    
    const pedirCarta =()=>{
    
        if(deck.length == 0){
            throw 'No hay cartas en el deck'
        }
        
        return deck.pop()
    }
    
    // pedirCarta()
    const valorCarta=(carta)=>{
    
        const valor = carta.substring(0 , carta.length - 1)
    
        return (isNaN(valor))?
                (valor === 'A')?11:10
                : valor * 1;
        // let puntos = 0
        // if(isNaN(valor)){
    
        //     puntos = (valor === 'A')?11:10
        // }else{
        //     puntos = Number(valor)
        // }
    
    
    }
    
    const acumularPuntos =(carta, turno)=>{
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta)
        puntosHTML[turno].innerText =puntosJugadores[turno]
        return puntosJugadores[turno]
    }   


    const crearCarta = (carta, turno)=>{
        const imgCarta = document.createElement('img')
        imgCarta.src = `assets/cartas/${carta}.png`
        imgCarta.classList.add('cartas')
        divCartasJugador[turno].append(imgCarta)
        // divCartasPC.append(imgCarta)
    }

    const determinarGanador=()=>{

        const [ puntosMinimos,puntosPC]= puntosJugadores

        setTimeout(() => {
            if(puntosPC == puntosMinimos){
                alert('Nadie gana')
        
            }else if(puntosMinimos>21){
                alert('Computadora gana')
            }else if(puntosPC>21){
                alert('Jugador gana')
            }else{
                alert('Computadora gana')
            }
        
        }, 100);
    }
     //turno PC
    const turnoPC =(puntosMinimos)=>{
       
        do {
            const carta= pedirCarta()
       
          const puntosPC=acumularPuntos(carta, puntosJugadores.length - 1)
          crearCarta(carta, puntosJugadores.length - 1 )
         
    
          
    
        } while ((puntosJugadores[puntosJugadores.length - 1] < puntosMinimos)&& (puntosMinimos <=21));
    
        determinarGanador()
    
    
       
    }
    
    
    // valorCarta('2D')
    
    // Eventos
    btnPedir.addEventListener('click',()=> {
        const carta= pedirCarta()
       
        const puntosJugador = acumularPuntos(carta, 0)
    
        crearCarta(carta, 0)
   
    
    
        if(puntosJugador>21){
            console.warn('Perdiste');
            btnPedir.disabled= true
            btnDetener.disabled= true
            turnoPC(puntosJugador)
        }else if(puntosJugador === 21){
            console.warn('21, puntaje perfecto');
            btnPedir.disabled= true
            btnDetener.disabled= true
            turnoPC(puntosJugador)
    
        }
    })
    
    btnDetener.addEventListener('click',()=> {
    
        btnDetener.disabled= true
        btnPedir.disabled= true
        
        turnoPC(puntosJugadores[0])
    })
    
    btnNuevo.addEventListener('click',()=> {
        inicializarJuego()
        
       
    })

    return{
        nuevoJuego:inicializarJuego
    }

})()
