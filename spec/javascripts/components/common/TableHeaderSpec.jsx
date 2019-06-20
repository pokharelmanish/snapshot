import React from 'react'
import {shallow} from 'enzyme'
import TableHeader from 'common/TableHeader'

const render = ({
  id = '',
  title = '',
  withTooltip = false,
  tooltipContent = [],
} = {}) => shallow(
  <TableHeader
    id={id}
    title={title}
    withTooltip={withTooltip}
    tooltipContent={tooltipContent}
  />
)

const defaultProps = {
  id: 'id',
  withTooltip: true,
}

describe('TableHeader', () => {
  describe('layout', () => {
    it('renders header', () => {
      const component = render({})
      expect(component.find('div.table-header').exists()).toBe(true)
    })

    it('renders header title', () => {
      const component = render({title: 'title'})
      const title = component.find('span.table-header-title')
      expect(title.exists()).toBe(true)
      expect(title.text()).toBe('title')
    })

    describe('tooltip', () => {
      describe('when withTooltip is false', () => {
        let component
        beforeEach(() => {
          component = render({})
        })

        it('does not render an icon', () => {
          expect(component.find('i.fa.fa-info-circle').exists()).toBe(false)
        })

        it('does not render a ReactTooltip', () => {
          expect(component.find('ReactTooltip').exists()).toBe(false)
        })
      })

      describe('when withTooltip is true', () => {
        let component
        beforeEach(() => {
          component = render(defaultProps)
        })

        it('renders an icon', () => {
          const icon = component.find('i.fa.fa-info-circle')
          expect(icon.exists()).toBe(true)
          expect(icon.props()['data-for']).toBe('id')
        })

        it('renders a ReactTooltip', () => {
          const reactTooltip = component.find('ReactTooltip')
          expect(reactTooltip.exists()).toBe(true)
          expect(reactTooltip.props().id).toBe('id')
        })

        it('renders content in the ReactTooltip', () => {
          const tooltipContent = ['first', 'second']
          const props = {...defaultProps, tooltipContent}
          const component = render(props)
          const reactTooltip = component.find('ReactTooltip')
          const contentContainer = reactTooltip.find('span.tooltip-content')
          const content = contentContainer.find('p')
          expect(contentContainer.exists()).toBe(true)
          expect(content.length).toBe(2)
          expect(content.at(0).text()).toBe('first')
          expect(content.at(1).text()).toBe('second')
        })
      })
    })
  })
})
