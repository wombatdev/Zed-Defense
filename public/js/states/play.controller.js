"use strict";

(function() {
    angular
        .module("zombiedefense")
        .controller("PlayController", [
            PlayControllerFunction
        ])

    function PlayControllerFunction($scope, $injector) {
        var vm = this;
        vm.pageClass = "play";
        
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
