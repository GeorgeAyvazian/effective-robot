angularApp.controller('HomeCtrl',
    ['$scope', '$http', 'socket', function ($scope, $http, socket) {
        $scope.invoice = {'products': [{'_id': undefined, 'quantity': 1, 'name': '', 'serialNumber': '', 'amount': 0}]};

        $scope.addNewProduct = function () {
            $scope.invoice.products.push({'_id': undefined, 'quantity': 1, 'name': '', 'serialNumber': '', 'amount': 0});
        };

        $scope.saveInvoice = function () {
            $http.post('/api/v1/invoices', $scope.invoice);
        };

        $scope.updateInvoice = function (invoice) {
            $http.put('/api/v1/invoices', invoice);
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

        socket.on('save:product', function (product) {
            $scope.invoice.products.filter(function (prod, idx, arr) {
                if (prod.name === product.name) {
                    prod._id = product._id;
                }
            });
        });

        socket.on('save:invoice', function (invoice) {
            $scope.invoice._id = invoice._id;
        });

    }]);