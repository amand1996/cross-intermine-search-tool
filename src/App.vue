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
                <v-icon>done_all</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Select All
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            
            <v-list-tile @click="selectNone">
              <v-list-tile-action>
                <v-icon>filter_none</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Select None
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
                  <v-checkbox v-model="selected" :label="child.text" color="success" :value="child"></v-checkbox>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>

          <!-- <v-list-group
            v-model="filters.model"
            :prepend-icon="filters.model ? filters.icon : filters['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ filters.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            
          </v-list-group> -->
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
            </v-list-tile-action>
            
            <v-list-tile-content>
              <v-list-tile-title>
                <v-checkbox v-model="categoryFilters" :label="categoryItem" color="success" :value="categoryItem"></v-checkbox>
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
                  <v-radio color="orange" label="4+ stars" value="4" ></v-radio>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  <v-radio color="orange" label="3+ stars" value="3" ></v-radio>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  <v-radio color="orange" label="2+ stars" value="2" ></v-radio>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  <v-radio color="orange" label="1+ stars" value="1" ></v-radio>
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
    <v-content>
      <v-tabs
        dark
        color="teal darken-1"
        show-arrows
        grow
        v-model="tabModal"
      >
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab v-if="this.selected.length == 0" disabled>
          Please select an Intermine
        </v-tab>

        <template v-else>
          <v-tab
            :href="'#tab-all'"
          >
            All Mines
          </v-tab>
          <v-tab
            v-for="(selectedMine, i) in this.selected"
            :key="i"
            :href="'#tab-' + i"
          >
            {{ selectedMine.text }}
          </v-tab>
        </template>
        
        <v-tabs-items fixed>
          <v-tab-item
            :id="'tab-all'"
          >
            <v-card>
              <v-toolbar
               color="teal lighten-1"
               dark
               height=50
              >
                <v-toolbar-title>Search Results for <strong>All Mines</strong></v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
            </v-card>

            <!-- <template v-if="selectedMine.result == undefined">
              No results
            </template> -->

            <template>
              <v-card
                v-for="(selectedMine, i) in this.selected"
                :key="i"
              >
                <v-container
                  fluid
                  style="min-height: 0;"
                  grid-list-lg
                >
                  <v-layout row>
                    <v-flex xs12>
                      <v-toolbar color="green darken-1" dark flat>
                          <v-toolbar-title>{{ selectedMine.text }}</v-toolbar-title>
                          <v-spacer></v-spacer>
                      </v-toolbar>
                      <v-card height="300" style="overflow-y: auto;">
                        
                        <v-list three-line subheader>
                          
                          <template v-if="selectedMine.result == undefined">
                            <h3 style="text-align: center;">Please search using a keyword.</h3>
                          </template>
                          <template v-else-if="filterResults(selectedMine.result.results).length == 0">
                            <h3 style="text-align: center;">No results found.</h3>
                          </template>

                          <template v-else>
                            <v-list-tile v-for="(mineResults, i) in filterResults(selectedMine.result.results)" :key="i" avatar @click="" :color="selectColor(mineResults.type)">
                              <v-list-tile-avatar>
                                <strong>{{ i+1 }}</strong>
                              </v-list-tile-avatar>
                              <v-list-tile-content>
                                <v-list-tile-title>
                                  <strong>Type - {{ mineResults.type }} | </strong>
                                  <small>Relevance Score </small>
                                  <template v-for="searchPoints in calculateSearchPoints(mineResults.relevance)">
                                    <v-icon color="yellow" :key="searchPoints + '_active'">star</v-icon>
                                  </template>
                                  <template v-for="searchPoints in (5 - calculateSearchPoints(mineResults.relevance))">
                                    <v-icon color="white" :key="searchPoints + '_inactive'">star</v-icon>
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
                                  :href="generateReportLink(mineResults.id, selectedMine.url)"
                                >
                                  <v-icon color="white">open_in_new</v-icon>
                                </v-btn>
                              </v-list-tile-action>
                            </v-list-tile>
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

          <v-tab-item
            v-for="(selectedMine, i) in this.selected"
            :key="i"
            :id="'tab-' + i"
          >
            <v-card>
              <v-toolbar
               color="teal lighten-1"
               dark
               height=50
              >
                <v-toolbar-title>Search Results for <strong>{{ selectedMine.text }}</strong></v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
            </v-card>

            <template v-if="selectedMine.result == undefined">
              <h3 style="text-align: center;">Please search using a keyword.</h3>
            </template>
            <template v-else-if="filterResults(selectedMine.result.results).length == 0">
              <h3 style="text-align: center;">No results found.</h3>
            </template>

            <template v-else>
              <v-card>
                <v-container
                  fluid
                  style="min-height: 0;"
                  grid-list-lg
                >
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-card
                        color="blue-grey lighten-3"
                        dark
                        flat
                        >
                          <v-card-title primary-title>
                            <v-icon color="white">info</v-icon>
                            <v-card-text>
                              <strong style="text-decoration: underline;">CATEGORY - </strong>
                              <p><template v-for="(item, key, j) in selectedMine.result.facets.Category">
                                  <span :key="j" style="font-style: italic;"> <strong> {{ key }}</strong> - {{ item }} |</span>
                              </template></p>
                              <strong style="text-decoration: underline;">ORGANISM.SHORTNAME - </strong>
                              <p><template v-for="(item, key, j) in selectedMine.result.facets['organism.shortName']">
                                  <span :key="j" style="font-style: italic;"> <strong> {{ key }}</strong> - {{ item }} |</span>
                              </template></p>
                            </v-card-text>
                            <small>*This info is for unfiltered results of the searched keyword.</small>
                          </v-card-title>
                        </v-card>
                    </v-flex>

                    <v-flex xs12 v-for="(mineResults, i) in filterResults(selectedMine.result.results)"
                        :key="i">
                      <v-card
                        :color="selectColor(mineResults.type)"
                        hover
                        dark
                        >
                          <v-card-title primary-title>
                            <v-btn
                              icon
                              ripple
                              target="_blank"
                              :href="generateReportLink(mineResults.id, selectedMine.url)"
                            >
                              <v-icon color="white">open_in_new</v-icon>
                            </v-btn>
                            <div class="headline"><strong>Type - {{ mineResults.type }}</strong> | </div>
                            <v-card-actions>
                              <small>Relevance Score </small>
                              <template v-for="searchPoints in calculateSearchPoints(mineResults.relevance)">
                                <v-icon color="yellow" :key="searchPoints + '_active'">star</v-icon>
                              </template>
                              <template v-for="searchPoints in (5 - calculateSearchPoints(mineResults.relevance))">
                                <v-icon color="white" :key="searchPoints + '_inactive'">star</v-icon>
                              </template>
                            </v-card-actions>
                            <v-card-text>
                              <template v-for="(mineResultsField, key, j) in mineResults.fields">
                                  <span :key="j">|<strong> {{ key.toUpperCase() }}</strong> - {{ mineResultsField }} </span>
                              </template>
                            </v-card-text>
                          </v-card-title>
                        </v-card>
                    </v-flex>
                  </v-layout>
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
      tabModal: null,
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
      categoryFilters: []
    }),
    methods: {
      searchMine () {
        let vm = this
        vm.tabModal = 'tab-all'
        vm.selectIntermines.model = false
        vm.category = []
        vm.categoryFilters = []
        vm.selected.map((mineObj) => {
          let mineService = new intermine.Service({root: mineObj.url})
          let options = {
            q: vm.searchTerm
            // size: 50,
            // start: 100
          }
          mineService.search(options).then((data) => {
            mineObj.result = data
            vm.pushToCategoryList(data.facets.Category)
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
          case 'Gene': return 'green lighten-1'
          case 'Protein': return 'amber lighten-1'
          case 'ProteinDomain': return 'red lighten-1'
          case 'OntologyTerm': return 'indigo lighten-1'
          case 'Publication': return 'cyan lighten-1'
          case 'Organism': return 'pink lighten-1'
          case 'Interaction': return 'orange lighten-1'
          case 'GOTerm': return 'deep-purple lighten-1'
          default: return 'blue-grey lighten-1'
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
            url: mine.url
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
</style>
