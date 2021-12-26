import { Engine, Scene } from 'excalibur';
import Baddie from "../../actors/baddie";
import {Player} from "../../actors/player";
import Config from "../../config";
import * as ex from 'excalibur';
/**
 * Managed scene
 */
export class LevelOne extends Scene {

  constructor(private player: Player) {
    super();
  }
  public onInitialize(engine: Engine) {
    let baddieTimer = new ex.Timer({
      fcn: () => {
        const bad = new Baddie(this.player);
        this.add(bad);
      },
      interval: Config.spawnTime,
      repeats: true,
      numberOfRepeats: -1
    });
    baddieTimer.start();
    this.addTimer(baddieTimer);


  }
  onPostUpdate(_engine: Engine, _delta: number) {
  }

  public onActivate() {}
  public onDeactivate() {}
}
