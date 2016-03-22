<style>
    *{
        margin:0 auto;
        padding:0;
        font-size: 16px;
        font-family: 'Helvetica';
        text-align: center;
    }
    b{
        padding: 5px 0;
        display: block;
    }
    p{
        font-size: 12px;
        margin-top: 10px;
        margin-bottom: 20px;
        padding: 0;
    }

    h1{
        font-size: 28px;
        margin-top: 50px;
    }
    table{
        border-collapse: collapse;
        width: 980px;
    }
    table tr td{
        border: 1px solid gray;
        padding: 10px;
        text-align: left;
        background: #54d670;
    }

    table tr td.tomato{
        background-color: tomato;
        border: 1px solid gray;
    }
</style>

<?php
require 'vendor/autoload.php';

use Parse\ParseClient;
use Parse\ParseObject;
use Parse\ParseQuery;
use Parse\ParseInstallation;
use Parse\ParsePush;

setlocale(LC_TIME, "nl_Nl");

$app_id = 'k0IqFxo8oa2n1FkjFJs6TV7CBJ2BonnC0oSVI6jc';
$rest_key = 'DHbRDhhAcRncAFgspTgecn6DlecXEmeTIVpIgUk1';
$master_key = 'eUYPfMEMcVJRvI0LZLKPh5TX8kkamJ4tLK6D0yaH';

ParseClient::initialize( $app_id, $rest_key, $master_key );

$query = new ParseQuery("Notifications");
$results = $query->find();

//$resultsa = $query->equalTo(date('c'), "date");


echo '<h1>'.strftime("%d %B %Y");date('d F Y').'</h1>';
echo "<p>Successfully retrieved " . count($results) . " notification </p>";

echo '<table>';

for ($i = 0; $i < count($results); $i++) {

    $object = $results[$i];
    $date = $object->get('date');

    echo '<tr>';
    if(date('Y-m-d') == $date->format('Y-m-d')) {
        echo '<td>'.$date->format('dmy').'</td>';
        echo '<td>'.$object->get('alert').'</td>';
        // echo '<td>'.$object->get('deviceToken').'</td>';

        // $Installation = ParseInstallation::query();
        // $Installation->equalTo('deviceToken', 'ba30e1afab4427d57de045e99230ba1bfd71c5fed1ceb9e775515db9c5f03cc1');
        //
        // ParsePush::send(array(
        //     "where" => $Installation,
        //     "data" => array(
        //     "alert" => $object->get('alert'),
        //     "sound" => "cheering.caf",
        //     )
        // ));

    }else{
        echo '<td class="tomato">'.$date->format('d-m-Y').'</td>';
        echo '<td class="tomato">'.'Hier geen push'.'</td>';
    }
    echo '</tr>';
}
echo '</table>';
