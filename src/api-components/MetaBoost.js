import React from 'react';
import {
  distanceFieldBoost, elementFieldBoost, intervalFieldBoost,
  textFieldBoost, filterFieldBoost,
} from 'sajari';

import Base from './Base.js';
import Components from '../constants/QueryComponentConstants.js';

// TODO(tbillington): Use children of intervalFieldBoost as points

const FieldBoost = props => {
  const { data, namespace, ...others } = props;
  return (
    <Base
      {...others}
      runDefault='all'
      componentName={Components.META_BOOST}
      data={data}
      namespace={namespace}
    />
  );
};

FieldBoost.propTypes = {
  data: React.PropTypes.object,
  namespace: React.PropTypes.string,
};

const FilterFieldBoost = props => {
  const { filter, value, ...others } = props;
  return (
    <FieldBoost
      {...others}
      data={filterFieldBoost(filter, value)}
    />
  );
};

FilterFieldBoost.propTypes = {
  filter: React.PropTypes.object.isRequired,
  value: React.PropTypes.any.isRequired,
};

const DistanceFieldBoost = props => {
  const { field, value, min, max, ref, namespace, ...others } = props;
  return (
    <FieldBoost
      {...others}
      data={distanceFieldBoost(min, max, ref, field, value)}
      namespace={namespace}
    />
  );
};

DistanceFieldBoost.propTypes = {
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
  min: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
  ref: React.PropTypes.number.isRequired,
  namespace: React.PropTypes.string,
};

const ElementFieldBoost = props => {
  const { field, values, namespace, ...others } = props;
  return (
    <FieldBoost
      {...others}
      data={elementFieldBoost(field, values)}
      namespace={namespace}
    />
  );
};

ElementFieldBoost.propTypes = {
  field: React.PropTypes.string.isRequired,
  values: React.PropTypes.string.isRequired,
  namespace: React.PropTypes.string,
};

const IntervalFieldBoost = props => {
  const { field, points, namespace, ...others } = props;
  return (
    <FieldBoost
      {...others}
      data={intervalFieldBoost(field, points)}
      namespace={namespace}
    />
  );
};

IntervalFieldBoost.propTypes = {
  field: React.PropTypes.string.isRequired,
  points: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  namespace: React.PropTypes.string,
};

const TextFieldBoost = props => {
  const { field, text, namespace, ...others } = props;
  return (
    <FieldBoost
      {...others}
      data={textFieldBoost(field, text)}
      namespace={namespace}
    />
  );
};

TextFieldBoost.propTypes = {
  field: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  namespace: React.PropTypes.string,
};

export {
  IntervalFieldBoost, TextFieldBoost, ElementFieldBoost, DistanceFieldBoost,
  FilterFieldBoost, FieldBoost,
};
