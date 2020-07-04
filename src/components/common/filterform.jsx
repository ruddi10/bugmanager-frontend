import React, { Component } from "react";
import { Form, Radio, Dropdown, Divider, Button } from "semantic-ui-react";

const countryOptions = [
  { key: "af", value: "af", flag: "af", text: "Afghanistan" },
  { key: "ax", value: "ax", flag: "ax", text: "Aland Islands" },
  { key: "al", value: "al", flag: "al", text: "Albania" },
  { key: "dz", value: "dz", flag: "dz", text: "Algeria" },
  { key: "as", value: "as", flag: "as", text: "American Samoa" },
  { key: "ad", value: "ad", flag: "ad", text: "Andorra" },
  { key: "ao", value: "ao", flag: "ao", text: "Angola" },
  { key: "ai", value: "ai", flag: "ai", text: "Anguilla" },
  { key: "ag", value: "ag", flag: "ag", text: "Antigua" },
  { key: "ar", value: "ar", flag: "ar", text: "Argentina" },
  { key: "am", value: "am", flag: "am", text: "Armenia" },
  { key: "aw", value: "aw", flag: "aw", text: "Aruba" },
  { key: "au", value: "au", flag: "au", text: "Australia" },
  { key: "at", value: "at", flag: "at", text: "Austria" },
  { key: "az", value: "az", flag: "az", text: "Azerbaijan" },
  { key: "bs", value: "bs", flag: "bs", text: "Bahamas" },
  { key: "bh", value: "bh", flag: "bh", text: "Bahrain" },
  { key: "bd", value: "bd", flag: "bd", text: "Bangladesh" },
  { key: "bb", value: "bb", flag: "bb", text: "Barbados" },
  { key: "by", value: "by", flag: "by", text: "Belarus" },
  { key: "be", value: "be", flag: "be", text: "Belgium" },
  { key: "bz", value: "bz", flag: "bz", text: "Belize" },
  { key: "bj", value: "bj", flag: "bj", text: "Benin" },
];
class FilterForm extends Component {
  state = {};
  handleChange = (e, { value }) => this.setState({ value });
  render() {
    const { value } = this.state;
    return (
      <Form className="filterform">
        {" "}
        <Form.Group inline>
          <label>Status</label>
          <Form.Field
            control={Radio}
            label="Pending"
            value="1"
            checked={value === "1"}
            onChange={this.handleChange}
          />
          <Form.Field
            control={Radio}
            label="Deployed"
            value="2"
            checked={value === "2"}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Divider />
        <Form.Field
          control={Dropdown}
          label="Creator"
          placeholder="Select Country"
          fluid
          search
          selection
          options={countryOptions}
        />
        <Divider />
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div style={{ color: "red", fontWeight: "bold", opacity: "0.8" }}>
            Remove All filters
          </div>
          <Form.Field
            control={Button}
            style={{ background: "none", color: "#429DEF" }}
          >
            Apply Filters
          </Form.Field>
        </div>
        {/* <Form.Field>
          <label>Creator</label>
          <Dropdown
            placeholder="Select Country"
            fluid
            search
            selection
            options={countryOptions}
          />
        </Form.Field> */}
      </Form>
    );
  }
}

export default FilterForm;
