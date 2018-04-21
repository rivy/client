// @flow
import React from 'react'
import MentionHud from '.'
import {Box, Button, ButtonBar, ClickableBox, Input, Text} from '../../../../common-adapters'
import {storiesOf} from '../../../../stories/storybook'
import {globalMargins, globalStyles} from '../../../../styles'

const Row = (props: {index: number, selected: boolean, data: string, onClick: () => void}) => (
  <ClickableBox
    onClick={props.onClick}
    style={{
      paddingLeft: globalMargins.tiny,
      backgroundColor: props.selected ? 'grey' : 'white',
    }}
  >
    <Text type="Body">
      {props.index}: {props.data}
    </Text>
  </ClickableBox>
)

type State = {
  filter: string,
  selectedIndex: number,
}

class MentionHudContainer extends React.Component<{}, State> {
  constructor(props) {
    super(props)
    this.state = {filter: '', selectedIndex: 0}
  }

  _selectUp = () => {
    this.setState(({selectedIndex}) => ({selectedIndex: selectedIndex - 1}))
  }

  _selectDown = () => {
    this.setState(({selectedIndex}) => ({selectedIndex: selectedIndex + 1}))
  }

  _setFilter = (filter: string) => {
    this.setState({filter})
  }

  _onRowClick = (index: number) => {
    this.setState({selectedIndex: index})
  }

  render() {
    return (
      <Box style={{...globalStyles.flexBoxColumn, height: 400, width: 240}}>
        <MentionHud
          rowPropsList={['some data', 'some other data', 'third data']}
          filter={this.state.filter}
          rowFilterer={(data, filter) => data.indexOf(filter) >= 0}
          rowRenderer={(index, selected, data) => (
            <Row
              key={index}
              index={index}
              selected={selected}
              onClick={() => this._onRowClick(index)}
              data={data}
            />
          )}
          selectedIndex={this.state.selectedIndex}
          style={{backgroundColor: 'lightgrey'}}
        />
        <ButtonBar>
          <Button label="Up" type="Primary" onClick={this._selectUp} />
          <Button label="Down" type="Primary" onClick={this._selectDown} />
        </ButtonBar>
        <Input onChangeText={this._setFilter} hintText="Filter" />
      </Box>
    )
  }
}

const load = () => {
  storiesOf('Chat/Mention Hud', module).add('Basic', () => <MentionHudContainer />)
}

export default load