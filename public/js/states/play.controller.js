"use strict";

(function() {
    angular
        .module("zombiedefense")
        .controller("PlayController", [
            "$scope",
            // "$ocLazyLoad",
            "$injector",
            PlayControllerFunction
        ])

    function PlayControllerFunction($scope, $injector) {
        var vm = this;
        // $ocLazyLoad.load(['game.js'])
        //        .then(function() {
        //            // Inject the loaded module
        //            var gameFile = $injector.get('game');
        //        });

        window.game = new Phaser.Game(800, 600, Phaser.AUTO, '');

        game.state.add('boot', bootState);
        game.state.add('load', loadState);
        game.state.add('menu', menuState);
        game.state.add('play', playState);
        game.state.add('win', winState);
        game.state.add('lose', loseState);

        game.state.start('boot');

    }
})();
