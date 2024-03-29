//定义共用返回数据类型接口
export interface returnDataTypeCommon {
  code: number;
  message: string;
  ok: boolean;
}

//brand list return type
export interface getBrandReturnType extends returnDataTypeCommon {
  data: {
    records: object[];
    total: number;
  };
}
