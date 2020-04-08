<?php
  $image = 'header.jpg';
  $imageData = base64_encode(file_get_contents($image));
  $src = 'data:'.mime_content_type($image).';base64,'.$imageData;
  $my_html =  '
  
<!DOCTYPE html>
<html lang="en">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="text/javascript" src="js/script.js"></script>
    <title>Document</title>
    <meta charset="UTF-8">
    <style>
        html, body{
            box-sizing: border-box;
            margin:0;
            padding:0;
        }
    
        body{
          
        }
        table{
          border-collapse: collapse;
        }
    .tab{
        margin-top: 1%;
        margin-left: 4.6%;
        width:90%;
        text-align: center;
        font-weight: bolder;
    }
    td{
        padding:20px
    }
    tr{
     
    }
      body { font-family: DejaVu Sans, sans-serif; }
    </style>
</head>
<body onload="load()">
   <div class="list_1">
      <header>
        <img style="width:100%; height:387px"alt="" src="' .$src. '">
    </header>
    <div class="middle">
    <Center>
    <table class="tab" border="1">
          
      <tr>
              <th>Наименование продукции</th>
              <th>Фотография</th>
              <th>Цена с ндс, руб.</th>
            </tr>
            <tr id="show_p">
              <td>Понтон модульный</td>
              <td><img src="img/Photo/понтон вид сверху.jpg" width="400px" height="200px" alt=""></td>
              <td>16800</td>
            </tr>
            <tr id="show_s">
              <td>Соеденитель понтона</td>
              <td><img src="img/Photo/соединитель вид сверху.jpg" width="400px" height="200px" alt=""></td>
              <td>280</td>
            </tr>
            <tr id="show_st">
                <td>Лестница с соеденителем</td>
                <td><img src="img/Photo/лестница вид сверзу.jpg" width="400px" height="200px" alt=""></td>
                <td>18560</td>
              </tr>
              <tr id="show_g">
                <td>Сходня с переходником</td>
                <td><img src="img/Photo/сходня вид сверху.jpg" width="400px" height="200px" alt=""></td>
                <td>9400</td>
              </tr>
              <tr id="show_sit">
                <td>Лавочка с соеденителями</td>
                <td><img src="img/Photo/лавочка вид сверху.jpg" width="400px" height="200px" alt=""></td>
                <td>12500</td>
              </tr>
              <tr id="show_u">
                <td>Утка</td>
                <td><img src="img/Photo/Утка пока такая же фото.jpg" width="400px" height="200px" alt=""></td>
                <td>20,00</td>
              </tr>
              <tr id="show_stay">
                <td>Стойка</td>
                <td><img src="img/Photo/стойка вид сверху.jpg" width="400px" height="200px" alt=""></td>
                <td>890</td>
              </tr>  
          </table>
          </center>
      <h1 style="margin-left:4.5%">Коммерческие условия поставки:</h1>
        <br>
         <center>
        <table class="summa tab" border="1">
          <tr>
            <th>Наименование продукции</th>
            <th>Сумма с НДС, руб</th>
            <th>Количество</th>
            <th>Сумма с НДС, руб</th>
          </tr>
          <tr>
            <td>Понтон модульный</td>
            <td id="col_p">16800</td>
            <td id="shet_p">'. $_GET["shetpon"] .'</td>
            <td id="shet_sum_p">0</td>
          </tr>
          <tr>
            <td>Соеденитель понтона</td>
            <td id="col_s">280</td>
            <td id="shet_s">'.  $_GET["connector"].'</td>
            <td id="shet_sum_s">0</td>
          </tr>
          <tr>
            <td>Лестница с соеденителем</td>
            <td id="col_st">18560</td>
            <td id="shet_st">'.$_GET["stairs"] .'</td>
            <td id="shet_sum_st">0</td>
          </tr>
          <tr>
            <td>Сходня с переходником</td>
            <td id="col_g">9400</td>
            <td id="shet_g">'.$_GET["gangway"] .'</td>
            <td id="shet_sum_g">0</td>
          </tr>
          <tr>
            <td>Лавочка с соеденителями</td>
            <td id="col_sit">12500</td>
            <td id="shet_sit">'.$_GET["bench"].'</td>
            <td id="shet_sum_sit">0</td>
          </tr>
          <tr>
            <td>Утка</td>
            <td id="col_u">20</td>
            <td id="shet_u">'.$_GET["duck"] .'</td>
            <td id="shet_sum_u">0</td>
          </tr>
          <tr>
            <td>Стойка</td>
            <td id="col_stay">890</td>
            <td id="shet_stay">'.$_GET["stays"].'</td>
            <td id="shet_sum_stay">0</td>
          </tr>
          <tr>
            <td>ИТОГО</td>
            <td></td>
            <td id="final_col">0</td>
            <td id="final_sum">'. $_GET["sum"].'</td>
          </tr>
        </table>
         </center>
         <br>
          <br>
          <span style="margin-left: 4.6%; font-size: 20px;">
            <span style="text-decoration: underline;">Срок поставки </span>: 5-7 дней с момента поступления предоплаты на расчетный счет.
           Продукция в наличии на складепроизводства в г. Владимир.
           Возможна доставка до Вашего объекта.
           <br> <br>
           
           <span style="text-decoration: underline;margin-left: 4.5%;" >
            Условия оплаты </span>:  предоплата 100% по безналичному расчету в течение 3 дней с момента получения счета на оплату.
          </span>
          <br>
          <br>
          <br>
          <br>
          <span style="float:right; margin-right: 4.6%; font-size: 20px;">
            Гаврилов Александр Михайлович <br>
            Менеджер ООО "ПЛАСТО СПБ"
          </span>
    </div>
  <footer>
    <img src="img/footer.jpg" style="width:90%; margin-left: 4.5%;" alt="">
  </footer>
</div> 
<script type="text/javascript">
   function load(){
    //var table = document.getElementsByClassName("tab");
    //var a = document.createElement("tr");
    //a.id = "show_p";
    //a.innerHTML = "0";
    //a.appendChild(table);
    //var b = document.createElement("td");
    //b.innerHTML = "Понтон модульный";
    //b.appendChild(table);
    //var c = document.createElement("td");
    //var d = document.createElement("img");
    //d.src="img/img/Photo/понтон вид сверху.jpg";
    //c.appendChild(d);
    document.getElementById("shet_sum_p").innerHTML= document.getElementById("shet_p").innerHTML * document.getElementById("col_p").innerHTML;
    document.getElementById("shet_sum_s").innerHTML= document.getElementById("shet_s").innerHTML * document.getElementById("col_s").innerHTML;
    document.getElementById("shet_sum_st").innerHTML= document.getElementById("shet_st").innerHTML * document.getElementById("col_st").innerHTML;
    document.getElementById("shet_sum_g").innerHTML= document.getElementById("shet_g").innerHTML * document.getElementById("col_g").innerHTML;
    document.getElementById("shet_sum_sit").innerHTML= document.getElementById("shet_sit").innerHTML * document.getElementById("col_sit").innerHTML;
    document.getElementById("shet_sum_u").innerHTML= document.getElementById("shet_u").innerHTML * document.getElementById("col_u").innerHTML;
    document.getElementById("shet_sum_stay").innerHTML= document.getElementById("shet_stay").innerHTML * document.getElementById("col_stay").innerHTML;
    document.getElementById("final_col").innerHTML= +document.getElementById("shet_p").innerHTML + +document.getElementById("shet_s").innerHTML + +document.getElementById("shet_st").innerHTML +  +document.getElementById("shet_g").innerHTML + +document.getElementById("shet_sit").innerHTML + +document.getElementById("shet_u").innerHTML + +document.getElementById("shet_stay").innerHTML;
    
   }
   document.addEventListener("DOMContentLoaded", alert("Спасибо с вами свяжется менеджер"));
</script>
</body>
</html>
  ';
  echo $my_html;//Отображение страницы,в переменной код страницы 
  header('Content-language:en-GB');
  $root = $_SERVER['DOCUMENT_ROOT'];
  require_once($root."/dompdf/autoload.inc.php");
  use Dompdf\Dompdf;
  $dompdf = new Dompdf(array('enable_remote' => true));
  $dompdf->load_html($my_html);
  $dompdf->setPaper( 'A4', 'portrait' );
  $dompdf->render();//генерация pdf
  $output = $dompdf->output();
  $extension = "pdf";
  $filename = getRandomFileName("/pdf", $extension);
  file_put_contents("pdf/".$filename.".pdf", $output);//сохранение на сервер 

  require($root.'/PHPMailer/PHPMailerAutoload.php');
  $mail = new PHPMailer;
  $mail->setFrom($_GET['email']);
  $mail->addAddress('cer-c@mail.ru');
  $mail->Subject = 'PHPMailer file sender';
  $mail->msgHTML("От: ".$_GET['name']."\r\n Телефон: ".$_GET['telephone']."\r\n Коммент: ".$_GET['comment']);
  $mail->addAttachment($root."/pdf/".$filename.".pdf");
  $r = $mail->send();//отправка на почту
  $dompdf->stream("file.pdf");//Сохранение на пк пользователю
?>
