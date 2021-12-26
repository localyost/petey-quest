import {ImageSource, SpriteSheet} from 'excalibur';
import sword from './images/sword.png';
import peteFace from './images/peteface.png';
import juergenface from './images/juergenface.png';
import floface from './images/floface.png';
import explosionsheet from './images/spriteexplosion.png';
import peterface from './images/peterface.png';
import sheet from './images/gameSheet.png';
/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */

const Resources = {
    Sword: new ImageSource(sword),
    PeteFace: new ImageSource(peteFace),
    spriteImageSheet: new ImageSource(sheet),
    JreFace: new ImageSource(juergenface),
    FlowFace: new ImageSource(floface),
    PeterFace: new ImageSource(peterface),
    explosionImageSheet: new ImageSource(explosionsheet)
}

const gameSheet = SpriteSheet.fromImageSource({
    image: Resources.spriteImageSheet,
    grid: {
        rows: 10,
        columns: 10,
        spriteHeight: 32,
        spriteWidth: 32
    }
});


const explosionSheet = SpriteSheet.fromImageSource({
    image: Resources.explosionImageSheet,
    grid: {
        rows: 5,
        columns: 5,
        spriteWidth: 45,
        spriteHeight: 45
    }
});

export { Resources, gameSheet, explosionSheet }
