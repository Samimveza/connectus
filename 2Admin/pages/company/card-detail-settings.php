  <div class="card-detail-settings" ng-controller="cardDetailSettingController">
      <!-- Statistics Section -->
      <div class="card-analytics-container">
          <div class="analytics-header-row">
              <h3>Card Analytics</h3>
              <div class="time-filter">
                  <button class="time-btn" ng-class="{'active': controller.timeFilter === 'DAY'}" ng-click="controller.setTimeFilter('DAY')">Today</button>
                  <button class="time-btn" ng-class="{'active': controller.timeFilter === 'MONTH'}" ng-click="controller.setTimeFilter('MONTH')">Current Month</button>
                  <button class="time-btn" ng-class="{'active': controller.timeFilter === 'YEAR'}" ng-click="controller.setTimeFilter('YEAR')">Current Year</button>
              </div>
          </div>
          <div class="analytics-content-row">
              <div class="stats-grid">
                  <div class="stat-box" ng-repeat="viewType in controller.cardDetail.totalViewsPerViewType">
                      <div class="stat-label">
                          {{viewType.scanType | uppercase}}
                          <i class="fas fa-info-circle" title="Number of {{viewType.scanType}} views"></i>
                      </div>
                      <div class="stat-value">{{viewType.noOfViews | number}}</div>
                  </div>
              </div>
              <div class="views-graph-container">
                  <div class="graph-header">
                      <h4>Views Over Time</h4>
                      <div class="graph-legend">
                          <span class="legend-item">
                              <span class="legend-color" style="background: var(--purple)"></span>
                              Views
                          </span>
                      </div>
                  </div>
                  <div class="graph-wrapper">
                      <canvas id="viewsChart"></canvas>
                  </div>
              </div>
          </div>
      </div>

      <!-- Card Name Section -->
      <div class="card-name-section">
          <div class="form-group">
              <label for="prefix">Name</label>
              <input type="text" id="cardName" class="form-input" ng-model="controller.cardDetail.cardName" placeholder="Name of card for display" name="cardName">
          </div>
          <div class="card-info-note padding-0">
              <i class="fas fa-info-circle"></i>
              This field does not appear on the card.
          </div>
      </div>

      <!-- Card Share Section -->
      <div class="card-share-section">
          <!-- QR Code -->
          <div class="qr-code-container">
              <div class="qr-code">
                  <div id="qrcode" class="modal-qrcode-container"></div>
                  <div ng-if="!controller.cardDetail.qrCodeUrl" class="qr-placeholder">
                      <i class="fas fa-qrcode" style="font-size: 48px; color: var(--purple, #081A29); opacity: 0.18;"></i>
                  </div>
                  <div class="qr-overlay" ng-if="controller.cardDetail.qrCodeUrl">Connect Us</div>
              </div>
              <div class="qr-caption" ng-if="controller.cardDetail.qrCodeUrl">Scan or click to preview</div>
              <div class="qr-caption" ng-if="!controller.cardDetail.qrCodeUrl">QR code will be available upon save.</div>
          </div>

          <!-- Share Options -->
          <div class="share-options">
              <h3>Share your card</h3>
              <button class="share-btn copy-link" ng-click="controller.copyLink()">
                  <i class="fas fa-link"></i>
                  Copy Link
              </button>

              <div class="share-divider">
                  <span>Or share by</span>
              </div>
              <button class="share-btn copy-link" ng-click="controller.shareByEmail()">
                  <i class="fas fa-envelope"></i>
                  Email
              </button>
              <div class="share-buttons">

              </div>
          </div>
      </div>

      <!-- Personalized Link Section -->
      <div class="personalized-link-section">
          <div class="section-header">
              <label>Personalized Link</label>
              <i class="fas fa-info-circle"></i>
          </div>
          <p class="section-description">Create your own link to further your brand.</p>
          <div class="form-group personalized-link-group">
              <span class="personalized-link-label">{{controller.baseSlugUrl}}</span>
              <input type="text" id="prefix" class="form-input" placeholder="john.doe" ng-model="controller.cardDetail.slug" disabled>
              <button class="copy-link-btn" ng-click="controller.copyFullSlugUrl()" title="Copy Link">
                  <i class="fas fa-copy"></i>
              </button>
              <button class="preview-profile-btn" ng-click="controller.previewProfile()" title="Preview Profile">
                  <i class="fas fa-eye"></i>
              </button>
          </div>
      </div>

      <!-- Card Management Section -->
      <div class="card-management">
          <!-- Pause Card -->
          <div class="management-option">
              <div class="option-header">
                  <label>Pause Card</label>
                  <div class="toggle-switch">
                      <input type="checkbox" id="pauseToggle" ng-model="controller.cardDetail.isPaused" ng-model="controller.cardDetail.isPaused">
                      <label for="pauseToggle"></label>
                  </div>
              </div>
              <p class="option-description">Disable this card temporarily.</p>
          </div>

          <!-- Delete Card -->
          <div class="management-option">
              <div class="option-header">
                  <label>Delete</label>
                  <button class="delete-card-btn" ng-click="controller.deleteCard()">Delete Card</button>
              </div>
              <p class="option-description">Delete this card permanently.</p>
          </div>
      </div>

      <!-- Order Physical Cards Section -->
      <div class="order-cards-section">
          <div class="coming-soon-header">
              <div class="coming-soon-icon">
                  <i class="fas fa-credit-card"></i>
              </div>
              <div class="coming-soon-content">
                  <h3>Order Physical Cards</h3>
                  <p class="coming-soon-description">Get professional business cards printed and delivered to your door.</p>
              </div>
              <div class="coming-soon-badge">
                  <span>Coming Soon</span>
              </div>
          </div>

          <div class="coming-soon-features">
              <div class="feature-item">
                  <i class="fas fa-print"></i>
                  <span>High-quality printing</span>
              </div>
              <div class="feature-item">
                  <i class="fas fa-shipping-fast"></i>
                  <span>Fast delivery</span>
              </div>
              <div class="feature-item">
                  <i class="fas fa-palette"></i>
                  <span>Custom designs</span>
              </div>
              <div class="feature-item">
                  <i class="fas fa-box"></i>
                  <span>Premium materials</span>
              </div>
          </div>

          <div class="coming-soon-notification">
              <div class="notification-content">
                  <i class="fas fa-bell"></i>
                  <div class="notification-text">
                      <strong>Stay tuned!</strong>
                      <p>You'll be automatically notified when physical card ordering becomes available.</p>
                  </div>
              </div>
          </div>
      </div>
  </div>


  </body>

  </html>