<?php
require_once __DIR__.'/config.php';
header('Content-Type: application/json; charset=utf-8');

function clean($s){ return trim(strip_tags($s ?? '')); }

$name = clean($_POST['name'] ?? '');
$email = clean($_POST['email'] ?? '');
$message = clean($_POST['message'] ?? '');

if (!$name || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['ok'=>false,'error'=>'Datos inválidos']); exit;
}

$subject = "Nuevo contacto TryOnYou";
$body = "Nombre: $name\nEmail: $email\nMensaje: $message\nFecha: ".date('c');

$sent = false;
if (ENABLE_MAIL) {
  $headers  = "From: ".MAIL_FROM."\r\n";
  $headers .= "Reply-To: ".$email."\r\n";
  $headers .= "X-Mailer: PHP/".phpversion();
  $sent = @mail(MAIL_TO, $subject, $body, $headers);
}

$make_ok = null;
if (ENABLE_MAKE && MAKE_WEBHOOK_URL){
  $payload = ['name'=>$name,'email'=>$email,'message'=>$message,'ts'=>date('c')];
  $ch = curl_init(MAKE_WEBHOOK_URL);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
  // Add timeout settings for better error handling
  curl_setopt($ch, CURLOPT_TIMEOUT, 15); // 15 second timeout
  curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5); // 5 second connection timeout
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false); // Don't follow redirects
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true); // Verify SSL certificates
  
  $resp = curl_exec($ch);
  $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  $error = curl_error($ch);
  curl_close($ch);
  
  // Better error handling for Make webhook
  if ($error) {
    error_log("Make webhook curl error: " . $error);
    $make_ok = false;
  } else {
    $make_ok = ($code >= 200 && $code < 300);
    if (!$make_ok) {
      error_log("Make webhook failed with HTTP code: " . $code);
    }
  }
}

echo json_encode(['ok'=>($sent || $make_ok),'mail'=>$sent,'make'=>$make_ok]);
