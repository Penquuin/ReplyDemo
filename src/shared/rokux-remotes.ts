import Net from "@rbxts/net";
import { ISharedState, TSharedActions } from "./rokux/shared-actions";

// Remotes
const RokuxRemotes = Net.Definitions.Create({
	FetchSharedData: Net.Definitions.AsyncFunction<() => ISharedState>(),
	OnSharedDispatched: Net.Definitions.Event<[], [SharedAction: TSharedActions]>(),
});

export { RokuxRemotes };
