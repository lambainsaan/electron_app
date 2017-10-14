export class Item {
    itemName: String;
    itemDetail: String;
    itemCategory: String[];
    itemParentCompany: String;
    Variants: SubItems[];
}

export class SubItems {
    itemSubname: String;
    itemQuantity: String;
    itemMRP: number;
    itemPicture: String;
    itemBarCode: String;
    itemWholesaleRate: String;
    ItemContents: String 
}