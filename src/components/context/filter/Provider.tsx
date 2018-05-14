import { isEqual } from "lodash-es";
// @ts-ignore: module missing defintion file
import memoize from "memoize-one";
import * as React from "react";
import { Filter } from "../../../controllers";
import { Options } from "../../../controllers/filter";
import { UnlistenFn } from "../../../controllers/listener";
import {
  EVENT_OPTIONS_UPDATED,
  EVENT_SELECTION_UPDATED
} from "../../../events";
import { Context, IFilterContext } from "./context";

export interface IFilterProviderProps {
  filter: Filter;
}

export interface IFilterProviderState {
  options: Options;
  selected: string[];
}

export class FilterProvider extends React.PureComponent<
  IFilterProviderProps,
  IFilterProviderState
> {
  public state = { options: {}, selected: [] };
  private unregisterFuntions: UnlistenFn[] = [];

  public componentDidMount() {
    const { filter } = this.props;

    this.unregisterFuntions.push(
      filter.listen(EVENT_OPTIONS_UPDATED, () =>
        this.setState(state => ({ ...state, options: filter.getOptions() }))
      )
    );

    this.unregisterFuntions.push(
      filter.listen(EVENT_SELECTION_UPDATED, () =>
        this.setState(state => ({ ...state, selected: filter.get() }))
      )
    );

    this.setState(state => ({
      ...state,
      options: filter.getOptions(),
      selected: filter.get()
    }));
  }

  public componentWillUnmount() {
    this.unregisterFuntions.forEach(fn => fn());
  }

  public render() {
    const { children } = this.props;
    const value = this.getContext(this.state);
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  private getContext = memoize(
    (state: IFilterProviderState) => ({
      ...state,
      set: (name: string, value: boolean) => this.props.filter.set(name, value)
    }),
    isEqual
  );
}