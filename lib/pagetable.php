<?php

use Kirby\Toolkit\A;
use Kirby\Toolkit\I18n;

$options = require kirby()->root('kirby') . '/config/sections/pages.php';

/* Replace existing properties
--------------------------------*/

$options = A::merge($options, [
	'props' => array(
		'columns' => function($columns = ['title' => array('label' => 'Title', 'text' => '{{ page.title }}')]) {
			return $columns;
		},
		'limit' => function($limit = 10) {
			return $limit;
		},
		'limitOptions' => function($limitOptions = [5, 10, 25, 50]) {
			return $limitOptions;
		},
		'search' => function($search = true) {
			return $search;
		},
	),
	'computed' => array(
		'pages' => function () {
            switch ($this->status) {
                case 'draft':
                    $pages = $this->parent->drafts();
                    break;
                case 'listed':
                    $pages = $this->parent->children()->listed();
                    break;
                case 'published':
                    $pages = $this->parent->children();
                    break;
                case 'unlisted':
                    $pages = $this->parent->children()->unlisted();
                    break;
                default:
                    $pages = $this->parent->childrenAndDrafts();
            }
            // loop for the best performance
            foreach ($pages->data as $id => $page) {
                // remove all protected pages
                if ($page->isReadable() === false) {
                    unset($pages->data[$id]);
                    continue;
                }
                // filter by all set templates
                if ($this->templates && in_array($page->intendedTemplate()->name(), $this->templates) === false) {
                    unset($pages->data[$id]);
                    continue;
                }
            }
            // sort
            if ($this->sortBy) {
                $pages = $pages->sortBy(...Str::split($this->sortBy, ' '));
            }

            return $pages;
        },
        'total' => function () {
            return $this->pages()->count();
        },
        'data' => function () {
            $data = array();

            // first column is always the image
            $data['columns'][] = array(
            	'label' => '',
            	'field' => 'p-cover-image',
            	'sortable' => false,
            	'globalSearchDisabled' => true,
            );

            // loop through the user display choices
            foreach($this->columns as $key => $column) {
            	$sortable   = $column['sortable'] ?? true;
            	$searchable = $column['searchable'] ?? true;
            	$type       = $column['type'] ?? 'text';
            	$label      = $column['label'] ?? ucfirst($key);
            	$label      = I18n::translate($label, $label);
            	$thClass    = '';
            	$tdClass    = '';

            	$columnData = array(
            		'label'                => $label,
            		'field'                => $key,
            		'type'                 => $type,
            		'sortable'             => $sortable,
            		'globalSearchDisabled' => !$searchable,
            	);

            	if($type == 'date') {
            		$dateInputFormat  = $column['dateInputFormat'] ?? 'YYYY-MM-DD';
            		$dateOutputFormat = $column['dateOutputFormat'] ?? 'YYYY-MM-DD';
            		$columnData['dateInputFormat']  = $dateInputFormat;
            		$columnData['dateOutputFormat'] = $dateOutputFormat;
            	}
            	if(array_key_exists('width', $column)) {
            		$width   = 'col-width-'. str_replace('/', '-', $column['width']) .' ';
            		$thClass = $width;
            		$tdClass = $width;
            	}
            	if(array_key_exists('class', $column)) {
            		$thClass .= 'head-'. $column['class'];
            		$tdClass .= 'row-'. $column['class'];
            	}

            	$columnData['thClass'] = $thClass;
            	$columnData['tdClass'] = $tdClass;
            	$data['columns'][]     = $columnData;
            }
            
            // last column is always the options
            $data['columns'][] = array(
            	'label' => '',
            	'field' => 'p-options',
            	'sortable' => false,
            );

            $data['rows'] = array();
            $thumb = ['width'  => 100, 'height' => 100];

            foreach ($this->pages as $item) {
            	$permissions = $item->permissions();
                $blueprint   = $item->blueprint();
                $image       = $item->panelImage($this->image, $thumb);

                $baseOptions = [
                	'id'          => $item->id(),
                    'dragText'    => $item->dragText($this->dragTextType),
                    'text'        => $item->toString($this->text),
                    'info'        => $item->toString($this->info ?? false),
                    'parent'      => $item->parentId(),
                    'icon'        => $item->panelIcon($image),
                    'image'       => $image,
                    'link'        => $item->panelUrl(true),
                    'status'      => $item->status(),
                    'permissions' => [
                        'sort'         => $permissions->can('sort'),
                        'changeStatus' => $permissions->can('changeStatus')
                    ],
                ];

                $userOptions = [];
                // loop through the user display choices
	            foreach($this->columns as $key => $column) {
	            	$userOptions[$key] = $item->toString($column['text']);
	            }

                $options = array_merge_recursive($baseOptions, $userOptions);

                $data['rows'][] = $options;
            }
            return $data;
        },
    ),
    'toArray' => function () {
        return [
            'data'    => $this->data,
            'errors'  => $this->errors,
            'options' => [
                'add'          => $this->add,
                'empty'        => $this->empty,
                'headline'     => $this->headline,
                'layout'       => $this->layout,
                'link'         => $this->link,
                'size'         => $this->size,
                'sortable'     => $this->sortable,
                'limit'        => $this->limit,
                'limitOptions' => $this->limitOptions,
                'search'       => $this->search
            ],
            'pagination' => $this->pagination,
        ];
    }
]);


// return the updated options
return $options;