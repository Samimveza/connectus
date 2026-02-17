class shopCategoryListController {
    scope;
    baseController: baseController;
    shopWebService: shopWebService; // Will be defined when web service is created

    paging: any;
    list: any[];
    categories: any[];
    categoriesTree: any[];
    selectedCategory: any;
    activeTab: string;

    constructor($scope, shopWebService) {
        var self = this;
        $scope.controller = this;
        this.scope = $scope;
        this.baseController = this.scope.baseController;
        this.shopWebService = shopWebService;
        this.initVariables();
    }

    public initVariables() {
        var self = this;
        self.baseController = this.scope.baseController;
        self.list = [];
        self.categories = [];
        self.categoriesTree = [];
        self.selectedCategory = null;
        self.activeTab = 'general';
    }

    public setInfo() {
        var self = this;
        self.intializePagingInfo();
        self.gridLoad();
    }

    public intializePagingInfo() {
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
    }

    public resetPagingInfo() {
        var self = this;
        self.paging.pageIndex = 1;
        self.paging.pageSize = 10;
        self.paging.pageCount = 0;
        self.paging.sortField = "";
        self.paging.sortColumn = "";
    }

    public gridLoad() {
        var self = this;
        //self.baseController.showLoading();
        console.log('gridload');
        // Mock data for now - replace with actual web service call
        setTimeout(() => {
            self.categoriesTree = self.getMockCategoriesTree();
            self.onGridLoaded();
            self.baseController.hideLoading();
        }, 500);
    }

    public getMockCategoriesTree() {
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
    }

    public onGridLoaded() {
        // Additional logic after grid loads
    }

    public selectCategory(category) {
        var self = this;
        self.selectedCategory = category;
        self.activeTab = 'general';
    }

    public toggleCategory(category, event) {
        var self = this;
        event.stopPropagation();
        category.isExpanded = !category.isExpanded;
    }

    public expandAll() {
        var self = this;
        self.categoriesTree.forEach(category => {
            category.isExpanded = true;
        });
    }

    public collapseAll() {
        var self = this;
        self.categoriesTree.forEach(category => {
            category.isExpanded = false;
        });
    }

    public setActiveTab(tab) {
        var self = this;
        self.activeTab = tab;
    }

    public addRootCategory() {
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
    }

    public addSubcategory() {
        var self = this;
        if (!self.selectedCategory) return;

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
    }

    public findCategoryById(id) {
        var self = this;
        for (let category of self.categoriesTree) {
            if (category.id === id) return category;
            for (let subcategory of category.subcategories) {
                if (subcategory.id === id) return subcategory;
            }
        }
        return null;
    }

    public deleteCategory(category) {
        var self = this;
        if (!category) return;

        if (confirm("Are you sure you want to delete the category '" + category.name + "'?")) {
            // Remove from tree
            self.categoriesTree = self.categoriesTree.filter(cat => cat.id !== category.id);
            self.categoriesTree.forEach(cat => {
                cat.subcategories = cat.subcategories.filter(sub => sub.id !== category.id);
            });

            // Clear selection if deleted category was selected
            if (self.selectedCategory && self.selectedCategory.id === category.id) {
                self.selectedCategory = null;
            }

            self.baseController.showMessage("Category deleted successfully", "", "SUCCESS", false, null, true);
        }
    }

    public toggleCategoryStatus(category) {
        var self = this;
        if (!category) return;
        
        category.isEnabled = !category.isEnabled;
        self.baseController.showMessage("Category status updated", "", "SUCCESS", false, null, true);
    }

    public loadMore() {
        var self = this;
        self.paging.pageIndex++;
        self.gridLoad();
    }

    public sortBy() {
        var self = this;
        self.paging.sortByDesc = !self.paging.sortByDesc;
        self.resetPagingInfo();
        self.gridLoad();
    }

    public search() {
        var self = this;
        self.resetPagingInfo();
        self.gridLoad();
    }

    public onEditClick(category) {
        var self = this;
        window.location.href = "/shop-category-detail/" + category.id + "/edit";
    }

    public newCategory() {
        var self = this;
        window.location.href = "/shop-category-detail/-1/add";
    }
}

// Register the controller
shopModule.controller("shopCategoryListController"
    , ["$scope"
        , "shopWebService"
        , shopCategoryListController
    ]);
