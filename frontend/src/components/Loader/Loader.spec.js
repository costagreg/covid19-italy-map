import { render, waitFor } from '@testing-library/react'
import React from 'react'
import Loader from './Loader'
import { act } from 'react-dom/test-utils'

jest.useFakeTimers()

describe('Loader', () => {
  describe('@render', () => {
    it('renders the DataTable without any error', () => {
      const { asFragment } = render(<Loader />)

      expect(asFragment()).toMatchSnapshot()
    })
  })

  describe('@event', () => {
    it('shows loading after X seconds', async () => {
      const { queryByTitle } = render(<Loader delay={10000} />)

      act(() => {
        jest.advanceTimersByTime(1000)
      })

      expect(queryByTitle('Loading')).toBeNull()

      act(() => {
        jest.advanceTimersByTime(10000)
      })

      expect(queryByTitle('Loading')).toBeTruthy()
    })
  })
})
