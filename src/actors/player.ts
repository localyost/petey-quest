import {Actor, Color, Engine, vec} from 'excalibur';
import {Resources} from '../resources';
import * as ex from 'excalibur';
import Config from "../config";
import {Bullet} from "./bullet";


export class Player extends Actor {

  constructor() {
    super({
      pos: vec(150, 150),
      width: 25,
      height: 25,
      color: new Color(255, 255, 255)
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
  }

  onPostUpdate(engine: ex.Engine, delta: number) {
    // Keep player in the viewport
    if(this.pos.x < 0) this.pos.x = 0;
    if(this.pos.y < 0) this.pos.y = 0;
    if(this.pos.x > engine.drawWidth - this.width) this.pos.x = (engine.drawWidth - this.width);
    if(this.pos.y > engine.drawHeight - this.height) this.pos.y = (engine.drawHeight - this.height);
  }

  handlePointerEvent = (engine: ex.Engine, evt: ex.Input.PointerDownEvent) => {
    this.fire(engine, evt);
  }
  handleKeyEvent = (engine: ex.Engine, evt: ex.Input.KeyEvent) => {
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
      case ex.Input.Keys.Space:


    }
    if (dir.x !== 0 || dir.y !== 0) {
      this.vel = dir.normalize().scale(Config.playerSpeed);
    }
  }

  private fire = (engine: ex.Engine, event: ex.Input.PointerDownEvent) => {
    let bullet = new Bullet(this.pos, event.pos, this);
    engine.add(bullet);
  }


}
