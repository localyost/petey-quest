import {Actor, Color, Engine, vec} from 'excalibur';
import {Resources} from '../../resources';
import * as ex from 'excalibur';
import Config from "../../config";


export class Player extends Actor {

  private moveDistance = 6;
  constructor() {
    super({
      pos: vec(150, 150),
      width: 25,
      height: 25,
      color: new Color(255, 255, 255)
    });
  }

  onInitialize(engine:Engine) {
    this.graphics.use(Resources.Sword.toSprite());
    engine.input.keyboard.on('hold', (event) => this.handleKeyEvent(engine, event));
    engine.input.keyboard.on('release', (evt: ex.Input.KeyEvent) => {
      if(evt.key !== ex.Input.Keys.Space) {
        this.vel = ex.Vector.Zero.clone()
      }
    });
  }

  handleKeyEvent = (engine: ex.Engine, evt: ex.Input.KeyEvent) => {
    let dir = ex.Vector.Zero.clone();
    if (evt.key === ex.Input.Keys.Space) {
      if (this.vel.x !== 0 || this.vel.y !== 0) {
        dir = this.vel.normalize();
      }
    }
    // Some keys do the same thing
    if (evt.key === ex.Input.Keys.W) {
      dir.y += -1;
    }
    if (evt.key === ex.Input.Keys.A) {
      dir.x += -1;
    }

    if (evt.key === ex.Input.Keys.D) {
      dir.x += 1;
    }

    if (evt.key ===  ex.Input.Keys.S) {
      dir.y += 1;
    }

    if (dir.x !== 0 || dir.y !== 0) {
      this.vel = dir.normalize().scale(Config.playerSpeed);
    }
  }

}
