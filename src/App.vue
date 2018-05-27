<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-list-group
            v-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="selectAll">
              <v-list-tile-content>
                <v-list-tile-title>
                  Select All
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            
            <v-list-tile @click="selectNone">
              <v-list-tile-content>
                <v-list-tile-title>
                  Select None
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click=""
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              
              <v-list-tile-content>
                <v-list-tile-title>
                  <v-checkbox v-model="selected" :label="child.text" color="success" :value="child"></v-checkbox>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>

          <v-list-tile v-else :key="item.text" @click="">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
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
      <v-toolbar-title style="width: 350px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Cross Intermine Search Tool</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down"
        @keyup.enter="searchMine"
        v-model="searchTerm"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
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
      >
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab v-if="this.selected.length == 0" disabled>
          Please select an Intermine
        </v-tab>
        <v-tab
          v-else
          v-for="(selectedMine, i) in this.selected"
          :key="i"
          :href="'#tab-' + i"
        >
          {{ selectedMine.text }}
        </v-tab>
        <v-tabs-items fixed>
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
              No results
            </template>

            <template v-else>
              <v-card>
                <v-container
                  fluid
                  style="min-height: 0;"
                  grid-list-lg
                >
                  <v-layout row wrap>
                    <v-flex xs12 v-for="(mineResults, i) in selectedMine.result.results"
                        :key="i">
                      <v-card
                        color="green lighten-1"
                        hover
                        dark
                        >
                          <v-card-title primary-title>
                            <div class="headline"><strong>ID - {{ mineResults.id }}</strong></div>
                            <v-card-actions>
                              <v-btn icon ripple>
                                <v-icon color="white">info</v-icon>
                              </v-btn>
                            </v-card-actions>
                              <v-card-text>
                                <template v-for="(mineResultsField, key, j) in mineResults.fields">
                                    <span :key="j"><strong> {{ key.toUpperCase() }}</strong> - {{ mineResultsField }}</span><br>
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
      tab: null,
      errors: [],
      searchTerm: '',
      text: '',
      items: [
        { icon: 'history', text: 'Frequently searched' },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Select Intermines',
          model: true,
          children: [
            // { text: 'All' }
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'More',
          model: false,
          children: [
            // { text: 'Import' },
            // { text: 'Export' },
            // { text: 'Print' },
            // { text: 'Undo changes' }
          ]
        },
        { icon: 'settings', text: 'Settings' },
        { icon: 'chat_bubble', text: 'Chat with us' },
        { icon: 'help', text: 'Help' }
      ],
      selected: [],
      result: ''
    }),
    methods: {
      searchMine () {
        let vm = this
        this.selected.map((mineObj) => {
          let mineService = new intermine.Service({root: mineObj.url})
          let options = {
            q: vm.searchTerm
            // size: 50,
            // start: 100
          }
          mineService.search(options).then((data) => {
            console.log(JSON.stringify(data))
            mineObj.result = data
          })
        })
      },
      selectAll () {
        let vm = this
        vm.selected = []
        vm.items[1].children.map((item) => {
          vm.selected.push(item)
        })
      },
      selectNone () {
        this.selected = []
      }
    },
    props: {
      source: String
    },
    created () {
      axios.get(`http://registry.intermine.org/service/instances`)
      .then(response => {
        response.data.instances.map((mine) => {
          this.items[1].children.push({
            text: mine.name,
            url: mine.url
          })
        })
      })
    }
  }
</script>
