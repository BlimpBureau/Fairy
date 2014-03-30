<!DOCTYPE html>
<!--[if lt IE 7]>      <html ng-app="fairyApp" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html ng-app="fairyApp" class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html ng-app="fairyApp" class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html ng-app="fairyApp" class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Fairy</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

        <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" href="css/fairy.css">

        <script src="bower_components/modernizr/modernizr.js"></script>

        <script src="bower_components/angular/angular.min.js"></script>
        <script src="bower_components/angular-route/angular-route.min.js"></script>
        
        <script src="bower_components/firebase/firebase.js"></script>
        <script src="bower_components/angularfire/angularfire.min.js"></script>
        
        <script src="ng/fairy-app.js"></script>
    </head>
    <body>
      <div class="fairy-navbar navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <a class="navbar-brand" href="#"><img id="fairy-logo" src="img/fairy-logo-white-rgb.svg"></a>
          </div>
        </div>
      </div>

      <div class="container">
        
        <!-- Placeholder for views -->
        <div ng-view></div>

        <hr>

        <footer>
          <p>&copy; Backslashforward 2014</p>
        </footer>
      </div> <!-- /container -->

      <script src="bower_components/jquery/dist/jquery.min.js"></script>

      <!-- Latest compiled and minified JavaScript -->
      <script src="bootstrap/js/bootstrap.min.js"></script>
    </body>
</html>