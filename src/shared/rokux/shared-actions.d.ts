import Rokux from "@rbxts/rokux";

export interface IDrinkWater extends Rokux.Action<"DrinkWater"> {}
export interface IAddGlass extends Rokux.Action<"AddGlass"> {}

export type TSharedActions = IDrinkWater | IAddGlass;

export interface ISharedState {
	Water: number;
}
