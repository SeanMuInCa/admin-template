//定义共用返回数据类型接口
export interface returnDataTypeCommon {
  code: number;
  message: string;
  ok: boolean;
}

export interface userRecordsType {
  name: string;
  password: string;
  username: string;
  id?: number | string;
  roleName?: string;
}
export interface userDataType {
  records: userRecordsType[];
  total: number;
}

export interface UserListReturnType extends returnDataTypeCommon {
  data: userDataType;
}

export interface role {
  id?: number | string;
  remark?: null;
  roleName: string;
  createTime: string;
  updateTime: string;
}
export interface roleListType extends returnDataTypeCommon {
  data: {
    allRolesList: role[];
    assignRoles: role[];
  };
}

export interface getRoleReturnType extends returnDataTypeCommon {
  data: {
    records: role[];
    total: number;
  };
}

export interface permit {
  id?: number | string;
  level: number | string;
  name: string;
  code: string;
  pid: string | number;
}
export interface permissionReturnType extends returnDataTypeCommon {
  data: permit[];
}
