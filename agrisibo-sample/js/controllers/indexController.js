app.controller('indexController', function($scope) {
  $scope.title = '13 Reasons Why Rhen is Awesome';
  $scope.promo = 'Existence';
  $scope.announcements =
    [
    	{
        title: 'Welcome!',
        price: 19,
        date: new Date ('2014', '03', '08'),
        details: 'Welcome to AGRIsibo!',
        likes: 0,
        dislikes: 0
      }/*,
    	{
        name: 'Program or be Programmed',
        price: 8,
        pubdate: new Date ('2013', '08', '01'),
        cover: 'img/program-or-be-programmed.jpg',
        likes: 0,
        dislikes: 0
      },
    	{
    		name: 'Wicked',
        price: 25,
        pubdate: new Date ('2001', '07', '01'),
        cover: 'https://bibliomantics.files.wordpress.com/2015/12/image_book2.jpg',
        likes: 0,
        dislikes: 0
    	},
    	{
    		name: 'Dorothy Must Die',
        price: 23,
        pubdate: new Date ('2006', '03', '26'),
        cover: 'https://ohthestoriesyoullknow.files.wordpress.com/2015/09/ch-win_20150907_122431.jpg',
        likes: 0,
        dislikes: 0
    	}*/
  	];
  $scope.plusOne = function(index) {
    $scope.products[index].likes += 1;
  };
  $scope.minusOne = function(index) {
    $scope.products[index].dislikes += 1;
  };
});