enum structureTypeEnum {
    INDIVIDUAL = 'INDIVIDUAL',
    LEGAL_ENTITY = 'LEGAL_ENTITY'
}

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
    structureType;
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

class getStructureViewsDto {
    idStructure: string;
    outputType: string;
    filterDate: any;
}

class getStructureViewsResponse {
    date: any;
    noOfViews: number;
    source: string;
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
    idColourVariant;
    categories;
    features;
    tags;

    accordions;
    gallery;
    members;
    workingHours;
    messages;

    portfolios;
    education;
    experience;
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
    name: string;
    displayOrder: number;
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

class educationModel {
    idStructureEducation: string;
    idLocal: string;
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: Date;
    endDate: Date;
    grade: string;
    description: string;
    displayOrder: number;
    skills: educationSkillModel[];
    media: educationMediaModel[];
}

class educationSkillModel {
    idStructureEducationSkill: string;
    idLocal: string;
    name: string;
    idStructureEducation: string;
}

class educationMediaModel {
    idStructureEducationMedia: string;
    idLocal: string;
    idStructureEducation: string;
    idDocument: string;
    document: pictureDataModel;
}

class experienceModel {
    idStructureExperience: string;
    idLocal: string;
    title: string;
    employmentType: string;
    company: string;
    startDate: Date;
    endDate: Date;
    location: string;
    description: string;
    headline: string;
    displayOrder: number;
    skills: experienceSkillModel[];
    media: experienceMediaModel[];
}

class experienceSkillModel {
    idStructureExperienceSkill: string;
    idLocal: string;
    name: string;
    idStructureExperience: string;
}

class experienceMediaModel {
    idStructureExperienceMedia: string;
    idLocal: string;
    idStructureExperience: string;
    idDocument: string;
    document: pictureDataModel;
}

class cardDetailScreenConstantReturnType {
    integrationTypes;
    structureFields: structureFieldModel[];
    individualBaseSlugUrl;
    individualProfileColorVariants;

    legalEntityBaseSlugUrl;
    legalEntityProfileColorVariants;


    structurerCategoriesHiearchy;
}

class structureFieldModel {
    idstructureField;
    isPopular;
    structureFieldCategory;
}

/** END STRUCTURE*/


/**company card */

/** CARD */

class companyCardSortingPagingInfo extends sortingPagingInfoModel {
}

class companyCardDetailSortingPagingInfo extends sortingPagingInfoModel {
}

class companyCardListViewModel {

}

class getCompanyCardListReturnType extends integrationModel {
    idCard: string;
}

class getCompanyCardDto {
    idStructure: string
}

class getCompanyCardDetailScreenConstantReturnType {

}

class saveCompanyCardDto extends integrationModel {

}


class companyCardDetailScreenConstantReturnType {
    integrationTypes;
    structureFields: structureFieldModel[];
    individualBaseSlugUrl;
    individualProfileColorVariants;
}

class companyCardModel {
    id
}

class getCompanyCardViewsDto {

}

class getCompanyCardViewsResponse {

}

class messageSortingPagingInfo extends sortingPagingInfoModel {
    idStructure;
}


class structureMessageListReturnType  {
    messagePreview;
    messageContent;
}

class manipulateMessageReadStateDto {
    idMessageReference: string;
    isRead: boolean;
}

class manipulateMessageReadStateReturnType {
}


/**SHOP */

class shopProductModel {
    idShopProduct: string;
    shopId: string;
    productName: string;
    description: string;
    price: number;
    comparePrice: number;
    cost: number;
    sku: string;
    barcode: string;
    isActive: boolean;
    isFeatured: boolean;
    requiresShipping: boolean;
    trackInventory: boolean;
    allowBackorders: boolean;
    productTypeId: string;
    productImages: productImageModel[];
    attributes: productAttributeModel[];
    options: productOptionModel[];
    shippingInfo: shippingInfoModel;
    categories: any[];
    subtitle: string;
}

class productImageModel {
    idShopProductImage: string;
    idLocal: string;
    idShopProduct: string;
    image: pictureDataModel;
    displayOrder: number;
}

class productAttributeModel {
    idShopProductAttribute: string;
    idLocal: string;
    idShopProduct: string;
    name: string;
    type: string;
    isRequired: boolean;
    displayOrder: number;
    values: productAttributeValueModel[];
}

class productAttributeValueModel {
    idShopProductAttributeValue: string;
    idLocal: string;
    idShopProductAttribute: string;
    name: string;
}

class productOptionModel {
    idShopProductOption: string;
    idLocal: string;
    idShopProduct: string;
    name: string;
    type: string;
    isRequired: boolean;
    displayOrder: number;
    isActive: boolean;
    variants: productOptionVariantModel[];
}

class productOptionVariantModel {
    idShopProductOptionVariant: string;
    idLocal: string;
    idShopProductOption: string;
    name: string;
    price: number;
    comparePrice: number;
    cost: number;
    sku: string;
    barcode: string;
    weight: number;
    inventoryQuantity: number;
    isActive: boolean;
}

class shippingInfoModel {
    weight: number;
    weightUnit: string;
    length: number;
    width: number;
    height: number;
    dimensionUnit: string;
    zones: shippingZoneModel[];
}

class shippingZoneModel {
    idShippingZone: string;
    idLocal: string;
    zoneName: string;
    countries: shippingCountryModel[];
    shippingMethods: shippingMethodModel[];
}

class shippingCountryModel {
    idCountry: string;
    idLocal: string;
    countryCode: string;
    countryName: string;
}

class shippingMethodModel {
    idShippingMethod: string;
    idLocal: string;
    methodName: string;
    type: string;
    cost: number;
    freeShippingThreshold: number;
    estimatedDays: string;
    isActive: boolean;
}

class productTypeModel {
    idProductType: string;
    name: string;
    description: string;
    attributes: productTypeAttributeModel[];
}

class productTypeAttributeModel {
    idProductTypeAttribute: string;
    idProductType: string;
    name: string;
    type: string;
    isRequired: boolean;
    displayOrder: number;
}

// Shop Product DTOs
class shopProductSortingPagingInfo extends sortingPagingInfoModel {
    shopId: string;
    productTypeId: string;
    isActive: boolean;
}

class shopProductDetailSortingPagingInfo extends sortingPagingInfoModel {
    shopId: string;
}

class shopProductListViewModel {
    idShopProduct: string;
    productName: string;
    price: number;
    isActive: boolean;
    isFeatured: boolean;
    productTypeName: string;
    imageUrl: string;
}

class getShopProductListReturnType extends shopProductModel {
}

class getShopProductDto {
    idShop: string;
    idShopProduct: string;
}

class getShopProductDetailScreenConstantReturnType {
    productTypes: productTypeModel[];
}

class saveShopProductDto extends shopProductModel {
}

class shopProductDetailScreenConstantReturnType {
    productTypes: productTypeModel[];
}