import Reply from "@rbxts/reply";
import { ISharedState, TSharedActions } from "shared/rokux/shared-actions";
import { SharedDefaultState, SharedReducer } from "shared/rokux/shared-reducer";
import { ClientDefaultState, ClientReducer } from "./client-reducer";
import { IClientState, TClientActions } from "./client-types";

//Store Declaration
const ClientStore = Reply.CreateClientStore<IClientState, TClientActions, ISharedState, TSharedActions>(
	ClientReducer,
	SharedReducer,
	ClientDefaultState,
	SharedDefaultState,
);

export { ClientStore };
