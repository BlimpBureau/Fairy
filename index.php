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
        
        <script src="bower_components/firebase/firebase.js"></script>
        <script src="bower_components/angularfire/angularfire.min.js"></script>
        
        <script src="js/fairy.js"></script>
    </head>
    <body>
      <div class="fairy-navbar navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#"><img id="fairy-logo" src="img/fairy-logo-white-rgb.svg"></a>
          </div>
        </div>
      </div>

      <!-- Main jumbotron for a primary marketing message or call to action -->
      <div class="jumbotron">
        <div class="container">
          <h1>Hello, world!</h1>
          <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
          <p><a class="btn btn-primary btn-lg" role="button">Learn more &raquo;</a></p>
        </div>
      </div>

      <div class="container">

        <div id="testView" ng-controller="testController">
          <div id="comments">
            <div class="comment" ng-repeat="comment in comments">
              <span><b>{{comment.from}}:</b><br> {{comment.body}}</span>
            </div>
          </div>

          <div id="textWrap">
            <textarea ng-model="newComment" ng-keydown="addComment($event)" placeholder="Write something!"></textarea>
          </div>
        </div>

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