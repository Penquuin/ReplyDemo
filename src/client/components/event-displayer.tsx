import { TEnhancement } from "@rbxts/reply/out/utility";
import Roact, { Binding, Component, createRef, Element, Portal, Ref } from "@rbxts/roact";
import { Players, Workspace } from "@rbxts/services";
import { ClientStore } from "client/rokux/client-store";
import { IClientState } from "client/rokux/client-types";
import { ISharedState } from "shared/rokux/shared-actions";
import { OneEvent } from "./one-event";

interface IState {
	BigLogs: Element[];
}

export class EventDisplayer extends Component<{}, IState> {
	private acs: Binding<UDim2>;
	private updateACS: (v: UDim2) => void;
	private con: RBXScriptConnection;
	private ref: Ref<ScrollingFrame>;
	private currentState: Binding<TEnhancement<IClientState, ISharedState>>;
	private updateCS: (v: TEnhancement<IClientState, ISharedState>) => void;
	private layoutID = 0;
	constructor() {
		super({});
		this.ref = createRef<ScrollingFrame>();
		this.setState({ BigLogs: [] });
		[this.acs, this.updateACS] = Roact.createBinding(new UDim2());
		[this.currentState, this.updateCS] = Roact.createBinding({ Cookies: 0, _Shared: { Water: 0 } });
		this.con = ClientStore.Changed.Connect((action, newstate) => {
			this.updateCS(newstate);
			this.layoutID++;
			const g = { ...this.state };
			if (action.type === "_OnSharedDispatched") {
				g.BigLogs.push(
					<OneEvent Prefix={"DISPATCH"} ActionType={action.Action.type} LayoutOrder={this.layoutID} />,
				);
			} else {
				g.BigLogs.push(<OneEvent Prefix={"CLIENT"} ActionType={action.type} LayoutOrder={this.layoutID} />);
			}
			if (g.BigLogs.size() > 100) {
				g.BigLogs.clear();
			}
			this.setState(g);
		});
	}
	willUnmount() {
		this.con.Disconnect();
	}
	render() {
		return (
			<Portal target={Players.LocalPlayer.WaitForChild("PlayerGui")}>
				<screengui ResetOnSpawn={false} ZIndexBehavior={Enum.ZIndexBehavior.Global}>
					<scrollingframe
						BackgroundTransparency={0.9}
						BackgroundColor3={new Color3()}
						BorderSizePixel={0}
						CanvasSize={this.acs}
						Size={new UDim2(0.3, 0, 0.9, 0)}
						Position={new UDim2(1, -10, 0, 10)}
						AnchorPoint={new Vector2(1, 0)}
						CanvasPosition={this.acs.map((v) => {
							const y = 0.9 * ((Workspace.WaitForChild("Camera") as Camera).ViewportSize.Y - 30);
							const g = this.ref.getValue();
							if (g) {
								if (g.CanvasPosition.Y < v.Y.Offset - y - 50) {
									return g.CanvasPosition;
								}
							}
							return new Vector2(0, v.Y.Offset);
						})}
						Ref={this.ref}
					>
						<uilistlayout
							Padding={new UDim(0, 0)}
							FillDirection={Enum.FillDirection.Vertical}
							SortOrder={Enum.SortOrder.LayoutOrder}
							VerticalAlignment={Enum.VerticalAlignment.Top}
							Change={{
								AbsoluteContentSize: (rbx) => {
									this.updateACS(new UDim2(0, 0, 0, rbx.AbsoluteContentSize.Y));
								},
							}}
						/>
						{...this.state.BigLogs}
					</scrollingframe>
					<textlabel
						BackgroundColor3={new Color3(1, 1, 1)}
						Position={new UDim2(0.7, -10, 0, 10)}
						Size={new UDim2(0.4, 0, 0, 40)}
						BorderSizePixel={0}
						AnchorPoint={new Vector2(1, 0)}
						Text={this.currentState.map((v) => {
							return `Client: { Cookies:${v.Cookies} }\n_Shared: { Water:${v._Shared.Water} }`;
						})}
						Font={Enum.Font.SourceSansBold}
						TextScaled={true}
					/>
				</screengui>
			</Portal>
		);
	}
}
