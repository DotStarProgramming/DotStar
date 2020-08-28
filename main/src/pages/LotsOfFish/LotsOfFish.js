import React, { Component } from 'react'
import * as THREE from "three"
import "./LotsOfFish.css"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer.js';

import Utils from "../../dotstarlib/Utils";

export default class LotsOfFish extends Component {
    constructor(props) {
        super(props);
        this.container = React.createRef();
        this.scene = new THREE.Scene();
        this.clock = new THREE.Clock();

        //Geometry
        this.horseGeometry = new THREE.BufferGeometry();

        //Settings
        this.WIDTH = 64;
        this.HORSES = this.WIDTH * this.WIDTH;

        this.BOUNDS = this.WIDTH*100;
        this.BOUNDS_HALF = this.BOUNDS/2;

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
    }

    onCanvasMouseMove( event ) {
        if(this.container.current){
            let rect = event.target.getBoundingClientRect();
            let x = event.clientX - rect.left; //x position within the element.
            let y = event.clientY - rect.top;  //y position within the element.
            this.mouse.x = ( x / this.container.current.offsetWidth ) * 2 - 1;
	        this.mouse.y = - ( y / this.container.current.offsetHeight ) * 2 + 1;
        }
    }

    fillVelocityTexture( texture ) {

        var theArray = texture.image.data;

        for ( var k = 0, kl = theArray.length; k < kl; k += 4 ) {
            var x = 1 - 0.5;
            var y = 0;
            var z = 1 - 0.5;

            theArray[ k + 0 ] = x * 10;
            theArray[ k + 1 ] = y * 10;
            theArray[ k + 2 ] = z * 10;
            theArray[ k + 3 ] = 1;
        }
    }

    fillPositionTexture( texture ) {
        var theArray = texture.image.data;
        for ( var k = 0, kl = theArray.length; k < kl; k += 4 ) {
            var x = Math.random() * this.BOUNDS - this.BOUNDS_HALF;
            var y = 0;
            var z = Math.random() * this.BOUNDS - this.BOUNDS_HALF;;

            theArray[ k + 0 ] = x;
            theArray[ k + 1 ] = y;
            theArray[ k + 2 ] = z;
            theArray[ k + 3 ] = 1;
        }
    }

    initComputeRenderer(){
        this.gpuCompute = new GPUComputationRenderer( this.WIDTH, this.WIDTH, this.renderer );
        if ( Utils.isSafari() ) this.gpuCompute.setDataType( THREE.HalfFloatType );

        let dtPosition = this.gpuCompute.createTexture();
        let dtVelocity = this.gpuCompute.createTexture();
        this.fillPositionTexture( dtPosition );
        this.fillVelocityTexture( dtVelocity );

        this.positionVariable = this.gpuCompute.addVariable( "texturePosition", `
            uniform float time;
            uniform float delta;

            void main()	{

                vec2 uv = gl_FragCoord.xy / resolution.xy;
                vec4 tmpPos = texture2D( texturePosition, uv );
                vec3 position = tmpPos.xyz;
                vec3 velocity = texture2D( textureVelocity, uv ).xyz;

                float phase = tmpPos.w;

                phase = mod( ( phase + delta +
                    length( velocity.xz ) * delta * 3. +
                    max( velocity.y, 0.0 ) * delta * 6. ), 62.83 );

                gl_FragColor = vec4( position + velocity * delta * 15. , phase );

            }
        `, dtPosition );

        this.velocityVariable = this.gpuCompute.addVariable( "textureVelocity", `
        uniform float time;
        uniform float testing;
        uniform float delta; // about 0.016
        uniform float separationDistance; // 20
        uniform float alignmentDistance; // 40
        uniform float cohesionDistance; //
        uniform float freedomFactor;
        uniform vec3 predator;

        const float width = resolution.x;
        const float height = resolution.y;

        const float PI = 3.141592653589793;
        const float PI_2 = PI * 2.0;
        // const float VISION = PI * 0.55;

        float zoneRadius = 40.0;
        float zoneRadiusSquared = 1600.0;

        float separationThresh = 0.45;
        float alignmentThresh = 0.65;

        const float UPPER_BOUNDS = BOUNDS;
        const float LOWER_BOUNDS = -UPPER_BOUNDS;

        const float SPEED_LIMIT = 9.0;

        float rand( vec2 co ){
            return fract( sin( dot( co.xy, vec2(12.9898,78.233) ) ) * 43758.5453 );
        }

        void main() {

            zoneRadius = separationDistance + alignmentDistance + cohesionDistance;
            separationThresh = separationDistance / zoneRadius;
            alignmentThresh = ( separationDistance + alignmentDistance ) / zoneRadius;
            zoneRadiusSquared = zoneRadius * zoneRadius;


            vec2 uv = gl_FragCoord.xy / resolution.xy;
            vec3 birdPosition, birdVelocity;

            vec3 selfPosition = texture2D( texturePosition, uv ).xyz;
            vec3 selfVelocity = texture2D( textureVelocity, uv ).xyz;

            float dist;
            vec3 dir; // direction
            float distSquared;

            float separationSquared = separationDistance * separationDistance;
            float cohesionSquared = cohesionDistance * cohesionDistance;

            float f;
            float percent;

            vec3 velocity = selfVelocity;

            float limit = SPEED_LIMIT;

            dir = predator - selfPosition;

            dist = length( dir );
            distSquared = dist * dist;

            float preyRadius = 400.0;
            float preyRadiusSq = preyRadius * preyRadius;


            // move birds away from predator
            if ( dist < preyRadius ) {

                f = ( distSquared / preyRadiusSq - 1.0 ) * delta * 100.;
                vec3 velocityXYZ = normalize( dir ) * f * -1.0;
                velocity += vec3(velocityXYZ.x, 0, velocityXYZ.z);
                limit += 5.0;
            }


            // if (testing == 0.0) {}
            // if ( rand( uv + time ) < freedomFactor ) {}


            // Attract flocks to the center
            vec3 central = vec3( 0., 0., 0. );
            dir = selfPosition - central;
            dist = length( dir );

            dir.y *= 2.5;
            velocity -= normalize( dir ) * delta * 5.;

            for ( float y = 0.0; y < height; y++ ) {
                for ( float x = 0.0; x < width; x++ ) {

                    vec2 ref = vec2( x + 0.5, y + 0.5 ) / resolution.xy;
                    birdPosition = texture2D( texturePosition, ref ).xyz;

                    dir = birdPosition - selfPosition;
                    dist = length( dir );

                    if ( dist < 0.0001 ) continue;

                    distSquared = dist * dist;

                    if ( distSquared > zoneRadiusSquared ) continue;

                    percent = distSquared / zoneRadiusSquared;

                    if ( percent < separationThresh ) { // low

                        // Separation - Move apart for comfort
                        f = ( separationThresh / percent - 1.0 ) * delta;
                        velocity -= normalize( dir ) * f;

                    } else if ( percent < alignmentThresh ) { // high

                        // Alignment - fly the same direction
                        float threshDelta = alignmentThresh - separationThresh;
                        float adjustedPercent = ( percent - separationThresh ) / threshDelta;

                        birdVelocity = texture2D( textureVelocity, ref ).xyz;

                        f = ( 0.5 - cos( adjustedPercent * PI_2 ) * 0.5 + 0.5 ) * delta;
                        velocity += normalize( birdVelocity ) * f;

                    } else {

                        // Attraction / Cohesion - move closer
                        float threshDelta = 1.0 - alignmentThresh;
                        float adjustedPercent = ( percent - alignmentThresh ) / threshDelta;

                        f = ( 0.5 - ( cos( adjustedPercent * PI_2 ) * -0.5 + 0.5 ) ) * delta;

                        velocity += normalize( dir ) * f;

                    }

                }

            }

            // this make tends to fly around than down or up
            // if (velocity.y > 0.) velocity.y *= (1. - 0.2 * delta);

            // Speed Limits
            if ( length( velocity ) > limit ) {
                velocity = normalize( velocity ) * limit;
            }

            gl_FragColor = vec4( velocity, 1.0 );

        }
        `, dtVelocity );

        this.gpuCompute.setVariableDependencies( this.velocityVariable, [ this.positionVariable, this.velocityVariable ] );
        this.gpuCompute.setVariableDependencies( this.positionVariable, [ this.positionVariable, this.velocityVariable ] );

        this.velocityUniforms = this.velocityVariable.material.uniforms;
        this.positionUniforms = this.positionVariable.material.uniforms;


        this.positionUniforms[ "time" ] = { value: 0.0 };
        this.positionUniforms[ "delta" ] = { value: 0.0 };
        this.velocityUniforms[ "time" ] = { value: 1.0 };
        this.velocityUniforms[ "delta" ] = { value: 0.0 };
        this.velocityUniforms[ "testing" ] = { value: 1.0 };
        this.velocityUniforms[ "separationDistance" ] = { value: 50.0 };
        this.velocityUniforms[ "alignmentDistance" ] = { value: 20.0};
        this.velocityUniforms[ "cohesionDistance" ] = { value: 20.0 };
        this.velocityUniforms[ "freedomFactor" ] = { value: 0.85 };
        this.velocityUniforms[ "predator" ] = { value: new THREE.Vector3(10000, 10000, 10000) };
        this.velocityVariable.material.defines.BOUNDS = this.BOUNDS.toFixed( 2 );
        
        this.velocityVariable.wrapS = THREE.RepeatWrapping;
		this.velocityVariable.wrapT = THREE.RepeatWrapping;
        this.positionVariable.wrapS = THREE.RepeatWrapping;
        this.positionVariable.wrapT = THREE.RepeatWrapping;
        
        var error = this.gpuCompute.init();

        if ( error !== null ) {

            console.error( error );

        }
    }

    loadHorse2(gltf) {
        let animations = gltf.animations;
        let durationAnimation = Math.round(animations[0].duration * 60);
        let horseGeo = gltf.scene.children[0].geometry;
        let morphAttributes = horseGeo.morphAttributes.position;
        let tHeight = Utils.nextPowerOf2(durationAnimation);
        let tWidth = Utils.nextPowerOf2(horseGeo.getAttribute('position').count);
        let tData = new Float32Array(3 * tWidth * tHeight);

        for (let i = 0; i < tWidth; i++) {
            for (let j = 0; j < tHeight; j++) {
                let offset = j * tWidth * 3;
                let curMorph = Math.floor(j / durationAnimation * morphAttributes.length);
                let nextMorph = (Math.floor(j / durationAnimation * morphAttributes.length) + 1) % morphAttributes.length;
                let lerpAmount = j / durationAnimation * morphAttributes.length % 1;
                if (j < durationAnimation) {
                    let d0, d1;

                    d0 = morphAttributes[curMorph].array[i * 3];
                    d1 = morphAttributes[nextMorph].array[i * 3];

                    if (d0 !== undefined && d1 !== undefined) tData[offset + i * 3] = Utils.lerp(d0, d1, lerpAmount);

                    d0 = morphAttributes[curMorph].array[i * 3 + 1];
                    d1 = morphAttributes[nextMorph].array[i * 3 + 1];

                    if (d0 !== undefined && d1 !== undefined) tData[offset + i * 3 + 1] = Utils.lerp(d0, d1, lerpAmount);

                    d0 = morphAttributes[curMorph].array[i * 3 + 2];
                    d1 = morphAttributes[nextMorph].array[i * 3 + 2];

                    if (d0 !== undefined && d1 !== undefined) tData[offset + i * 3 + 2] = Utils.lerp(d0, d1, lerpAmount);
                }
            }
        }

        let textureAnimation = new THREE.DataTexture(tData, tWidth, tHeight, THREE.RGBFormat, THREE.FloatType);
        textureAnimation.needsUpdate = true;

        let vertices = [], color = [], reference = [], seeds = [], indices = [];
        let totalVertices = horseGeo.getAttribute('position').count * 3 * this.HORSES;

        for (let i = 0; i < totalVertices; i++) {

            let bIndex = i % (horseGeo.getAttribute('position').count * 3);

            vertices.push(horseGeo.getAttribute('position').array[bIndex]);
            color.push(horseGeo.getAttribute('color').array[bIndex]);

        }

        let xr = Math.random();
        let yr = Math.random();
        let zr = Math.random();
        for (let i = 0; i < horseGeo.getAttribute('position').count * this.HORSES; i++) {

            let bIndex = i % (horseGeo.getAttribute('position').count);

            let bird = Math.floor(i / horseGeo.getAttribute('position').count);
            if (bIndex === 0){
                xr = Math.random();
                yr = Math.random();
                zr = Math.random();
            } 
            let j = ~ ~bird;
            let x = (j % this.WIDTH) / this.WIDTH;
            let y = ~ ~(j / this.WIDTH) / this.WIDTH;
            reference.push(x, y, bIndex / tWidth, durationAnimation / tHeight);
            seeds.push(bird, xr, yr, zr);

        }

        for (let i = 0; i < horseGeo.index.array.length * this.HORSES; i++) {

            let offset = Math.floor(i / horseGeo.index.array.length) * (horseGeo.getAttribute('position').count);
            indices.push(horseGeo.index.array[i % horseGeo.index.array.length] + offset);

        }

        this.horseGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
        this.horseGeometry.setAttribute('birdColor', new THREE.BufferAttribute(new Float32Array(color), 3));
        this.horseGeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(color), 3));
        this.horseGeometry.setAttribute('reference', new THREE.BufferAttribute(new Float32Array(reference), 4));
        this.horseGeometry.setAttribute('seeds', new THREE.BufferAttribute(new Float32Array(seeds), 4));

        this.horseGeometry.setIndex(indices);

        //Compute Renderer
        this.initComputeRenderer();

        //Add to scene
        var m = new THREE.MeshStandardMaterial( {
            vertexColors: true,
            flatShading: true,
            roughness: 1,
            metalness: 0
        } );

        let _this = this;

        m.onBeforeCompile = ( shader ) => {
            //So that syntax highlighting can happen

            shader.uniforms.texturePosition = { value: null };
            shader.uniforms.textureVelocity = { value: null };
            shader.uniforms.textureAnimation = { value: textureAnimation };
            shader.uniforms.time = { value: 1.0 };
            shader.uniforms.size = { value: 0.1 };
            shader.uniforms.delta = { value: 0.0 };

            let token = '#define STANDARD';

            let insert = `
                attribute vec4 reference;
                attribute vec4 seeds;
                attribute vec3 birdColor;
                uniform sampler2D texturePosition;
                uniform sampler2D textureVelocity;
                uniform sampler2D textureAnimation;
                uniform float size;
                uniform float time;
            `;

            shader.vertexShader = shader.vertexShader.replace( token, token + insert );

            let token2 = '#include <begin_vertex>';

            let insert2 = `
                vec4 tmpPos = texture2D( texturePosition, reference.xy );

                vec3 pos = tmpPos.xyz;
                vec3 velocity = normalize(texture2D( textureVelocity, reference.xy ).xyz);
                vec3 aniPos = texture2D( textureAnimation, vec2( reference.z, mod(time/1000.0 + seeds.y, reference.w ) ) ).xyz;
                vec3 newPosition = position;

                velocity.z *= -1.;
                float xz = length( velocity.xz );
                float xyz = 1.;
                float x = sqrt( 1. - velocity.y * velocity.y );

                float cosry = velocity.x / xz;
                float sinry = velocity.z / xz;

                float cosrz = x / xyz;
                float sinrz = velocity.y / xyz;

                mat3 maty =  mat3( cosry, 0, -sinry, 0    , 1, 0     , sinry, 0, cosry );
                mat3 matz =  mat3( cosrz , sinrz, 0, -sinrz, cosrz, 0, 0     , 0    , 1 );

                newPosition = mat3( modelMatrix ) * ( newPosition + aniPos );
                newPosition *= size + seeds.y * size * 0.2;

                newPosition =  maty * matz * newPosition;

                newPosition += pos;

                vec3 transformed = vec3( newPosition );
            `;

            shader.vertexShader = shader.vertexShader.replace( token2, insert2 );

            _this.materialShader = shader;

        };

        let horseMesh = new THREE.Mesh( this.horseGeometry, m );
        horseMesh.rotation.y = Math.PI / 2;

        horseMesh.castShadow = true;
        horseMesh.receiveShadow = true;
        horseMesh.frustumCulled = false;

        this.scene.add( horseMesh );

        var geometry = new THREE.PlaneGeometry( this.BOUNDS * 16, this.BOUNDS * 16, 1 );
        var material = new THREE.MeshStandardMaterial( {color: 0x486f2f, side: THREE.DoubleSide} );
        this.plane = new THREE.Mesh( geometry, material );
        this.plane.rotateX(Math.PI/2);
        this.scene.add( this.plane );
    }

    loadHorse() {
        let loader = new GLTFLoader();
        let _this = this;

        const skyColor = 0xB1E1FF;  // light blue
        const groundColor = 0xB97A20;  // brownish orange
        const intensity = 1;
        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        this.scene.add(light);

        const color = 0xFFFFFF;
        const light2 = new THREE.DirectionalLight(color, intensity);
        light2.position.set(0, 10, 0);
        light2.target.position.set(-5, 0, 0);
        this.scene.add(light2);
        this.scene.add(light2.target);

        const ratio = 0.75;
        const near = ratio * this.BOUNDS_HALF;
        const far = ratio * this.BOUNDS * 4;
        this.scene.fog = new THREE.Fog(color, near, far);

        this.controls.update();

        loader.load("/models/Horse.glb", function (gltf) {
            _this.loadHorse2(gltf);
        });
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        const delta = this.clock.getDelta();
        this.controls.update();

        let now = performance.now();

        if(this.positionUniforms) this.positionUniforms[ "time" ].value = now;
        if(this.positionUniforms) this.positionUniforms[ "delta" ].value = delta;
        if(this.velocityUniforms) this.velocityUniforms[ "time" ].value = now;
        if(this.velocityUniforms) this.velocityUniforms[ "delta" ].value = delta;
        if ( this.materialShader ) this.materialShader.uniforms[ "time" ].value = now;
        if ( this.materialShader ) this.materialShader.uniforms[ "delta" ].value = delta;

        if(this.plane){
            this.raycaster.setFromCamera( this.mouse, this.camera );

            let intersects = this.raycaster.intersectObjects( [this.plane] );
            if(intersects[0]){
                if(this.velocityUniforms) this.velocityUniforms[ "predator" ].value.set(-intersects[0].point.z, intersects[0].point.y, intersects[0].point.x );
            }
            else{
                if(this.velocityUniforms) this.velocityUniforms[ "predator" ].value.set(10000, 10000, 10000 );
            }
        }
        

        

        if(this.gpuCompute) this.gpuCompute.compute();

        if ( this.materialShader ) this.materialShader.uniforms[ "texturePosition" ].value = this.gpuCompute.getCurrentRenderTarget( this.positionVariable ).texture;
        if ( this.materialShader ) this.materialShader.uniforms[ "textureVelocity" ].value = this.gpuCompute.getCurrentRenderTarget( this.velocityVariable ).texture;

        this.renderer.render(this.scene, this.camera);

    }

    componentDidMount() {
        let _this = this;

        window.setTimeout(function () {
            _this.camera = new THREE.PerspectiveCamera(75, _this.container.current.offsetWidth / _this.container.current.offsetHeight, 0.1, 10000);
            _this.camera.position.set(0, 20, 100);
            _this.renderer = new THREE.WebGLRenderer();
            _this.renderer.setClearColor("#FFFFFF");

            _this.controls = new OrbitControls(_this.camera, _this.renderer.domElement);
            _this.controls.target = new THREE.Vector3(0, 0, 0);
            _this.controls.enablePan = false;
            _this.controls.maxDistance = _this.BOUNDS_HALF * 0.5;

            _this.renderer.setSize(_this.container.current.offsetWidth, _this.container.current.offsetHeight);
            _this.container.current.appendChild(_this.renderer.domElement);
            
            _this.loadHorse();
            _this.animate();
        }, 0)

    }

    render() {
        return (
            <div className="full" ref={this.container} onMouseMove={(e) => this.onCanvasMouseMove(e)}>

            </div>
        )
    }
}
