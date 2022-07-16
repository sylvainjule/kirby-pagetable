<template>
    <section class="k-pagetable-section">
        <header class="k-section-header">
            <k-headline :link="options.link">
                <span v-if="isLoading">…</span>
                <span v-else>{{ options.headline }}</span>
            </k-headline>
            <k-button-group>
                <button
                    v-if="showReset"
                    class="pagetable-reset-button"
                    @click="resetTable"
                    v-html="translations.reset"
                ></button>
                <input
                    v-if="showSearch"
                    class="pagetable-search-input"
                    type="text"
                    v-model="searchTerm"
                    :placeholder="translations.filter"
                />
                <k-button v-if="canAdd" icon="add" @click="onAdd">{{
                    $t("add")
                }}</k-button>
            </k-button-group>
        </header>

        <vue-good-table
            v-if="rows.length && !isLoading"
            ref="table"
            :columns="columns"
            :rows="rows"
            :sort-options="sortOptions"
            :search-options="searchOptions"
            :pagination-options="paginationOptions"
            @on-search="onSearch"
            @on-sort-change="onSortChange"
            @on-page-change="onPageChange"
            @on-per-page-change="onPerPageChange"
        >
            <template slot="table-row" slot-scope="props">
                <span
                    v-if="
                        props.column.field == 'p-cover-image' &&
                        options.showImage
                    "
                >
                    <k-link :to="props.row.rowLink">
                        <k-item-image
                            v-if="props.row.image"
                            :image="props.row.image"
                        />
                    </k-link>
                </span>
                <span
                    v-else-if="props.column.field == 'p-options' && showOptions"
                >
                    <div class="k-list-item-options">
                        <slot name="options">
                            <k-status-icon
                                v-if="props.row.flag && options.showStatus"
                                v-bind="props.row.flag"
                            />
                            <k-options-dropdown
                                v-if="props.row.options && options.showActions"
                                :options="props.row.options"
                                class="k-item-options-dropdown"
                            />
                        </slot>
                    </div>
                </span>
                <k-link
                    v-else
                    :to="props.row.rowLink"
                    v-html="props.formattedRow[props.column.field]"
                />
            </template>
        </vue-good-table>

        <template v-else-if="!rows.length && !isLoading">
            <k-empty
                :layout="options.layout"
                :data-invalid="isInvalid"
                icon="page"
                @click="onAdd"
            >
                {{ translations.empty }}
            </k-empty>

            <footer class="k-collection-footer">
                <k-text
                    v-if="help"
                    theme="help"
                    class="k-collection-help"
                    v-html="help"
                />
            </footer>
        </template>

        <div class="loading" v-else-if="isLoading">
            <k-empty :layout="options.layout" icon="pagetableLoader">
                {{ translations.loading }}
            </k-empty>
        </div>
    </section>
</template>

<script>
import { VueGoodTable } from "vue-good-table";

export default {
    extends: "k-pages-section",
    components: { VueGoodTable },
    data() {
        return {
            columns: [],
            rows: [],
            searchTerm: "",
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
                showImage: true,
                showStatus: true,
                showActions: true,
            },
            translations: {
                rowsPerPage: this.$t("pagetable.rowsPerPage"),
                of: this.$t("pagetable.of"),
                all: this.$t("pagetable.all"),
                empty: this.$t("pages.empty"),
                filter: this.$t("pagetable.filter-pages"),
                reset: this.$t("pagetable.reset"),
                loading: this.$t("pagetable.loading"),
            },
        };
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
            };
        },
        sortOptions() {
            return {
                enabled: true,
                initialSortBy: this.storedState.sort || false,
            };
        },
        storedPerPage() {
            return this.storedState.page
                ? this.storedState.page.currentPerPage || this.options.limit
                : this.options.limit;
        },
        storedPage() {
            return this.storedState.page
                ? this.storedState.page.currentPage || false
                : false;
        },
        paginationOptions() {
            return {
                enabled: true,
                perPage: this.storedPerPage,
                setCurrentPage: this.storedPage,
                perPageDropdown: this.options.limitOptions,
                nextLabel: this.$t("next"),
                prevLabel: this.$t("prev"),
                rowsPerPageLabel: this.translations.rowsPerPage,
                ofLabel: this.$t("pagetable.of"),
                allLabel: this.translations.all,
            };
        },
        showSearch() {
            return (
                this.columns.filter((el) => el.globalSearchDisabled == false)
                    .length > 0 &&
                this.options.search &&
                this.rows.length
            );
        },
        storeName() {
            return "kirby$plugin$pagetable" + this.parent + "-" + this.name;
        },
        showOptions() {
            return this.options.showStatus || this.options.showActions;
        },
    },
    watch: {
        language() {
            this.reload();
        },
    },
    created() {
        this.load();
        this.loadStoredState();
    },
    methods: {
        load(reload) {
            if (!reload) this.isLoading = true;
            this.$api
                .get(this.parent + "/sections/" + this.name)
                .then((response) => {
                    this.isLoading = false;
                    this.options = response.options;
                    this.columns = response.data.columns;
                    this.data = response.data.rows;
                    this.rows = this.items;

                    // replace default translations if needed
                    let translations = response.translations;
                    Object.keys(translations).forEach((k) => {
                        if (translations[k] == null) delete translations[k];
                    });
                    this.translations = Object.assign(
                        {},
                        this.translations,
                        translations
                    );
                })
                .catch((error) => {
                    this.isLoading = false;
                    this.error = error.message;
                });
        },
        openRef(id) {
            this.$refs[id].toggle();
        },
        onSearch(params) {
            this.storeCurrentState();
            this.checkReset();
        },
        onPerPageChange(params) {
            if (this.$refs["table"]) {
                this.$refs["table"].changePage(1);
            }
        },
        onPageChange(params) {
            this.storeCurrentState();
            this.checkReset();
        },
        onSortChange(params) {
            this.storeCurrentState();
            this.checkReset();
        },
        checkReset() {
            this.showReset =
                this.rows.length &&
                (this.searchTerm.length > 0 || // if table is searched
                    (this.$refs["table"] && this.$refs["table"].sorts.length) || // if table is sorted
                    (this.$refs["table"] &&
                        this.$refs["table"].currentPage != 1)); // if pages have been browsed
        },
        loadStoredState() {
            let storedState = JSON.parse(
                sessionStorage.getItem(this.storeName)
            );
            if (storedState !== null) {
                this.storedState = storedState;
                if (
                    storedState.searchTerm &&
                    storedState.searchTerm.length > 0
                ) {
                    this.searchTerm = storedState.searchTerm;
                }
            }
        },
        storeCurrentState() {
            if (this.$refs["table"]) {
                let currentState = {};
                currentState.page = {
                    currentPage: this.$refs["table"].currentPage,
                    currentPerPage: this.$refs["table"].currentPerPage,
                };
                if (this.$refs["table"].sorts[0]) {
                    currentState.sort = {
                        field: this.$refs["table"].sorts[0].field,
                        type: this.$refs["table"].sorts[0].type,
                    };
                }
                currentState.searchTerm = this.searchTerm;
                sessionStorage.setItem(
                    this.storeName,
                    JSON.stringify(currentState)
                );
            }
        },
        resetTable() {
            // reset sorting
            this.$refs["table"].changeSort([]);
            // remove sorting classes
            let sorted = document.querySelectorAll(".sorting");
            sorted.forEach((el) => {
                if (el.tagName == "TH") {
                    el.classList.remove(
                        "sorting",
                        "sorting-asc",
                        "sorting-desc"
                    );
                }
            });
            // reset search
            this.searchTerm = "";
            // reset currentPerPage
            this.$refs["table"].currentPerPage = this.options.limit;
            this.$refs["table"].perPage = this.options.limit;
            // go to first page
            this.$refs["table"].changePage(1);
            // store current state
            this.storeCurrentState();
        },
    },
};
</script>

<style lang="scss">
@import "../assets/css/styles.scss";
</style>
