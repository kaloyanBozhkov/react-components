import { arrFromXToY, createPaginationLogic } from '../Pagination'

describe('testing functions used to generate pagination buttons', () => {
  it('should return array with items from expected startn and finish', () => {
    const arr = arrFromXToY(1, 5)
    expect(arr).toEqual([1, 2, 3, 4, 5])

    const arr2 = arrFromXToY(5, 10)
    expect(arr2).toEqual([5, 6, 7, 8, 9, 10])
  })

  it('should return created pagination array of numbers for total page number less than 6', () => {
    const paginationConfig = {
      currentPageNumber: 1,
      endPageNumber: 5,
      numbersVisibleLeft: 2,
      numbersVisibleRight: 2,
    }
    const paginationLogic = createPaginationLogic(
      paginationConfig.currentPageNumber,
      paginationConfig.endPageNumber,
      paginationConfig.numbersVisibleLeft,
      paginationConfig.numbersVisibleRight
    )

    expect(paginationLogic).toEqual([1, 2, 3, 4, 5])
  })

  it('should return created pagination array of numbers for total page number of 10', () => {
    const paginationConfig = {
      currentPageNumber: 5,
      endPageNumber: 10,
      numbersVisibleLeft: 2,
      numbersVisibleRight: 2,
    }
    const paginationLogic = createPaginationLogic(
      paginationConfig.currentPageNumber,
      paginationConfig.endPageNumber,
      paginationConfig.numbersVisibleLeft,
      paginationConfig.numbersVisibleRight
    )

    expect(paginationLogic).toEqual([1, '...', 3, 4, 5, 6, 7, '...', 10])
  })

  it('should return created pagination array of numbers for total page number of 10 with 1 number before and 1 after 5', () => {
    const paginationConfig = {
      currentPageNumber: 5,
      endPageNumber: 10,
      numbersVisibleLeft: 1,
      numbersVisibleRight: 1,
    }
    const paginationLogic = createPaginationLogic(
      paginationConfig.currentPageNumber,
      paginationConfig.endPageNumber,
      paginationConfig.numbersVisibleLeft,
      paginationConfig.numbersVisibleRight
    )

    expect(paginationLogic).toEqual([1, '...', 4, 5, 6, '...', 10])
  })

  it('should return created pagination array of numbers for total page number of 10 and 3 numbers left of 6, and 2 right of 6', () => {
    const paginationConfig = {
      currentPageNumber: 6,
      endPageNumber: 10,
      numbersVisibleLeft: 3,
      numbersVisibleRight: 2,
    }
    const paginationLogic = createPaginationLogic(
      paginationConfig.currentPageNumber,
      paginationConfig.endPageNumber,
      paginationConfig.numbersVisibleLeft,
      paginationConfig.numbersVisibleRight
    )

    expect(paginationLogic).toEqual([1, '...', 3, 4, 5, 6, 7, 8, '...', 10])
  })

  it('should return created pagination array of numbers for total page number of 10 with 4 numbers between 10 and dots', () => {
    const paginationConfig = {
      currentPageNumber: 10,
      endPageNumber: 10,
      numbersVisibleLeft: 2,
      numbersVisibleRight: 2,
    }
    const paginationLogic = createPaginationLogic(
      paginationConfig.currentPageNumber,
      paginationConfig.endPageNumber,
      paginationConfig.numbersVisibleLeft,
      paginationConfig.numbersVisibleRight
    )

    expect(paginationLogic).toEqual([1, '...', 6, 7, 8, 9, 10])
  })

  it('should return created pagination array of numbers for total page number of 10 with no numbers between', () => {
    const paginationConfig = {
      currentPageNumber: 10,
      endPageNumber: 10,
      numbersVisibleLeft: 0,
      numbersVisibleRight: 0,
    }
    const paginationLogic = createPaginationLogic(
      paginationConfig.currentPageNumber,
      paginationConfig.endPageNumber,
      paginationConfig.numbersVisibleLeft,
      paginationConfig.numbersVisibleRight
    )

    expect(paginationLogic).toEqual([1, '...', 10])
  })
})
