import React from "react";
import { Panel, Form, InputPicker, InputNumber } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "./styles.css";

const data = {
  boxSheet: [
    { label: "Two Sheet One Box", value: "Two Sheet One Box" },
    { label: "One Sheet One Box", value: "One Sheet One Box" }
  ],
  ply: [
    { label: 3, value: 3 },
    { label: 5, value: 5 },
    { label: 7, value: 7 }
  ],
  paperGSM: [
    { label: "100", value: 100 },
    { label: "120", value: 120 },
    { label: "140", value: 140 },
    { label: "150", value: 150 },
    { label: "160", value: 160 },
    { label: "180", value: 180 }
  ]
};
const initFormValue = {
  boxSheet: "One Sheet One Box",
  ply: 3,
  length: "",
  height: "",
  width: "",
  top: "",
  flute: "",
  bottom: "",
  topCost: "",
  fluteCost: "",
  bottomCost: "",
  ConversionRate: "10",
  margin1: "50",
  margin2: "15",
  FlutePercent: "40",
  PrintingCost: "1",
  wastage: "3"
};
export default function App() {
  const [formValue, setFormValue] = React.useState(initFormValue);
  const [weight, setWeight] = React.useState(0);
  const [sheetCutting, setSheetCutting] = React.useState(0);
  const [fluteGsmT, setFluteGsmT] = React.useState(0);
  const [bottomGsmT, setBottomGsmT] = React.useState(0);
  const [topWT, setTopWT] = React.useState(0);
  const [fluteWT, setFluteWT] = React.useState(0);
  const [bottomWT, setBottomWT] = React.useState(0);
  const [cost, setCost] = React.useState(0);
  React.useEffect(() => {
    calculateGsmT();
    calculateSheetCutting();
    calculateWeight();
    calculateCost();
    console.log("here");
  }, [formValue, fluteGsmT, bottomGsmT, topWT, fluteWT, bottomWT]);

  const calculateCost = () => {
    let topPaperPrice = (Number(formValue.topCost) * topWT) / 1000;
    let flutePaperPrice = (Number(formValue.fluteCost) * fluteWT) / 1000;
    let bottomPaperPrice = (Number(formValue.bottomCost) * bottomWT) / 1000;

    let topPrintingPrice = (topWT * Number(formValue.PrintingCost)) / 1000;
    let bottomPrintingPrice =
      (bottomWT * Number(formValue.PrintingCost)) / 1000;
    let flutePrintingPrice = (fluteWT * Number(formValue.PrintingCost)) / 1000;
    console.log("", topPrintingPrice, bottomPrintingPrice, flutePrintingPrice);
    let topConversion = (topWT * Number(formValue.ConversionRate)) / 1000;
    let bottomConversion = (bottomWT * Number(formValue.ConversionRate)) / 1000;
    let fluteConversion = (fluteWT * Number(formValue.ConversionRate)) / 1000;

    let sum =
      topConversion +
      topPaperPrice +
      topPrintingPrice +
      fluteConversion +
      flutePaperPrice +
      flutePrintingPrice +
      bottomPaperPrice +
      bottomPrintingPrice +
      bottomConversion;

    setCost(sum.toFixed(2));
  };
  const calculateWeight = () => {
    // let topGsmTotal = Number(formValue.top);
    // let fluteGsmTotal =
    //   Number(formValue.flute) * ((Number(formValue.ply) - 1) / 2);
    // let bottomGsmTotal =
    //   Number(formValue.bottom) * ((Number(formValue.ply) - 1) / 2);
    //console.log(topGsmTotal, fluteGsmTotal, bottomGsmTotal);

    //decal
    let decal =
      Number(formValue.width) +
      Number(formValue.height) +
      Number(formValue.margin2);

    let topWeight = (Number(formValue.top) * sheetCutting * decal) / 1000000;
    let fluteWeight = (fluteGsmT * sheetCutting * decal) / 1000000;
    // console.log(fluteWeight, decal, fluteGsmT);
    let bottomWeight = (bottomGsmT * sheetCutting * decal) / 1000000;

    let topWeightWithWaste =
      topWeight + (topWeight * Number(formValue.wastage)) / 100;
    let bottomWeightWithWaste =
      bottomWeight + bottomWeight * (Number(formValue.wastage) / 100);
    let fluteWeightWithWaste =
      fluteWeight + (fluteWeight * Number(formValue.wastage)) / 100;
    console.log(fluteWeightWithWaste);
    setBottomWT(bottomWeightWithWaste);
    setFluteWT(fluteWeightWithWaste);
    setTopWT(topWeightWithWaste);
    setWeight(
      (
        bottomWeightWithWaste +
        fluteWeightWithWaste +
        topWeightWithWaste
      ).toFixed(2)
    );
  };

  const calculateSheetCutting = () => {
    if (formValue.boxSheet === "One Sheet One Box") {
      let sheetCutting =
        2 * (Number(formValue.length) + Number(formValue.width)) +
        Number(formValue.margin1);
      setSheetCutting(sheetCutting);
    } else {
      let sheetCutting =
        Number(formValue.length) +
        Number(formValue.width) +
        Number(formValue.margin1);
      setSheetCutting(sheetCutting);
    }
  };
  const calculateGsmT = () => {
    setBottomGsmT(Number(formValue.bottom) * ((Number(formValue.ply) - 1) / 2));
    setFluteGsmT(
      Number(formValue.flute) *
        ((Number(formValue.ply) - 1) / 2) *
        (1 + Number(formValue.FlutePercent) / 100)
    );
  };

  return (
    <div className="App">
      <h2>Box Quote Maker</h2>
      <div className="mainContainer">
        <Form
          fluid
          formValue={formValue}
          onChange={(formValue) => {
            setFormValue(formValue);
          }}
        >
          <Panel header="Main Data" shaded bordered>
            <Form.Group controlId="boxSheet">
              <Form.ControlLabel>Box Sheet:</Form.ControlLabel>
              <Form.Control
                name="boxSheet"
                accepter={InputPicker}
                data={data.boxSheet}
                // value={initFormValue.boxSheet}
              />
              {/* <Form.HelpText tooltip>
                This is a tooltip description.
              </Form.HelpText> */}
            </Form.Group>
            <Form.Group controlId="ply">
              <Form.ControlLabel>Ply:</Form.ControlLabel>
              <Form.Control
                name="ply"
                accepter={InputPicker}
                data={data.ply}
                // value={initFormValue.boxSheet}
              />
            </Form.Group>
          </Panel>
          <br />
          <Panel header="Dimensions" shaded bordered>
            <Form.Group controlId="length">
              <Form.ControlLabel>Length:</Form.ControlLabel>
              <Form.Control
                name="length"
                accepter={InputNumber}
                postfix="mm"
                // value={initFormValue.boxSheet}
              />
            </Form.Group>
            <Form.Group controlId="width">
              <Form.ControlLabel>Width:</Form.ControlLabel>
              <Form.Control
                name="width"
                accepter={InputNumber}
                postfix="mm"
                // value={initFormValue.boxSheet}
              />
            </Form.Group>
            <Form.Group controlId="height">
              <Form.ControlLabel>Height:</Form.ControlLabel>
              <Form.Control
                name="height"
                accepter={InputNumber}
                postfix="mm"
                // value={initFormValue.boxSheet}
              />
            </Form.Group>

            {/* {formValue.boxSheet}
            {formValue.ply} */}
          </Panel>
          <br />
          <Panel header="GSM" bordered shaded>
            <Form.Group controlId="top">
              <Form.ControlLabel>Top:</Form.ControlLabel>
              <Form.Control
                name="top"
                accepter={InputPicker}
                data={data.paperGSM}
                // value={initFormValue.boxSheet}
              />
            </Form.Group>
            <Form.Group controlId="flute">
              <Form.ControlLabel>Flute:</Form.ControlLabel>
              <Form.Control
                name="flute"
                accepter={InputPicker}
                data={data.paperGSM}
                // value={initFormValue.boxSheet}
              />
            </Form.Group>
            <Form.Group controlId="bottom">
              <Form.ControlLabel>Bottom:</Form.ControlLabel>
              <Form.Control
                name="bottom"
                accepter={InputPicker}
                data={data.paperGSM}
                // value={initFormValue.boxSheet}
              />
            </Form.Group>
          </Panel>
          <br />
          <Panel header="Paper Costing" bordered shaded>
            <Form.Group controlId="topCost">
              <Form.ControlLabel>Top paper cost per KG:</Form.ControlLabel>
              <Form.Control
                name="topCost"
                accepter={InputNumber}
                prefix="Rs."
                // value={initFormValue.boxSheet}
              />
            </Form.Group>
            <Form.Group controlId="fluteCost">
              <Form.ControlLabel>Flute paper cost per KG:</Form.ControlLabel>
              <Form.Control
                name="fluteCost"
                accepter={InputNumber}
                prefix="Rs."
                // value={initFormValue.boxSheet}
              />
            </Form.Group>
            <Form.Group controlId="bottomCost">
              <Form.ControlLabel>Bottom paper cost per KG:</Form.ControlLabel>
              <Form.Control
                name="bottomCost"
                accepter={InputNumber}
                prefix="Rs."
                // value={initFormValue.boxSheet}
              />
            </Form.Group>
            <Form.Group controlId="ConversionRate">
              <Form.ControlLabel>Conversion Cost per Kg:</Form.ControlLabel>
              <Form.Control
                name="ConversionRate"
                accepter={InputNumber}
                prefix="Rs."
                // value={initFormValue.boxSheet}
              />
            </Form.Group>
          </Panel>
          <br />
          <Panel header="More Info" bordered collapsible shaded>
            <Form.Group controlId="FlutePercent">
              <Form.ControlLabel>Flute %:</Form.ControlLabel>
              <Form.Control
                name="FlutePercent"
                accepter={InputNumber}
                postfix="%"
                // value={initFormValue.boxSheet}
              />
            </Form.Group>
            <Form.Group controlId="PrintingCost">
              <Form.ControlLabel>Printing Cost per KG:</Form.ControlLabel>
              <Form.Control
                name="PrintingCost"
                accepter={InputNumber}
                prefix="Rs."

                // value={initFormValue.boxSheet}
              />
            </Form.Group>
            <Form.Group controlId="wastage">
              <Form.ControlLabel>Wastage %:</Form.ControlLabel>
              <Form.Control name="wastage" accepter={InputNumber} postfix="%" />
            </Form.Group>
            <Form.Group controlId="margin1">
              <Form.ControlLabel>Margin SheetCutting:</Form.ControlLabel>
              <Form.Control
                name="margin1"
                accepter={InputNumber}
                postfix="mm"
                // value={initFormValue.boxSheet}
              />
            </Form.Group>
            <Form.Group controlId="margin2">
              <Form.ControlLabel>Margin Decal:</Form.ControlLabel>
              <Form.Control
                name="margin2"
                accepter={InputNumber}
                postfix="mm"

                // value={initFormValue.boxSheet}
              />
            </Form.Group>
          </Panel>
          <br />
          <Panel header="Output" bordered shaded className= 'Output'>
            <Form.Group controlId="weight" appearance>
              <Form.ControlLabel>Weight of Box:</Form.ControlLabel>
              <Form.Control
                name="weight"
                accepter={InputNumber}
                readOnly={true}
                value={(weight / 1000).toFixed(3)}
                postfix="KG"
              />
            </Form.Group>
            <Form.Group controlId="weight">
              <Form.ControlLabel>Cost per Psc:</Form.ControlLabel>
              <Form.Control
                name="weight"
                accepter={InputNumber}
                readOnly={true}
                value={cost}
                prefix="Rs."
              />
            </Form.Group>
          </Panel>
          <br />
          <Panel header="More Output" bordered shaded collapsible>
            <Form.Group controlId="weight">
              <Form.ControlLabel>Rate :</Form.ControlLabel>
              <Form.Control
                name="weight"
                accepter={InputNumber}
                readOnly={true}
                value={(cost / (weight / 1000)).toFixed(2)}
                prefix="Rs."
                postfix="per KG"
              />
            </Form.Group>
            <Form.Group controlId="weight">
              <Form.ControlLabel>Sheet Cutting in mm:</Form.ControlLabel>
              <Form.Control
                name="sheetCutting"
                accepter={InputNumber}
                readOnly={true}
                value={sheetCutting}
              />
            </Form.Group>
            <Form.Group controlId="weight">
              <Form.ControlLabel>Decal size in Inch :</Form.ControlLabel>
              <Form.Control
                name="sheetCutting"
                accepter={InputNumber}
                readOnly={true}
                value={
                  (Number(formValue.width) +
                    Number(formValue.height) +
                    Number(formValue.margin2)) /
                  25.6
                }
              />
            </Form.Group>
          </Panel>
        </Form>
      </div>
    </div>
  );
}
