angularApp.controller('DashboardCtrl',
    ['$scope', '$http', 'socket', function ($scope, $http, socket) {
        $http.get('/api/v1/users').success(function (data) {
            $scope.users = data || [];
        });

        $scope.invoice = {'products': [{'_id': undefined, 'quantity': 1, 'name': '', 'serialNumber': '', 'amount': 0}]};

        $scope.addNewProduct = function () {
            $scope.invoice.products.push({'_id': undefined, 'quantity': 1, 'name': '', 'serialNumber': '', 'amount': 0});
        };

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

        $scope.updateProduct = function (product) {
            $http.put('/api/v1/products', product);
        };

        $scope.saveProduct = function (product) {
            $http.post('/api/v1/products', product);
        };

        $scope.deleteUser = function () {
            $http.delete('/api/v1/users', $scope.user);
        };

        $scope.savedProducts = {};
        socket.on('save:product', function (product) {
            $scope.invoice.products.filter(function (prod, idx, arr) {
                if (prod.name === product.name) {
                    prod._id = product._id;
                }
            });
        });

        socket.on('save:invoice', function (invoice) {
            alert('Invoice #' + invoice.number + ' saved');
        });

        socket.on('save:user', function (user) {
            $scope.users.push(user);
        });
    }]);