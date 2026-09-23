var shopProductListController = /** @class */ (function () {
    function shopProductListController($scope, shopWebService) {
        var self = this;
        $scope.controller = this;
        this.scope = $scope;
        this.baseController = this.scope.baseController;
        this.shopWebService = shopWebService;
        this.initVariables();
    }
    shopProductListController.prototype.initVariables = function () {
        var self = this;
        self.baseController = this.scope.baseController;
        self.list = [];
        self.selectedProducts = [];
        self.paging = {
            search: '',
            sortBy: 'name',
            sortDirection: 'asc',
            currentPage: 1,
            itemsPerPage: 20
        };
        self.sortOptions = [
            { value: 'name', label: 'Name : A - Z', direction: 'asc' },
            { value: 'name', label: 'Name : Z - A', direction: 'desc' },
            { value: 'date', label: 'Date created', direction: 'desc' },
            { value: 'date', label: 'Date created', direction: 'asc' },
            { value: 'price', label: 'Price : Low to High', direction: 'asc' },
            { value: 'price', label: 'Price : High to Low', direction: 'desc' }
        ];
    };
    shopProductListController.prototype.setInfo = function () {
        var self = this;
        self.baseController = this.scope.baseController;
        self.loadProducts();
    };
    shopProductListController.prototype.loadProducts = function () {
        var self = this;
        // Mock data for products
        self.list = [
            {
                id: 1,
                name: 'SAMPLE. Black Dress',
                productId: '0008',
                image: '/images/products/black-dress.jpg',
                status: 'disabled',
                stock: 'In stock',
                featured: true,
                options: 3,
                requiresShipping: true,
                price: 'Rs44.95',
                isSample: false,
                isSelected: false
            },
            {
                id: 2,
                name: 'SAMPLE. Black Tank',
                productId: '0001',
                image: '/images/products/black-tank.jpg',
                status: 'disabled',
                stock: 'In stock',
                featured: true,
                options: 2,
                requiresShipping: true,
                price: 'Rs19.95',
                isSample: false,
                isSelected: false
            },
            {
                id: 3,
                name: 'SAMPLE. Blue Flannel',
                productId: '0004',
                image: '/images/products/blue-flannel.jpg',
                status: 'enabled',
                stock: 'In stock',
                featured: true,
                options: 1,
                requiresShipping: true,
                price: 'Rs29.95',
                isSample: false,
                isSelected: false
            },
            {
                id: 4,
                name: 'SAMPLE. Boardshorts',
                productId: '0002',
                image: '/images/products/boardshorts.jpg',
                status: 'enabled',
                stock: 'In stock',
                featured: true,
                options: 1,
                requiresShipping: true,
                price: 'Rs49.95',
                isSample: true,
                isSelected: false
            },
            {
                id: 5,
                name: 'SAMPLE. Flower Woven',
                productId: '0007',
                image: '/images/products/flower-woven.jpg',
                status: 'enabled',
                stock: 'In stock',
                featured: true,
                options: 1,
                requiresShipping: true,
                price: 'Rs49.95',
                isSample: true,
                isSelected: false
            },
            {
                id: 6,
                name: 'SAMPLE. Jade Tank',
                productId: '0003',
                image: '/images/products/jade-tank.jpg',
                status: 'enabled',
                stock: 'In stock',
                featured: false,
                options: 0,
                requiresShipping: false,
                price: 'Rs19.95',
                isSample: true,
                isSelected: false
            }
        ];
    };
    shopProductListController.prototype.search = function () {
        var self = this;
        // Implementation for search functionality
        console.log('Searching for:', self.paging.search);
        // In a real implementation, this would filter the products based on search term
    };
    shopProductListController.prototype.sortBy = function () {
        var self = this;
        // Implementation for sorting functionality
        console.log('Sorting by:', self.paging.sortBy, 'Direction:', self.paging.sortDirection);
        // In a real implementation, this would sort the products
    };
    shopProductListController.prototype.toggleProductSelection = function (product) {
        var self = this;
        product.isSelected = !product.isSelected;
        if (product.isSelected) {
            self.selectedProducts.push(product);
        }
        else {
            //var index = self.selectedProducts.findIndex(p => p.id === product.id);
            //if (index > -1) {
            //    self.selectedProducts.splice(index, 1);
            //}
        }
    };
    shopProductListController.prototype.selectAllProducts = function () {
        var self = this;
        var allSelected = self.list.every(function (product) { return product.isSelected; });
        self.list.forEach(function (product) {
            product.isSelected = !allSelected;
        });
        if (!allSelected) {
            self.selectedProducts = self.list.slice();
        }
        else {
            self.selectedProducts = [];
        }
    };
    shopProductListController.prototype.editProduct = function (product) {
        var self = this;
        // Implementation for editing product
        console.log('Editing product:', product.name);
        // In a real implementation, this would navigate to product edit page
    };
    shopProductListController.prototype.deleteProduct = function (product) {
        var self = this;
        // Implementation for deleting product
        console.log('Deleting product:', product.name);
        // In a real implementation, this would show confirmation dialog and delete
    };
    shopProductListController.prototype.toggleProductStatus = function (product) {
        var self = this;
        product.status = product.status === 'enabled' ? 'disabled' : 'enabled';
        console.log('Toggled product status:', product.name, 'to', product.status);
        // In a real implementation, this would save to server
    };
    shopProductListController.prototype.newProduct = function () {
        var self = this;
        // Implementation for creating new product
        console.log('Creating new product');
        // In a real implementation, this would navigate to product creation page
    };
    shopProductListController.prototype.bulkAction = function (action) {
        var self = this;
        if (self.selectedProducts.length === 0) {
            return;
        }
        switch (action) {
            case 'enable':
                self.selectedProducts.forEach(function (product) {
                    product.status = 'enabled';
                });
                break;
            case 'disable':
                self.selectedProducts.forEach(function (product) {
                    product.status = 'disabled';
                });
                break;
            case 'delete':
                // Implementation for bulk delete
                console.log('Bulk deleting products:', self.selectedProducts.length);
                break;
        }
        // Clear selection after bulk action
        self.selectedProducts = [];
        self.list.forEach(function (product) {
            product.isSelected = false;
        });
    };
    shopProductListController.prototype.getSortLabel = function () {
        var self = this;
        //var option = self.sortOptions.find(opt =>
        //    opt.value === self.paging.sortBy && opt.direction === self.paging.sortDirection
        //);
        //return option ? option.label : 'Name : A - Z';
    };
    shopProductListController.prototype.getSortIcon = function () {
        var self = this;
        return self.paging.sortDirection === 'asc' ? 'fa-chevron-up' : 'fa-chevron-down';
    };
    return shopProductListController;
}());
shopModule.controller("shopProductListController", ["$scope",
    "shopWebService",
    shopProductListController
]);
