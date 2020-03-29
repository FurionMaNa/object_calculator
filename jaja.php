
<meta charset="UTF-8">
<!DOCTYPE html>
<html lang="en">
<?php
    ob_start();
?>
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
<body>
   <div class="list_1">
      <header>
       <?php
       echo $_SERVER["DOCUMENT_ROOT"]."/img/header.jpg";
       echo "<img src='".$_SERVER["DOCUMENT_ROOT"]."/img/header.jpg' style='width:100%; height:387px'alt=''>"
       ?>
        <img src='./img/header.jpg' style="width:100%; height:387px"alt="">
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
            <td id="shet_p"><?php echo $_GET["shetpon"]; ?></td>
            <td id="shet_sum_p">0</td>
          </tr>
          <tr>
            <td>Соеденитель понтона</td>
            <td id="col_s">280</td>
            <td id="shet_s"><?php echo $_GET["connector"]; ?></td>
            <td id="shet_sum_s">0</td>
          </tr>
          <tr>
            <td>Лестница с соеденителем</td>
            <td id="col_st">18560</td>
            <td id="shet_st"><?php echo $_GET["stairs"]; ?></td>
            <td id="shet_sum_st">0</td>
          </tr>
          <tr>
            <td>Сходня с переходником</td>
            <td id="col_g">9400</td>
            <td id="shet_g"><?php echo $_GET["gangway"]; ?></td>
            <td id="shet_sum_g">0</td>
          </tr>
          <tr>
            <td>Лавочка с соеденителями</td>
            <td id="col_sit">12500</td>
            <td id="shet_sit">0</td>
            <td id="shet_sum_sit">0</td>
          </tr>
          <tr>
            <td>Утка</td>
            <td id="col_u">20</td>
            <td id="shet_u"><?php echo $_GET["duck"]; ?></td>
            <td id="shet_sum_u">0</td>
          </tr>
          <tr>
            <td>Стойка</td>
            <td id="col_stay">890</td>
            <td id="shet_stay"><?php echo $_GET["stays"]; ?></td>
            <td id="shet_sum_stay">0</td>
          </tr>
          <tr>
            <td>ИТОГО</td>
            <td></td>
            <td id="final_col">0</td>
            <td id="final_sum"><?php echo $_GET["sum"]; ?></td>
          </tr>
        </table>
    </div>
  <footer>
    <img src="img/footer.jpg" style="width:90%; margin-left: 4.5%;" alt="">
  </footer>
</div> 
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js" integrity="sha384-NaWTHo/8YCBYJ59830LTz/P4aQZK1sS0SneOgAvhsIl3zBu8r9RevNg5lHCHAuQ/" crossorigin="anonymous"></script>
<script type="text/javascript">
  var table = document.getElementsByClassName('tab');
  var a = document.createElement("tr");
  a.id = 'show_p';
  a.innerHTML = '0';
  a.appendChild(table);
  var b = document.createElement("td");
  b.innerHTML = 'Понтон модульный';
  b.appendChild(table);
  var c = document.createElement("td");
  var d = document.createElement("img");
  d.src="img/img/Photo/понтон вид сверху.jpg";
  c.appendChild(d);
  document.getElementById('shet_sum_p').innerHTML= document.getElementById('shet_p').innerHTML * document.getElementById('col_p').innerHTML;
  document.getElementById('shet_sum_s').innerHTML= document.getElementById('shet_s').innerHTML * document.getElementById('col_s').innerHTML;
  document.getElementById('shet_sum_st').innerHTML= document.getElementById('shet_st').innerHTML * document.getElementById('col_st').innerHTML;
  document.getElementById('shet_sum_g').innerHTML= document.getElementById('shet_g').innerHTML * document.getElementById('col_g').innerHTML;
  document.getElementById('shet_sum_sit').innerHTML= document.getElementById('shet_sit').innerHTML * document.getElementById('col_sit').innerHTML;
  document.getElementById('shet_sum_u').innerHTML= document.getElementById('shet_u').innerHTML * document.getElementById('col_u').innerHTML;
  document.getElementById('shet_sum_stay').innerHTML= document.getElementById('shet_stay').innerHTML * document.getElementById('col_stay').innerHTML;
  document.getElementById('final_col').innerHTML= +document.getElementById('shet_p').innerHTML + +document.getElementById('shet_s').innerHTML + +document.getElementById('shet_st').innerHTML + +document.getElementById('shet_g').innerHTML + +document.getElementById('shet_sit').innerHTML + +document.getElementById('shet_u').innerHTML + +document.getElementById('shet_stay').innerHTML;
  var doc = new jsPDF();
  
  doc.text('Hello world!', 10, 10);
  doc.save('a4.pdf');
</script>
</body>
<?php
  require_once "dompdf/dompdf_config.inc.php";
  $dompdf = new DOMPDF();
  $my_html =  ob_get_clean();
  echo $my_html;
  $dompdf->load_html($my_html);
  $dompdf->render();
  $output = $dompdf->output();
  file_put_contents("file.pdf", $output);

?>
</html>