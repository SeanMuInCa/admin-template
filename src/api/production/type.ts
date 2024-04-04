//定义共用返回数据类型接口
export interface returnDataTypeCommon {
  code: number;
  message: string;
  ok: boolean;
}

//brand data type
export interface brandType {
  id?: number;
  tmName: string;
  logoUrl: string;
}
//brand list return type
export interface getBrandReturnType extends returnDataTypeCommon {
  data: {
    records: brandType[];
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}

export interface categoryType {
  createTime: string;
  id: number;
  name: string;
  updateTime: string;
  category1Id?: number;
  category2Id?: number;
}

export interface categoryReturnType extends returnDataTypeCommon {
  data: categoryType[];
}

export interface attrValue {
  id?: number;
  valueName: string;
  attrId?: number;
}

export type attrValueList = attrValue[];

export interface attr {
  id?: number | string;
  attrName: string;
  categoryId: number | string;
  categoryLevel: number;
  attrValueList: attrValueList;
  createTime?: string;
  updateTime?: string;
}

export type attrList = attr[];

export interface attrListReturnType extends returnDataTypeCommon {
  data: attrList;
}

export interface spuData {
  id?: number | string;
  spuName: string;
  description: string;
  category3Id: number | string;
  tmId: number | string;
  spuSaleAttrList: null;
  spuImageList: null;
}

export type records = spuData[];

export interface spuReturnType extends returnDataTypeCommon {
  data: {
    records: records;
    total: number;
    size: number;
    current: number;
    searchCount: true;
    pages: number;
  };
}
