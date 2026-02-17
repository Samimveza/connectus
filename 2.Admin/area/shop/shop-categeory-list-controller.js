var shopCategoryListController = /** @class */ (function () {
    function shopCategoryListController($scope, shopWebService) {
        var self = this;
        $scope.controller = this;
        this.scope = $scope;
        this.baseController = this.scope.baseController;
        this.shopWebService = shopWebService;
        this.initVariables();
    }
    shopCategoryListController.prototype.initVariables = function () {
        var self = this;
        self.baseController = this.scope.baseController;
        self.list = [];
        self.categories = [];
        self.categoriesTree = [];
        self.selectedCategory = null;
        self.activeTab = 'general';
    };
    shopCategoryListController.prototype.setInfo = function () {
        var self = this;
        self.intializePagingInfo();
        self.gridLoad();
    };
    shopCategoryListController.prototype.intializePagingInfo = function () {
        var self = this;
        self.paging = {
            pageIndex: 1,
            pageSize: 10,
            pageCount: 0,
            sortField: "",
            sortColumn: "",
            sortByDesc: false,
            search: ""
        };
    };
    shopCategoryListController.prototype.resetPagingInfo = function () {
        var self = this;
        self.paging.pageIndex = 1;
        self.paging.pageSize = 10;
        self.paging.pageCount = 0;
        self.paging.sortField = "";
        self.paging.sortColumn = "";
    };
    shopCategoryListController.prototype.gridLoad = function () {
        var self = this;
        //self.baseController.showLoading();
        console.log('gridload');
        // Mock data for now - replace with actual web service call
        setTimeout(function () {
            self.categoriesTree = self.getMockCategoriesTree();
            self.onGridLoaded();
            self.baseController.hideLoading();
        }, 500);
    };
    shopCategoryListController.prototype.getMockCategoriesTree = function () {
        return [
            {
                id: 1,
                name: "Store front page",
                description: "Main store categories",
                imageUrl: null,
                itemCount: 9,
                isEnabled: true,
                dateCreated: new Date('2024-01-15'),
                parentCategory: null,
                isExpanded: false,
                subcategories: []
            },
            {
                id: 2,
                name: "Root",
                description: "Root category for organization",
                imageUrl: null,
                itemCount: 0,
                isEnabled: true,
                dateCreated: new Date('2024-01-10'),
                parentCategory: null,
                isExpanded: true,
                subcategories: [
                    {
                        id: 3,
                        name: "Sub From Root",
                        description: "Subcategory under Root",
                        imageUrl: null,
                        itemCount: 0,
                        isEnabled: true,
                        dateCreated: new Date('2024-01-12'),
                        parentCategory: 2,
                        isExpanded: false,
                        subcategories: []
                    }
                ]
            }
        ];
    };
    shopCategoryListController.prototype.onGridLoaded = function () {
        // Additional logic after grid loads
    };
    shopCategoryListController.prototype.selectCategory = function (category) {
        var self = this;
        self.selectedCategory = category;
        self.activeTab = 'general';
    };
    shopCategoryListController.prototype.toggleCategory = function (category, event) {
        var self = this;
        event.stopPropagation();
        category.isExpanded = !category.isExpanded;
    };
    shopCategoryListController.prototype.expandAll = function () {
        var self = this;
        self.categoriesTree.forEach(function (category) {
            category.isExpanded = true;
        });
    };
    shopCategoryListController.prototype.collapseAll = function () {
        var self = this;
        self.categoriesTree.forEach(function (category) {
            category.isExpanded = false;
        });
    };
    shopCategoryListController.prototype.setActiveTab = function (tab) {
        var self = this;
        self.activeTab = tab;
    };
    shopCategoryListController.prototype.addRootCategory = function () {
        var self = this;
        var newCategory = {
            id: Date.now(),
            name: "New Root Category",
            description: "",
            imageUrl: null,
            itemCount: 0,
            isEnabled: true,
            dateCreated: new Date(),
            parentCategory: null,
            isExpanded: false,
            subcategories: []
        };
        self.categoriesTree.push(newCategory);
        self.selectCategory(newCategory);
    };
    shopCategoryListController.prototype.addSubcategory = function () {
        var self = this;
        if (!self.selectedCategory)
            return;
        var newSubcategory = {
            id: Date.now(),
            name: "New Subcategory",
            description: "",
            imageUrl: null,
            itemCount: 0,
            isEnabled: true,
            dateCreated: new Date(),
            parentCategory: self.selectedCategory.id,
            isExpanded: false,
            subcategories: []
        };
        // Find the parent category and add subcategory
        var parentCategory = self.findCategoryById(self.selectedCategory.id);
        if (parentCategory) {
            parentCategory.subcategories.push(newSubcategory);
            parentCategory.isExpanded = true;
            self.selectCategory(newSubcategory);
        }
    };
    shopCategoryListController.prototype.findCategoryById = function (id) {
        var self = this;
        for (var _i = 0, _a = self.categoriesTree; _i < _a.length; _i++) {
            var category = _a[_i];
            if (category.id === id)
                return category;
            for (var _b = 0, _c = category.subcategories; _b < _c.length; _b++) {
                var subcategory = _c[_b];
                if (subcategory.id === id)
                    return subcategory;
            }
        }
        return null;
    };
    shopCategoryListController.prototype.deleteCategory = function (category) {
        var self = this;
        if (!category)
            return;
        if (confirm("Are you sure you want to delete the category '" + category.name + "'?")) {
            // Remove from tree
            self.categoriesTree = self.categoriesTree.filter(function (cat) { return cat.id !== category.id; });
            self.categoriesTree.forEach(function (cat) {
                cat.subcategories = cat.subcategories.filter(function (sub) { return sub.id !== category.id; });
            });
            // Clear selection if deleted category was selected
            if (self.selectedCategory && self.selectedCategory.id === category.id) {
                self.selectedCategory = null;
            }
            self.baseController.showMessage("Category deleted successfully", "", "SUCCESS", false, null, true);
        }
    };
    shopCategoryListController.prototype.toggleCategoryStatus = function (category) {
        var self = this;
        if (!category)
            return;
        category.isEnabled = !category.isEnabled;
        self.baseController.showMessage("Category status updated", "", "SUCCESS", false, null, true);
    };
    shopCategoryListController.prototype.loadMore = function () {
        var self = this;
        self.paging.pageIndex++;
        self.gridLoad();
    };
    shopCategoryListController.prototype.sortBy = function () {
        var self = this;
        self.paging.sortByDesc = !self.paging.sortByDesc;
        self.resetPagingInfo();
        self.gridLoad();
    };
    shopCategoryListController.prototype.search = function () {
        var self = this;
        self.resetPagingInfo();
        self.gridLoad();
    };
    shopCategoryListController.prototype.onEditClick = function (category) {
        var self = this;
        window.location.href = "/shop-category-detail/" + category.id + "/edit";
    };
    shopCategoryListController.prototype.newCategory = function () {
        var self = this;
        window.location.href = "/shop-category-detail/-1/add";
    };
    return shopCategoryListController;
}());
// Register the controller
shopModule.controller("shopCategoryListController", ["$scope",
    "shopWebService",
    shopCategoryListController
]);
