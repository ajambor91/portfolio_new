import { Cannon } from "../entities/chars/enemies/chars/cannon"
import { Critter } from "../entities/chars/enemies/chars/critter"
import { Demon } from "../entities/chars/enemies/chars/demon"
import { Snake } from "../entities/chars/enemies/chars/snake"


export const enemiesSpr = {
    demonFront: {key: 'demon', path: '/assets/game/chars/enemies/demon.png', width: 192, height: 192},
    critter: {key: 'critter', path: '/assets/game/chars/enemies/critter.png', width: 103, height: 126},
    cannon: {key: 'cannon', path: '/assets/game/chars/enemies/cannon.png', width: 190, height: 50},
    snake: {key: 'snake', path: '/assets/game/chars/enemies/snake.png', width: 130, height: 127},

}

export const enemies = {
    demonFrontFirst : {key: 'demon', type:'demon_1', xPosition: 2330, yPosition: -20, class: Demon},
    demonFrontSecond : {key: 'demon', type:'demon_2', xPosition: 3795, yPosition: -20, class: Demon},
    demonFrontThird : {key: 'demon', type:'demon_3', xPosition: 3795, yPosition: 130, class: Demon},
    demonFrontFourth : {key: 'demon', type:'demon_4', xPosition: 3795, yPosition: 300, class: Demon},
    demonFrontFifth : {key: 'demon', type:'demon_5', xPosition: 5910, yPosition: 120, class: Demon},

    snake : {key: 'snake', type:'snake_1', xPosition: 2040, yPosition: 400, class: Snake},
    snakeSecond : {key: 'snake', type:'snake_2', xPosition: 2800, yPosition: 400, class: Snake},
    snakeThird : {key: 'snake', type:'snake_3', xPosition: 3380, yPosition: 400, class: Snake},
    snakeFourth : {key: 'snake', type:'snake_4', xPosition: 2800, yPosition: 400, class: Snake},
    snakeFifth : {key: 'snake', type:'snake_5', xPosition: 2570, yPosition: 400, class: Snake},


    critter : {key: 'critter', type:'critter_1', xPosition: 940, yPosition: 500, class: Critter},
    critterSecond : {key: 'critter', type:'critter_2', xPosition: 2940, yPosition: 200, class: Critter},
    critterThird : {key: 'critter', type:'critter_3', xPosition: 1530, yPosition: 50, class: Critter},
    critterFourth : {key: 'critter', type:'critter_4', xPosition: 5145, yPosition: 500, class: Critter},
    critterFifth : {key: 'critter', type:'critter_5', xPosition: 5565, yPosition: 150, class: Critter},

    cannon : {key: 'cannon', type:'cannon_1', xPosition: 12790, yPosition: 340, class: Cannon},
    cannonSecond : {key: 'cannon', type:'cannon_2', xPosition: 6470, yPosition: 290, class: Cannon}



    
}