import * as React from "react";

type Event = React.MouseEvent<HTMLElement>;

export interface IProps extends React.HTMLAttributes<HTMLElement> {
  className: string;
  isClearable?: boolean;
  onClick?: (event: Event) => void;
}

export interface IDefaultProps {
  isClearable: boolean;
  onClick: (event: Event) => void;
}

type PropsWithDefault = IProps & IDefaultProps;

interface IState {
  isVisible: boolean;
}

export class Tag extends React.Component<IProps, IState> {
  public static defaultProps: IDefaultProps = {
    isClearable: false,
    onClick: () => {}
  };

  public state: IState = {
    isVisible: true
  };

  public handleClick = (event: Event) => {
    this.setState({ isVisible: false }, () =>
      (this.props as PropsWithDefault).onClick(event)
    );
  };

  public render() {
    const {
      children,
      isClearable,
      className,
      onClick,
      ...restProps
    } = this.props;

    const { isVisible } = this.state;

    return isVisible ? (
      <span className={className} {...restProps}>
        <span>{children}</span>
        {isClearable ? (
          <i data-testid="icon" onClick={this.handleClick}>
            x
          </i>
        ) : null}
      </span>
    ) : null;
  }
}
