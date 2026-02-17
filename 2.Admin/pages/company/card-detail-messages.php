<div class="messages-form" ng-controller="cardDetailMessagesController">


    <!-- Company Messages Section -->
    <div class="form-section">
        <h2 class="section-title">Company Messages</h2>

        <!-- No Messages Message -->
        <div class="no-fields-message" ng-if="!controller.messages || controller.messages.length === 0">
            <i class="fas fa-envelope"></i>
            <h3>No Messages Received Yet</h3>
            <p>Messages sent from your company landing page will appear here</p>
        </div>

        <!-- Messages List -->
        <div class="messages-container" ng-if="controller.messages && controller.messages.length > 0">
            <div class="message-item" ng-repeat="message in controller.messages track by $index">
                <div class="message-header">
                    <div class="message-info">
                        <div class="sender-details">
                            <span class="sender-name">
                                <i class="fas fa-user"></i>
                                {{message.entityName}} 
                            </span>
                            <span class="message-date">
                                <i class="fas fa-calendar"></i>
                                {{message.dateAdded | date:'MMM dd, yyyy - HH:mm'}}
                            </span>
                        </div>
                        <div class="contact-details">
                            <span class="sender-phone" ng-if="message.mainPhoneNumber">
                                <i class="fas fa-phone"></i>
                                {{message.mainPhoneNumber}}
                            </span>
                            <span class="sender-email" ng-if="message.email">
                                <i class="fas fa-envelope"></i>
                                {{message.email}}
                            </span>
                        </div>
                    </div>
                    <div class="message-actions">
                        <span class="message-status" ng-class="{'unread': !message.isRead, 'read': message.isRead}">
                            <i class="fas fa-circle" ng-if="!message.isRead"></i>
                            <i class="fas fa-check-circle" ng-if="message.isRead"></i>
                            {{message.isRead ? 'Read' : 'Unread'}}
                        </span>
                        <button class="btn-view-message" type="button" ng-click="controller.viewMessage(message)">
                            <i class="fas fa-eye"></i>
                            View Message
                        </button>
                    </div>
                </div>

                <div class="message-preview" ng-if="message.subject || message.messagePreview">
                    <div class="message-subject" ng-if="message.subject">
                        <strong>Subject:</strong> {{message.subject}}
                    </div>
                    <div class="message-excerpt" ng-if="message.messagePreview">
                        {{message.messagePreview}}...
                    </div>
                </div>
            </div>
        </div>

        <!-- Pagination Controls -->
        <div class="pagination-container" ng-if="controller.messages && controller.messages.length > 0">
            <div class="pagination-info">
                <span class="results-count">
                    Showing {{ (controller.paging.pageIndex - 1) * controller.paging.pageSize + 1 }} - {{(controller.paging.pageIndex * controller.paging.pageSize) | min:controller.paging.pageCount}}
                    of {{controller.paging.pageCount}} messages
                </span>
            </div>

            <div class="pagination-controls">
                <button class="pagination-btn"
                    ng-click="controller.goToFirstPage()"
                    ng-disabled="controller.paging.pageIndex === 1"
                    title="First Page">
                    <i class="fas fa-angle-double-left"></i>
                </button>

                <button class="pagination-btn"
                    ng-click="controller.goToPreviousPage()"
                    ng-disabled="controller.paging.pageIndex === 1"
                    title="Previous Page">
                    <i class="fas fa-angle-left"></i>
                </button>

                <span class="page-numbers">
                    <button class="page-number"
                        ng-repeat="page in controller.visiblePages track by $index"
                        ng-click="controller.goToPage(page)"
                        ng-class="{'active': page === controller.paging.pageIndex}"
                        ng-if="page !== '...'">
                        {{page}}
                    </button>
                    <span class="page-ellipsis" ng-if="page === '...'">...</span>
                </span>

                <button class="pagination-btn"
                    ng-click="controller.goToNextPage()"
                    ng-disabled="controller.paging.pageIndex >= Math.ceil(controller.paging.pageCount / controller.paging.pageSize)"
                    title="Next Page">
                    <i class="fas fa-angle-right"></i>
                </button>

                <button class="pagination-btn"
                    ng-click="controller.goToLastPage()"
                    ng-disabled="controller.paging.pageIndex >= Math.ceil(controller.paging.pageCount / controller.paging.pageSize)"
                    title="Last Page">
                    <i class="fas fa-angle-double-right"></i>
                </button>
            </div>

            <div class="pagination-options">
                <label>Items per page:</label>
                <select ng-model="controller.paging.pageSize"
                    ng-change="controller.onItemsPerPageChange()"
                    class="items-per-page-select">
                    <option ng-value="10">10</option>
                    <option ng-value="25">25</option>
                    <option ng-value="50">50</option>
                    <option ng-value="100">100</option>
                </select>
            </div>
        </div>
    </div>


</div>