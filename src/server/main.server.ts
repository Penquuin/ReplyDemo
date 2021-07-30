import { FetchSharedData, ServerStore } from "./rokux/server-store";

//Register to callback
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

//Initialize server.
ServerStore.Dispatch({ type: "InitializeServer" });

//Everything below this comment is a test.
while (true) {
	ServerStore.Dispatch({ type: "_OnSharedDispatched", Action: { type: "AddGlass" } });
	wait(0.2);
	ServerStore.Dispatch({ type: "_OnSharedDispatched", Action: { type: "DrinkWater" } });
	wait(0.2);
}
