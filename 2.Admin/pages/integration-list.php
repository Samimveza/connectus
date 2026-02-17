 <!-- Integrations Page Content -->
 <div class="integrations-page" ng-controller="integrationListController" ng-init="controller.setInfo()">
     <!-- Connected Integrations -->
     <h2 class="section-label">Connected Integrations</h2>
     <div class="integrations-grid" ng-repeat="integration in controller.list | filter: {integrationState: 'INITIALIZATION_SUCCESS'}">
         <!-- Integration Item -->
         <div class="integration-item">
             <div class="integration-header">
                 <div class="integration-icon github">
                     <img src="{{integration.image}}" alt="{{integration.name}}" class="integration-icon-image">
                 </div>
                 <div class="integration-content">
                     <h3>{{integration.name}}</h3>
                     <p>{{integration.description}}</p>
                 </div>
             </div>
             <button class="btn-view" ng-click="controller.viewIntegration(integration)">View Details</button>
             <span class="integration-status">{{integration.integrationState}}</span>

         </div>
     </div>

     <!-- Available Integrations -->
     <h2 class="section-label">Available Integrations</h2>
     <div class="integrations-grid" ng-repeat="integration in controller.list | filter: {integrationState: '!INITIALIZATION_SUCCESS'}">
         <!-- Integration Item -->
         <div class="integration-item">
             <div class="integration-header">
                 <div class="integration-icon github">
                     <img src="{{integration.image}}" alt="{{integration.name}}" class="integration-icon-image">
                 </div>
                 <div class="integration-content">
                     <h3>{{integration.name}}</h3>
                     <p>{{integration.description}}</p>
                 </div>
             </div>

             <button class="btn-view" type="button" ng-if="integration.integrationState == 'PENDING_INITIALIZATION'">Please check in a few minutes</button>

             <!--<button class="btn-view" ng-click="controller.viewIntegration(integration)">View Details</button>-->
             <span class="integration-status">{{integration.integrationState}}</span>

         </div>
     </div>

     <!-- No Available Integrations Message -->
     <div class="no-integrations-message" ng-if="(controller.list | filter: {integrationState: '!INITIALIZATION_SUCCESS'}).length === 0">
         <div class="message-content">
             <i class="fas fa-rocket"></i>
             <h3>More integrations coming soon</h3>
             <p>We're working on adding more integrations to help you connect with your favorite platforms.</p>
         </div>
     </div>

     <!-- Integration Modal -->
     <div class="integration-modal" id="integrationModal">
         <div class="modal-content">
             <div class="modal-header">
                 <div class="modal-title">
                     <div class="integration-icon">
                         <i class="fab fa-linkedin"></i>
                     </div>
                     <h2>Connect LinkedIn</h2>
                 </div>
                 <button class="modal-close">
                     <i class="fas fa-times"></i>
                 </button>
             </div>
             <div class="modal-body">
                 <div class="connection-steps">
                     <!-- Step 1: Email -->
                     <div class="connection-step active" id="stepEmail">
                         <div class="form-group">
                             <label>Enter your email address</label>
                             <input type="email" class="form-input" placeholder="your@email.com">
                         </div>
                         <button class="btn-request-otp">Request OTP</button>
                     </div>

                     <!-- Step 2: OTP -->
                     <div class="connection-step" id="stepOTP">
                         <div class="form-group">
                             <label>Enter OTP</label>
                             <input type="text" class="form-input" placeholder="Enter 6-digit code">
                             <p class="otp-hint">We've sent a verification code to your email</p>
                         </div>
                         <button class="btn-verify">Verify OTP</button>
                         <button class="btn-resend">Resend OTP</button>
                     </div>

                     <!-- Step 3: Success -->
                     <div class="connection-step" id="stepSuccess">
                         <div class="success-message">
                             <div class="success-icon">
                                 <i class="fas fa-check-circle"></i>
                             </div>
                             <h3>Successfully Connected!</h3>
                             <p>Your LinkedIn account has been connected successfully.</p>
                         </div>
                         <button class="btn-done">Done</button>
                     </div>
                 </div>
             </div>
         </div>
     </div>

 </div>