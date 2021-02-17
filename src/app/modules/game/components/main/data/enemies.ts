import { Cannon } from "../entities/chars/enemies/chars/cannon"
import { Critter } from "../entities/chars/enemies/chars/critter"
import { Demon } from "../entities/chars/enemies/chars/demon"
import { Snake } from "../entities/chars/enemies/chars/snake"
import { Spikes } from "../entities/chars/enemies/chars/spikes"


export const enemiesSpr = {
    demonFront: {key: 'demon', path: '/assets/game/chars/enemies/demon.png', width: 192, height: 192},
    critter: {key: 'critter', path: '/assets/game/chars/enemies/critter.png', width: 103, height: 126},
    cannon: {key: 'cannon', path: '/assets/game/chars/enemies/cannon.png', width: 190, height: 50},
    snake: {key: 'snake', path: '/assets/game/chars/enemies/snake.png', width: 130, height: 127},
    spikes: {key: 'spikes', path: '/assets/game/chars/enemies/spikes.png', width: 96, height: 53},
    spikes160: {key: 'long_spikes', path: '/assets/game/chars/enemies/spikes_160.png', width: 160, height: 53}

}

export const enemies = {
    demonFrontFirst : {key: 'demon', type:'demon_1', xPosition: 2330, yPosition: 480, shotDelay: 0, class: Demon},
    demonFrontSecond : {key: 'demon', type:'demon_2', xPosition: 3795, yPosition: 480, shotDelay: 100,class: Demon},
    demonFrontThird : {key: 'demon', type:'demon_3', xPosition: 3795, yPosition: 630, shotDelay: 350,class: Demon},
    demonFrontFourth : {key: 'demon', type:'demon_4', xPosition: 3795, yPosition: 800,shotDelay: 200, class: Demon},
    demonFrontFifth : {key: 'demon', type:'demon_5', xPosition: 5910, yPosition: 620, shotDelay: 0, class: Demon},

    snake : {key: 'snake', type:'snake_1', xPosition: 2040, yPosition: 900, class: Snake},
    snakeSecond : {key: 'snake', type:'snake_2', xPosition: 2800, yPosition: 900, class: Snake},
    snakeThird : {key: 'snake', type:'snake_3', xPosition: 3380, yPosition: 900, class: Snake},


    critter : {key: 'critter', type:'critter_1', xPosition: 940, yPosition: 1000, class: Critter},
    critterSecond : {key: 'critter', type:'critter_2', xPosition: 2940, yPosition: 700, class: Critter},
    critterThird : {key: 'critter', type:'critter_3', xPosition: 1530, yPosition: 550, class: Critter},
    critterFourth : {key: 'critter', type:'critter_4', xPosition: 5145, yPosition: 1000, class: Critter},
    critterFifth : {key: 'critter', type:'critter_5', xPosition: 5565, yPosition: 650, class: Critter},

    cannon : {key: 'cannon', type:'cannon_1', xPosition: 12790, yPosition: 840, class: Cannon},
    cannonSecond : {key: 'cannon', type:'cannon_2', xPosition: 6470, yPosition: 790, class: Cannon},

    spikes : {key: 'spikes', type:'spikes_1', xPosition: 590, yPosition: 940, class: Spikes},
    longSpikes : {key: 'long_spikes', type:'long_spikes_1', xPosition: 4560, yPosition: 1000, class: Spikes},



    
}