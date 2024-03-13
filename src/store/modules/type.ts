//定义数据类型user
import type { RouteRecordRaw } from "vue-router";
export interface userState {
	token: string | null;
	menuRoutes: RouteRecordRaw[];
	username: string;
	avatar: string;
	desc: string;
}
//分类相关数据类型
export interface categoryState {
	code: number | string;
	data: dataType[];
	message: string;
	ok: boolean;
}

export interface dataType {
	id: number | string;
	name: string;
	category1Id?: number;
	category2Id?: number;
}
//仓库数据类型
export interface categoryStore {
	categoryOneData: dataType[]
	categoryTwoData: dataType[]
	categoryThreeData: dataType[]
	categoryId1: string |number
	categoryId2: string |number
	categoryId3: string |number
	categoryListData:any
}
//属性及属性值的类型
export interface attrDataType{
	code:number,
	message:string,
	ok:boolean,
	data:attributesType[]
}

export interface attributesType{
	id:number,
	attrName:string,
	categoryId:number,
	categoryLevel:number,
	attrValueList:attributesValue[]
}
//属性值
export interface attributesValue{
	attrId:number | string,
	valueName: string,
	id:number
}