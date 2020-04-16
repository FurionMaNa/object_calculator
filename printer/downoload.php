<?php
  $root = $_SERVER['DOCUMENT_ROOT'];
  $my_html =  '
  <!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

    <link rel="stylesheet" href="styles/style.css">

    <title>Коммерческое предложение Компания «Пласто»</title>
    <style>
      body { font-family: DejaVu Sans, sans-serif; }
    </style>
</head>
<body>
<header>
    <div class="container">
        <div class="row mb-3">
            <div class="col-12 col-md-4"><img class="img-fluid logo-plasto" src="images/logo-plasto.png" alt="ПЛАСТО"></div>
            <div class="col-12 offset-md-4 col-md-4">
                <i class="fa fa-map-marker"></i> г. Владимир, ул. Б. Нижегородская, 110 <br/>
                <i class="fa fa-phone"></i> 8 (4922) 22-22-77<br/>
                <i class="fa fa-phone"></i> 8 (920) 9000-400, 8 (920) 900-4000<br/>
                <i class="fa fa-envelope"></i> office@plasto.ru  <i class="fa fa-globe"></i> www.plasto.ru<br/>
            </div>
        </div>
    </div>
</header>


<div class="container">

    <div class="text-center">
        <h1>Коммерческое предложение</h1>
        <p class="lead">Расчет вашей системы понтонов со всеми элементами</p>
    </div>

    <div class="row">
        <div class="col-12">
            <table class="table table-striped table-bordered">
                <thead>
                <tr class="table-primary">
                    <th scope="col">Наименование продукции</th>
                    <th scope="col">Фотография</th>
                    <th scope="col">Количество</th>
                    <th scope="col">Цена с НДС</th>
                    <th scope="col">Сумма с НДС</th>

                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">Понтон модульный 2000х1000х400мм</th>
                    <td><img class="img-fluid" src="images/gangway.png" alt="ПЛАСТО"></td>
                    <td>' .$_GET['shetpon'].'</td>
                    <td>13 440,00</td>
                    <td>'.(intval($_GET['shetpon'])*13440).'</td>
                </tr>
                <tr>
                    <th scope="row">Сходня к модульному пластиковому понтону</th>
                    <td><img class="img-fluid" src="images/gangway_blue_obj.png" alt="ПЛАСТО"></td>
                    <td>'.$_GET['gangway'].'</td>
                    <td>7 120,00</td>
                    <td>'. (intval($_GET['gangway'])*7120).'</td>
                </tr>
                <tr>
                    <th scope="row">Соединитель для понтона (синий)</th>
                    <td><img class="img-fluid" src="images/connector.png" alt="ПЛАСТО"></td>
                    <td>'.$_GET['connector'].'</td>
                    <td>224,00</td>
                    <td>'. (intval($_GET['connector'])*224).'</td>
                </tr>
                <tr>
                    <th scope="row">Лестница</th>
                    <td><img class="img-fluid" src="images/stairs-blue.png" alt="ПЛАСТО"></td>
                    <td>'.$_GET['stairs'].'</td>
                    <td>18 560,00</td>
                    <td>'. (intval($_GET['stairs'])*18560).'</td>
                </tr>
                <tr>
                    <th scope="row">Стойка с соединителями</th>
                    <td><img class="img-fluid" src="images/rack.png" alt="ПЛАСТО"></td>
                    <td>'.$_GET['stays'].'</td>
                    <td>890,00</td>
                    <td>'.(intval($_GET['stays'])*890).'</td>
                </tr>

                <tr>
                    <th scope="row">Лавочка</th>
                    <td><img class="img-fluid" src="images/bench.png" alt="ПЛАСТО"></td>
                    <td>'.$_GET['bench'].'</td>
                    <td>12 500,00</td>
                    <td>'.(intval($_GET['bench'])*12500).'</td>
                </tr>
                <tr class="table-primary">
                    <td class="text-right" colspan="4">Итого:</td>
                    <td>'. ((intval($_GET['shetpon'])*13440)+(intval($_GET['gangway'])*7120)+(intval($_GET['connector'])*224)+(intval($_GET['stairs'])*18560)+(intval($_GET['stays'])*890)+(intval($_GET['bench'])*12500)).'</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

    <h2 class="mt-4">Срок поставки</h2>
    <p>5-7 дней с момента поступления предоплаты на расчетный счет. Продукция в наличии на складе производства в г. Владимир. Возможна доставка до Вашего объекта.</p>

    <h2 class="mt-4">Условия оплаты</h2>
    <p>предоплата 100% по безналичному расчету в течение 3 дней с момента получения счета на оплату.</p>

    <h2 class="mt-4">Габаритные размеры груза</h2>
    <p>Общий вес: <span class="data"> 1000 кг</span>, общий объем: <span class="data"> 3м3 </span>.</p>
</div>

<hr class="featurette-divider">

<footer>
    <div class="container">
        <div class="row mb-3">
            <div class="col-md-3">Компания «Пласто», г. Владимир</div>
            <div class="col-md-3"><i class="fa fa-phone"></i> 8 (4922) 22-22-77</div>
            <div class="col-md-3"><i class="fa fa-globe"></i> www.plasto.ru</div>
            <div class="col-md-3"><i class="fa fa-envelope"></i> office@plasto.ru</div>
        </div>
    </div>
</footer>


<!-- Optional JavaScript -->
<!-- jQuery first, then Popper.js, then Bootstrap JS -->
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
</body>
</html>
  ';
  header('Content-language:en-GB');
  function getRandomFileName($path, $extension=''){
    $extension = $extension ? '.' . $extension : '';
    $path = $path ? $path . '/' : '';
    do {
        $name = md5(microtime() . rand(0, 9999));
        $file = $path . $name . $extension;
    } while (file_exists($file));
    return $name;
  }
  header('Content-language:en-GB');
  
  require_once($root."/dompdf/autoload.inc.php");
  use Dompdf\Dompdf;
  $dompdf = new Dompdf(array('enable_remote' => true));
  echo $my_html;
  $dompdf->load_html($my_html);
  $dompdf->setPaper( 'A4', 'portrait' );
  $dompdf->render();//генерация pdf
  $output = $dompdf->output();
  $dompdf->stream("file.pdf");//Сохранение на пк пользователю
  $extension = "pdf";
?>