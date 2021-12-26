import {Actor, Animation, Color, Engine, Timer, vec, Vector} from "excalibur";
import {Player} from "./player";
import {explosionSheet, Resources} from "../resources";
import * as ex from "excalibur";
import {Bullet} from "./bullet";
import config from "../config";
import {stats} from "../stats";

export default class Baddie extends Actor {

    private explode?: ex.Animation;
    private hits = 0;

    constructor(private player: Player) {
        super({
            height: 100,
            width: 80,
            pos: Baddie.getStartPosition(),
            collisionType: ex.CollisionType.Active
        });
    }

    private static getStartPosition(): Vector {
        const rand = Math.floor(Math.random() * (1 + 1));
        const y = rand === 1 ? 1500 : -200
        const x = Math.random()*3000;
        return vec(x, y);
    }
    onInitialize(_engine: Engine) {
        this.explode = Animation.fromSpriteSheet(explosionSheet, [0,1,2,3,4,6], 100);
        this.explode.scale = vec(3,3)
        const rand = Math.floor(Math.random() * 3);
        switch (rand){
            case 0:
                this.graphics.add(Resources.FlowFace.toSprite())
                break;
            case 1:
                this.graphics.add(Resources.JreFace.toSprite())
                break;
            case 2:
                this.graphics.add(Resources.PeterFace.toSprite())
        }
        this.actions.meet(this.player, config.enemySpeed);

        this.on('precollision', this.onPreCollision);
    }

    private onPreCollision(evt: ex.PostCollisionEvent) {
        if (evt.other instanceof Bullet) {
            if (this.hits === 0) {
                this.graphics.add(this.explode)
                this.hits++
            } else {
                stats.score++;
                this.kill();
            }
        }
    }

}