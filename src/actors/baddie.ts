import {Actor, Color, Engine, vec} from "excalibur";
import {Player} from "./player";
import {Resources} from "../resources";

export default class Baddie extends Actor {

    constructor(private player: Player) {
        super({
            pos: vec(Math.random()*1000 + 200, -200),
            width: 25,
            height: 25,
            color: new Color(255, 255, 255)
        });
    }
    onInitialize(_engine: Engine) {
        const rand = Math.random();
        const sprite = rand === 1 ? Resources.FlowFace.toSprite() : Resources.JreFace.toSprite();
        this.graphics.use(sprite)
        this.actions
            .meet(this.player, 100);
    }


}