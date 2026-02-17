<?php
$integrationType = $_GET['it'];
?>

<!-- Integrations Detail Page Content -->
<div class="integrations-detail-page" ng-controller="integrationDetailListController" ng-init="controller.setInfo('<?php echo $integrationType; ?>')" ng-cloak>
    <!-- Header Section -->

    <!-- Search and Filter Section -->
    <div class="integrations-toolbar">
        <div class="search-container">
            <i class="fas fa-search search-icon"></i>
            <input type="text" placeholder="Search integrations" class="search-input" ng-model="controller.paging.search">
        </div>
        <div class="sort-container">
            <span class="sort-label">Sort by</span>
            <div class="sort-dropdown">
                <button class="sort-button" ng-click="controller.sortBy('dateAdded')">
                    <span>Date created</span>
                    <i class="fas fa-chevron-{{controller.paging.sortByDesc ? 'down' : 'up'}}"></i>
                </button>
            </div>
            <button class="btn-search" ng-click="controller.search()">
                <i class="fas fa-search"></i>
                Search
            </button>
        </div>
    </div>

    <!-- Integration Cards Grid -->
    <div class="integration-details-grid">
        <!-- Integration Detail Card -->
        <div class="integration-detail-card" ng-repeat="integration in controller.list">
            <div class="detail-card-header">
                <div class="detail-card-info">
                    <span class="detail-date">{{integration.dateAdded | date:'MMM d, yyyy'}}</span>
                    <h3>{{integration.name}}</h3>

                    <div class="detail-card-status">
                        <span class="status-text">{{integration.state}}</span>
                    </div>
                </div>
                <!--    
                <div class="integration-icon github">
                    <i class="fab fa-github"></i>
                </div>
                -->
                <div ng-bind-html="integration.description">
                </div>
            </div>
            <div class="detail-card-actions">
                <button class="action-btn" ng-click="controller.onActionClick(action)" ng-repeat="action in integration.actions">
                    {{action.name}}
                </button>
            </div>
        </div>

    </div>

    <!-- Load More Button -->
    <div class="load-more-container" ng-if="controller.pageCount > (controller.list.length * controller.pageSize)">
        <button class="btn-load-more" ng-click="controller.loadMore()">
            <i class="fas fa-spinner"></i>
            Load More
        </button>
    </div>
</div>