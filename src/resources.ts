import {ImageSource, SpriteSheet} from 'excalibur';
import sword from './images/sword.png';
import peteFace from './images/peteface.png';
import juergenface from './images/juergenface.png';
import floface from './images/floface.png';
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
    FlowFace: new ImageSource(floface)
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

export { Resources, gameSheet }
