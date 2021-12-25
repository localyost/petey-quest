import { Engine, Loader, DisplayMode } from 'excalibur';
import { LevelOne } from './scenes/level-one/level-one';
import { Player } from './actors/player';
import { Resources } from './resources';
import Baddie from "./actors/baddie";

/**
 * Managed game class
 */
class Game extends Engine {
  private player: Player;
  private levelOne: LevelOne;

  constructor() {
    super({ displayMode: DisplayMode.FillScreen });
  }

  public start() {

    // Create new scene with a player
    this.levelOne = new LevelOne();
    this.player = new Player();
    this.levelOne.add(this.player);
    this.levelOne.add(new Baddie(this.player))
    this.levelOne.add(new Baddie(this.player))
    this.levelOne.add(new Baddie(this.player))
    this.levelOne.add(new Baddie(this.player))
    this.levelOne.add(new Baddie(this.player))

    game.add('levelOne', this.levelOne);

    // Automatically load all default resources
    const loader = new Loader(Object.values(Resources));

    return super.start(loader);
  }
}

const game = new Game();
game.start().then(() => {
  game.goToScene('levelOne');
});