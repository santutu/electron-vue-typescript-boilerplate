<template>
    <div>
        <video
            ref="videoPlayer"
            class="video-js"
        >
        </video>

        <button v-shortkey="['ctrl', 'alt', 'p']" @shortkey="test" @click="test">test</button>
    </div>
</template>


<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import videojs from "video.js";
import {Prop} from "vue-property-decorator";

@Component
export default class VideoPlayer extends Vue {
    player: null | videojs.Player = null;

    @Prop({
              type: Object,
              default: {}
          })
    options!: videojs.PlayerOptions

    mounted() {
        this.player = videojs(this.videoPlayer, this.options, function onPlayerReady() {
            // console.log('onPlayerReady', this);
            console.log('onPlayerReady');
        })
    }

    beforeDestroy() {
        if (this.player !== null && this.player) {
            this.player.dispose()
        }
    }


    get videoPlayer() {
        return this.$refs.videoPlayer
    }

    test() {
        console.log(this.player)
        if (this.player === null) return;
        // this.player.currentTime(10);
        // this.player.playbackRate( this.player.playbackRate() * 2)

        // return
        console.log('played', this.player.played())

        console.log('paused', this.player.paused())
        if (this.player.paused()) {
            this.player.play()
        } else {
            this.player.pause()
        }
    }
}
</script>

<style scoped>

</style>
