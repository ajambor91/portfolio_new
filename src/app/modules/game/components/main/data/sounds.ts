export const sounds = {
    squeak: { key: 'squeak', path: '/assets/game/audio/squeak.mp3', main: true },
    gunshot: { key: 'gunshot', path: '/assets/game/audio/gunshot_new.mp3', main: true },
    reload: { key: 'reload_sound', path: '/assets/game/audio/reload.mp3', main: true },
    fallingDown: { key: 'falling_down', path: '/assets/game/audio/falling_dawn.mp3', main: true },
    playerHurt: {key: 'player_hurt', path: '/assets/game/audio/hero_hurt.mp3', main: true},
    bombExplode: { key: 'bombExplode', path: '/assets/game/audio/bomb_explode.mp3', main: false },
    cannon: { key: 'cannon', enemy: 'cannon', path: '/assets/game/audio/cannon.mp3', main: false },
    metalScreech: { key: 'metalScreech', enemy: 'cannon', path: '/assets/game/audio/metal_screech.mp3', main: false },
    bulletMetal: { key: 'bulletMetal', enemy: 'cannon', path: '/assets/game/audio/bullet_metal_impact.mp3', main: false },
    burning: { key: 'burning', enemy: 'cannon', path: '/assets/game/audio/burning.mp3', main: false },
    snake: { key: 'snake', enemy: 'snake', path: '/assets/game/audio/snake.mp3', main: false },
    bodyImpact: {key: 'bulletBodyImpact', enemy: ['snake', 'critter', 'demon'], path:'/assets/game/audio/bullet_body_impact.mp3' ,main: false},
    beastDeath: {key: 'beastDeath', enemy: ['snake','critter', 'demon'], path: '/assets/game/audio/beast_death.mp3', main: false},
    demonBullet: {key: 'demonBullet', enemy: 'demon', path: '/assets/game/audio/demon_bullet.mp3', main: false},
    bulletImpactGround: {key:' bulletImpactGround', path: '/assets/game/audio/bullet_impact_ground.mp3', main: true}
};
