
(()=>{
  'use strict'
        let deck         = [];
        const tipos      = ['C', 'D', 'H', 'S'],
             especiales = ['A', 'J', 'Q', 'K'];
        let puntosJugador = 0,
            puntosComputadora=0;
        //Referencias del HTML
        const pedir = document.querySelector('#pedir');
        const parar = document.querySelector('#parar');
        const nuevo = document.querySelector('#nuevo')
        const acum = document.querySelectorAll('small');
        const cartasJugador = document.querySelector('#jugador-cartas');
        const cartasComputadora = document.querySelector('#computadora-cartas');
        
        
        const crearDeck=()=>{
        for(let i = 2; i <= 10; i++ ){
          for(let tipo of tipos){
            deck.push(i + tipo );
          };
        }
        for (let tipo of tipos){
            for( let especial of especiales){
                deck.push (especial + tipo);
            }
        }
        
        deck = _.shuffle (deck);
        
        return deck;
        };
        
        crearDeck();
        
        const pedirCarta = ()=>{
        
            if(deck.length===0){
                throw 'No hay cartas en el mazo';
            }
        
          const carta= deck.pop();
            return carta;
        }
        
        pedirCarta();
        
        const valorCarta=(carta)=>{
          const valor = carta.substring(0,carta.length-1);
          return( isNaN(valor)) ?
                (valor==='A') ? 11 : 10
                :valor*1;
          //ESTA ES OTRA OPCION MAS LARGA...
          //let puntos = 0;
          //if (isNaN(valor)) {
            //puntos = (valor === 'A') ? 11 : 10;
          //} else {
        
            //puntos = valor * 1;
          //}
          //console.log(puntos);
        };
        
        // Turno de la Computadora
        const turnoComputadora = (puntosMinimos)=>{
            do{
              const carta = pedirCarta();
          
          puntosComputadora = puntosComputadora + valorCarta(carta);
          acum[1].innerText = puntosComputadora;
        
          const imgCarta = document.createElement('img');
          imgCarta.src = `cartas/${carta}.png`;
          imgCarta.classList.add('carta');
          cartasComputadora.append( imgCarta );
                if( puntosMinimos > 21 ) {
                    break;
                }
        
            }while( ( puntosComputadora < puntosMinimos ) && (puntosMinimos <= 21));
        
              setTimeout (() => {
        
            
        
            if( puntosComputadora === puntosJugador){
              alert ('Empate, Nadie Gana :(');
            } else if ( puntosMinimos > 21 ) {
              alert ('La computadora Gana');
            } else if ( puntosComputadora >21 ){
              alert ('Felicitaciones, Ganaste... :)')
            } else if (puntosComputadora > puntosJugador && puntosComputadora <= 21){
              alert ('La computadora Gana');
            }
          }, 150);
        }
        
        //Eventos del jugador
        pedir.addEventListener('click', () => {
          const carta = pedirCarta();
          
          puntosJugador = puntosJugador + valorCarta(carta);
          acum[0].innerText = puntosJugador;
        
          const imgCarta = document.createElement('img');
          imgCarta.src = `cartas/${carta}.png`;
          imgCarta.classList.add('carta');
          cartasJugador.append( imgCarta );
          
          if(puntosJugador > 21){
            console.warn ('Lo siento, Has perdido.');
            pedir.disabled = true;
            parar.disabled = true;
            turnoComputadora( puntosJugador );
          } else if ( puntosJugador=== 21 ){
            console.warn('21, Excelentes Noticias!!!');
            pedir.disabled = true;
            parar.disabled = true;
            turnoComputadora( puntosJugador );
          }
        })
        parar.addEventListener('click', () =>{
          pedir.disabled = true;
          parar.disabled = true;
          turnoComputadora( puntosJugador );
        });
        
        nuevo.addEventListener ('click', ()=>{
            console.clear();
            deck = [];
            deck = crearDeck();
            puntosJugador = 0;
            puntosComputadora = 0;
            acum[0].innerText = 0;
            acum[1].innerText = 0;
            cartasComputadora.innerHTML = '';
            cartasJugador.innerHTML = '';
            pedir.disabled = false;
            parar.disabled = false;
        });
  
})();



