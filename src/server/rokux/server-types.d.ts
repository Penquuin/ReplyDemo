import Rokux from "@rbxts/rokux";

export interface IInitializeServer extends Rokux.Action<"InitializeServer"> {}
export interface IEatServerCake extends Rokux.Action<"EatServerCake"> {}
export interface IBakeServerCake extends Rokux.Action<"BakeServerCake"> {}

export type TServerActions = (IEatServerCake | IBakeServerCake | IInitializeServer) & Rokux.AnyAction;

export interface IServerState {
	Cakes: 10;
}
