import React from "react";
import { render, shallow } from "enzyme";
import assert from "power-assert";
import toJson from "enzyme-to-json";
import Collapse from "../index";

describe("<Collapse/>", () => {
  it("should render Collapse", () => {
    const wrapper = render(
      <Collapse>
        <Collapse.Item title="标题1">内容1</Collapse.Item>
        <Collapse.Item title="标题2">内容2</Collapse.Item>
      </Collapse>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should find cuke-collapse class name", () => {
    const wrapper = shallow(
      <Collapse>
        <Collapse.Item title="标题1">内容1</Collapse.Item>
        <Collapse.Item title="标题2">内容2</Collapse.Item>
      </Collapse>
    );
    assert(wrapper.find(".cuke-collapse").length === 1);
  });

  it("should render Collapse.Item", () => {
    const wrapper = shallow(
      <Collapse>
        <Collapse.Item title="标题1">内容1</Collapse.Item>
        <Collapse.Item title="标题2">内容2</Collapse.Item>
      </Collapse>
    );
    assert(wrapper.find(Collapse.Item).length === 2);
  });

  it("should render default active key", () => {
    const wrapper = render(
      <Collapse defaultActiveKey={[0, 1]}>
        <Collapse.Item title="标题1">内容1</Collapse.Item>
        <Collapse.Item title="标题2">内容2</Collapse.Item>
      </Collapse>
    );
    assert(wrapper.find(".cuke-collapse-item-arrow-active").length === 2);
  });

  it("should render default active key with string", () => {
    const wrapper = render(
      <Collapse defaultActiveKey={["0", "1"]}>
        <Collapse.Item title="标题1">内容1</Collapse.Item>
        <Collapse.Item title="标题2">内容2</Collapse.Item>
      </Collapse>
    );
    assert(wrapper.find(".cuke-collapse-item-arrow-active").length === 2);
  });

  it("should render active key", () => {
    const wrapper = render(
      <Collapse defaultActiveKey={["1"]}>
        <Collapse.Item title="标题1">内容1</Collapse.Item>
        <Collapse.Item title="标题2">内容2</Collapse.Item>
      </Collapse>
    );
    assert(wrapper.find(".cuke-collapse-item-arrow-active").length === 1);
  });

  it("should render hide arrow for collapseItem", () => {
    const wrapper = render(
      <Collapse>
        <Collapse.Item title="标题1" hideArrow>
          内容1
        </Collapse.Item>
        <Collapse.Item title="标题2">内容2</Collapse.Item>
      </Collapse>
    );
    assert(wrapper.find(".cuke-collapse-item-arrow").length === 1);
  });

  it("should render hide arrow for collapse", () => {
    const wrapper = render(
      <Collapse hideArrow>
        <Collapse.Item title="标题1">内容1</Collapse.Item>
        <Collapse.Item title="标题2">内容2</Collapse.Item>
      </Collapse>
    );
    assert(wrapper.find(".cuke-collapse-item-arrow").length === 0);
  });

  it("should disabled for collapse", () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Collapse disabled onChange={onChange}>
        <Collapse.Item title="标题1">内容1</Collapse.Item>
        <Collapse.Item title="标题2">内容2</Collapse.Item>
      </Collapse>
    );
    wrapper.find(".cuke-collapse").simulate("click");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("should trigger onChange event", () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Collapse onChange={onChange}>
        <Collapse.Item title="标题1">内容1</Collapse.Item>
        <Collapse.Item title="标题2">内容2</Collapse.Item>
      </Collapse>
    );
    setTimeout(() => {
      wrapper
        .find(".cuke-collapse-item-header")
        .at(0)
        .simulate("click");
      expect(onChange).toHaveBeenCalled();
    });
  });

  it("should trigger onChange event", () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Collapse>
        <Collapse.Item title="标题1">内容1</Collapse.Item>
        <Collapse.Item title="标题2">内容2</Collapse.Item>
      </Collapse>
    );
    const collapse = new Collapse({
      onChange
    });
    collapse.onChange("");
    expect(wrapper.state().currentActiveKey).toEqual("");
  });

  it("should accordion mode", () => {
    const wrapper = shallow(
      <Collapse accordion>
        <Collapse.Item title="标题1">内容1</Collapse.Item>
        <Collapse.Item title="标题2">内容2</Collapse.Item>
      </Collapse>
    );
    wrapper.setProps({
      accordion: true
    });
    wrapper.find(".cuke-collapse").simulate("click");
    assert(wrapper.find(".cuke-collapse-accordion").length === 1);
  });

  it("should accordion mode", () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Collapse.Item title="标题2" onChange={onChange} accordion>
        内容2
      </Collapse.Item>
    );
    wrapper.find(".cuke-collapse-item-header").simulate("click");
    expect(onChange).toHaveBeenCalled();
  });

  it("should render right arrow mode", () => {
    const wrapper = render(
      <Collapse rightArrow>
        <Collapse.Item title="标题1">内容1</Collapse.Item>
        <Collapse.Item title="标题2">内容2</Collapse.Item>
      </Collapse>
    );
    expect(wrapper.find(".cuke-collapse-item-right-arrow").length).toBe(2);
  });

  it("should cannot find right arrow", () => {
    const wrapper = render(
      <Collapse>
        <Collapse.Item title="标题1">内容1</Collapse.Item>
        <Collapse.Item title="标题2">内容2</Collapse.Item>
      </Collapse>
    );
    expect(wrapper.find(".cuke-collapse-item-right-arrow").length).toBe(0);
  });
});
