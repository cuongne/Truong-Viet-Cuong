import React, { forwardRef, useEffect, useState } from "react";
import { Button, Form, InputNumber, InputPicker, Loader, Schema } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "./App.css";
import ImageTokenGenerate from "./components";
const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  amount: StringType().isRequired("This field is required."),
  price: NumberType()
    .isRequired("This field is required.")
    .isInteger("Please type number."),
  "amount-converted": StringType().isRequired("This field is required."),
});
const TextField = ({ name, label, accepter, ...rest }) => (
  <Form.Group controlId={name}>
    <Form.ControlLabel>{label} </Form.ControlLabel>
    <Form.Control name={name} accepter={accepter} {...rest} />
  </Form.Group>
);

const Field = forwardRef((props, ref) => {
  const { name, message, label, accepter, error, handleChangeInput, ...rest } =
    props;

  const handleChange = (event) => {
    handleChangeInput(event, name);
  };

  return (
    <Form.Group controlId={name} ref={ref} className={error ? "has-error" : ""}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control
        name={name}
        accepter={accepter}
        errorMessage={error}
        onChange={handleChange}
        {...rest}
      />
      <Form.HelpText>{message}</Form.HelpText>
    </Form.Group>
  );
});

function App() {
  const [listCurrency, setListCurrency] = useState([]);
  const [data, setData] = useState([]);
  const [dataConvert, setDataConvert] = useState([]);
  const [valueConverted, setValueConverted] = useState(null);
  const [formValue, setFormValue] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const removeDuplicates = (arr, prop) => {
    const seen = new Set();
    return arr.filter((item) => {
      const key = item[prop];
      return seen.has(key) ? false : seen.add(key);
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://interview.switcheo.com/prices.json"
        );
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }
        const data = await response.json();
        const revertData = removeDuplicates(data, "currency");
        setListCurrency(revertData);
        setData(() =>
          revertData.map((x) => ({
            label: (
              <div className="item-picker">
                <ImageTokenGenerate value={x?.currency} /> {x?.currency}
              </div>
            ),
            value: x?.currency,
          }))
        );
        setDataConvert(() =>
          revertData.map((x) => ({
            label: (
              <div className="item-picker">
                <ImageTokenGenerate value={x?.currency} /> {x?.currency}
              </div>
            ),
            value: x?.currency,
          }))
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChangeInput = (value, name) => {
    if (!value) {
      const newData = listCurrency.map((x) => ({
        label: (
          <div className="item-picker">
            <ImageTokenGenerate value={x?.currency} /> {x?.currency}
          </div>
        ),
        value: x?.currency,
      }));
      setDataConvert(newData);
      setData(newData);
      return;
    }
    if (name === "amount") {
      setDataConvert((prev) => prev.filter((x) => x?.value !== value));
    } else if (name === "amount-converted") {
      setData((prev) => prev.filter((x) => x?.value !== value));
    }
  };
  const toThousands = (value) => {
    return value
      ? `${value}`.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,")
      : value;
  };
  const handleSubmit = (data) => {
    const findAmount = listCurrency.find((x) => x?.currency === data?.amount);
    const findAmountConvert = listCurrency.find(
      (x) => x?.currency === data["amount-converted"]
    );
    const valueConvert =
      (data?.price * findAmount?.price) / findAmountConvert.price;
    setIsLoading(true);
    setTimeout(() => {
      setValueConverted(valueConvert);
      setIsLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    setValueConverted(null);
    setFormValue({
      amount: "",
      "amount-converted": "",
      price: "",
    });
  };

  return (
    <div className="App">
      <header className="header__app">
        <span className="title">Currency Converter</span>
        <span className="text">
          Check live rates, set rate alerts, receive notifications and more.
        </span>
      </header>
      <body>
        <Form
          model={model}
          className="form-custom"
          formValue={formValue}
          onChange={(formValue) => {
            setFormValue(formValue);
            setValueConverted(null);
          }}
          onSubmit={handleSubmit}
        >
          <div className="form-container">
            <div className="flex-item">
              <Field
                name="amount"
                label="Amount"
                accepter={InputPicker}
                handleChangeInput={handleChangeInput}
                style={{ display: "inline-block", width: 120 }}
                data={data}
              />
              <TextField
                name="price"
                accepter={InputNumber}
                formatter={toThousands}
                style={{ width: 120 }}
              />
            </div>
            <div className="flex-item">
              <Field
                name="amount-converted"
                label="Amount Converted"
                accepter={InputPicker}
                handleChangeInput={handleChangeInput}
                // error={formError.status}
                style={{ display: "inline-block", width: 120 }}
                data={dataConvert}
              />
            </div>

            <div className="item-flex">
              <Button appearance="primary" type="submit">
                Swap
              </Button>
              <Button
                appearance="ghost"
                onClick={handleReset}
                color="yellow"
                type="reset"
              >
                Reset
              </Button>
            </div>
            {valueConverted ? (
              <div className="container-rate">
                <span className="value-converted-title">
                  Indicative Exchange Rate
                </span>
                <span className="value-converted">
                  {" "}
                  {formValue?.price} {formValue?.amount} ={" "}
                  {valueConverted.toFixed(3)} {formValue["amount-converted"]}
                </span>
              </div>
            ) : null}
            {isLoading && <Loader content=" Loading..." backdrop />}
          </div>
        </Form>
      </body>
    </div>
  );
}

export default App;
