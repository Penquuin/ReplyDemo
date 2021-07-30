import Rokux from "@rbxts/rokux";

// Actions definition
export interface IInitializeServer extends Rokux.Action<"InitializeServer"> {}
export interface IEatServerCake extends Rokux.Action<"EatServerCake"> {}
export interface IBakeServerCake extends Rokux.Action<"BakeServerCake"> {}

export type TServerActions = (IEatServerCake | IBakeServerCake | IInitializeServer) & Rokux.AnyAction;

// State definition
export interface IServerState {
	Cakes: 10;
}
