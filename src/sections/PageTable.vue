<template>
    <section v-if="!isLoading" class="k-pagetable-section">
        <header class="k-section-header">
            <k-headline :link="options.link">{{ headline }}</k-headline>
            <k-button-group>
                <button v-if="showReset" class="pagetable-reset-button" @click="resetTable" v-html="$t('pagetable.reset')"></button>
                <input v-if="showSearch" class="pagetable-search-input" type="text" v-model="searchTerm" :placeholder="$t('pagetable.filter-pages')">
                <k-button v-if="add" icon="add" @click="action(null, 'create')">{{ $t("add") }}</k-button>
            </k-button-group>
        </header>

        <vue-good-table 
            ref="table"
            :columns="columns" 
            :rows="rows"
            :sort-options="sortOptions"
            :search-options="searchOptions"
            :pagination-options="paginationOptions"
            @on-search="onSearch"
            @on-sort-change="onSortChange"
            @on-page-change="onPageChange"
            @on-per-page-change="onPerPageChange">
            
            <div slot="emptystate" style="text-align: center" v-html="$t('pages.empty')"></div>

            <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'p-cover-image'">
                    <k-link :to="props.row.link">
                        <figure class="k-list-item-image">
                            <k-image v-if="props.row.image && props.row.image.url" :src="props.row.image.url" :back="props.row.image.back || 'pattern'" :cover="props.row.image.cover" />
                            <k-icon v-else v-bind="props.row.icon" />
                        </figure>
                    </k-link>
                </span>
                <span v-else-if="props.column.field == 'p-options'">
                    <div class="k-list-item-options">
                        <slot name="options">
                            <k-button v-if="props.row.flag" 
                                      v-bind="props.row.flag" 
                                      @click="props.row.flag.click"/>
                            <k-button v-if="props.row.options" 
                                      :tooltip="$t('options')" 
                                      icon="dots" 
                                      alt="Options" 
                                      class="k-list-item-toggle" 
                                      @click.stop="openRef('dropdown-'+ props.row.originalIndex)"/>
                            <k-dropdown-content :ref="'dropdown-'+ props.row.originalIndex" 
                                                :options="props.row.options" 
                                                align="right" 
                                                @action="action(props.row, $event)"/>
                        </slot>
                    </div>
                </span>
                <k-link v-else :to="props.row.link" v-html="replaceInvalidDate(props.formattedRow[props.column.field])"/>
            </template>
        </vue-good-table>

        <k-page-create-dialog ref="create" />
        <k-page-rename-dialog ref="rename" @success="update" />
        <k-page-url-dialog ref="url" @success="update" />
        <k-page-status-dialog ref="status" @success="update" />
        <k-page-template-dialog ref="template" @success="update" />
        <k-page-remove-dialog ref="remove" @success="update" />
    </section>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'

export default {
    extends: 'k-pages-section',
    components: { VueGoodTable },
    data(){
        return {
            columns: [],
            rows: [],
            searchTerm: '',
            showReset: false,
            error: null,
            isLoading: false,
            storedState: {
                searchTerm: undefined,
                sort: undefined,
                page: undefined,
            },
            options: {
                empty: null,
                headline: null,
                layout: "list",
                link: null,
                max: null,
                min: null,
                size: null,
                sortable: null,
                limit: 10,
                limitOptions: [],
                search: true,
            },
        }
    },
    props: {
        parent: String,
        blueprint: String,
        name: String,
    },
    computed: {
        searchOptions() {
            return {
                enabled: true,
                externalQuery: this.searchTerm,
            }
        },
        sortOptions() {
            return {
                enabled: true,
                initialSortBy: this.storedState.sort || false,
            }
        },
        storedPerPage() {
            return this.storedState.page ? this.storedState.page.currentPerPage || this.options.limit : this.options.limit
        },
        storedPage() {
            return this.storedState.page ? this.storedState.page.currentPage || false : false
        },
        paginationOptions() {
            return {
                enabled: true,
                perPage: this.storedPerPage,
                setCurrentPage: this.storedPage,
                perPageDropdown: this.options.limitOptions,
                nextLabel: this.$t('next'),
                prevLabel: this.$t('prev'),
                rowsPerPageLabel: this.$t('pagetable.rowsPerPage'),
                ofLabel: this.$t('pagetable.of'),
                allLabel: this.$t('pagetable.all'),
            }
        },
        showSearch() {
            return this.columns.filter(el => el.globalSearchDisabled == false).length > 0 && this.options.search
        },
        storeName() {
            return 'kirby$plugin$pagetable' + this.parent + '-' + this.name
        }
    },
    watch: {
        language() {
            this.reload()
        }
    },
    created() {
        this.load()
        this.loadStoredState()
    },
    methods: {
        replaceInvalidDate(str) {
            return str.replace('Invalid Date', '-')
        },
        load(reload) {
            if (!reload) this.isLoading = true

            this.$api
                .get(this.parent + "/sections/" + this.name)
                .then(response => {
                    this.isLoading = false
                    this.options = response.options
                    this.columns = response.data.columns
                    this.rows    = this.items(response.data.rows)
                })
                .catch(error => {
                    this.isLoading = false
                    this.error = error.message
                })
        },
        openRef(id) {
            this.$refs[id].toggle()
        },
        onSearch(params) {
            this.storeCurrentState()
            this.checkReset()
        },
        onPerPageChange(params) {
            if(this.$refs['table']) {
                this.$refs['table'].changePage(1)
            }
        },
        onPageChange(params) {
            this.storeCurrentState()
            this.checkReset()
        },
        onSortChange(params) {
            this.storeCurrentState()
            this.checkReset()
        },
        checkReset() {
            this.showReset = this.searchTerm.length > 0 ||                                 // if table is searched
                             (this.$refs['table'] && this.$refs['table'].sorts.length) ||  // if table is sorted
                             (this.$refs['table'] && this.$refs['table'].currentPage != 1) // if pages have been browsed
        },
        loadStoredState() {
            let storedState = JSON.parse(sessionStorage.getItem(this.storeName))
            if(storedState !== null) {
                this.storedState = storedState
                if(storedState.searchTerm && storedState.searchTerm.length > 0) {
                    this.searchTerm = storedState.searchTerm
                }
            }
        },
        storeCurrentState() {
            if(this.$refs['table']) {
                let currentState = {}

                currentState.page = {
                    currentPage: this.$refs['table'].currentPage,
                    currentPerPage: this.$refs['table'].currentPerPage,
                }
                if(this.$refs['table'].sorts[0]) {
                    currentState.sort = {
                        field: this.$refs['table'].sorts[0].field,
                        type: this.$refs['table'].sorts[0].type
                    }
                }
                currentState.searchTerm = this.searchTerm

                sessionStorage.setItem(this.storeName, JSON.stringify(currentState))
            }
        },
        resetTable() {
            // reset sorting
            this.$refs['table'].changeSort([])

            // remove sorting classes
            let sorted = document.querySelectorAll('.sorting')
            sorted.forEach(el => {
                if(el.tagName == 'TH') {
                    el.classList.remove('sorting', 'sorting-asc', 'sorting-desc')
                }
            })

            // reset search
            this.searchTerm = ''

            // reset currentPerPage
            this.$refs['table'].currentPerPage = this.options.limit
            this.$refs['table'].perPage        = this.options.limit

            // go to first page
            this.$refs['table'].changePage(1)

            // store current state
            this.storeCurrentState()
        },
    }
};
</script>

<style lang="scss">
    @import '../assets/css/styles.scss'
</style>