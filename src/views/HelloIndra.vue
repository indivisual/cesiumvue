/* eslint-disable */
<template>
  <div class="hello">
    <ods-button @click="create">Create map</ods-button>
    <ods-button @click="showtrees">Show/Hide trees</ods-button>
    <ods-button @click="clean">Delete map (Clean Memory)</ods-button>
    <div class="viewer">
      <div id="mapviewer" ref="mapview">

      </div>
      
    </div>
  </div> 
</template>

<script>
import treesList from '@/../static/arboles.json'
let viewer = {}
let scene = {}
let trees = {}

export default {
  name: 'HelloIndra',
  data () {
    return {
      longitude: -15.4340,
      latitude: 28.1340,
      height: 7000.0,
      treeModel: './static/3d/arbol_05/Tree01.gltf',
      voyagerCartoDB: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png'
    }
  },
  methods: {
    create () {
      viewer = new Cesium.Viewer(this.$refs.mapview, {
        animation: false,
        baseLayerPicker: false,
        contextOptions: {
          webgl: {
            preserveDrawingBuffer: true,
            alpha: true,
            antialias: true
          }
        },
        scene3DOnly: true,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: true,
        navigationHelpButton: false,
        sceneModePicker: false,
        shadows : false,
        timeline: false,
        selectionIndicator: false,
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
          url : this.voyagerCartoDB,
          })
      })

      scene = viewer.scene
      scene.globe.baseColor = Cesium.Color.ANTIQUEWHITE
      scene.skyBox.destroy()
      scene.skyBox = undefined
      scene.sun.destroy()
      scene.sun = undefined
      scene.moon.destroy()
      scene.moon = undefined
      scene.skyAtmosphere.destroy()
      scene.skyAtmosphere = undefined
      scene.globe.enableLighting = false
      scene.globe.showGroundAtmosphere = false
      scene.globe.tileCacheSize = 10
      scene.globe.shadows = 1
      scene.globe.maximumScreenSpaceError = 1

      this.defineInitialViewerExtent(this.longitude, this.latitude, this.height)
      trees = this.trees3D(treesList)
    },
    showtrees () {
      trees.show = !trees.show
    },
    clean () {
      viewer.destroy();
    },
    defineInitialViewerExtent(startLongitude, startLatitude, startHeight){
      viewer.camera.setView({
        destination : Cesium.Cartesian3.fromDegrees(startLongitude, startLatitude, startHeight)
      })
    },
    trees3D (trees) {
      let dataSourceTrees3D = new Cesium.CustomDataSource({
        name: 'dataSourceTrees3D'
      })

      for (let tree of trees.features) {
        dataSourceTrees3D.entities.add({
          id: tree.id,
          position: Cesium.Cartesian3.fromDegrees(tree.geometry.coordinates[0], tree.geometry.coordinates[1]),
          model : {
            uri : this.treeModel,
            scale: 0.7,
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0,1000.0),
            heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
            shadows: false,
          }
        })
      }

      viewer.dataSources.add(dataSourceTrees3D)
      dataSourceTrees3D.show = false

      return dataSourceTrees3D
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello {
  margin:auto;

  .viewer {
    width: 100%;
    height: 90vh;
  }
}
</style>
