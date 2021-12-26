import * as ex from "excalibur";
import {Animation, CollisionType, vec, Vector} from "excalibur";
import Config from "../config";

import {gameSheet} from "../resources";
import Baddie from "./baddie";

export class Bullet extends ex.Actor {
    public owner?: ex.Actor;
    constructor(start: Vector, destination: Vector, owner?: ex.Actor) {
        let direction = destination.sub(start);
        super({
            pos: start,
            vel: direction,
            width: Config.bulletSize,
            height: Config.bulletSize,
            color: ex.Color.Red,
            collisionType: CollisionType.Passive
        });
        this.owner = owner;
    }

    onInitialize(engine: ex.Engine) {
        const animation = Animation.fromSpriteSheet(
            gameSheet,
            [3, 4, 5, 6, 7, 8, 7, 6, 5, 4],
            100
        )
        animation.scale = vec(2,2);
        this.graphics.add(animation);
        this.on("exitviewport", event => this.kill())
        this.on('precollision', this.onPreCollision);
    }

    private onPreCollision(evt: ex.PostCollisionEvent) {
        if (evt.other instanceof Baddie) {
            this.kill();
        }
    }
}