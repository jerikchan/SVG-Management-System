<template>
    <div id="app">
        <div :class="$style.header">
            <button @click="runAnime">重播</button>
        </div>
        <div :class="$style.container">
            <div v-for="id in symbolIds" :class="$style.wrapper">
                <div>
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
window.anime = window.anime || require('../lib/anime.js');
const Site = window.Site = window.Site || {};
require('../lib/SVGAnime.js');

const req = require.context('./assets', false, /\.svg$/);
const symbols = req.keys().map(req);
const symbolIds = symbols.map((symbol) => symbol.default.id);

export default {
    data() {
        return {
            symbolIds,
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
        height: 200px;
        text-align: center;
        float: left;
    }
</style>