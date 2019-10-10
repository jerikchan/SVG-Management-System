<template>
    <div id="app">
        <div :class="$style.header">
            <button @click="runAnime">播放</button>
        </div>
        <div :class="$style.container">
            <!-- <div v-for="id in symbolIds" :key="id" :class="$style.wrapper">
                <div :class="$style.svgContainer">
                    <svg>
                        <use :xlink:href="`#${id}`"></use>
                    </svg>
                </div>
                <div>{{ id }}</div>
            </div> -->
            <!-- <div v-for="({ id, content }) in svgs" :class="$style.wrapper">
                <div :class="$style.svgContainer" v-html="content">
                </div>
                <div>{{ id }}</div>
            </div> -->
            <div v-for="({ id, data }) in svgResults" :class="$style.wrapper">
                <div :class="$style.svgContainer">
                    <svg v-html="data.content" v-bind="getAttributes(id, data)"></svg>
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
// const symbols = req.keys().map((req));
// const symbolIds = symbols.map((symbol) => symbol.default.id);

// const svgs = req.keys().map((id) => ({
//     id,
//     content: req(id)
// }));

const svgResults = req.keys().map((key) => {
    const id = key.match(/(\w+).svg/)[1];
    return {
        id,
        data: req(key)
    };
});

export default {
    data() {
        return {
            // symbolIds
            // svgs
            svgResults
        };
    },
    methods: {
        runAnime() {
            // this.symbolIds.forEach((id) => {
            //     Site.SVGAnime.run(id);
            // });

            // this.svgs.forEach(({ id }) => {
            //     Site.SVGAnime.run(id);
            // });

            this.svgResults.forEach(({ id }) => {
                Site.SVGAnime.run(id);
            });
        },
        getAttributes(id, { attributes }) {
            return {
                ...attributes,
                id
            }
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
