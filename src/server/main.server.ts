import { FetchSharedData, ServerStore } from "./rokux/server-store";

FetchSharedData.SetCallback(() => {
	return ServerStore.GetState()._Shared;
});

ServerStore.Changed.Connect((Action, NewState) => {
	if (Action.type === "_OnSharedDispatched") {
		print("<DISPATCH> " + Action.Action.type, NewState);
		return;
	}
	// print("<SERVER> " + Action.type);
});

ServerStore.Dispatch({ type: "InitializeServer" });

while (true) {
	ServerStore.Dispatch({ type: "_OnSharedDispatched", Action: { type: "AddGlass" } });
	wait(1);
	ServerStore.Dispatch({ type: "_OnSharedDispatched", Action: { type: "DrinkWater" } });
	wait(1);
}
