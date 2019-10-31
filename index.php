<?php 

Kirby::plugin('sylvainjule/pagetable', array(
    'sections' => array(
    	'pagetable' => require_once __DIR__ . '/lib/pagetable.php',
    ),
    'translations' => array(
        'en' => require_once __DIR__ . '/lib/languages/en.php',
        'es' => require_once __DIR__ . '/lib/languages/es.php',
        'de' => require_once __DIR__ . '/lib/languages/de.php',
        'fr' => require_once __DIR__ . '/lib/languages/fr.php',
        'tr' => require_once __DIR__ . '/lib/languages/tr.php',
        'it' => require_once __DIR__ . '/lib/languages/it.php',
    ),
));
