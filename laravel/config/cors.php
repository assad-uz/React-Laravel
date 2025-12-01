<?php

return [

    'paths' => ['*'],

    'allowed_methods' => ['*'],

'allowed_origins' => [
    'http://localhost:5173',     // ✅ React Dev Server (Vite default)
    'http://127.0.0.1:5173',    // ✅ localhost এর বিকল্প
    'http://127.0.0.1:8000',    // যদি আপনার Laravel সার্ভার নিজেই রিকোয়েস্ট করে
],
    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
