class geoLocation {
    lat: number;
    lng: number;
    zoom: number;
}

class sessionVariable {
}

class loginDto {
    email: string;
    password: string;
    tenantCode: string;
    otp: string;
}

class loginReturnType {

    permissions: permission[];
    roles: role[];
    token: string;

    message: string;
    requireEmailVerification: boolean;
    result: boolean;

    firstname: string;
    lastname: string;
    username: string;
}

interface permission {
    permissionCode: string;
    permissionName: string;
}

interface role {
    roleCode: string;
    roleName: string;
    roleLandingUrl: string;
    landingUrl
}


interface tenant {
    name: string;
    hash: string;
}

class userLoginModel {
    firstname: string;
    lastname: string;
    email: string;
    hash: string;
    username: string;
}

class pictureDataModel {

    name: string;
    idDocumentLocal: string

    idDocument: string;
    url: string;
}
class deleteItemDto {
    id;
}

class deleteItemReturnType {

}

class otpDto {
    email: string;
    otp: string;
}

class otpReturnType {
    result: boolean;
    message: string;
}

class registerDto {
    email: string;
    password: string;
    otp: string;
}

class registerReturnType {
    result: boolean;
    message: string;
}

class resendOtpDto {
    email: string;
}

class resendOtpReturnType {
    isResendOtpSuccessful: boolean;
    message: string;
}


/** INTEGRATION */

class integrationModel {
    idIntegration;
}

class integrationSortingPagingInfo extends sortingPagingInfoModel {
}

class integrationDetailSortingPagingInfo extends sortingPagingInfoModel {
    idIntegrationType: string;
}

class integrationListViewModel {

}

class getIntegrationListReturnType extends integrationModel {
    idIntegration: string;
}

class getIntegrationDto {
    idIntegrationType: string
}

class getIntegrationDetailScreenConstantReturnType {

}

class saveIntegrationDto extends integrationModel {

}

class serviceProviderListViewModel extends getIntegrationListReturnType {

}

class downloadFileDto {

}

class downloadInvoiceReturnType {
    fileId: string;
}



/** CARD */

class cardSortingPagingInfo extends sortingPagingInfoModel {
}

class cardDetailSortingPagingInfo extends sortingPagingInfoModel {
}

class cardListViewModel {

}

class getCardListReturnType extends integrationModel {
    idCard: string;
}

class getCardDto {
    idStructure: string
}

class getCardDetailScreenConstantReturnType {

}

class saveCardDto extends integrationModel {

}


/** STRUCTURE */
class structureModel {
    idStructure: string
    firstname: string
    lastname: string
    companyName: any
    email: string
    headline: string
    topFooter: string
    qrCodeUrl: string
    pageUrl: string
    addresses: addressModel[]
    socialNetworks: socialNetwork[]
    contacts: contact[]
    profilePicture: profilePicture
    coverPicture: coverPicture
    idProfilePicture: string
    idCoverPicture: string
    idStructureType: string
    structureType: structureType
    workingOrganisation: string
    idProfileTemplate: string
    views: any;
    color;
    structureFields: any[];
    stats;
    cardName;
    fullSlugUrl;
}

class structure_StructureFieldModel {
    idstructure_StructureField;
    idLocal;
    idStructureField;
    structureField: structureFieldModel;
    displayOrder: number;
}

class addressModel {
    idAddressReference: string;
    idLocal: string;
    addressLine1: string
    addressLine2: string
    city: string
    country: string
}

class socialNetwork {
    idSocialNetworkReference: string
    idSocialNetwork: string
    value: string
    name: string
}

class contact {
    idStructureContactReference: string
    name: string
    value: string
}

class profilePicture {
    idDocument: string
    name: string
    url: string
}

class coverPicture {
    idDocument: string
    name: string
    url: string
}

class structureType {
    idStructureType: string
    name: string
    code: string
}

class cardDetailScreenConstantReturnType {
    integrationTypes;
    structureFields: structureFieldModel[];
    individualBaseSlugUrl;
}

class structureFieldModel {
    idstructureField;
    isPopular;
    structureFieldCategory;
}

/** END STRUCTURE*/
