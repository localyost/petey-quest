import {Engine, Label, Scene} from 'excalibur';
import Baddie from "../../actors/baddie";
import {Player} from "../../actors/player";
import Config from "../../config";
import * as ex from 'excalibur';
import {stats} from "../../stats";
/**
 * Managed scene
 */
export class LevelOne extends Scene {

  private gameOverLabel?: Label;
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
    const scoreLabel = new ex.Label({
      x: 20,
      y: 50,
      text: "Frags: " + stats.score
    });
    scoreLabel.color = ex.Color.Black;
    scoreLabel.scale = new ex.Vector(3, 3);
    scoreLabel.on('preupdate', function(this: ex.Label, evt){
      this.text = "Frags: " + stats.score;
    });
    engine.add(scoreLabel);

    // const gameOverLabel = new ex.Label("Game Over", engine.halfDrawWidth - 250, engine.halfDrawHeight);
    this.gameOverLabel = new ex.Label({
      text: "Game Over! Drück F5",
      x: engine.halfDrawWidth -500,
      y: engine.halfDrawHeight
    });
    this.gameOverLabel.color = ex.Color.Green.clone();
    this.gameOverLabel.scale = new ex.Vector(8,8);
    this.gameOverLabel.actions.blink(1000, 1000, 400);
  }
  onPostUpdate(_engine: Engine, _delta: number) {}

  onPreUpdate(_engine: Engine, _delta: number) {
    if (stats.gameOver) {
      _engine.add(this.gameOverLabel);
    }
  }

  public onActivate() {}
  public onDeactivate() {}
}
