(function(){
  'use strict';

  $(document).ready(function(){
    $('#hide').click(hide);
    $('#show').click(show);
    $('form').submit(addRecipe);
    $('#recipes').on('click', '.delete', delRecipe);
    $('#categories a').click(filterCategory);
    $('#ingredients a').click(filterIngredient);
  });

  function filterCategory(e){
    var category = $(this).text();
    $('.recipe .category:contains('+category+')').closest('.recipe').fadeIn();
    $('.recipe .category:not(:contains('+category+'))').closest('.recipe').fadeOut();
    e.preventDefault();
  }

  function filterIngredient(e){
    var ingredient = $(this).text();
    $('.recipe .ingredients:contains('+ingredient+')').closest('.recipe').fadeIn();
    $('.recipe .ingredients:not(:contains('+ingredient+'))').closest('.recipe').fadeOut();
    e.preventDefault();
  }

  function delRecipe(){
    var id = $(this).closest('.recipe').attr('data-recipe-id'),
        type = 'delete',
        url = '/recipes/' + id;

      $.ajax({url:url, type:type, dataType:'json', success:function(data){
        var $recipe = $('.recipe[data-recipe-id='+data.id+']');
        $recipe.fadeOut();

        setTimeout(function(){$recipe.remove();},2000);
      }});
  }

  function addRecipe(e){
    var data = $('form').serialize(),
        type = $('form').attr('method'),
        url = $('form').attr('action');

      $('input, textarea').val('');

      $.ajax({url:url, type:type, data:data, dataType:'html', success:function(html){
        var $recipe = $(html);
        $recipe.css('display', 'none');
        $('#recipes').prepend($recipe);
        $recipe.fadeIn(2000);
    }});

    e.preventDefault();
  }

  function hide(){
    $('form').fadeOut();
  }

  function show(){
    $('form').fadeIn();
  }
})();

