var $item = $('.carousel .item');
var $wHeight = $(window).height();

$item.height($wHeight); 
$item.addClass('full-screen');

$('.carousel img').each(function() {
  var $src = $(this).attr('src');
  var $color = $(this).attr('data-color');
  $(this).parent().css({
    'background-image' : 'url(' + $src + ')',
    'background-color' : $color
  });
  $(this).remove();
});

$(window).on('resize', function (){
  $wHeight = $(window).height();
  $item.height($wHeight);
});
// 留言板
// const ref = new Firebase("https://radiant-torch-3037.firebaseio.com/");
const form = document.querySelector("form");

form.addEventListener("submit", postComment);

const timeStamp = () => {  //let只存在local scope
  let options = {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute:'2-digit'
  };
  let now = new Date().toLocaleString('en-US', options);
  return now;
};

function postComment(e) {
  e.preventDefault();
  let name = document.getElementById("boardname").value;
  let comment = document.getElementById("comment").value;
  let comments = document.getElementById("comments");
  comments.innerHTML = '<hr><h4>'+name +'says<span>${timeStamp}</span></h4><p>${comment}</p>${comments.innerHTML}';

  document.getElementById("boardname").value = '';
  document.getElementById("comment").value = '';
};



// ref.on("child_added", function(snapshot) {
//   let comment = snapshot.val();
//   addComment(comment.name, comment.comment, comment.time);
// });



const addComment = (name, comment, timeStamp) => {
  let comments = document.getElementById("comments");
  comments.innerHTML = `<hr><h4>${name} says<span>${timeStamp}</span></h4><p>${comment}</p>${comments.innerHTML}`;
}

function checkForm(){
	
	if(document.message.boardname.value==""){
		alert("請填寫姓名!");
		document.message.boardname.focus();
		return false;
	}	
	if(document.message.boardemail.value!=""){
		if(!checkmail(document.message.boardemail)){
			document.message.boardemail.focus();
			return false;
		}
	} 
	if(document.message.comment.value==""){
		alert("請填寫留言內容!");
		document.message.comment.focus();
		return false;
	}
		return confirm('確定送出嗎？');
}

function checkmail(myEmail) {
	var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(filter.test(myEmail.value)){
		return true;
	}
	alert("電子郵件格式不正確");
	return false;
}