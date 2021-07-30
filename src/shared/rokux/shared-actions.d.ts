import Rokux from "@rbxts/rokux";

// Actions definition
export interface IDrinkWater extends Rokux.Action<"DrinkWater"> {}
export interface IAddGlass extends Rokux.Action<"AddGlass"> {}

export type TSharedActions = IDrinkWater | IAddGlass;

// State definition
export interface ISharedState {
	Water: number;
}
