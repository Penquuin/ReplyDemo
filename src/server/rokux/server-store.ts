import Reply from "@rbxts/reply";
import { RokuxRemotes } from "shared/rokux-remotes";
import { ISharedState, TSharedActions } from "shared/rokux/shared-actions";
import { SharedDefaultState, SharedReducer } from "shared/rokux/shared-reducer";
import { ServerDefaultState, ServerReducer } from "./server-reducer";
import { IServerState, TServerActions } from "./server-types";

const OnSharedDispatched = RokuxRemotes.Server.Create("OnSharedDispatched");
const FetchSharedData = RokuxRemotes.Server.Create("FetchSharedData");

const ServerStore = Reply.CreateServerStore<IServerState, TServerActions, ISharedState, TSharedActions>(
	ServerReducer,
	SharedReducer,
	ServerDefaultState,
	SharedDefaultState,
	(sharedAction) => {
		OnSharedDispatched.SendToAllPlayers(sharedAction);
	},
	(nextDispatch, state) => {
		return (action) => {
			print("Server middleware is used!");
			return nextDispatch(action);
		};
	},
);

export { ServerStore, OnSharedDispatched, FetchSharedData };
