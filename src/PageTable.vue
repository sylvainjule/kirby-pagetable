<template>
  <tbl
    :rows="rows"
    :columns="columns"
    :headline="options.headline"
    type="pagetable"
    v-bind="table"
    :isLoading="isLoading"
    @add="addWrapper"
  >
    <template slot="column-image" slot-scope="props">
      <k-link :to="props.row.link">
        <figure class="k-list-item-image">
          <k-image v-if="toImageOptions(props.row.image)" v-bind="toImageOptions(props.row.image)" />
          <k-icon v-else v-bind="props.row.icon" />
        </figure>
      </k-link>
    </template>

    <template slot="column-$default" slot-scope="props">
        <k-link :to="props.row.link" v-html="props.value"/>
    </template>

    <template slot="column-$actions" slot-scope="props">
      <k-button
        v-if="props.row.flag"
        v-bind="props.row.flag"
        @click="props.row.flag.click"
      />
      <k-button
        v-if="props.row.options"
        :tooltip="$t('options')"
        icon="dots"
        alt="Options"
        class="k-list-item-toggle"
        @click.stop="$refs['options-' + props.index].toggle()"
      />
      <k-dropdown-content
        :ref="'options-' + props.index"
        :options="props.row.options"
        align="right"
        @action="action(props.row, $event)"
      />
    </template>

    <template slot="dialogs">
      <k-page-create-dialog ref="create" />
      <k-page-duplicate-dialog ref="duplicate" />
      <k-page-rename-dialog ref="rename" @success="update" />
      <k-page-url-dialog ref="url" @success="update" />
      <k-page-status-dialog ref="status" @success="update" />
      <k-page-template-dialog ref="template" @success="update" />
      <k-page-remove-dialog ref="remove" @success="update" />
    </template>
  </tbl>
</template>

<script>
import Tbl from 'tbl-for-kirby';

export default {
  extends: 'k-pages-section',
  components: { Tbl },
  data(){
    return {
      rows: [],
      columns: [],
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
      translations: {
        perPage: this.$t('pagetable.rowsPerPage'),
        of: this.$t('pagetable.of'),
        all: this.$t('pagetable.all'),
        empty: this.$t('pages.empty'),
        filter: this.$t('pagetable.filter-pages'),
        reset: this.$t('pagetable.reset')
      },
    }
  },
  props: {
    parent: String,
    blueprint: String,
    name: String,
  },
  computed: {
    table() {
      return {
        actions: {
          width: "2fr"
        },
        pagination: {
          perPage: this.options.limit,
          perPageOptions: this.options.limitOptions
        },
        labels: this.translations,
        store: {
          enabled: true,
          name: this.parent + '-' + this.name
        },
        options: {
          add: this.add
        }
      }
    },
    language() {
      return this.$store.state.languages.current;
    }
  },
  watch: {
    language() {
      this.reload();
    }
  },
  created() {
    this.load();
  },
  methods: {
    load(reload) {
      if (!reload) this.isLoading = true

      this.$api
        .get(this.parent + "/sections/" + this.name)
        .then(response => {
          this.isLoading = false
          this.options = response.options
          this.columns = response.data.columns
          this.rows    = this.items(response.data.rows)

          // replace default translations if needed
          let translations = response.translations
          Object.keys(translations).forEach(k => {
              if (translations[k] == null) delete translations[k]
          })
          this.translations = Object.assign({}, this.translations, translations)
        })
        .catch(error => {
          this.isLoading = false
          this.error = error.message
        })
    },
    addWrapper() {
        try {
            this.create();
        } catch(e){
            this.action(null, 'create')
        }
    },
    toImageOptions(image) {
        if (!image) return false;
        let src    = null;
        let srcset = null;
        if(image.list) {
            src    = image.list.url;
            srcset = image.list.srcset;
        } else {
            src    = image.url;
            srcset = image.srcset;
        }
        if (!src) {
            return false;
        }

        return {
            src: src,
            srcset: srcset,
            back: image.back || 'pattern',
            cover: image.cover
        };
    }
  }
};
</script>

<style lang="scss">
    @import '../node_modules/tbl-for-kirby/index';

    .tbl[type="pagetable"] table {
        th {
            background: #eaeaea;
        }
        td:not(:first-child) > a {
            display: block;
            width: 100%;
            padding: .5rem .75rem;
        }
        .tbl-options {
            display: flex;
            justify-content: space-between;
            overflow: visible;
            padding: .5rem .95rem;
        }
    }
</style>
