import Rokux from "@rbxts/rokux";

//Actions Definition
export interface IInitializeClient extends Rokux.Action<"InitializeClient"> {}
export interface IEatClientCookie extends Rokux.Action<"EatClientCookie"> {}
export interface IBakeClientCookie extends Rokux.Action<"BakeClientCookie"> {}

export type TClientActions = (IEatClientCookie | IBakeClientCookie | IInitializeClient) & Rokux.AnyAction;

//State Definition
export interface IClientState {
	Cookies: number;
}
