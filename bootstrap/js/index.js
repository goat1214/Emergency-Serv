$(function() {
  // $(".rad-sidebar").toggleClass("rad-nav-min");
  $('[data-toggle="tooltip"]').tooltip();
  // $('.container-fluid button.list-btns').click(function(){
  //     var target = $(this).data('target');
  //     var arrow_class = "glyphicon-triangle-left glyphicon-triangle-right"
  //     var setOpen = true;
  //     if ("#{}".format($('.open').attr('id')) == target){
  //         $(target).removeClass("open");    
  //         setOpen = false;
  //         $(this).find(i).toggleClass();
  //     }
  //     if ($('.open').length > 0){
  //         $('.open').toggleClass("open");
  //         $('.glyphicon-triangle-right').toggleClass(arrow_class);
  //     }
  //     if (setOpen){
  //         $(target).toggleClass("open");
  //     }
  //     $(this).find('i').toggleClass(arrow_class);
  // }); 

  $(".rad-toggle-btn").on('click', function() {
    $(".rad-sidebar").toggleClass("rad-nav-min");
    $(".rad-body-wrapper").toggleClass("rad-nav-min");
    // setTimeout(function() {
    //   init()
    // }, 200);
  });

  // $(".rad-dropdown >.rad-menu-item").on('click', function(e) {
  //   e.stopPropagation();
  //   $(".rad-dropmenu-item").removeClass("active");
  //   $(this).next(".rad-dropmenu-item").toggleClass("active");
  // });


  function throttle(method, scope) {
    clearTimeout(method.tId);
    method._Id = setTimeout(function(){
      method.call(scope);
    }, 100);
  }

  // window.onresize=function(){
  //   throttle(function(){
  //     init();
  //   }, window);
  // };

  var colors = [
    '#E94B3B',
    '#39C7AA',
    '#1C7EBB',
    '#F98E33'
  ];

  var panelList = $('.row');

  panelList.sortable({
    handle: '.row',
    update: function() {
      $('.panel', panelList).each(function(index, elem) {
        var $listItem = $(elem),
          newIndex = $listItem.index();
      });
    }
  });



  
  
});