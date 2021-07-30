import Roact from "@rbxts/roact";
import { RokuxRemotes } from "shared/rokux-remotes";
import { EventDisplayer } from "./components/event-displayer";
import { ClientStore } from "./rokux/client-store";

//Rendering UI
Roact.mount(Roact.createElement(EventDisplayer));

//Initialize Client Store
ClientStore.Dispatch({ type: "InitializeClient" });

//Typical way to fetch _Shared
RokuxRemotes.Client.Get("FetchSharedData")
	.CallServerAsync()
	.then((v) => {
		ClientStore.Dispatch({ type: "RefreshShared", state: v });
		RokuxRemotes.Client.Get("OnSharedDispatched").Connect((a) => {
			ClientStore.Dispatch({ type: "_OnSharedDispatched", Action: a });
		});
	});

ClientStore.Changed.Connect((action, newstate) => {
	if (action.type === "_OnSharedDispatched") {
		print("<SHARED> " + action.Action.type, newstate);
		return;
	}
	print("<CLIENT> " + action.type);
});

//Tests
while (true) {
	for (let i = 0; i < 5; i++) {
		ClientStore.Dispatch({ type: "BakeClientCookie" });
		wait(0.5);
	}
	wait(1);
	for (let i = 0; i < 4; i++) {
		ClientStore.Dispatch({ type: "EatClientCookie" });
		wait(0.5);
	}
	wait(1);
}
