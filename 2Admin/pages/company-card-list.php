<!-- Cards Page Content -->
<div class="cards-page" ng-controller="cardListController" ng-init="controller.setInfo(controller.structureTypeEnum.LEGAL_ENTITY)">


    <div class="cards-toolbar">
        <div class="search-container">
            <i class="fas fa-search search-icon"></i>
            <input type="text" placeholder="Search cards" class="search-input" ng-model="controller.paging.search">
        </div>
        <div class="sort-container">
            <span class="sort-label">Sort by</span>
            <div class="sort-dropdown">
                <button class="sort-button" ng-click="controller.sortBy('dateAdded')">
                    <span>Date created</span>
                    <i class="fas fa-chevron-{{controller.paging.sortByDesc ? 'down' : 'up'}}"></i>
                </button>
            </div>
        </div>
        <button class="btn-search" ng-click="controller.search()">
            <i class="fas fa-search"></i>
            Search
        </button>
        <button class="btn-new-card" ng-click="controller.newCard()">
            <i class="fas fa-plus"></i>
            New Company Profile
        </button>
    </div>

    <div class="cards-grid">
        <div class="profile-card-container" ng-repeat="card in controller.list">
            <div class="profile-card" ng-click="controller.onEditClick(card)">
                <div class="profile-image-container">
                    <div class="profile-image-placeholder">
                        <img src="/images/sample-profile.png" alt="Profile Photo" ng-if="card.profilePicture == null">
                        <img src="{{card.profilePicture.url}}" alt="Profile Photo" ng-if="card.profilePicture != null">
                    </div>
                    <div class="profile-curve-container">
                        <div class="profile-curve"></div>
                    </div>
                </div>
                <div class="profile-info">
                    <div class="profile-name-container">
                        <h2 class="profile-name" ng-if="card.entityName != null">{{card.entityName}}</h2>
                        <h2 class="profile-name" ng-if="card.entityName == null">Name not available</h2>
                        <p class="profile-title" ng-if="card.headline != null">{{card.headline}}</p>
                        <p class="profile-title" ng-if="card.headline == null">Headline not available</p>
                        <p class="profile-company" ng-if="card.workingOrganisation != null">{{card.workingOrganisation}}</p>
                        <p class="profile-company" ng-if="card.workingOrganisation == null">Company not available</p>
                    </div>
                    <div class="profile-contact">
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            <span ng-if="card.email != null">{{card.email}}</span>
                            <span ng-if="card.email == null">Email not available</span>
                        </div>
                        <div class="contact-item phone">
                            <i class="fas fa-phone"></i>
                            <span ng-if="card.mainPhoneNumber != null">{{card.mainPhoneNumber}}</span>
                            <span ng-if="card.mainPhoneNumber == null">Phone number not available</span>
                        </div>
                    </div>
                    <div class="card-footer">
                        <span class="card-type">{{card.idStructureType}}</span>
                        <span class="card-date">{{card.dateCreated | date:'dd MMM yyyy'}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
    <!-- Load More Button -->
    <div class="load-more-container" ng-if="controller.pageCount > (controller.list.length / controller.pageSize)">
        <button class="btn-load-more" ng-click="controller.loadMore()">
            <i class="fas fa-spinner"></i>
            Load More
        </button>
    </div>

    <!-- Add New Card (Desktop) -->
    <div class="profile-card-container add-card-container d-md-block" ng-click="controller.newCard()">
        <div class="add-card">
            <div class="add-card-content">
                <div class="add-card-icon">
                    <i class="fas fa-plus-circle"></i>
                </div>
                <h3 class="add-card-text">Create New Company Profile</h3>
                <p class="add-card-desc">Add a new business to your collection</p>
            </div>
        </div>
    </div>


</div>