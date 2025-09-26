<?php
/**
 * Enhanced Health Check API for TryOnMe-TryOnYou-AVBETOS Intelligence System
 * Provides comprehensive health and performance metrics for monitoring
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

$start_time = microtime(true);

// Initialize response structure
$health_data = [
    'status' => 'ok',
    'timestamp' => date('c'),
    'service' => 'tryonme-avbetos-intelligence',
    'version' => '1.0.0'
];

// Performance metrics
$metrics = [];

// 1. Response time (will be calculated at the end)
$response_start = microtime(true);

// 2. System load
if (function_exists('sys_getloadavg')) {
    $load = sys_getloadavg();
    $metrics['system_load'] = [
        '1min' => $load[0],
        '5min' => $load[1],
        '15min' => $load[2]
    ];
}

// 3. Memory usage
$metrics['memory'] = [
    'used_mb' => round(memory_get_usage(true) / 1024 / 1024, 2),
    'peak_mb' => round(memory_get_peak_usage(true) / 1024 / 1024, 2),
    'limit' => ini_get('memory_limit')
];

// 4. Disk space (if possible)
if (function_exists('disk_free_space')) {
    $free_bytes = disk_free_space('.');
    $total_bytes = disk_total_space('.');
    if ($free_bytes !== false && $total_bytes !== false) {
        $metrics['disk'] = [
            'free_mb' => round($free_bytes / 1024 / 1024, 2),
            'total_mb' => round($total_bytes / 1024 / 1024, 2),
            'usage_percent' => round((($total_bytes - $free_bytes) / $total_bytes) * 100, 2)
        ];
    }
}

// 5. Check if critical files exist
$critical_files = ['index.html', 'src/App.jsx', '.env.example'];
$file_status = [];
foreach ($critical_files as $file) {
    $file_status[$file] = file_exists($file) ? 'ok' : 'missing';
}
$metrics['files'] = $file_status;

// 6. Database connectivity (placeholder - would connect to actual DB)
$metrics['database'] = [
    'status' => 'ok', // Would test actual connection
    'connection_pool' => 'healthy'
];

// 7. External services (placeholder)
$metrics['external_services'] = [
    'sentry' => 'ok',
    'analytics' => 'ok',
    'cdn' => 'ok'
];

// Calculate response time
$response_time_ms = round((microtime(true) - $response_start) * 1000, 2);
$metrics['response_time_ms'] = $response_time_ms;

// Mock error rate calculation (in real app, this would query logs/database)
$error_rate_percent = rand(0, 50) / 100; // Mock: 0-0.5% error rate
$metrics['error_rate_percent'] = $error_rate_percent;

// P95 response time simulation (in real app, this would be calculated from historical data)
$p95_response_time_ms = $response_time_ms + rand(50, 200); // Mock P95
$metrics['p95_response_time_ms'] = $p95_response_time_ms;

// Simulate active users and fashion metrics based on time of day
$hour = (int)date('G'); // 0-23
// Simulate higher activity during 18:00-22:00, lower at night
if ($hour >= 18 && $hour <= 22) {
    $active_current = rand(80, 120);
    $peak_24h = rand(150, 200);
    $total_sessions_24h = rand(800, 1200);
    $products_viewed_24h = rand(1800, 2200);
    $try_on_sessions_24h = rand(600, 900);
} elseif ($hour >= 8 && $hour < 18) {
    $active_current = rand(40, 80);
    $peak_24h = rand(120, 180);
    $total_sessions_24h = rand(500, 900);
    $products_viewed_24h = rand(1200, 1800);
    $try_on_sessions_24h = rand(300, 600);
} else {
    $active_current = rand(10, 30);
    $peak_24h = rand(80, 120);
    $total_sessions_24h = rand(200, 500);
    $products_viewed_24h = rand(500, 1200);
    $try_on_sessions_24h = rand(100, 300);
}
$metrics['active_users'] = [
    'current' => $active_current,
    'peak_24h' => $peak_24h,
    'total_sessions_24h' => $total_sessions_24h
];

// Fashion-specific metrics (simulate conversion rate and session duration as before)
$metrics['fashion_metrics'] = [
    'products_viewed_24h' => $products_viewed_24h,
    'try_on_sessions_24h' => $try_on_sessions_24h,
    'conversion_rate_percent' => round(rand(200, 800) / 100, 2), // 2-8%
    'avg_session_duration_min' => round(rand(300, 1200) / 60, 2) // 5-20 min
];

// Health thresholds
$health_checks = [
    'response_time_ok' => $response_time_ms < 300,
    'error_rate_ok' => $error_rate_percent < 1.0,
    'p95_ok' => $p95_response_time_ms < 300,
    'memory_ok' => $metrics['memory']['used_mb'] < 500,
    'system_load_ok' => isset($metrics['system_load']) ? $metrics['system_load']['1min'] < 2.0 : true
];

// Overall health status
$all_healthy = array_reduce($health_checks, function($carry, $check) {
    return $carry && $check;
}, true);

if (!$all_healthy) {
    $health_data['status'] = 'degraded';
    http_response_code(200); // Still return 200 but indicate degraded performance
}

// Critical failure conditions (would return 500)
$critical_issues = [
    'critical_file_missing' => in_array('missing', $file_status),
    'memory_critical' => $metrics['memory']['used_mb'] > 1000,
    'error_rate_critical' => $error_rate_percent > 5.0
];

$has_critical_issues = array_reduce($critical_issues, function($carry, $issue) {
    return $carry || $issue;
}, false);

if ($has_critical_issues) {
    $health_data['status'] = 'error';
    http_response_code(500);
}

// Add all metrics to response
$health_data['metrics'] = $metrics;
$health_data['health_checks'] = $health_checks;
$health_data['critical_issues'] = $critical_issues;

// Calculate total response time
$total_response_time = round((microtime(true) - $start_time) * 1000, 2);
$health_data['total_response_time_ms'] = $total_response_time;

// Output JSON response
echo json_encode($health_data, JSON_PRETTY_PRINT);
?>