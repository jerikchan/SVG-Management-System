<template>
    <div id="app">
        <div :class="$style.header">
            <button @click="runAnime">播放</button>
        </div>
        <div :class="$style.container">
            <div v-for="id in symbolIds" :key="id" :class="$style.wrapper">
                <div :class="$style.svgContainer">
                    <svg>
                        <use :xlink:href="`#${id}`"></use>
                    </svg>
                </div>
                <div>{{ id }}</div>
            </div>
        </div>
    </div>
</template>

<script>
window.anime = window.anime || require('anime');
const Site = window.Site = window.Site || {};
require('SVGAnime');

const req = require.context('assets', false, /\.svg$/);
const symbols = req.keys().map(req);
const symbolIds = symbols.map((symbol) => symbol.default.id);

export default {
    data() {
        return {
            symbolIds
        };
    },
    methods: {
        runAnime() {
            this.symbolIds.forEach((id) => {
                Site.SVGAnime.run(id);
            });
        }
    },
    mounted() {
        this.runAnime();
    }
}
</script>

<style module>
    :global(body) {
        padding: 0;
        margin: 0;
    }
    :global(svg) {
        width: 100%;
        height: 100%;
    }
    .header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
    }
    .container {
        overflow: hidden;
    }
    .wrapper {
        width: 300px;
        text-align: center;
        float: left;
    }
    .svgContainer {
        height: 150px;
    }
</style>
