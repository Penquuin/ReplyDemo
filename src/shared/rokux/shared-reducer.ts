import Rokux from "@rbxts/rokux";
import { ISharedState, TSharedActions } from "./shared-actions";

// State declaration
export const SharedDefaultState: ISharedState = { Water: 10 };

// Reducer declaration
export const SharedReducer = Rokux.CreateReducer<ISharedState, TSharedActions>({
	DrinkWater: (s, a) => {
		if (s.Water > 0) {
			s.Water -= 1;
		}
		return s;
	},
	AddGlass: (s, a) => {
		s.Water += 1;
		return s;
	},
});
