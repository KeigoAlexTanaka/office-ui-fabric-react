import * as React from 'react';
import './CalloutExample.scss';
import {
  Callout,
  Button,
  DirectionalHint,
  Checkbox,
  TextField,
  Dropdown,
  IDropdownOption
} from '../../../../components/index';

export interface ICalloutDirectionalExampleState {
  isCalloutVisible?: boolean;
  directionalHint?: DirectionalHint;
  isBeakVisible?: boolean;
  gapSpace?: number;
}

const DIRECTION_OPTIONS = [
  { key: DirectionalHint[DirectionalHint.topLeftEdge], text: 'Top Left Edge' },
  { key: DirectionalHint[DirectionalHint.topCenter], text: 'Top Center' },
  { key: DirectionalHint[DirectionalHint.topRightEdge], text: 'Top Right Edge' },
  { key: DirectionalHint[DirectionalHint.topAutoEdge], text: 'Top Auto Edge' },
  { key: DirectionalHint[DirectionalHint.bottomLeftEdge], text: 'Bottom Left Edge' },
  { key: DirectionalHint[DirectionalHint.bottomCenter], text: 'Bottom Center' },
  { key: DirectionalHint[DirectionalHint.bottomRightEdge], text: 'Bottom Right Edge' },
  { key: DirectionalHint[DirectionalHint.bottomAutoEdge], text: 'Bottom Auto Edge' },
  { key: DirectionalHint[DirectionalHint.leftTopEdge], text: 'Left Top Edge' },
  { key: DirectionalHint[DirectionalHint.leftCenter], text: 'Left Center' },
  { key: DirectionalHint[DirectionalHint.leftBottomEdge], text: 'Left Bottom Edge' },
  { key: DirectionalHint[DirectionalHint.rightTopEdge], text: 'Right Top Edge' },
  { key: DirectionalHint[DirectionalHint.rightCenter], text: 'Right Center' },
  { key: DirectionalHint[DirectionalHint.rightBottomEdge], text: 'Right Bottom Edge' },
];

export default class CalloutDirectionalExample extends React.Component<any, ICalloutDirectionalExampleState> {
  private _menuButtonElement: HTMLElement;
  private _gapSize: TextField;

  public constructor() {
    super();

    this._onShowMenuClicked = this._onShowMenuClicked.bind(this);
    this._onShowBeakChanged = this._onShowBeakChanged.bind(this);
    this._onDirectionalChanged = this._onDirectionalChanged.bind(this);
    this._onChangeGapSizeClicked = this._onChangeGapSizeClicked.bind(this);

    this.state = {
      isCalloutVisible: false,
      isBeakVisible: true,
      directionalHint: DirectionalHint.bottomLeftEdge,
      gapSpace: 10
    };
  }

  public render() {
    let { isCalloutVisible, isBeakVisible, directionalHint, gapSpace } = this.state;
    // ms-Callout-smallbeak is used in this directional example to reflect all the positions. Large beak will disable some position to avoid beak over the callout edge.
    return (
      <div className='ms-CalloutBasicExample'>
         <div className='ms-CalloutExample-configArea'>
          <Checkbox text='Show beak' isChecked={ isBeakVisible } onChanged={ this._onShowBeakChanged } />
          <TextField ref={ (gapSize) => this._gapSize = gapSize } label='Gap Space' placeholder='Type in the gap space' />
          <Button onClick={ this._onChangeGapSizeClicked }>Submit</Button>
          <Dropdown
            label='Directional hint'
            selectedKey={ DirectionalHint[directionalHint] }
            options={ DIRECTION_OPTIONS }
            onChanged={ this._onDirectionalChanged } />
        </div>
        <div className='ms-CalloutExample-buttonArea' ref={ (menuButton) => this._menuButtonElement = menuButton }>
          <Button onClick={ this._onShowMenuClicked } >{ isCalloutVisible ? 'Hide callout' : 'Show callout' }</Button>
        </div>
        { isCalloutVisible ? (
        <Callout
          gapSpace={ gapSpace }
          targetElement={ this._menuButtonElement }
          isBeakVisible={ isBeakVisible }
          directionalHint={ directionalHint }
          beakStyle={ 'ms-Callout-smallbeak' }
          beakWidth={ 16 }
          title='All of your favorite people'
          subText='Message body is optional. If help documentation is available, consider adding a link to learn more at the bottom.'
        />
        ) : (null) }
      </div>
    );
  }

  private _onShowMenuClicked() {
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible
    });
  }

  private _onShowBeakChanged(isVisible: boolean) {
    this.setState({
      isBeakVisible: isVisible
    });
  }

  private _onDirectionalChanged(option: IDropdownOption) {
    this.setState({
      directionalHint: DirectionalHint[option.key]
    });
  }

  private _onChangeGapSizeClicked() {
    this.setState({
      gapSpace: parseInt(this._gapSize.state.value, 10)
    });
  }
}