<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

$password = 'vivid';
$dataDir = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'data';
$dataFile = $dataDir . DIRECTORY_SEPARATOR . 'scottsdale-leads.json';

if (!is_dir($dataDir) && !mkdir($dataDir, 0755, true) && !is_dir($dataDir)) {
    http_response_code(500);
    echo json_encode(['error' => 'Unable to create data directory.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!file_exists($dataFile)) {
        echo json_encode(['updated' => null, 'leads' => []]);
        exit;
    }

    readfile($dataFile);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
    exit;
}

$payload = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($payload) || ($payload['password'] ?? '') !== $password) {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden.']);
    exit;
}

$leads = $payload['leads'] ?? null;
if (!is_array($leads)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid lead payload.']);
    exit;
}

$clean = [];
foreach ($leads as $lead) {
    if (!is_array($lead) || empty($lead['clinic'])) {
        continue;
    }

    $clean[] = [
        'clinic' => substr((string) ($lead['clinic'] ?? ''), 0, 160),
        'status' => substr((string) ($lead['status'] ?? 'Not visited'), 0, 80),
        'priority' => substr((string) ($lead['priority'] ?? 'A'), 0, 20),
        'contact' => substr((string) ($lead['contact'] ?? ''), 0, 160),
        'role' => substr((string) ($lead['role'] ?? ''), 0, 160),
        'phone' => substr((string) ($lead['phone'] ?? ''), 0, 80),
        'email' => substr((string) ($lead['email'] ?? ''), 0, 180),
        'notes' => substr((string) ($lead['notes'] ?? ''), 0, 5000),
        'next' => substr((string) ($lead['next'] ?? ''), 0, 2000),
        'updated' => substr((string) ($lead['updated'] ?? ''), 0, 80),
    ];
}

$response = [
    'updated' => gmdate('c'),
    'leads' => $clean,
];

$json = json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
if ($json === false || file_put_contents($dataFile, $json, LOCK_EX) === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Unable to save lead data.']);
    exit;
}

echo $json;
