import Rokux from "@rbxts/rokux";
import { IServerState, TServerActions } from "./server-types";

export const ServerDefaultState: IServerState = { Cakes: 10 };

export const ServerReducer = Rokux.CreateReducer<IServerState, TServerActions>({
	EatServerCake: (s, a) => {
		if (s.Cakes > 0) {
			s.Cakes -= 1;
		}
		return s;
	},
	BakeServerCake: (s, a) => {
		s.Cakes += 1;
		return s;
	},
	InitializeServer: (s) => {
		return s;
	},
});
