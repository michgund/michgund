<?php

if (isset($_GET['city']) && isset($_GET['state'])) {
    $city = urlencode($_GET['city']);
    $state = $_GET['state'];
    $zipCodesText = file_get_contents("https://zipcodeapi.com/rest/Sktwpw3YIaknUoEbKU2YRybLx9UDWT7OVvIxY9VFFkSDIYnPeMUVLe4GTTSlDkBQ/city-zips.json/$city/$state");
    echo $zipCodesText;
} else {
    echo "404: City not found";
}

?>