var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var geoLocation = /** @class */ (function () {
    function geoLocation() {
    }
    return geoLocation;
}());
var sessionVariable = /** @class */ (function () {
    function sessionVariable() {
    }
    return sessionVariable;
}());
var loginDto = /** @class */ (function () {
    function loginDto() {
    }
    return loginDto;
}());
var loginReturnType = /** @class */ (function () {
    function loginReturnType() {
    }
    return loginReturnType;
}());
var userLoginModel = /** @class */ (function () {
    function userLoginModel() {
    }
    return userLoginModel;
}());
var pictureDataModel = /** @class */ (function () {
    function pictureDataModel() {
    }
    return pictureDataModel;
}());
var deleteItemDto = /** @class */ (function () {
    function deleteItemDto() {
    }
    return deleteItemDto;
}());
var deleteItemReturnType = /** @class */ (function () {
    function deleteItemReturnType() {
    }
    return deleteItemReturnType;
}());
var otpDto = /** @class */ (function () {
    function otpDto() {
    }
    return otpDto;
}());
var otpReturnType = /** @class */ (function () {
    function otpReturnType() {
    }
    return otpReturnType;
}());
var registerDto = /** @class */ (function () {
    function registerDto() {
    }
    return registerDto;
}());
var registerReturnType = /** @class */ (function () {
    function registerReturnType() {
    }
    return registerReturnType;
}());
var resendOtpDto = /** @class */ (function () {
    function resendOtpDto() {
    }
    return resendOtpDto;
}());
var resendOtpReturnType = /** @class */ (function () {
    function resendOtpReturnType() {
    }
    return resendOtpReturnType;
}());
/** INTEGRATION */
var integrationModel = /** @class */ (function () {
    function integrationModel() {
    }
    return integrationModel;
}());
var integrationSortingPagingInfo = /** @class */ (function (_super) {
    __extends(integrationSortingPagingInfo, _super);
    function integrationSortingPagingInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return integrationSortingPagingInfo;
}(sortingPagingInfoModel));
var integrationDetailSortingPagingInfo = /** @class */ (function (_super) {
    __extends(integrationDetailSortingPagingInfo, _super);
    function integrationDetailSortingPagingInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return integrationDetailSortingPagingInfo;
}(sortingPagingInfoModel));
var integrationListViewModel = /** @class */ (function () {
    function integrationListViewModel() {
    }
    return integrationListViewModel;
}());
var getIntegrationListReturnType = /** @class */ (function (_super) {
    __extends(getIntegrationListReturnType, _super);
    function getIntegrationListReturnType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return getIntegrationListReturnType;
}(integrationModel));
var getIntegrationDto = /** @class */ (function () {
    function getIntegrationDto() {
    }
    return getIntegrationDto;
}());
var getIntegrationDetailScreenConstantReturnType = /** @class */ (function () {
    function getIntegrationDetailScreenConstantReturnType() {
    }
    return getIntegrationDetailScreenConstantReturnType;
}());
var saveIntegrationDto = /** @class */ (function (_super) {
    __extends(saveIntegrationDto, _super);
    function saveIntegrationDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return saveIntegrationDto;
}(integrationModel));
var serviceProviderListViewModel = /** @class */ (function (_super) {
    __extends(serviceProviderListViewModel, _super);
    function serviceProviderListViewModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return serviceProviderListViewModel;
}(getIntegrationListReturnType));
var downloadFileDto = /** @class */ (function () {
    function downloadFileDto() {
    }
    return downloadFileDto;
}());
var downloadInvoiceReturnType = /** @class */ (function () {
    function downloadInvoiceReturnType() {
    }
    return downloadInvoiceReturnType;
}());
/** CARD */
var cardSortingPagingInfo = /** @class */ (function (_super) {
    __extends(cardSortingPagingInfo, _super);
    function cardSortingPagingInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return cardSortingPagingInfo;
}(sortingPagingInfoModel));
var cardDetailSortingPagingInfo = /** @class */ (function (_super) {
    __extends(cardDetailSortingPagingInfo, _super);
    function cardDetailSortingPagingInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return cardDetailSortingPagingInfo;
}(sortingPagingInfoModel));
var cardListViewModel = /** @class */ (function () {
    function cardListViewModel() {
    }
    return cardListViewModel;
}());
var getCardListReturnType = /** @class */ (function (_super) {
    __extends(getCardListReturnType, _super);
    function getCardListReturnType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return getCardListReturnType;
}(integrationModel));
var getCardDto = /** @class */ (function () {
    function getCardDto() {
    }
    return getCardDto;
}());
var getCardDetailScreenConstantReturnType = /** @class */ (function () {
    function getCardDetailScreenConstantReturnType() {
    }
    return getCardDetailScreenConstantReturnType;
}());
var saveCardDto = /** @class */ (function (_super) {
    __extends(saveCardDto, _super);
    function saveCardDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return saveCardDto;
}(integrationModel));
/** STRUCTURE */
var structureModel = /** @class */ (function () {
    function structureModel() {
    }
    return structureModel;
}());
var structure_StructureFieldModel = /** @class */ (function () {
    function structure_StructureFieldModel() {
    }
    return structure_StructureFieldModel;
}());
var addressModel = /** @class */ (function () {
    function addressModel() {
    }
    return addressModel;
}());
var socialNetwork = /** @class */ (function () {
    function socialNetwork() {
    }
    return socialNetwork;
}());
var contact = /** @class */ (function () {
    function contact() {
    }
    return contact;
}());
var profilePicture = /** @class */ (function () {
    function profilePicture() {
    }
    return profilePicture;
}());
var coverPicture = /** @class */ (function () {
    function coverPicture() {
    }
    return coverPicture;
}());
var structureType = /** @class */ (function () {
    function structureType() {
    }
    return structureType;
}());
var cardDetailScreenConstantReturnType = /** @class */ (function () {
    function cardDetailScreenConstantReturnType() {
    }
    return cardDetailScreenConstantReturnType;
}());
var structureFieldModel = /** @class */ (function () {
    function structureFieldModel() {
    }
    return structureFieldModel;
}());
/** END STRUCTURE*/
