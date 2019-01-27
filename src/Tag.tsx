import * as React from "react";

type Event = React.MouseEvent<SVGElement | HTMLElement>;

export interface Props extends React.HTMLAttributes<HTMLElement> {
  className: string;
  isClearable?: boolean;
  icon?: React.ReactNode;
  onClick?: (event: Event) => void;
  children: React.ReactNode;
}

export interface DefaultProps {
  isClearable: boolean;
  onClick: (event: Event) => void;
}

type PropsWithDefault = Props & DefaultProps;

interface State {
  isVisible: boolean;
}

export class Tag extends React.Component<Props, State> {
  public static defaultProps: DefaultProps = {
    isClearable: false,
    onClick: () => {}
  };

  public state: State = {
    isVisible: true
  };

  public handleClick = (event: Event) => {
    this.setState({ isVisible: false }, () =>
      (this.props as PropsWithDefault).onClick(event)
    );
  };

  public renderIcon = (): React.ReactElement<any> => {
    const { icon } = this.props;
    const commonIconProps = { onClick: this.handleClick };

    return Boolean(icon) ? (
      React.cloneElement(icon as React.ReactElement<any>, {
        "data-testid": "custom-icon",
        ...commonIconProps
      })
    ) : (
      <i data-testid="default-icon" {...commonIconProps}>
        x
      </i>
    );
  };

  public render() {
    const {
      children,
      icon,
      isClearable,
      className,
      onClick,
      ...restProps
    } = this.props;

    const { isVisible } = this.state;

    return isVisible ? (
      <span className={className} {...restProps}>
        <span>{children}</span>
        {isClearable ? this.renderIcon() : null}
      </span>
    ) : null;
  }
}
