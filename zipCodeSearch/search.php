<?php 

$cities = file_get_contents('capitalCities.txt');

$cities = unserialize($cities);

sort($cities);

$usertype = $_GET['query'];

for ($i = 0; $i < count($cities); $i++) {
    if (stripos($cities[$i], $usertype) === 0) {
        $returnCities [] = $cities[$i];
    }
}

if (isset($returnCities)) {
    $returnCities = implode("|", $returnCities);
    echo $returnCities;
} else {
    echo '404: No result found';
}

?>
