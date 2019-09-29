<template>
    <div id="app">
        <div :class="$style.header">
            <button @click="runAnime">重播</button>
            <input type="file" multiple ref="fileInput" @change="handleFiles" accept="image/svg+xml" hidden>
            <button @click="$refs.fileInput.click()">上传</button>
        </div>
        <div :class="$style.container">
            <div v-for="{ id, content } in svgList" :key="id" :class="$style.wrapper">
                <div v-html="content" :id="id" :class="$style.svgContainer">
                </div>
                <div>{{ id }}</div>
            </div>
            <!-- <div v-for="id in symbolIds" :key="id" :class="$style.wrapper">
                <div :class="$style.svgContainer">
                    <svg>
                        <use :xlink:href="`#${id}`"></use>
                    </svg>
                </div>
                <div>{{ id }}</div>
            </div> -->
        </div>
    </div>
</template>

<script>
window.anime = window.anime || require('../lib/anime.js');
const Site = window.Site = window.Site || {};
require('../lib/SVGAnime.js');

// const req = require.context('./assets', false, /\.svg$/);
// const symbols = req.keys().map(req);
// const symbolIds = symbols.map((symbol) => symbol.default.id);

export default {
    data() {
        return {
            // symbolIds,
            svgList: []
        };
    },
    methods: {
        runAnime() {
            this.svgList.forEach(({ id }) => {
                Site.SVGAnime.run(id);
            });
            // this.symbolIds.forEach((id) => {
            //     Site.SVGAnime.run(id);
            // });
        },
        handleFiles(e) {
            Array.prototype.slice.call(e.target.files).forEach((file) => {
                const fr = new FileReader();
                fr.onload = ({ target }) => {
                    const { result } = target;
                    const id = file.name.replace(/[\.svg$|\s]/g, '');
                    const exited = this.svgList.find((svg) => svg.id === id);
                    if (!exited) {
                        this.svgList.unshift({
                            id: file.name.replace(/[\.svg$|\s]/g, ''),
                            content: result
                        });
                    }
                };
                fr.readAsText(file);
            });
            e.target.value = '';
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