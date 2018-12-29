<?php 

Kirby::plugin('sylvainjule/pagetable', array(
    'sections' => array(
    	'pagetable' => require_once __DIR__ . '/lib/pagetable.php',
    ),
    'translations' => array(
        'en' => require_once __DIR__ . '/lib/languages/en.php',
        'fr' => require_once __DIR__ . '/lib/languages/fr.php',
    ),
));