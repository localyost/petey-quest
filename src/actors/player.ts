import {Actor, Engine, vec} from 'excalibur';
import {Resources} from '../resources';
import * as ex from 'excalibur';
import Config from "../config";
import {Bullet} from "./bullet";
import Baddie from "./baddie";
import {stats} from "../stats";


export class Player extends Actor {

  constructor() {
    super({
      height: 100,
      width: 80,
      pos: vec(500, 500),
      collisionType: ex.CollisionType.Active,
    });
  }

  onInitialize(engine:Engine) {
    const sprite = Resources.PeteFace.toSprite();
    this.graphics.use(sprite);
    engine.input.keyboard.on('hold', (event) => this.handleKeyEvent(engine, event));
    engine.input.keyboard.on('release', (evt: ex.Input.KeyEvent) => {
      if(evt.key !== ex.Input.Keys.Space) {
        this.vel = ex.Vector.Zero.clone()
      }
    });
    engine.input.pointers.primary.on('down', (evt) => this.handlePointerEvent(engine, <ex.Input.PointerDownEvent>evt));

    this.on('postcollision', this.onPostCollision);
  }

  private onPostCollision(evt: ex.PostCollisionEvent) {
    if (evt.other instanceof Baddie) {
      stats.gameOver = true;
    }
  }

  onPostUpdate(engine: ex.Engine, delta: number) {
    // Keep player in the viewport
    if(this.pos.x < 0) this.pos.x = 0;
    if(this.pos.y < 0) this.pos.y = 0;
    if(this.pos.x > engine.drawWidth - this.width) this.pos.x = (engine.drawWidth - this.width);
    if(this.pos.y > engine.drawHeight - this.height) this.pos.y = (engine.drawHeight - this.height);
  }

  handlePointerEvent = (engine: ex.Engine, evt: ex.Input.PointerDownEvent) => {
    if (!stats.gameOver) {
      this.fire(engine, evt);
    }
  }
  handleKeyEvent = (engine: ex.Engine, evt: ex.Input.KeyEvent) => {
    if (!stats.gameOver) {
      let dir = ex.Vector.Zero.clone();
      switch (evt.key) {
        case ex.Input.Keys.W:
          dir.y += -1;
          break;
        case ex.Input.Keys.A:
          dir.x += -1;
          break;
        case ex.Input.Keys.D:
          dir.x += 1;
          break;
        case ex.Input.Keys.S:
          dir.y += 1;
          break;
      }
      if (dir.x !== 0 || dir.y !== 0) {
        this.vel = dir.normalize().scale(Config.playerSpeed);
      }
    }
  }

  private fire = (engine: ex.Engine, event: ex.Input.PointerDownEvent) => {
    let bullet = new Bullet(this.pos, event.pos, this);
    engine.add(bullet);
  }


}
