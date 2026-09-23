<div class="profile-card-container">
    <div class="profile-card">
        <div class="profile-image-container">
            <div class="profile-image-placeholder">
                <img src="/images/sample-profile.png" alt="Profile Photo" ng-show="!controller.cardDetail.profilePicture.url">
                <img src="{{controller.cardDetail.profilePicture.url}}" alt="Profile Photo" ng-show="controller.cardDetail.profilePicture.url">
            </div>
            <div class="profile-curve-container">
                <div class="profile-curve"></div>
            </div>
        </div>
        <div class="profile-info">
            <div class="profile-name-container">
                <h2 class="profile-name">{{controller.cardDetail.firstname || 'John'}} {{controller.cardDetail.lastname || 'Doe'}}</h2>
                <p class="profile-title">{{controller.cardDetail.headline || 'Professional Title'}}</p>
                <p class="profile-company">{{controller.cardDetail.workingOrganisation || 'Company Name'}}</p>
            </div>
            <div class="profile-contact">
                <div class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <span>{{controller.cardDetail.email || 'john.doe@example.com'}}</span>
                </div>
                <div class="contact-item phone">
                    <i class="fas fa-phone"></i>
                    <span>{{controller.cardDetail.mainPhoneNumber || '+230 5766 1595'}}</span>
                </div>
            </div>
        </div>
    </div>
    <!-- Navigation Arrows -->
    <div class="nav-arrows" ng-class="controller.arrowClass">
        <svg width="454" height="79" viewBox="0 0 454 79" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M54.0834 36.6247L35.2843 17.8256C32.7645 15.3058 28.4559 17.0904 28.4559 20.6541L28.4559 58.2522C28.4559 61.8158 32.7645 63.6005 35.2843 61.0806L54.0834 42.2816C55.6455 40.7195 55.6455 38.1868 54.0834 36.6247Z" fill="#1D5B94" />
            <path d="M399.74 36.6247L418.539 17.8256C421.059 15.3058 425.368 17.0904 425.368 20.6541L425.368 58.2522C425.368 61.8158 421.059 63.6005 418.539 61.0806L399.74 42.2816C398.178 40.7195 398.178 38.1868 399.74 36.6247Z" fill="#1D5B94" />
        </svg>
    </div>
</div>