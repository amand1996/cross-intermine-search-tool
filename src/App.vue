<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <template> 
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Home
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-group
            v-model="selectIntermines.model"
            :prepend-icon="selectIntermines.model ? selectIntermines.icon : selectIntermines['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ selectIntermines.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="selectAll">
              <v-list-tile-action>
                <v-icon color="teal">done_all</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Select All
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            
            <v-list-tile @click="selectNone">
              <v-list-tile-action>
                <v-icon color="teal">filter_none</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Select None
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="changeNeighbourhood('MODs')">
              <v-list-tile-action>
                <v-icon color="red">image_search</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Only MODs
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="changeNeighbourhood('Plants')">
              <v-list-tile-action>
                <v-icon color="green">image_search</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Only Plants
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
              v-for="(child, i) in selectIntermines.children"
              :key="i"
              @click=""
            >
              <v-list-tile-action>
              </v-list-tile-action>
              
              <v-list-tile-content>
                <v-list-tile-title>
                  <v-checkbox :ripple="false" v-model="selected" :label="child.text" color="success" :value="child"></v-checkbox>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>

          <v-list-tile v-if="category.length != 0">
            <v-list-tile-action>
              <v-icon>view_list</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Category Filter
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          
          <v-list-tile
            v-if="category.length != 0"
            v-for="(categoryItem, i) in category"
            :key="i"
            @click=""
          >
            <v-list-tile-action>
              <v-icon :style="{ color: selectColor(categoryItem)}">layers</v-icon>
            </v-list-tile-action>
            
            <v-list-tile-content>
              <v-list-tile-title>
                <v-checkbox :ripple="false" v-model="categoryFilters" :label="categoryItem" color="success" :value="categoryItem"></v-checkbox>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-radio-group v-model="scoreFilter" @change="filterResults">
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="yellow">star</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Relevance Score
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  <v-radio :ripple="false" color="orange" label="4+ points" value="4" ></v-radio>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  <v-radio :ripple="false" color="orange" label="3+ points" value="3" ></v-radio>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  <v-radio :ripple="false" color="orange" label="2+ points" value="2" ></v-radio>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  <v-radio :ripple="false" color="orange" label="1+ points" value="1" ></v-radio>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-radio-group>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon>chat_bubble</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Chat with us!
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon>help</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Help
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

        </template>
      </v-list>
    </v-navigation-drawer>

    
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="teal darken-3"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 18em" class="ml-0 pl-3" id="app_title">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Cross Intermine Search Tool</span>
      </v-toolbar-title>
      <v-layout row align-center style="max-width: 650px">
        <v-text-field
          single-line
          hide-details
          flat
          solo-inverted
          prepend-icon="search"
          label="Search"
          @keyup.enter="searchMine"
          v-model="searchTerm"
        ></v-text-field>
      </v-layout>
      <v-spacer></v-spacer>
      <v-btn icon large>
        <v-avatar size="2em" tile>
          <img
            src="@/assets/logo.png"
            alt="IM"
          >
        </v-avatar>
      </v-btn>
    </v-toolbar>

    <template v-if="modalData != null">
      <v-dialog v-model="dialog" max-width="60%" scrollable>
        <v-card>
          <v-card-title class="headline">
            <strong> Type - {{ modalData.type }} | &nbsp;</strong>
            <small>
              Relevance Score &nbsp;
            </small>
            <template v-for="searchPoints in calculateSearchPoints(modalData.relevance)">
              <v-icon small color="red" :key="searchPoints + '_active'">lens</v-icon>
            </template>
            <template v-for="searchPoints in (5 - calculateSearchPoints(modalData.relevance))">
              <v-icon small color="grey lighten-1" :key="searchPoints + '_inactive'">lens</v-icon>
            </template>
          </v-card-title>

          <v-card-text>
            <template v-for="(modalDataField, key, j) in modalData.fields">
              <span :key="j"><strong>{{ key.toUpperCase() }}</strong> - {{ modalDataField }} </span><br>
            </template>
          </v-card-text>
          <v-card-actions>
            <v-btn
              dark
              :ripple="false"
              target="_blank"
              color="green "
              :href="generateReportLink(modalData.id, modalData.url)"
            >
              <v-icon color="white">open_in_new</v-icon> Open Portal
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click.native="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <v-content>
      <v-tabs
        dark
        color="teal darken-1"
        grow
        v-model="tabModal"
      >
        <v-tabs-slider color="yellow"></v-tabs-slider>
        
        <template>
          <v-tab
            :href="'#tab-home'"
            :ripple="false"
            >
            Home
          </v-tab>
          <v-tab
            :href="'#tab-results'"
            :ripple="false"
            v-if="searchActive"
          >
            Results
          </v-tab>
        </template>
        
        <v-tabs-items fixed>
          <v-tab-item
            :id="'tab-home'"
          >
            
            <template>
              <div
                id="e3"
                style="margin: auto;"
                class="grey lighten-3"
              >
                <v-card>
                  <v-container
                    fluid
                    style="min-height: 0;"
                    grid-list-lg
                  >
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-card color="green darken-1" dark raised height="100%">
                          <v-container fluid grid-list-lg>
                            <v-layout row>
                              <v-flex>
                                <v-card-media
                                  src="https://cdn.rawgit.com/intermine/design-materials/f5f00be4/logos/intermine/intermine.png"
                                  height="4em"
                                  contain
                                ></v-card-media>
                                <br>
                                <div>
                                  <h1>Cross Intermine Search Tool</h1><br>
                                  <p style="font-size: larger;">Select the Intermines you are interested in; and type a search keyword or symbol into the searchbar up the top and hit enter.
                                    If you're not sure what Intermines to choose or what to search, check out the results for <span class="example" @click="exampleSearch('adh')">ADH</span>, <span class="example" @click="exampleSearch('brca1')">BRCA1</span> or <span class="example" @click="exampleSearch('gata1')">GATA1</span></p>
                                </div>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </div>
            </template>

          </v-tab-item>
          <v-tab-item
            :id="'tab-results'"
          >

            <template>
              <v-alert v-if="this.protocol === 'https:'" :value="true" type="warning">
                You're currently viewing the HTTPS website. Due to security limitations, we are unable to show results from HTTP-only InterMines. You may be able to see more results if you reload this site via HTTP - [<a style="color: inherit;" :href="`http://${this.host}`">{{ `http://${this.host}` }}</a>].
              </v-alert>
              <v-alert v-if="this.failedSearchMines.length != 0" :value="true" type="error">
                Something went wrong in the following mine(s): <span v-for="errorMine in this.failedSearchMines" :key="errorMine"> {{ errorMine }} /</span>
              </v-alert>
              <v-alert v-if="this.emptyResultMines.length != 0" :value="true" type="info">
                Some mines didn't return results: <span v-for="emptyMine in this.emptyResultMines" :key="emptyMine"> {{ emptyMine }} /</span>
              </v-alert>

              <v-card
                v-for="(selectedMine, i) in this.selected"
                :key="i"
              >
                <v-container
                  fluid
                  style="min-height: 0;"
                  grid-list-lg
                  v-if="emptyResultMines.indexOf(selectedMine.text) < 0 && failedSearchMines.indexOf(selectedMine.text) < 0 && selectedMine.result != undefined"
                >
                  <v-layout row>
                    <v-flex xs12>
                      <v-toolbar color="green darken-1" dark flat>
                          <v-toolbar-title>{{ selectedMine.text }} </v-toolbar-title>
                          <v-spacer></v-spacer>
                          <span v-if="selectedMine.result != undefined && selectedMine.result.totalHits != undefined">
                             <strong>
                               <small>
                                (Total hits : {{ selectedMine.result.totalHits }})
                              </small>
                             </strong>
                          </span>
                      </v-toolbar>
                      <v-card height="300" style="overflow-y: auto;">
                        
                        <v-list three-line subheader>
                          
                          <template v-if="selectedMine.result == undefined">
                            <h3 style="text-align: center;">Loading...</h3>
                          </template>
                          <template v-else-if="filterResults(selectedMine.result.results).length == 0">
                            <h3 style="text-align: center;">No results found.</h3>
                          </template>

                          <template v-else>
                            <v-list-tile
                              v-for="(mineResults, i) in filterResults(selectedMine.result.results)"
                              :key="i"
                              avatar
                              @click="showModal(mineResults, selectedMine.url)"
                              :style="{ color: selectColor(mineResults.type)}"
                            >
                              <v-list-tile-avatar>
                                <strong>{{ i+1 }}</strong>
                              </v-list-tile-avatar>
                              <v-list-tile-content>
                                <v-list-tile-title>
                                  <strong>Type - {{ mineResults.type }} | </strong>
                                  <small><strong>Relevance Score &nbsp;</strong></small>
                                  <template v-for="searchPoints in calculateSearchPoints(mineResults.relevance)">
                                    <v-icon small color="red" :key="searchPoints + '_active'">lens</v-icon>
                                  </template>
                                  <template v-for="searchPoints in (5 - calculateSearchPoints(mineResults.relevance))">
                                    <v-icon small color="grey lighten-1" :key="searchPoints + '_inactive'">lens</v-icon>
                                  </template>
                                </v-list-tile-title>
                                <v-list-tile-sub-title>
                                  <template v-for="(mineResultsField, key, j) in mineResults.fields">
                                    <span :key="j"><strong>| {{ key.toUpperCase() }}</strong> - {{ mineResultsField }} </span>
                                  </template>
                                </v-list-tile-sub-title>
                              </v-list-tile-content>
                              <v-list-tile-action>
                                <v-btn
                                  icon
                                  ripple
                                  target="_blank"
                                  color="orange lighten-2"
                                  @click.stop
                                  :href="generateReportLink(mineResults.id, selectedMine.url)"
                                >
                                  <v-icon color="white">open_in_new</v-icon>
                                </v-btn>
                              </v-list-tile-action>
                            </v-list-tile>
                            <template v-if="selectedMine.result.totalHits != undefined && selectedMine.result.totalHits > 100">
                              <h3 style="text-align: center; cursor: pointer;">
                                Load more
                              </h3>
                            </template>
                          </template>
                        </v-list>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <br>
                </v-container>
              </v-card>
            </template>

          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-content>
  </v-app>
</template>

<script>
  import axios from 'axios'
  import intermine from 'imjs'

  export default {
    data: () => ({
      dialog: false,
      drawer: null,
      tabModal: 'tab-home',
      errors: [],
      searchTerm: '',
      text: '',
      selectIntermines: {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Select Intermines',
        model: true,
        children: []
      },
      filters: {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Filters',
        model: true,
        children: [
          {'text': 'Plants'}
        ]
      },
      scoreFilter: '1',
      selected: [],
      selectedFilters: [],
      category: [],
      categoryFilters: [],
      searchActive: false,
      emptyResultMines: [],
      failedSearchMines: [],
      protocol: document.location.protocol,
      host: document.location.host,
      modalData: null
    }),
    methods: {
      searchMine () {
        let vm = this
        if (vm.searchTerm.trim() === '' || vm.selected.length === 0) {
          return
        }
        vm.failedSearchMines = []
        vm.emptyResultMines = []
        vm.searchActive = true
        vm.tabModal = 'tab-results'
        vm.selectIntermines.model = false
        vm.category = []
        vm.categoryFilters = []
        vm.selected.map((mineObj) => {
          mineObj.result = undefined
          let mineService = new intermine.Service({root: mineObj.url})
          let options = {
            q: vm.searchTerm
            // size: 50,
            // start: 100
          }
          mineService.search(options).then((data) => {
            if (data !== undefined && data.wasSuccessful === true && data.statusCode === 200 && data.error === null) {
              mineObj.result = data
              if (data.results.length === 0) {
                vm.emptyResultMines.push(mineObj.text)
              }
              vm.pushToCategoryList(data.facets.Category)
            } else {
              vm.failedSearchMines.push(mineObj.text)
            }
            vm.$forceUpdate()
          }, (errorText) => {
            console.log(errorText)
            vm.failedSearchMines.push(mineObj.text)
            vm.$forceUpdate()
          })
        })
      },
      selectAll () {
        let vm = this
        vm.selected = []
        vm.selectIntermines.children.map((item) => {
          vm.selected.push(item)
        })
      },
      selectNone () {
        this.selected = []
      },
      calculateSearchPoints (score) {
        return Math.round(Math.max(0.1, Math.min(1, score)) * 5)
      },
      generateReportLink (id, url) {
        return url + '/report.do?id=' + id
      },
      filterResults (data) {
        let vm = this
        if (!Array.isArray(data)) return data
        return data.filter((resultItem) => {
          return (vm.calculateSearchPoints(resultItem.relevance) >= vm.scoreFilter) && (vm.categoryFilters.indexOf(resultItem.type) >= 0)
        })
      },
      selectColor (dataType) {
        switch (dataType) {
          case 'Genes':
          case 'Genomics':
          case 'genes':
          case 'gene':
          case 'homologues':
          case 'Homologue':
          case 'Homology':
          case 'Genome':
          case 'Gene': return '#8BC34A'
          case 'Proteins':
          case 'proteins':
          case 'ProteinDomain':
          case 'Protein': return '#FFC107'
          case 'publications':
          case 'Author':
          case 'Literature':
          case 'Publication': return '#2196F3'
          case 'Organism': return '#E91E63'
          case 'interactions':
          case 'InteractionTerm':
          case 'InteractionExperiment':
          case 'Complex':
          case 'Interactions':
          case 'Interaction': return '#FF5722'
          case 'GOTerm':
          case 'goAnnotation':
          case 'GOAnnotation': return '#9C27B0'
          default: return '#cccccc'
        }
      },
      pushToCategoryList (categoryObj) {
        let vm = this
        let categoryArray = Object.keys(categoryObj)
        categoryArray.forEach((item) => {
          if (vm.category.indexOf(item) < 0) {
            vm.category.push(item)
          }
          if (vm.categoryFilters.indexOf(item) < 0) {
            vm.categoryFilters.push(item)
          }
        })
        vm.category.sort()
      },
      exampleSearch (term) {
        this.searchTerm = term
        this.selectAll()
        this.searchMine()
      },
      changeNeighbourhood (neighbourhood) {
        let vm = this
        vm.selected = []
        vm.selectIntermines.children.map((item) => {
          if (item.neighbourhood.indexOf(neighbourhood) >= 0) {
            vm.selected.push(item)
          }
        })
      },
      showModal (data, url) {
        data.url = url
        this.modalData = data
        this.dialog = true
      }
    },
    props: {
      source: String
    },
    created () {
      axios.get(`https://registry.intermine.org/service/instances`)
      .then(response => {
        response.data.instances.map((mine) => {
          this.selectIntermines.children.push({
            text: mine.name,
            url: mine.url,
            neighbourhood: mine.neighbours
          })
        })
      })
    }
  }
</script>

<style>
  @media screen and (max-width: 600px) {
    #app_title {
      width: 0em;
    }
  }

  .example {
    font-weight: bold;
    font-style: italic;
    cursor: pointer;
    text-decoration: underline;
  }
</style>
