<div ng-controller="cardDetailMessageModalController" ng-cloak>

	<div class="modal-header">
		<h4 class="modal-title" id="messageModalLabel">Message</h4>
		<button type="button" class="btn-close" ng-click="controller.onCancelToModal()" aria-label="Close">
			<i class="fas fa-times"></i>
		</button>
	</div>



	<div class="modal-body">
		{{controller.message.messageContent}}
	</div>

	<div class="modal-footer">
		<div class="modal-footer-content">
			<button class="btn-save" ng-click="controller.markAsRead()">Mark as Read</button>
		</div>
	</div>

</div>