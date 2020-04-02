<?php
  $image = 'header.jpg';
  $imageData = base64_encode(file_get_contents($image));
  $src = 'data:'.mime_content_type($image).';base64,'.$imageData;
  $my_html =  '
  <meta charset="UTF-8">
<!DOCTYPE html>
<html lang="en">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="text/javascript" src="js/script.js"></script>
    <title>Document</title>
    
    <style>
      html, body{
        box-sizing: border-box;
        margin:0;
        padding:0;
      }
      body{
        background:#3d3d3d;
      }
      .list_1{
        width:70%;
        margin-left: 15%;
        margin-top:2%;
        background:white;
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
      <h1 style="margin-left:4.5%">Коммерческие условия поставки:</h1>
        <br>
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
</script>
</body>
</html>
  ';
  header('Content-language:en-GB');
  require_once __DIR__."\dompdf\autoload.inc.php";
  use Dompdf\Dompdf;
  $dompdf = new Dompdf(array('enable_remote' => true));
  $dompdf->load_html($my_html);
  $dompdf->setPaper( 'A4', 'portrait' );
  $dompdf->render();
  //$output = $dompdf->output();
  //file_put_contents("file.pdf", $output);
  $dompdf->stream();
  echo $my_html;
?>