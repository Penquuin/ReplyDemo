import Rokux from "@rbxts/rokux";
import { IClientState, TClientActions } from "./client-types";

export const ClientDefaultState: IClientState = { Cookies: 50 };

export const ClientReducer = Rokux.CreateReducer<IClientState, TClientActions>({
	EatClientCookie: (s, a) => {
		if (s.Cookies > 0) {
			s.Cookies -= 1;
		}
		return s;
	},
	BakeClientCookie: (s, a) => {
		s.Cookies += 1;
		return s;
	},
	InitializeClient: (s, a) => {
		return s;
	},
});
