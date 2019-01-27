import * as React from "react";
import { cleanup, fireEvent, render } from "react-testing-library";

import { Tag, TagProps } from ".";

describe("Tag", () => {
  let getTagEl: any;

  beforeAll(() => {
    getTagEl = (props: TagProps) => (
      <Tag className="some-class-name" {...props} />
    );
  });

  afterEach(cleanup);

  it("renders correctly by default", () => {
    const { container } = render(getTagEl());

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with all props", () => {
    const { container } = render(
      getTagEl({
        isClearable: true,
        onClick: () => {}
      })
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("handles click correctly", () => {
    const { getByTestId, container } = render(
      getTagEl({
        isClearable: true
      })
    );

    expect(container.firstChild).toBeDefined();

    fireEvent.click(getByTestId("icon"));

    expect(container.firstChild).toBe(null);
  });

  it("calls onClick correctly", () => {
    const onClick = jest.fn();

    const { getByTestId } = render(
      getTagEl({
        isClearable: true,
        onClick
      })
    );

    fireEvent.click(getByTestId("icon"));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0].currentTarget).toBeDefined();
  });
});
