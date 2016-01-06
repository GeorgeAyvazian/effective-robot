angularApp.controller('HomeCtrl',
    ['$scope', '$http', 'socket', function ($scope, $http, socket) {
        $http.get('/api/v1/users').success(function (data) {
            $scope.users = data || [];
        });

        $scope.pIdx = 0;

        $scope.addUser = function () {
            $http.post('/api/v1/users', $scope.user);
        };

        $scope.updateUser = function () {
            $http.put('/api/v1/users', $scope.user);
        };

        $scope.saveInvoice = function () {
            $http.post('/api/v1/invoices', $scope.invoice);
        };

        $scope.deleteProduct = function () {
            $http.delete('/api/v1/products', $scope.users._id);
        };

        $scope.updateProduct = function () {
            $http.post('/api/v1/products', $scope.invoice.products[$scope.pIdx]);
        };

        $scope.deleteUser = function () {
            $http.delete('/api/v1/users', $scope.user);
        };

        socket.on('save:product', function (product) {
            var i = -1;
            $scope.invoice.products[$scope.pIdx]._id = product._id;
            $scope.users.filter(function (val, idx, arr) {
                if (val._id === product._id) {
                    i = idx;
                }
            });
            if (i === -1) {
                $scope.users.push(product);

            } else {
                $scope.users[i] = product;
            }
        });

        socket.on('save:invoice', function (invoice) {
            alert('Invoice #' + invoice.number + ' saved');
        });

        socket.on('save:user', function (user) {
            $scope.users.push(user);
        });
    }]);