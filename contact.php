<?php
// Veritabanı bağlantısı
$servername = "localhost";
$username = "root"; // MySQL kullanıcı adınız
$password = ""; // MySQL şifreniz
$dbname = "contact_form"; // Veritabanı adınız

$conn = new mysqli($servername, $username, $password, $dbname);

// Bağlantıyı kontrol et
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Form gönderildiğinde
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Veritabanına ekleme
    $sql = "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $name, $email, $subject, $message);

    if ($stmt->execute()) {
        // Başarıyla veri eklendiyse, bildirim için JavaScript çalıştır
        echo '<script type="text/javascript">
                alert("Your message has been sent successfully.");
                window.location.href = "contact.php";  // Sayfayı yeniden yükle
              </script>';
    } else {
        // İşlem başarısızsa hata günlüğü tutabilirsiniz
        error_log("Error: " . $stmt->error);
    }

    $stmt->close();
}

$conn->close();
?>
