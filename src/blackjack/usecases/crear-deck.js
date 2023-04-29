import _ from "underscore";

/**
 * Esta funcion  retorna un deck
 * @param {Array<String>} tiposdeCartas Ejemplo ['C','D','H','S'],
 * @param {Array<String>} tiposEspeciales Ejemplo ['A','J','Q','K']
 * @returns {Array<String>}
 */
export const crearDeck =(tiposdeCartas, tiposEspeciales)=>{

    if(!tiposdeCartas || tiposdeCartas.length === 0) throw new Error('Tipos de cartas es obligatorio')
    if(!tiposEspeciales || tiposEspeciales.length === 0) throw new Error('Tipos especiales es obligatorio')
  
    let deck=[]

    for (let i = 2; i < 10; i++) {

        for (const tipo of tiposdeCartas) {
            deck.push(i + tipo)
        }    
    }

    for (const tipo of tiposdeCartas) {
        for (const esp of tiposEspeciales) {
            deck.push(esp + tipo)
        }
    }

    return _.shuffle(deck);
}