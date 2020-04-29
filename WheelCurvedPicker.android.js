'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {
	View,
	ColorPropType,
	requireNativeComponent,
} from 'react-native';

const defaultItemStyle = { color: 'white', fontSize: 26 };

const WheelCurvedPickerNativeInterface = {
	name: 'WheelCurvedPicker',
	propTypes: {
		...View.propTypes,
		data: PropTypes.array,
		textColor: ColorPropType,
		textSize: PropTypes.number,
		itemStyle: PropTypes.object,
		itemSpace: PropTypes.number,
		onValueChange: PropTypes.func,
		selectedValue: PropTypes.any,
		selectedIndex: PropTypes.number,
	}
}

const WheelCurvedPickerNative = requireNativeComponent('WheelPicker', null);

class WheelCurvedPicker extends React.Component {

	constructor(props) {
		super(props)
		this.state = this._stateFromProps(props)
	}

	static defaultProps = {
		itemStyle: { color: "white", fontSize: 26 },
		itemSpace: 20
	}

	componentWillReceiveProps(props) {
		this.setState(this._stateFromProps(props));
	}

	_stateFromProps(props) {
		var selectedIndex = 0;
		var items = [];
		React.Children.forEach(props.children, function (child, index) {
			if (child.props.value === props.selectedValue) {
				selectedIndex = index;
			}
			items.push({ value: child.props.value, label: child.props.label });
		});

		var textSize = props.itemStyle.fontSize
		var textColor = props.itemStyle.color

		return { selectedIndex, items, textSize, textColor };
	}

	_onValueChange = (e) => {
		if (this.props.onValueChange) {
			const { data, position } = e.nativeEvent;
			this.props.onValueChange(data, position);
		}
	}

	render() {
		const { itemStyle } = this.props;
		const textSize = itemStyle.fontSize || 26;
		const textColor = itemStyle.textColor || 'white';
		return <WheelCurvedPickerNative
			{...this.props}
			data={this.state.items.map(item => item.label)}
			itemTextColor={textColor}
			itemTextSize={textSize}
			onChange={this._onValueChange}
			isCurved
			isCyclic
			visibleItemCount={5}
			selectedItemPosition={parseInt(this.state.selectedIndex)} />;
	}
}

class Item extends React.Component {

	render() {
		// These items don't get rendered directly.
		return null;
	}
}

WheelCurvedPicker.Item = Item;

module.exports = WheelCurvedPicker;
