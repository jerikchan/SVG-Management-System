
;(function(FUNC) {
    // 需要动画的 SVG 标签
    const ANIME_TAGS = ['path', 'line'];

    /**
     * 获取 SVG 动画标签的选择器
     * @param {String} SVGId SVG id
     */
    const getSVGAnimeTargets = (SVGId) => {
        return ANIME_TAGS.map(tag => `#${SVGId} ${tag}`);
    };

    /**
     * 运行 SVG 动画
     * @param {Array} targets 选择器参数
     */
    const runSVGAnime = (targets) => {
        anime({
            targets,
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 1500,
            delay: function(el, i) { return i * 250 },
            loop: false
        });
    };

    /**
     * 运行 SVG 动画
     * @param {String} SVGId SVG id
     */
    FUNC.run = (SVGId) => {
        runSVGAnime(getSVGAnimeTargets(SVGId));
    };

})(window.Site.SVGAnime || (window.Site.SVGAnime = {}));