import PageTable from './components/PageTable.vue'

panel.plugin('sylvainjule/pagetable', {
    sections: {
        'pagetable': PageTable,
    },
    icons: {
        pagetableLoader: '<g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="1.75"><circle cx="7" cy="7" r="7.2" stroke="#000" stroke-opacity=".2"/><path d="M14.2,7c0-4-3.2-7.2-7.2-7.2" stroke="#000"><animateTransform attributeName="transform" type="rotate" from="0 7 7" to="360 7 7" dur="1s" repeatCount="indefinite"/></path></g></g>'
    }
});
