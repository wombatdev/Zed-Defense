"use strict";

(function() {
    angular
        .module("zombiedefense")
        .factory("UserFactory", [
            "$resource",
            UserFactoryFunction
        ]);

    function UserFactoryFunction($resource) {
        return $resource("http://localhost:3001/api/users/:name", {}, {
            update: {
                method: "PUT"
            }
        });
    }
})();
