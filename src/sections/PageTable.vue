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
            :search-options="searchOptions"
            :pagination-options="paginationOptions"
            @on-search="checkReset"
            @on-sort-change="checkReset"
            @on-page-change="checkReset">
            
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
                <k-link v-else :to="props.row.link" v-html="replaceInvalidDate(props.formattedRow[props.column.field])" @click="log(props)"/>
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
        paginationOptions() {
            return {
                enabled: true,
                perPage: this.options.limit,
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
    },
    watch: {
        language() {
            this.reload()
        }
    },
    created() {
        this.load()
    },
    methods: {
        log(props) {
            console.log(props)
        },
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
        checkReset() {
            this.showReset = this.searchTerm.length > 0 ||                                 // if table is searched
                             (this.$refs['table'] && this.$refs['table'].sorts.length) ||  // if table is sorted
                             (this.$refs['table'] && this.$refs['table'].currentPage != 1) // if pages have been browsed
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

            // go to first page
            this.$refs['table'].changePage(1)
        },
    }
};
</script>

<style lang="scss">
    @import '../assets/css/styles.scss'
</style>