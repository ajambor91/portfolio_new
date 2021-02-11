import { Critter } from "../entities/chars/enemies/chars/critter"
import { Demon } from "../entities/chars/enemies/chars/demon"


export const enemiesSpr = {
    demonFront: {key: 'demon_front', path: '/assets/game/chars/enemies/demon.png', width: 192, height: 192},
    critter: {key: 'critter', path: '/assets/game/chars/enemies/critter.png', width: 103, height: 126}
}

export const enemies = {
    demonFrontFirst : {key: 'demon_front', type:'demonSpr', xPosition: 2330, yPosition: -20, class: Demon},
    demonFrontSecond : {key: 'demon_front', type:'demonSpr2', xPosition: 3820, yPosition: -20, class: Demon},
    demonFrontThird : {key: 'demon_front', type:'demonSpr3', xPosition: 3820, yPosition: 130, class: Demon},
    demonFrontFourth : {key: 'demon_front', type:'demonSpr4', xPosition: 3820, yPosition: 300, class: Demon},
    critter : {key: 'critter', type:'critterSpr', xPosition: 940, yPosition: 500, class: Critter},
    critterSecond : {key: 'critter', type:'critterSpr2', xPosition: 2940, yPosition: 200, class: Critter}

    
}