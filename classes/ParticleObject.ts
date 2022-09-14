import {
    Body,
    Color,
    Emitter,
    Life,
    Mass,
    Position,
    RandomDrift,
    Rate,
    Scale,
    Span,
    SphereZone,
    ease,
  } from 'three-nebula';

import * as THREE from "three"
import GameScreen from './GameScreen'

export default class ParticleObject{
    emitter: Emitter

    loadParticles(screen: GameScreen, IMAGE: any){
        new THREE.TextureLoader().load(IMAGE, function(texture: THREE.Texture){
            this.emitter = new Emitter();

            const createSprite = () => {
                var material = new THREE.SpriteMaterial({
                    map: texture,
                    color: 0xff0000,
                    blending: THREE.AdditiveBlending,
                    fog: true,
                });
                return new THREE.Sprite(material);
            };
    
            this.emitter
                .setRate(new Rate(new Span(3, 6), new Span(0, 0.002)))
                .addInitializers([
                    new Body(createSprite()),
                    new Mass(1),
                    new Life(0.5, 1),
                    new Position(new SphereZone(0.5))
                ])
                .addBehaviours([
                    new RandomDrift(10, 0, 10, 0),
                    new Scale(new Span(1, 2), 0),
                    new Color('#FF0026', ['#ffff00', '#ffff11'], Infinity, ease.easeOutSine),
                ])
                
            screen.nebula.addEmitter(this.emitter);
        }.bind(this));
    }

    emitParticles(time: number = 0.05, position: THREE.Vector3){
        this.emitter.position = position;
        this.emitter.emit(time);
    }
}