app.factory('OrderFactory', function($http){
  return {
    getUserOrders: function(){
        return $http.get('/api/orders').then(res => res.data);
    },
    deleteOrder: function(id){
        return $http.delete('/api/orders/'+ id).then( res => res.data);
    }
  }
});
