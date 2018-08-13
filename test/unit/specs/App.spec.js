import App from '@/App'
let data
describe('App.vue', () => {
  beforeEach(() => {
    data = App.data()
    App.methods.onCreated()
  })

  it('Test some basic data items', () => {
    setTimeout(() => {
      expect(typeof App.data).to.equal('function')
      expect(data.minesList.length).to.not.equal(0)
      expect(data.selectIntermines.children.length).to.not.equal(0)
      expect(data.selectIntermines.children[0]).to.have.all.keys('text', 'url', 'neighbourhood')
    }, 5000)
  })
  it('Test whether searchMine() works', () => {
    setTimeout(() => {
      App.methods.selectAll()
      data.searchTerm = 'brca1'
      App.methods.searchMine()
      setTimeout(() => {
        expect(data.tabModal).to.equal('tab-results')
        expect(data.protocol).to.equal('http')
        data.selected.map((mineObj) => {
          expect(mineObj.result).to.not.equal(undefined)
        })
      }, 5000)
    }, 5000)
  })
})
