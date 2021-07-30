import { SingleMotor, Spring } from "@rbxts/flipper";
import Roact, { Binding, Component } from "@rbxts/roact";

interface IProps {
	Prefix: "DISPATCH" | "SERVER" | "CLIENT" | "SHARED";
	ActionType: string;
	LayoutOrder: number;
}

export class OneEvent extends Component<IProps> {
	private motor: SingleMotor;
	private alpha: Binding<number>;
	constructor(p: IProps) {
		super(p);
		this.motor = new SingleMotor(0);
		const [b, u] = Roact.createBinding(this.motor.getValue());
		this.alpha = b;
		this.motor.onStep(u);
	}
	didMount() {
		this.motor.setGoal(new Spring(1, { frequency: 4 }));
	}
	render() {
		return (
			<frame Size={new UDim2(1, 0, 0, 40)} BackgroundTransparency={1} LayoutOrder={this.props.LayoutOrder}>
				<textlabel
					Size={new UDim2(0.8, 0, 0.8, 0)}
					Position={this.alpha.map((v) => {
						return new UDim2(1, 0, 0, 0).Lerp(new UDim2(), v);
					})}
					BackgroundTransparency={this.alpha.map((v) => {
						return 1 - v;
					})}
					TextTransparency={this.alpha.map((v) => {
						return 1 - v;
					})}
					BorderSizePixel={0}
					BackgroundColor3={new Color3(1, 1, 1)}
					Text={`<${this.props.Prefix}> -> Action<"${this.props.ActionType}">`}
					Font={Enum.Font.SourceSans}
					TextScaled={true}
				>
					<uitextsizeconstraint MaxTextSize={20} MinTextSize={2} />
				</textlabel>
			</frame>
		);
	}
}
