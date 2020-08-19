import React, { Component } from 'react'
import * as THREE from "three"
import "./LotsOfFish.css"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {ColladaLoader} from "three/examples/jsm/loaders/ColladaLoader";

export default class LotsOfFish extends Component {
    constructor(props){
        super(props);
        this.container = React.createRef();
    }

    componentDidMount(){
        let _this = this;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, this.container.current.offsetWidth / this.container.current.offsetHeight, 0.1, 100000 );
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( this.container.current.offsetWidth,this.container.current.offsetHeight );
        this.renderer.setClearColor (0xffffff, 1);

        this.controls = new OrbitControls( this.camera, this.renderer.domElement );

        var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
        directionalLight.target.position.set(-10, -10, -10);
        this.scene.add( directionalLight );
        this.scene.add( directionalLight.target );

        var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
        this.scene.add( light );
        
        this.camera.position.set( 0, 20, 100 );
        this.controls.update();

        // var geometry = new THREE.BoxGeometry();
        // 
        // this.cube = new THREE.Mesh( geometry, material );
        // this.scene.add( this.cube );

        this.container.current.appendChild( this.renderer.domElement );
        this.animate();

        let loader = new ColladaLoader();
        let model = require("../../3dModels/fish.dae");
        console.log(model);
        loader.load(model,function colladaReady( collada ){
            console.log(collada);
            var material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
            let geom = collada.scene.children[0].geometry;

            let count = 10000;

            var mesh = new THREE.InstancedMesh( geom, material, count );

            var dummy = new THREE.Object3D();

            for ( var i = 0; i < count; i ++ ) {

                dummy.position.set(
                    Math.random() * 2000 - 1000,
                    Math.random() * 2000 - 1000,
                    Math.random() * 2000 - 1000
                );

                dummy.rotation.set(
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI
                );

                dummy.updateMatrix();

                mesh.setMatrixAt( i, dummy.matrix );

            }
            _this.scene.add(mesh);
        })
    }
    
    animate = () => {
        let _this = this;
        window.setTimeout(function(){
            _this.animate();
        }, 0)

        this.renderer.render( this.scene, this.camera );
    }

    render() {
        return (
            <div className="full" ref={this.container}>
                
            </div>
        )
    }
}
